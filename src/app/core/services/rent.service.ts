import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {Rent} from "../models/rent.model";

@Injectable({
  providedIn: 'root'
})
export class RentService {
  private dbPath = '/rent';
  rentRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.rentRef = db.list(this.dbPath);
  }

  getAllRent(){
    return this.rentRef;
  }

  getRent(rentId:string){
    return this.db.object(`${this.dbPath}/${rentId}`);
  }

  addRent(rent:Rent){
    this.rentRef.push(rent);
  }

  updateRent(id:string, rent:Rent){
    this.rentRef.update(id, rent);
  }

  deleteRent(id:string){
    this.rentRef.remove(id);
  }
}
