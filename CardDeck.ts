import {Card} from "./Card"
import {Suite} from "./Suite"

export class CardDeck{
    public Cards: Array<Card>
    constructor(){
        this.Cards = new Array<Card>(52);
        var value=1;
        var suite = 0;
        for (var i = 0; i<52; i++){
            var file = this.cardFiles[suite][value-1];
            this.Cards[i] = new Card(suite, value++, file);
            if (value==14){
                suite++;
                value=1;
            }
        }
        for (var i = 0;i<52;i++){
            console.log(`${this.Cards[i].Suite} ${this.Cards[i].Value}`);
        }
        this.shuffle();

        this.verify();
    }

// Fisher-Yates algorithm
    private shuffle(){
        for (var i = 0; i<this.Cards.length-1; i++){
            var rand = this.getRandomInt(i,this.Cards.length);
            let temp:Card = this.Cards[i];
            this.Cards[i] = this.Cards[rand];
            this.Cards[rand] = temp;
        }
    }

    private verify(){
        for (var i = 0;i<52;i++){
            console.log(`${this.Cards[i].Suite} ${this.Cards[i].Value}`);
        }

        var values = {
            zero:[],
            one:[],
            two:[],
            three:[]
        }
        for (var i = 0; i<52; i++){
            switch(this.Cards[i].Suite){
                case 0:
                    values.zero.push(this.Cards[i].Value);
                break;
                case 1:
                    values.one.push(this.Cards[i].Value);
                break;
                case 2:
                    values.two.push(this.Cards[i].Value);
                break;
                case 3:
                    values.three.push(this.Cards[i].Value);
                break;
            }
        }
        console.log(`clubs[${values.zero.length}] ${values.zero}`);
        console.log(`diamonds[${values.one.length}] ${values.one}`);
        console.log(`hearts[${values.two.length}] ${values.two}`);
        console.log(`spades[${values.three.length}] ${values.three}`);
    }

    private getRandomInt(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    private cardFiles = [[
        "ace_of_clubs.svg",
        "2_of_clubs.svg",
        "3_of_clubs.svg",
        "4_of_clubs.svg",
        "5_of_clubs.svg",
        "6_of_clubs.svg",
        "7_of_clubs.svg",
        "8_of_clubs.svg",
        "9_of_clubs.svg",
        "10_of_clubs.svg",
        "jack_of_clubs.svg",
        "queen_of_clubs.svg",
        "king_of_clubs.svg"],

        ["ace_of_diamonds.svg",
        "2_of_diamonds.svg",
        "3_of_diamonds.svg",
        "4_of_diamonds.svg",
        "5_of_diamonds.svg",
        "6_of_diamonds.svg",
        "7_of_diamonds.svg",
        "8_of_diamonds.svg",
        "9_of_diamonds.svg",
        "10_of_diamonds.svg",
        "jack_of_diamonds.svg",
        "queen_of_diamonds.svg",
        "king_of_diamonds.svg"],

        ["ace_of_hearts.svg",
        "2_of_hearts.svg",
        "3_of_hearts.svg",
        "4_of_hearts.svg",
        "5_of_hearts.svg",
        "6_of_hearts.svg",
        "7_of_hearts.svg",
        "8_of_hearts.svg",
        "9_of_hearts.svg",
        "10_of_hearts.svg",
        "jack_of_hearts.svg",
        "queen_of_hearts.svg",
        "king_of_hearts.svg"],

        ["ace_of_spades.svg",
        "2_of_spades.svg",
        "3_of_spades.svg",
        "4_of_spades.svg",
        "5_of_spades.svg",
        "6_of_spades.svg",
        "7_of_spades.svg",
        "8_of_spades.svg",
        "9_of_spades.svg",
        "10_of_spades.svg",
        "jack_of_spades.svg",
        "queen_of_spades.svg",
        "king_of_spades.svg"]];
}