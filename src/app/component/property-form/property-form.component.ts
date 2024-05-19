import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PropertyService} from "../../core/services/property.service";
import {IProperty} from "../../core/models/common.model";
import {Router} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-property-form',
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
  templateUrl: './property-form.component.html',
  styleUrl: './property-form.component.css'
})
export class PropertyFormComponent implements OnInit{
  propertyForm!: FormGroup;
  propertyId = "";
  href = "";
  inputdata: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private propertyService: PropertyService, private router: Router, private ref: MatDialogRef<PropertyFormComponent>) {
    this.propertyForm = this.formBuilder.group({
      price: new FormControl('', [Validators.required]),
      settlement: new FormControl('', [Validators.required]),
      rooms: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      is_sold: new FormControl(false),
      description: new FormControl(''),
    })
  }

  ngOnInit() {
    this.inputdata = this.data;
    this.href = this.router.url;
    if(this.data.code != 0){
      this.propertyId = this.data.code;
      this.getProperty(this.propertyId);
    }
  }

  closepopup() {
    this.ref.close('Closed using function');
  }


  onSubmit(){
    if(this.propertyForm.valid){
      if(this.propertyId !== '' ){
        this.propertyService.updateProperty(this.propertyId, this.propertyForm.value);
        this.closepopup();
      }else{
        this.propertyService.addProperty(this.propertyForm.value);
        this.closepopup();
      }
      this.router.navigate(['/property']);
    }else{
      this.propertyForm.markAllAsTouched();
    }
  }

  getProperty(key:string){
    this.propertyService.getProperty(key).snapshotChanges().subscribe({
      next: (data) => {
        let property = data.payload.toJSON() as IProperty;
        this.propertyForm.setValue(property);
      }
    });
  }
}
