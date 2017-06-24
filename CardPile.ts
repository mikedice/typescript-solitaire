import {Card} from "./Card"

export class CardPile {
    private cards:Array<Card>;
    public constructor(){
        this.cards = new Array<Card>();
    }

    public push(card:Card){
        this.cards.push(Card.Copy(card));
    }

    public pop(card:Card):Card{
        if (this.cards.length == 0) return null;
        return Card.Copy(this.cards.pop());
    }
}