import {CardPile} from "./CardPile"
import {Suite} from "./Suite"
import {Card} from "./Card"

export class FoundationCardPile extends CardPile
{
    public constructor( public suite:Suite, domId:string ){ super(domId); }

    public canAcceptCard(card:Card):boolean {
        return card.Suite == this.suite &&
        (
            // no cards on the pile and the new card is an Ace
            (this.cards.length == 0 && card.Value == 1) ||

            // greater than 0 cards on the pile and the new card's
            // value is one greater than the last card
            (this.cards.length > 0 && this.cards[this.cards.length-1].Value == card.Value-1)
        )
    }
}