import {CardDeck} from './CardDeck'
import {CardPile} from './CardPile'
import {Card} from './Card'

export class Game {
    private cardDeck: CardDeck;
    private stock: CardPile;
    private waste: CardPile;
    private foundations: Array<CardPile>;
    private tableau: Array<CardPile>

    public constructor(){
        this.cardDeck = new CardDeck();
        this.stock = new CardPile();
        this.waste = new CardPile();
        this.foundations = new Array<CardPile>();
        for (var i = 0; i<4; i++) this.foundations.push(new CardPile());
        this.tableau = new Array<CardPile>();
        for (var i = 0; i<7; i++) this.tableau.push(new CardPile());
        this.deal();
    }

    private deal(){
        let tableauIdx = 0;
        let tableauCounts = [1,2,3,4,5,6,7]
        for (var i = 0; i<52; i++){
            if (tableauIdx < 7) {
                this.tableau[tableauIdx].push(Card.Copy(this.cardDeck.Cards[i]));
                tableauCounts[tableauIdx]--;

                if(tableauCounts[tableauIdx]==0) tableauIdx++;
            }
            else{
                this.stock.push(Card.Copy(this.cardDeck.Cards[i]));
            }
        
        }
    }

}