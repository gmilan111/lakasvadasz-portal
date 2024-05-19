import { Component } from '@angular/core';
import {FormBuilder, FormsModule} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) { }

  login(){
    if(this.email == ''){
      alert('Please enter a valid email');
      return
    }

    if(this.password == ''){
      alert('Please enter a valid password');
      return;
    }

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
