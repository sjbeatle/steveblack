import { IVenue } from './venue';

export enum Meridian {
  ANTE = 'am',
  POST = 'pm',
}

export interface IPerformance {
  venue: string | IVenue;
  date: string;
  timeStart: string;
  timeEnd: string;
  notes: string;
  revenue: number;
  coverCharge: number;
  isCanceled: boolean;
}
