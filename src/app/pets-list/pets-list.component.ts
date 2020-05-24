import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from '../shared/models/pet';
import { PetService } from '../shared/services/pet.service';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['../app.component.css']
})
export class PetsListComponent implements OnInit {

  public pets: Pet[];

  public petsToDisplay: Pet[];

  public qty: number;
  public actifPet: number;
  public petToFind: string;

  public confirmAddQtyMessage: boolean[] = new Array();
  public confirmRemoveQtyMessage: boolean[] = new Array();
  public confirmDeletePetMessage: boolean[] = new Array();

  constructor(private petService: PetService, 
              private router: Router) { }

  ngOnInit(): void {
    this.refreshDatas();
  }

  public refreshDatas(): void {
    this.petService.getPets().subscribe( (pets: Pet[]) => {
      if(pets) {
        this.pets = pets;
        this.petsToDisplay = this.pets;
      } else {
        this.pets = [];
      }
    });
  }

  public deletePet(index: number) {
    
    this.petService.deletePet(this.pets[index].breed).subscribe( (message: string) => {
      console.log(message);
      this.refreshDatas();
      this.confirmAddQtyMessage[index] = false;
      this.confirmRemoveQtyMessage[index] = false;
      this.confirmDeletePetMessage[index] = false;
    });
  }

  public editPet(index: number) {
    this.router.navigate(['/editPet'], {
      queryParams: {
        breed: this.pets[index].breed
      }
    })
  }

  public addQuantity(index: number) {
    if(this.qty >0) {
      this.petService.addQuantity(this.pets[index].breed, this.qty).subscribe( (message: string) => {
        console.log(message);
        this.refreshDatas();
        this.confirmAddQtyMessage[index] = true;
        setTimeout(()=>{this.confirmAddQtyMessage[index] = false;}, 5000);
      });
    }
  }
 
  public removeQuantity(index: number) {
    if(this.qty >0) {
      this.petService.removeQuantity(this.pets[index].breed, this.qty).subscribe( (message: string) => {
        console.log(message);
        this.refreshDatas();
        this.confirmRemoveQtyMessage[index] = true;
        setTimeout(()=>{this.confirmRemoveQtyMessage[index] = false;}, 5000);
      });
    }
  }

  public checkValidRemoveQty(index: number) {
    return this.pets[index].quantity >= this.qty || this.qty == null;
  }

  public findPet(breedToSearch: string) {
    this.petsToDisplay = [];
    for (let i = 0; i < this.pets.length; i++) {
      if(this.pets[i].breed.toLowerCase().includes(breedToSearch.toLowerCase())) {
          this.petsToDisplay.push(this.pets[i]);
      }
    }
  }
}
