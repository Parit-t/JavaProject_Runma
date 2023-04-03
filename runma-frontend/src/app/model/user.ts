export class User {
    id: number | undefined;
    password!: string;
    fname: string | undefined;
    lname: string;
    email: string;
    phone: number;
    gender: string;
    birthDate: string;
    address: string;
    country: string;
    province: string;
    subDistrict: string;
    district: string;
    postalCode: number;
  
    constructor() {
      this.id = 0
      this.password = '';
      this.fname = '';
      this.lname= '';
      this.email= '';
      this.phone= 0;
      this.gender= '';
      this.birthDate= '';
      this.address= '';
      this.country= '';
      this.province= '';
      this.subDistrict= '';
      this.district= '';
      this.postalCode= 0;
    }

    
}
