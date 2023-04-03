export class Organizer {
    id: number;
    password: string;
    email: string;
    name: string;
    website: string;
    contact: string;
    facebook: string;
  
    constructor() {
      this.id = 0;
      this.password = '';
      this.name = '';
      this.website= '';
      this.email= '';
      this.contact= '';
      this.facebook= '';
    }
}