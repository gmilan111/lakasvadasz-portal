import {Component, Inject, input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuctionService} from "../../core/services/auction.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Auction} from "../../core/models/auction.model";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-auction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './auction-form.component.html',
  styleUrl: './auction-form.component.css'
})
export class AuctionFormComponent implements OnInit{
  auctionForm!: FormGroup;
  auctionId = "";
  href = "";
  inputdata: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private formBuilder: FormBuilder, private auctionService: AuctionService, private router: Router, private ref: MatDialogRef<AuctionFormComponent>) {
    this.auctionForm = this.formBuilder.group({
      settlement: new FormControl('',[Validators.required]),
      price: new FormControl('', [Validators.required]),
      rooms: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      deadline: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
    this.inputdata = this.data;
    this.href = this.router.url;
    if(this.data.code != 0){
      this.auctionId = this.data.code;
      this.getAuction(this.auctionId);
    }
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  onSubmit(){
    if(this.auctionForm.valid){
      if(this.auctionId !== ''){
        this.auctionService.updateAuction(this.auctionId, this.auctionForm.value);
        this.closepopup();
      }else{
        this.auctionService.addAuction(this.auctionForm.value);
        this.closepopup();
      }
      this.router.navigate(['/auction']);
    }else{
      this.auctionForm.markAllAsTouched();
    }
  }

  getAuction(id: string){
    this.auctionService.getAuction(id).snapshotChanges().subscribe({
      next: (data) => {
        let auction = data.payload.toJSON() as Auction;
        this.auctionForm.setValue(auction);
      }
    })
  }
}
