import {Card} from "./Card"
import {SourceCardInfo} from "./SourceCardInfo"

export class CardPile {
    private cards:Array<Card>;
    public uiElement:HTMLElement;
    public constructor(public domId:string){
        this.cards = new Array<Card>();
        this.uiElement = document.getElementById(domId);
    }

    protected getCards():Array<Card>{ return this.cards; }
    public push(card:Card){
        this.cards.push(card);
        this.uiElement.appendChild(card.uiElement);
    }

    public pop(card:Card):Card{
        if (this.cards.length == 0) return null;
        return this.cards.pop();
    }

    public showTopCard(){
        this.cards[this.cards.length-1].showFace();
    }
}