import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Pet } from '../shared/models/pet';
import { PetService } from '../shared/services/pet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['../app.component.css']
})
export class EditPetComponent implements OnInit {

  public editPetForm: FormGroup;
  public breed: string;
  public pet: Pet;
  public isExist: boolean = true;
  public confirmUpdateDescriptionMessage: boolean = false;

  constructor(private petService: PetService, 
              private fb: FormBuilder, 
              private router: Router, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.queryParamMap.subscribe( qp => {
      this.breed = qp.get('breed');
    })

    this.editPetForm = this.fb.group({
      description: ['']
    });

    this.petService.isPetExist(this.breed).subscribe( (existing: boolean) => {
      if(existing) {
        this.isExist = true;
        
        this.petService.getPet(this.breed).subscribe( (pet: Pet) => {
          this.pet = pet;
          this.editPetForm.get('description').setValue(pet.description);

        });
      } else {
        this.isExist = false;
      }
    });
  }

  submit() {
    var newDescription = this.editPetForm.get('description').value;

    if(this.pet.description != newDescription)
    this.petService.setDescription(this.breed, newDescription).subscribe( (message: string) => {
      this.confirmUpdateDescriptionMessage = true;
      this.pet.description = newDescription;
      setTimeout(()=>{this.confirmUpdateDescriptionMessage = false;}, 5000);
    });
  }

  public backHome() {
    this.router.navigate(['/pets']);
  }

}
