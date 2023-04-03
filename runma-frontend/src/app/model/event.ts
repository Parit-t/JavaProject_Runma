
export class Event {
  id: number;
  name: string;
  location: string;
  raceDate: string;
  openRegisDate: string;
  closeRegisDate: string;
  province: string;
  outOfTicketFlag: boolean;
  capacity: number;

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
  }
}
