export class Organizer{
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
        email: string,
    ){
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.website = website;
        this.facebook = facebook;
        this.email = email;
    }

    static defaultOrganizer(){
        return new Organizer(0,"","","","","")
    }
}