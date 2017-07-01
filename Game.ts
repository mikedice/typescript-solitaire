import {CardDeck} from './CardDeck'
import {CardPile} from './CardPile'
import {FoundationCardPile} from './FoundationCardPile'
import {TableauCardPile} from './TableauCardPile'
import {Card} from './Card'
import {Suite} from './Suite'
import * as dragulaExp from 'dragula'

export class Game {
    private cardDeck: CardDeck;
    private stock: CardPile;
    private waste: CardPile;
    private foundations: Array<FoundationCardPile>;
    private tableau: Array<TableauCardPile>
    private dragula: dragulaExp.Drake;

    public constructor(){
        this.cardDeck = new CardDeck();
        this.stock = new CardPile("stock");
        this.waste = new CardPile("waste");
        this.foundations = new Array<FoundationCardPile>();
        this.foundations.push(new FoundationCardPile(Suite.Hearts, "foundation-hearts"));
        this.foundations.push(new FoundationCardPile(Suite.Diamonds,"foundation-diamonds"));
        this.foundations.push(new FoundationCardPile(Suite.Clubs,"foundation-clubs"));
        this.foundations.push(new FoundationCardPile(Suite.Spades, "foundation-spades"));
        this.tableau = new Array<TableauCardPile>();
        for (var i = 0; i<7; i++) this.tableau.push(new TableauCardPile(`tableau-${i+1}`));
        
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
       ], {
           accepts: (el, target, source, sibling) => this.accepts(el, target, source, sibling)
       });
       this.dragula.on('drop', (el, target, source, sibling) => this.handleDropped(el, target, source, sibling));

       this.stock.showTopCard();
       for (var i = 0; i<7; i++) {
           this.tableau[i].showTopCard();
       }
    }

    private handleDropped(el, target, source, sibling){
        let removed = this.removeCardFromPile(el, source);
        this.addCardToPile(removed, target);
    }

    private accepts(el, target, source, sibling) {
        var card = Game.cardFromEl(el);
        let result:boolean = false;
        
        if (card == null) return false; // el wasn't a card and we only drag and drop cards

        if (Game.isTableau(target) && this.canDropOnTableau(card, target)){
            result = true;
        }

        else if (Game.isFoundation(target) && this.canDropOnFoundation(card, target))
        {
            result = true;
        }

        var targetPile = this.cardPileFromEl(target);
        var targetTop = targetPile ? targetPile.getTopCard() : null;
        var topString = targetTop ? `${targetTop.Suite}:${targetTop.Value}`:"null";

        console.log (`${result?'can':'cannot'} drop ${card.Suite}:${card.Value} on ${target.id} ${topString} from ${source.id}`);
        return result;
    }

    private removeCardFromPile(cardEl:HTMLElement, pileEl:HTMLElement):Card
    {
        var srcCard = Game.cardFromEl(cardEl);
        if (Game.isTableau(pileEl)){
            let pile = this.tableauFromEl(pileEl);
            var result = pile.pop();
            pile.showTopCard();
            return result;
        }
        return null;
    }

    private addCardToPile(card:Card, pileEl:HTMLElement)
    {
        if (Game.isFoundation(pileEl)){
            let pile = this.foundationFromEl(pileEl);
            pile.push(card);
        }
        else if (Game.isTableau(pileEl)){
            let pile = this.tableauFromEl(pileEl);
            pile.push(card);
        }
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
    private canDropOnTableau(card:Card, targ:HTMLElement):boolean{
        var cardPile = this.tableauFromEl(targ);
        if (!cardPile) return false;
        return cardPile.canAcceptCard(card);
    }

    private cardPileFromEl(pileEl:HTMLElement):CardPile{
        var pile = this.foundationFromEl(pileEl);
        if (pile) return pile;

        return this.tableauFromEl(pileEl);
    }

    private canDropOnFoundation(card:Card, targ:HTMLElement):boolean{
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
}