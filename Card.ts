import {Suite} from "./Suite"

// associates a card suite and value with a UI element
// that represents the card
export class Card{
    public uiElement:HTMLElement;
    
    public constructor(
        public Suite:Suite, 
        public Value:number,
        public ImageFile:string,
        public ShowFace:boolean=false,
        public ShowingFace:boolean=false){
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
        this.ShowingFace = true;
        this.uiElement.setAttribute('src', `./SVG-cards-1.3/${this.ImageFile}`);
    }

    public showBack(){
        this.ShowingFace = false;
        this.uiElement.setAttribute('src', './SVG-cards-1.3/card-back-assets/card-back.png');
    }
    
    public setFanOffset(offsetInPx:number){
        this.uiElement.style['top'] = `${offsetInPx}px`;
    }

    public static isRed(suite:Suite):boolean{
        return suite!=Suite.Clubs && suite != Suite.Spades;
    }

    public static isBlack(suite:Suite):boolean{
        return suite != Suite.Diamonds && suite != Suite.Hearts;
    }
}