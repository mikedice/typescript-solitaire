import {Card} from "./Card"
import {Suite} from "./Suite"

export class CardDeck{
    public Cards: Array<Card>
    constructor(){
        this.Cards = new Array<Card>(52);
        var value=1;
        var suite = 0;
        for (var i = 0; i<52; i++){
            this.Cards[i] = new Card(suite, value++);
            if (value==14){
                suite++;
                value=1;
            }
        }

        this.shuffle();

        this.verify();


    }

// Fisher-Yates algorithm
    private shuffle(){
        var last = 51
        for (var i = 0; i<50; i++){
            var rand = this.getRandomInt(i,52);
            let temp:Card = Card.Copy(this.Cards[i]);
            this.Cards[i] = Card.Copy(this.Cards[rand]);
            this.Cards[rand] = Card.Copy(temp);
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
        console.log(`clubs ${values.zero.length} ${values.zero}`);
        console.log(`diamonds ${values.one.length} ${values.one}`);
        console.log(`hearts ${values.two.length} ${values.two}`);
        console.log(`spades ${values.three.length} ${values.three}`);
    }

    private getRandomInt(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
}