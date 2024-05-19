import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {IProperty} from "../models/common.model";
@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private dbPath = '/property';
  propertyRef: AngularFireList<any>;
  szeged_count: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.propertyRef = db.list(this.dbPath, ref => ref.orderByChild('settlement'));
    this.szeged_count = db.list(this.dbPath, ref => ref.orderByChild('settlement').equalTo('Szeged'));
  }

  getAllProperty(){
    return this.propertyRef;
  }

  getSzeged(){
    return this.szeged_count;
  }

  getProperty(key:string){
    return this.db.object(`${this.dbPath}/${key}`);
  }

  addProperty(property:IProperty){
    this.propertyRef.push(property);
  }

  updateProperty(key:string, property:IProperty){
    this.propertyRef.update(key, property);
  }

  deleteProperty(key:string){
    return this.propertyRef.remove(key);
  }
}
