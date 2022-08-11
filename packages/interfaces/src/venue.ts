export enum State {
  NY = 'NY',
  CT = 'CT',
  PA = 'PA',
  NJ = 'NJ',
  MA = 'MA',
  NH = 'NH',
}

export interface IVenue {
  _id: string;
  name: string;
  phone: string;
  email: string;
  website: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: State;
  zip: string;
}
