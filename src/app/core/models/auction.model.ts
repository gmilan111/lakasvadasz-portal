export interface Auction{
  key?: string;
  settlement: string;
  size: number;
  rooms: number;
  price: number;
  deadline: Date;
  description: string;
}
