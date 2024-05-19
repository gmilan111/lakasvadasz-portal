import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {Rent} from "../../core/models/rent.model";
import {RentService} from "../../core/services/rent.service";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRippleModule} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {RentFormComponent} from "../rent-form/rent-form.component";

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatRippleModule,
  ],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent implements OnInit{
  rents: Rent[] = [];

  constructor(private rentService: RentService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllRent();
  }

  Openpopup(code: any, title: any, btn: any ,component:any) {
    var _popup = this.dialog.open(component, {
      width: 'auto',
      data: {
        title: title,
        btn: btn,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.getAllRent();
    })
  }

  addRent(){
    this.Openpopup(0, 'Albérlet létrehozása','Létrehozás', RentFormComponent);
  }

  getAllRent(){
    this.rentService
      .getAllRent()
      .snapshotChanges()
      .subscribe({
        next:(data ) => {
          this.rents = [];

          data.forEach((item)=>{
            let rent = item.payload.toJSON() as Rent;

            this.rents.push({
              key: item.key || '',
              settlement: rent.settlement,
              price: rent.price,
              size: rent.size,
              rooms: rent.rooms,
              move_in_date: rent.move_in_date,
              description: rent.description,

            });
          })
        }
    })
  }

  editRent(id: string){
    this.Openpopup(id, 'Ingatlan módosítás','Módosítás', RentFormComponent);
  }

  removeRent(id:string){
    if(window.confirm('Biztosan ki akarod törölni ezt az albérletet?')){
      this.rentService.deleteRent(id);
    }
  }

  getRent(id: string){
    this.rentService.getRent(id).snapshotChanges().subscribe({
      next:(data ) => {
        let rent = data.payload.toJSON() as Rent;
        this.rents.push(rent);
      }
    })
  }
}
