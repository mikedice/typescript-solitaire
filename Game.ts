import {CardDeck} from './CardDeck'
import {CardPile} from './CardPile'
import {FoundationCardPile} from './FoundationCardPile'
import {TableauCardPile} from './TableauCardPile'
import {Card} from './Card'
import {Suite} from './Suite'
import {DragAndDrop} from './DragAndDrop'

export class Game {
    private cardDeck: CardDeck;
    private stock: CardPile;
    private waste: CardPile;
    private foundations: Array<FoundationCardPile>;
    private tableau: Array<TableauCardPile>;
    private dragAndDrop:DragAndDrop;
    public static Current:Game;

    public constructor(){
        this.dragAndDrop = new DragAndDrop();
        this.cardDeck = new CardDeck(this.dragAndDrop);
        this.stock = new CardPile("stock", null, null);
        this.waste = new CardPile("waste", null, null);
        this.foundations = new Array<FoundationCardPile>();
        this.foundations.push(new FoundationCardPile(Suite.Hearts, "foundation-hearts"));
        this.foundations.push(new FoundationCardPile(Suite.Diamonds,"foundation-diamonds"));
        this.foundations.push(new FoundationCardPile(Suite.Clubs,"foundation-clubs"));
        this.foundations.push(new FoundationCardPile(Suite.Spades, "foundation-spades"));
        this.tableau = new Array<TableauCardPile>();
        for (var i = 0; i<7; i++) this.tableau.push(new TableauCardPile(`tableau-${i+1}`));
        
        this.deal();
        Game.Current = this;
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

       this.stock.showTopCard();
       for (var i = 0; i<7; i++) {
           this.tableau[i].showTopCard();
       }
    }

    public moveCard(cardMove){

    }
    
    private removeCardFromPile(cardEl:HTMLElement, pileEl:HTMLElement):Card
    {
        var srcCard = Game.cardFromEl(cardEl);
        var pile = this.cardPileFromEl(pileEl);
        if (pile && srcCard){
            var result = pile.pop();
            pile.showTopCard();
            return result;
        }
        return null;
    }

    private addCardToPile(card:Card, pileEl:HTMLElement)
    {
        var cardPile = this.cardPileFromEl(pileEl);
        if (cardPile){ cardPile.push(card); }
    }

    private canDropOnTableau(card:Card, targ:HTMLElement):Boolean{
        var cardPile = this.tableauFromEl(targ);
        if (!cardPile) return false;
        return cardPile.canAcceptCard(card);
    }

    private cardPileFromEl(pileEl:HTMLElement):CardPile{
        let pile:CardPile = this.foundationFromEl(pileEl);
        if (pile) return pile;

        pile =  this.tableauFromEl(pileEl);
        if (pile) return pile;

        pile = this.stockFromEl(pileEl);
        if (pile) return pile;
        
        return this.wasteFromEl(pileEl);
    }

    private foundationFromEl(el:HTMLElement):FoundationCardPile
    {
        var els = el.id.split("-");
        let id:number = -1;
        switch(els[1]){
            case "hearts":
                id=0;
                break;
            case "diamonds":
                id=1;
                break;
            case "clubs":
                id=2;
                break;
            case "spades":
                id=3;
                break;
        }
        
        if (id == -1) return null;
        return this.foundations[id]; 
    }

    private tableauFromEl(el:HTMLElement):TableauCardPile
    {
        var els = el.id.split("-");
        var id = parseInt(els[1]);
        id -= 1;
        if (id < 0 || id > 6) return null;

        var cardPile = this.tableau[id];
        return cardPile;
    }

    private stockFromEl(el:HTMLElement):CardPile{
        if (Game.isStock(el)){
            return this.stock;
        }
    }

     private wasteFromEl(el:HTMLElement):CardPile{
        if (Game.isWaste(el)){
            return this.waste;
        }
    }

    private canDropOnFoundation(card:Card, targ:HTMLElement):Boolean{
        var cardPile = this.foundationFromEl(targ);
        if (!cardPile) return false;

        return cardPile.canAcceptCard(card);
    }
    private static isTableau(el:HTMLElement):Boolean{
        return Game.isElOfType(el, "tableau");
    }

    private static isFoundation(el:HTMLElement):Boolean{
        return Game.isElOfType(el, "foundation");
    }

    private static isStock(el:HTMLElement):Boolean{
        return Game.isElOfType(el, "stock");
    }
    
    private static isWaste(el:HTMLElement):Boolean{
        return Game.isElOfType(el, "waste");
    }

    private static isElOfType(el:HTMLElement, type:string):Boolean{
            if (el.id){
            var els = el.id.split("-")
            return els[0]===type; 
        }
        return false;
    }

    private static cardFromEl(el:HTMLElement):Card{
        var els = el.id.split("-");
        if (els[0]==='card'){
            return el['card'];
        }
        return null;
    }

    private printAcceptsDiagnostic(result:Boolean, card:Card, target:HTMLElement, source:HTMLElement){
        var targetPile = this.cardPileFromEl(target);
        var targetTop = targetPile ? targetPile.getTopCard() : null;
        var topString = targetTop ? `${targetTop.Suite}:${targetTop.Value}`:"null";
        console.log (`${result?'can':'cannot'} drop ${card.Suite}:${card.Value} on ${target.id} ${topString} from ${source.id}`);
    }
}