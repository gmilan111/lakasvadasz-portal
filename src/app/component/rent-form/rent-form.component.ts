import {Component, Inject, input, OnInit} from '@angular/core';
import {CommonModule, JsonPipe} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RentService} from "../../core/services/rent.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Rent} from "../../core/models/rent.model";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@Component({
  selector: 'app-rent-form',
  standalone: true,
  providers:[
    provideNativeDateAdapter()
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    JsonPipe,
  ],
  templateUrl: './rent-form.component.html',
  styleUrl: './rent-form.component.css'
})
export class RentFormComponent implements OnInit{
  rentFrom!: FormGroup;
  rentId = "";
  href= "";
  inputdata: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder, private rentService: RentService, private router: Router, private activatedRoute: ActivatedRoute, private ref: MatDialogRef<RentFormComponent>) {
    this.rentFrom = this.formBuilder.group({
      settlement: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      rooms: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      move_in_date: new FormControl('', Validators.required),
      description: new FormControl(''),
    })
  }

  ngOnInit() {
    this.inputdata = this.data;
    this.href = this.router.url;
    if(this.data.code != 0){
      this.rentId = this.data.code;
      this.getRent(this.rentId);
    }
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  onSubmit(){
    if(this.rentFrom.valid){
      if(this.rentId !== ''){
        this.rentService.updateRent(this.rentId, this.rentFrom.value);
        this.closepopup();
      }else{
        this.rentService.addRent(this.rentFrom.value);
        this.closepopup();
      }
      this.router.navigate(['/rent']);
    }else{
      this.rentFrom.markAllAsTouched();
    }
  }

  getRent(id:string){
    this.rentService.getRent(id).snapshotChanges().subscribe({
      next: (data) => {
        let rent = data.payload.toJSON() as Rent;
        this.rentFrom.setValue(rent);
      }
    })
  }
}
