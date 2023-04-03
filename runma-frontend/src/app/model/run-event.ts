import { RacetypeDTO } from './racetype-dto';

export interface RunEvent {
  id: number;
  name: string;
  raceDate: Date;
  openRegisDate: Date;
  closeRegisDate: Date;
  location: string;
  province: string;
  capacity: number;
  raceTypeList: RacetypeDTO[];
}
