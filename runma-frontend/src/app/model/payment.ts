

export interface TicketResponse {
  id: number;
  createDate: Date;
  status: string;
  raceType: {
    price: number;
    name: string;
  };
}

export interface TicketRequest {
  status: Status;
  bankName: string;
  paidDate: Date;
  amount: number;
  imageProof: string;
}

export enum Status {
  unpaid,
  paid,
  cancel,
  expired,
}
