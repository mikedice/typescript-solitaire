import {CardPile} from "./CardPile"
import {Suite} from "./Suite"
import {Card} from "./Card"

export class TableauCardPile extends CardPile {
    
    public constructor( 
        domId:string,
        private fanOffset:number = 30 ){ 

        super(domId); 
        this.fanCards();
    }

    public push(card:Card){
        super.push(card);
        this.fanCards();
    }
    
    public canAcceptCard(card:Card):boolean {
        // If there are no cards on the pile then a King can be dropped
        if (this.cards.length == 0) return card.Value == 13; 

        var lastCard = this.cards[this.cards.length-1];

        // return opposite colors and new cards value is one more
        // than last card's value
        return (Card.isRed(lastCard.Suite) && 
                Card.isBlack(card.Suite) && 
                card.Value == lastCard.Value - 1) 
            ||
                (Card.isBlack(lastCard.Suite) && 
                 Card.isRed(card.Suite) &&
                 card.Value == lastCard.Value - 1);
    }

    public fanCards(){
        let offset:number = 0;
        for (var i = 0; i<this.cards.length; i++){
            if (this.cards[i].ShowingFace){
                this.cards[i].setFanOffset(offset);
                offset += this.fanOffset;
            }
        }
    }
}