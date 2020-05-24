import { Injectable } from '@angular/core';
import { Pet } from '../models/pet';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class PetService {
  
  constructor(private http: HttpClient) { }

  public getPets() {
    return this.http.get<Pet[]>("http://localhost:8080/pets");
  }

  public createPet(pet: Pet) {
    return this.http.post("http://localhost:8080/pet", pet);
  }

  public deletePet(breed: string) {
    return this.http.post("http://localhost:8080/deletepet", breed, {
      params : new HttpParams().set('breed', breed)
    });
  }

  public addQuantity(breed: string, quantity: number) {
    return this.http.post("http://localhost:8080/pet/addquantity", breed, {
      params : new HttpParams().set('breed', breed).append('quantity', quantity.toString())
    });
  }

  public removeQuantity(breed: string, quantity: number) {
    return this.http.post("http://localhost:8080/pet/decreasequantity", breed, {
      params : new HttpParams().set('breed', breed).append('quantity', quantity.toString())
    });
  }

  public isPetExist(breed: string) {
    return this.http.get<boolean>("http://localhost:8080/ispetexist", {
      params : new HttpParams().set('breed', breed)
    });
  }

  public getPet(breed: string) {
    return this.http.get<Pet>("http://localhost:8080/pet/getpet", {
      params : new HttpParams().set('breed', breed)
    });
  }

  public setDescription(breed: string, description: string) {
    return this.http.post("http://localhost:8080/pet/updatedescription", breed, {
      params : new HttpParams().set('breed', breed).append('description', description)
    });
  }


}
