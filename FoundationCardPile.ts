import {CardPile} from "./CardPile"
import {SourceCardInfo} from "./SourceCardInfo"
import {Suite} from "./Suite"

export class FoundationCardPile extends CardPile
{
    public constructor( public suite:Suite, domId:string ){ super(domId); }

    public canAcceptCard(sourceCardInfo:SourceCardInfo):boolean {
        return sourceCardInfo.suite == this.suite &&
        ((super.getCards().length == 0 && sourceCardInfo.value == 1) ||
        (super.getCards()[super.getCards().length-1].Value == sourceCardInfo.value-1))
    }
}