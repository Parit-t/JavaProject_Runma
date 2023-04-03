export interface EventInterface {
    id: number;
    name: string;
    capacity : number;
    location: string; 
    province: string;
    outOfTicketFlag: Boolean;
    raceDate: Date;
    openRegisDate: Date;
    closeRegisDate:Date;
    raceTypeList: [];
    organizerList: [];

}
