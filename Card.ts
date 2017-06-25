import {Suite} from "./Suite"
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
    
    public static Copy(source:Card):Card {
        return new Card(source.Suite, source.Value, source.ImageFile, source.ShowFace);
    }
}