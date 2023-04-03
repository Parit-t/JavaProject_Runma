export class RaceType{
    id: number;
    price: number;
    name: string;
    distance: number;

    constructor(
        id: number,
        price: number,
        name: string,
        distance: number,
    ){
        this.id = id;
        this.name = name;
        this.price = price;
        this.distance = distance
    }

    static defaultRaceType(){
        return new RaceType(0,0,"",0)
    }
}