import {Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {SoldProperties} from "../models/sold-properties.model";

@Injectable({
  providedIn: 'root'
})
export class SoldPropertiesService{
  private dbPath = '/sold_properties';
  sold_propertyRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.sold_propertyRef = db.list(this.dbPath);
  }

  getAllSoldProperty(){
    return this.sold_propertyRef;
  }

  addSoldProperty(sold_property: SoldProperties){
    this.sold_propertyRef.push(sold_property);
  }

  getSoldProperty(id: string){
    return this.db.object(`${this.dbPath}/${id}`);
  }

  deleteSoldProperty(id:string){
    return this.sold_propertyRef.remove(id);
  }
}
