import { Racetypedetail } from "./racetypedetail";
import { Racetype } from "./racetype";
export interface EventInfo1 {
    eventName: string;
    location: string;
    raceTypeDetailList: Array<Racetypedetail>;
    
}
export class EventInfo {
    id: number;
    name: string;
    location: string;
    raceDate: string;
    openRegisDate: string;
    closeRegisDate: string;
    province: string;
    outOfTicketFlag: boolean;
    capacity: number;
    raceTypeList!: Array<Racetype>;
    totalSales: number;
    
    constructor() {
        this.id = 0;
        this.name = "";
        this.raceDate = "";
        this.openRegisDate = "";
        this.closeRegisDate = "";
        this.province = "";
        this.location = "";
        this.capacity = 0;
        this.outOfTicketFlag = false;
        this.raceTypeList = [];
        this.totalSales =0;

    }
  }