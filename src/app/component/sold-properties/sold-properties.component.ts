import {Component, OnInit} from '@angular/core';
import {SoldPropertiesService} from "../../core/services/sold-properties.service";
import {Router, RouterLink} from "@angular/router";
import {SoldProperties} from "../../core/models/sold-properties.model";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatRippleModule} from "@angular/material/core";

@Component({
  selector: 'app-sold-properties',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
  ],
  templateUrl: './sold-properties.component.html',
  styleUrl: './sold-properties.component.css'
})
export class SoldPropertiesComponent implements OnInit{
  sold_properties: SoldProperties[] = [];
  constructor(private sold_propertyService: SoldPropertiesService, private router: Router) {}

  ngOnInit() {
    this.getAllSoldProperty();
  }

  getAllSoldProperty(){
    this.sold_propertyService.getAllSoldProperty().snapshotChanges().subscribe({
      next:(data) =>{
        this.sold_properties = [];

        data.forEach((item) =>{
          let sold_property = item.payload.toJSON() as SoldProperties;

          this.sold_properties.push({
            key: item.key || '',
            settlement: sold_property.settlement,
            price: sold_property.price,
            description: sold_property.description,
          })
        })
      }
    })
  }

  removeSoldProperty(id: string){
    if(window.confirm('Biztosan ki szeretné törölni a kiválasztott ingatlant?')){
      this.sold_propertyService.deleteSoldProperty(id);
    }
  }
}
