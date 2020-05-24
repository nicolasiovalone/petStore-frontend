import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PetsListComponent } from './pets-list/pets-list.component';
import { PetService } from './shared/services/pet.service';
import { AddPetComponent } from './add-pet/add-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { HomeComponent } from './home/home.component';

const APP_ROUTE: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'pets', component: PetsListComponent },
  { path: 'addPet', component: AddPetComponent},
  { path: 'editPet', component: EditPetComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PetsListComponent,
    AddPetComponent,
    EditPetComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTE)
  ],
  providers: [PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
