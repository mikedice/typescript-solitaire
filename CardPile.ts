import {Card} from "./Card"

// Associates a UI element and an array of cards. The UI element
// represents the location of the card on the screen
export class CardPile {
    protected cards:Array<Card>;
    public uiElement:HTMLElement;

    public constructor(public domId:string){
        this.cards = new Array<Card>();
        this.uiElement = document.getElementById(domId);
        this.uiElement['cardPile'] = this;
    }
    
    public push(card:Card){
        this.cards.push(card);
        this.uiElement.appendChild(card.uiElement);
    }

    public pop():Card{
        if (this.cards.length == 0) return null;

        var card = this.cards.pop();

        // dragula removes the child element from our uiElement's list
        // of children
        // this.uiElement.removeChild(card.uiElement);
        return card;
    }

    public popMulti(count:number):Array<Card>{
        if (count > this.cards.length) return null;
        var result = this.cards.slice(this.cards.length-count-1, count);

        // dragula removes the child element from our uiElement's list
        // of children
        // for(let popped of result){
        //     this.uiElement.removeChild(popped.uiElement);
        // }
    }

    public showTopCard(){
        if (this.cards.length ==0) return;
        this.cards[this.cards.length-1].showFace();
    }

    public getTopCard():Card{
        if (this.cards.length ==0) return;
        return this.cards[this.cards.length-1];
    }
}