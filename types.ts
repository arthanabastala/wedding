export interface GuestRSVP {
  name: string;
  attending: 'yes' | 'no' | null;
  email?: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
