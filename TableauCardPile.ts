import {CardPile} from "./CardPile"
import {SourceCardInfo} from "./SourceCardInfo"
import {Suite} from "./Suite"

export class TableauCardPile extends CardPile {
    public constructor( domId:string ){ super(domId); }

    public canAcceptCard(sourceCardInfo:SourceCardInfo):boolean {
        if (super.getCards().length == 0) return sourceCardInfo.value == 1;
        var lastCard = super.getCards()[super.getCards().length-1];

        return (this.isRed(lastCard.Suite) && this.isBlack(sourceCardInfo.suite) &&
        sourceCardInfo.value == lastCard.Value + 1) ||
        (this.isBlack(lastCard.Suite) && this.isRed(sourceCardInfo.suite) &&
        sourceCardInfo.value == lastCard.Value + 1)

    }

    private isRed(suite:Suite):boolean{
        return suite!=Suite.Clubs && suite != Suite.Spades;
    }

    private isBlack(suite:Suite):boolean{
        return suite != Suite.Diamonds && suite != Suite.Hearts;
    }
}