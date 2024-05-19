import { Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {PropertyFormComponent} from "./component/property-form/property-form.component";
import {PropertyComponent} from "./component/property/property.component";
import {RentComponent} from "./component/rent/rent.component";
import {RentFormComponent} from "./component/rent-form/rent-form.component";
import {AuctionComponent} from "./component/auction/auction.component";
import {AuctionFormComponent} from "./component/auction-form/auction-form.component";
import {SoldPropertiesComponent} from "./component/sold-properties/sold-properties.component";
import {AuthGuardService} from "./core/services/auth-guard.service";

export const routes: Routes = [
  {path: '', redirectTo: 'property', pathMatch: 'full'},
  {path: 'property', component: PropertyComponent, canActivate: [AuthGuardService]},
  {path: 'property-form', component: PropertyFormComponent, canActivate: [AuthGuardService]},
  {path: 'property-form/:id', component: PropertyFormComponent, canActivate: [AuthGuardService]}, //editre is használva lesz
  {path: 'rent', component: RentComponent, canActivate: [AuthGuardService]},
  {path: 'rent-form', component: RentFormComponent, canActivate: [AuthGuardService]},
  {path: 'rent-form/:id', component: RentFormComponent, canActivate: [AuthGuardService]}, //editre is használva lesz
  {path: 'auction', component: AuctionComponent, canActivate: [AuthGuardService]},
  {path: 'auction-form', component: AuctionFormComponent, canActivate: [AuthGuardService]},
  {path: 'auction-form/:id', component: AuctionFormComponent, canActivate: [AuthGuardService]}, //editre is használva lesz
  {path: 'sold-properties', component: SoldPropertiesComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];
