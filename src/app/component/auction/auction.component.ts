import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {Auction} from "../../core/models/auction.model";
import {AuctionService} from "../../core/services/auction.service";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRippleModule} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {AuctionFormComponent} from "../auction-form/auction-form.component";

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIcon,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatRippleModule,
  ],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.css'
})
export class AuctionComponent implements OnInit{
  auctions: Auction[] = [];

  constructor(private auctionService: AuctionService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllAuction();
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
      this.getAllAuction();
    })
  }

  getAllAuction(){
    this.auctionService
      .getAllAuction()
      .snapshotChanges()
      .subscribe({
        next:(data)=>{
          this.auctions = [];

          data.forEach((item)=>{
            let auction = item.payload.toJSON() as Auction;

            this.auctions.push({
              key: item.key || '',
              settlement: auction.settlement,
              price: auction.price,
              size: auction.size,
              rooms: auction.rooms,
              deadline: auction.deadline,
              description: auction.description,
            });
          })
        }
      })
  }

  addAuction(){
    this.Openpopup(0, 'Aukció létrehozás','Létrehozás', AuctionFormComponent);
  }

  editAuction(id: string){
    this.Openpopup(id, 'Aukció módosítás','Módosítás', AuctionFormComponent);
  }

  removeAuction(id:string){
    if(window.confirm('Biztosan ki akarod törölni ezt az aukciót?')){
      this.auctionService.deleteAuction(id);
    }
  }
}
