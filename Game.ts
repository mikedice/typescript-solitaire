import {CardDeck} from './CardDeck'
import {CardPile} from './CardPile'
import {Card} from './Card'
import * as dragulaExp from 'dragula'

export class Game {
    private cardDeck: CardDeck;
    private stock: CardPile;
    private waste: CardPile;
    private foundations: Array<CardPile>;
    private tableau: Array<CardPile>
    private dragula: dragulaExp.Drake;

    public constructor(){
        this.cardDeck = new CardDeck();
        this.stock = new CardPile("stock");
        this.waste = new CardPile("waste");
        this.foundations = new Array<CardPile>();
        this.foundations.push(new CardPile("foundation-hearts"));
        this.foundations.push(new CardPile("foundation-diamonds"));
        this.foundations.push(new CardPile("foundation-clubs"));
        this.foundations.push(new CardPile("foundation-spades"));
        this.tableau = new Array<CardPile>();
        for (var i = 0; i<7; i++) this.tableau.push(new CardPile(`tableau-${i+1}`));
        
        this.deal();
    }
    
    private deal(){
        // deal cards into the right piles
        let tableauIdx = 0;
        let tableauCounts = [1,2,3,4,5,6,7]
        for (var i = 0; i<52; i++){
            if (tableauIdx < 7) {
                this.tableau[tableauIdx].push(this.cardDeck.Cards[i]);
                tableauCounts[tableauIdx]--;

                if(tableauCounts[tableauIdx]==0) tableauIdx++;
            }
            else{
                this.stock.push(this.cardDeck.Cards[i]);
            }
        }

        // set up drag and drop
        this.dragula = dragulaExp([
            document.getElementById(this.stock.domId),
            document.getElementById(this.waste.domId),
            document.getElementById(this.foundations[0].domId),
            document.getElementById(this.foundations[1].domId),
            document.getElementById(this.foundations[2].domId),
            document.getElementById(this.foundations[3].domId),
            document.getElementById(this.tableau[0].domId),
            document.getElementById(this.tableau[1].domId),
            document.getElementById(this.tableau[2].domId),
            document.getElementById(this.tableau[3].domId),
            document.getElementById(this.tableau[4].domId),
            document.getElementById(this.tableau[5].domId),
            document.getElementById(this.tableau[6].domId)
       ]);

       // create DOM objects for each card
       this.stock.showTopCard();
       for (var i = 0; i<7; i++) {
           this.tableau[i].showTopCard();
       }

    }
}