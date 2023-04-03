
export class Event{
    id: number;
    name: string;
    raceDate: Date;
    openRegisDate: Date;
    closeRegisDate: Date;
    outOfTicketFlag: Boolean;
    province: string;
    location: string;
    capacity: number;
    raceTypeList: Array<raceType>;
    organizerList: Array<organizer>;

    constructor(
        id: number,
        name: string,
        raceDate: Date,
        openRegisDate: Date,
        closeRegisDate: Date,
        outOfTicketFlag: Boolean,
        province: string,
        location: string,
        capacity: number,
        raceTypeList: Array<raceType>,
        organizerList: Array<organizer>
    ){
        this.id = id;
        this.name = name;
        this.raceDate = raceDate;
        this.openRegisDate = openRegisDate;
        this.closeRegisDate = closeRegisDate;
        this.outOfTicketFlag = outOfTicketFlag;
        this.province = province;
        this.location = location;
        this.capacity = capacity;
        this.raceTypeList = raceTypeList;
        this.organizerList = organizerList;
    }

    static defaultEvent(){
        return new Event(0,'',new Date(),new Date(),new Date(),false,'','',0,[],[])
    }
}

class raceType{
    "id": number;
    "price": number;
    "name": string;
    "distance": number;
    constructor(
        id: number,
        price: number,
        name: string,
        distance: number
    ){
        this.id = id;
        this.price = price;
        this.name = name;
        this.distance = distance;
    }
    // *[Symbol.iterator]() {
    //     this.id
    //     this.price;
    //     this.name;
    //     this.distance;
    //   }
}

class organizer{
    id: number;
    name: string;
    contact: string;
    website: string;
    facebook: string;
    email: string;

    constructor(
        id: number,
        name: string,
        contact: string,
        website: string,
        facebook: string,
        email: string
    ){
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.website = website;
        this.facebook = facebook;
        this.email = email;
    }
}