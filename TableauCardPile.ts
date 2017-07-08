import {CardPile} from "./CardPile"
import {Suite} from "./Suite"
import {Card} from "./Card"
import {Game} from "./Game"

export class TableauCardPile extends CardPile {
    
    public constructor( 
        domId:string,
        private fanOffset:number = 30 ){ 

        super(domId, 
        (e:DragEvent)=>{ 
            console.log("tableau drag over");
            e.preventDefault(); 
        },
        (e:DragEvent)=>{
            console.log("tableau drop");
            e.preventDefault();
            this.handleCardDrop(e);
        }); 
        this.fanCards();
    }

    public push(card:Card){
        super.push(card);
        this.fanCards();
    }
    
    private handleCardDrop(e:DragEvent){
        for (var i = 0; i<e.dataTransfer.types.length; i++){
            if (e.dataTransfer.types[i]==="text/plain"){
                var dataStr = e.dataTransfer.getData("text/plain");
                var dropData = JSON.parse(dataStr);
                if (this.canAcceptCard(dropData)){
                    console.log("card accepted");
                    Game.Current.moveCard(
                        {
                            cardSuite: dropData.cardSuite, 
                            cardValue: dropData.cardValue, 
                            sourcePileId: dropData.sourcePile, 
                            destPileId: this.domId
                        });
                }
                else console.log("card rejected");
                break;
            }
        }
    }

    public canAcceptCard(dropData):boolean {
        // If there are no cards on the pile then a King can be dropped
        if (this.cards.length == 0) return dropData.value == 13; 

        var lastCard = this.cards[this.cards.length-1];

        // return opposite colors and new cards value is one more
        // than last card's value
        return (Card.isRed(lastCard.Suite) && 
                Card.isBlack(dropData.cardSuite) && 
                dropData.cardValue == lastCard.Value - 1) 
            ||
                (Card.isBlack(lastCard.Suite) && 
                 Card.isRed(dropData.cardSuite) &&
                 dropData.cardValue == lastCard.Value - 1);
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