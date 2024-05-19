import {AfterViewInit, Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PropertyService} from "../../core/services/property.service";
import {IProperty} from "../../core/models/common.model";
import {SoldProperties} from "../../core/models/sold-properties.model";
import {SoldPropertiesService} from "../../core/services/sold-properties.service";

import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRippleModule} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {PropertyFormComponent} from "../property-form/property-form.component";


@Component({
  selector: 'app-property',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatRippleModule,
  ],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})
export class PropertyComponent implements OnInit{
  properties: IProperty[] = [];
  sold_properties!: SoldProperties;
  propertyForm!: FormGroup;
  szeged: any;

  constructor(private propertyService: PropertyService,private formBuilder: FormBuilder, private soldPropertiesService: SoldPropertiesService, private router: Router, private dialog: MatDialog) {
    this.propertyForm = this.formBuilder.group({
      is_sold: new FormControl(true),
    })
  }

  ngOnInit() {
    this.getAllProperty();
    this.getCountSzeged();
  }

  Openpopup(code: any, title: any, btn: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: 'auto',
      data: {
        title: title,
        btn: btn,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.getAllProperty();
    })
  }

  addPorperty(){
    this.Openpopup(0, 'Ingatlan létrehozás','Létrehozás', PropertyFormComponent);
  }

  getAllProperty(){
    this.propertyService
      .getAllProperty()
      .snapshotChanges()
      .subscribe({
        next:(data)=>{
          this.properties = [];

          data.forEach((item)=>{
            let property = item.payload.toJSON() as IProperty;

            this.properties.push({
              key: item.key || '',
              settlement: property.settlement,
              price: property.price,
              size: property.size,
              rooms: property.rooms,
              description: property.description,
              is_sold: property.is_sold,
            })
          })
        }
      })
  }

  getCountSzeged(){
    this.propertyService
      .getSzeged()
      .snapshotChanges()
      .subscribe({
        next:(data)=>{
          this.szeged = [];

          data.forEach((item)=>{
            let property = item.payload.toJSON() as IProperty;

              this.szeged.push({
                key: item.key || '',
                settlement: property.settlement,
                price: property.price,
                size: property.size,
                rooms: property.rooms,
                description: property.description,
                is_sold: property.is_sold,
              });
          })
        }
      })
  }

  editProperty(key:string){
    this.Openpopup(key, 'Ingatlan módosítás','Módosítás', PropertyFormComponent);
  }

  removeProperty(key:string){
    if(window.confirm('Biztosan ki akarod törölni ezt az ingatlant?')){
      this.propertyService.deleteProperty(key);
    }
  }

  sellProperty(id: string){
    this.propertyService.updateProperty(id, this.propertyForm.value);
    if(window.confirm('Biztosan el akarod adni ezt az ingatlant?')){
      this.getProperty(id);
      this.propertyService.deleteProperty(id);
    }
  }

  getProperty(key:string){
    this.propertyService.getProperty(key).snapshotChanges().subscribe({
      next: (data) => {
        let property = data.payload.toJSON() as SoldProperties;
        this.sold_properties = property;
        this.soldPropertiesService.addSoldProperty(this.sold_properties);
      }
    });
  }
}
