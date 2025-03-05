import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HousingService } from '../housing.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-housing-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './housing-form.component.html',
  styleUrl: './housing-form.component.css'
})
export class HousingFormComponent {
  housingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private housingService: HousingService,
    private router: Router
  ) {
    this.housingForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  onSubmit() {
    if (this.housingForm.valid) {
      const formValues = { ...this.housingForm.value, price: String(this.housingForm.value.price) };
      console.log('Form Values:', formValues);

      this.housingService.createHousing(formValues).subscribe({
        next: () => {
          this.router.navigate(['/']); // Rediriger vers la liste des logements après la création
        },
        error: (err) => {
          console.error('Erreur lors de la création du logement :', err);
        }
      });
    } else {
      console.error('Formulaire invalide', this.housingForm.errors);
    }
  }
}