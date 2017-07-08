import {CardPile} from "./CardPile"
import {Suite} from "./Suite"
import {Card} from "./Card"

export class FoundationCardPile extends CardPile
{
    public constructor( public suite:Suite, domId:string ){ 
        super(domId, 
        (e:DragEvent)=>{ 
            console.log("foundation dragover");
            return true; 
        }, 
        (e:DragEvent)=>{
            return false;
        }); 
    }

    public push(card:Card){
        card.setFanOffset(0);
        super.push(card);
    }
    
    public canAcceptCard(card:Card):boolean {
        if (card.Suite != this.suite) return false;

        // no cards on the pile and the new card is an Ace
        if (this.cards.length == 0){
            return card.Value == 1;
        }

        // greater than 0 cards on the pile and the new card's
        // value is one greater than the last card
        return this.cards.length > 0 && this.cards[this.cards.length-1].Value == card.Value-1
    }
}