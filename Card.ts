import {Suite} from "./Suite"
import {DragAndDrop} from "./DragAndDrop"

// associates a card suite and value with a UI element
// that represents the card
export class Card{
    public uiElement:HTMLElement;
    
    public constructor(
        public Suite:Suite, 
        public Value:number,
        public ImageFile:string,
        public DragAndDrop:DragAndDrop,
        public ShowFace:boolean=false,
        public ShowingFace:boolean=false){
            this.uiElement = document.createElement("img");
            this.uiElement.id = `card-${this.Suite}-${this.Value}`;
            this.uiElement.setAttribute('class', 'card');
            this.uiElement['card'] = this;
            this.uiElement.addEventListener('dragstart', 
                (e:DragEvent)=>this.handleDragStart(e));

            if (this.ShowFace){
                this.showFace();
            }
            else{
                this.showBack();
            }
    }

    private handleDragStart(e:DragEvent){
        if (this.ShowingFace==false) return e.preventDefault();

        var parentId = this.getParentPileId(this.uiElement);
        
        e.dataTransfer.setData("text/plain", JSON.stringify({
            cardSuite: this.Suite,
            cardValue: this.Value,
            sourcePile: parentId
        }));
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

    private getParentPileId(uiElement:HTMLElement):string{
        var parent = this.uiElement.parentElement;
        while(parent){
            if (parent.id === 'stock' ||
                parent.id === 'waste' ||
                parent.id.indexOf('foundation') >= 0 ||
                parent.id.indexOf('tableau') >= 0)
                break;
            parent = parent.parentElement;
        }

        if (parent) return parent.id;
        return '';
    }
}