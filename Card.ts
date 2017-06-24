import {Suite} from "./Suite"
export class Card{
    public constructor(
        public Suite:Suite, 
        public Value:number,
        public ShowFace:boolean=false){

        }
    
    public static Copy(source:Card):Card {
        return new Card(source.Suite, source.Value);
    }
}