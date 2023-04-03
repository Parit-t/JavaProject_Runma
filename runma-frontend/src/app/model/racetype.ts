export class Racetype {
  id!: number;
  price!: number;
  name!: string;
  distance!: number;
  eventid!: number;
  sales!: number;
}

export interface RacetypeRspon {
  price: number;
  name: string;
  distance: number;
}
