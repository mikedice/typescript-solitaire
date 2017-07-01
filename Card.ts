import {Suite} from "./Suite"

// associates a card suite and value with a UI element
// that represents the card
export class Card{
    public uiElement:HTMLElement;
    public constructor(
        public Suite:Suite, 
        public Value:number,
        public ImageFile:string,
        public ShowFace:boolean=false){
            this.uiElement = document.createElement("img");
            this.uiElement.id = `card-${this.Suite}-${this.Value}`;
            this.uiElement.setAttribute('class', 'card');
            this.uiElement['card'] = this;
            if (this.ShowFace){
                this.showFace();
            }
            else{
                this.showBack();
            }
    }

    public showFace(){
        this.uiElement.setAttribute('src', `./SVG-cards-1.3/${this.ImageFile}`);
    }

    public showBack(){
        this.uiElement.setAttribute('src', './SVG-cards-1.3/card-back-assets/card-back.png');
    }
    
    public static isRed(suite:Suite):boolean{
        return suite!=Suite.Clubs && suite != Suite.Spades;
    }

    public static isBlack(suite:Suite):boolean{
        return suite != Suite.Diamonds && suite != Suite.Hearts;
    }
}