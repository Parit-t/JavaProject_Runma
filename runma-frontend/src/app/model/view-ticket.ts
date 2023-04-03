export interface ViewTicket{
    id:number;
    status:any;
    createDate:Date;
    paidDate:Date|null;
    raceType:ViewTicketRt;
  }
  
  export interface ViewTicketRt {
    name: string;
    distance: number;
    price: number;
    event: ViewTicRtEvent;
  }
  
  export interface ViewTicRtEvent {
    name: string;
    province: string;
    location: string;
  }