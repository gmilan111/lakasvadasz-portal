import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from "./shared/auth.service";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {CustompipePipe} from "./custompipe.pipe";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    CustompipePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lakasvadasz-portal';
  opened = false;

  constructor(private auth: AuthService) { }

  logout(){
    this.auth.logout();
  }

  protected readonly localStorage = localStorage;
}
