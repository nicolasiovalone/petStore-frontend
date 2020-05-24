import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule , Validators} from '@angular/forms';
import { Pet } from '../shared/models/pet';
import { PetService } from '../shared/services/pet.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['../app.component.css']
})
export class AddPetComponent implements OnInit {

  public addPetForm: FormGroup;
  public confirmAddPetMessage: boolean = false;

  errorsForm = {
    'breed': '',
    'quantity': ''
  };

  errorMessages = {
    'breed': {
      'required': 'Breed is required',
      'alreadyExist': "Breed is already existing"
    },
    'quantity': {
      'required': 'Quantity is required',
      'min': 'Quantity must be positive'
    }
  };

  constructor(private petService: PetService, 
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.addPetForm = this.fb.group({
      breed: ['', Validators.required],
      description: [''],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  submit() {
    if(!this.checkErrors()) {  
      this.petService.isPetExist(this.addPetForm.get('breed').value).subscribe( (existing: boolean) => {
        if(existing) {
          this.errorsForm['breed'] += this.errorMessages['breed']['alreadyExist'];
        } else {
          console.log("Formulaire valide, on ajoute l'animal");
          var pet = new Pet(this.addPetForm.get('breed').value, 
                            this.addPetForm.get('description').value,
                            this.addPetForm.get('quantity').value);
          this.petService.createPet(pet).subscribe( (message: string) => {
            console.log(message);
            this.addPetForm.reset();
            this.confirmAddPetMessage = true;
            setTimeout(()=>{this.confirmAddPetMessage = false;}, 5000);
          });
        }
      });
    }
  }

  checkErrors(): boolean {
    var hasError = false;
    console.log(this.addPetForm);
    if(!this.addPetForm) { return;}
    const form = this.addPetForm;
    for(const field in this.errorsForm) {
      this.errorsForm[field] = '';
      const control = form.get(field);
      if(control && control.invalid) {
        const messages = this.errorMessages[field];
        for(const key in control.errors) {
          this.errorsForm[field] += messages[key] + '\n ';
          hasError = true;
        }
      }
    }
    return hasError;
  }

  public backHome() {
    this.router.navigate(['/pets']);
  }

}
