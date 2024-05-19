import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {Auction} from "../models/auction.model";

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private dbPath = '/auction';
  auctionRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.auctionRef = db.list(this.dbPath);
  }

  getAllAuction(){
    return this.auctionRef;
  }

  getAuction(id:string){
    return this.db.object(`${this.dbPath}/${id}`);
  }

  addAuction(auction:Auction){
    this.auctionRef.push(auction);
  }

  updateAuction(id:string, auction:Auction){
    this.auctionRef.update(id, auction);
  }

  deleteAuction(id:string){
    this.auctionRef.remove(id);
  }
}
