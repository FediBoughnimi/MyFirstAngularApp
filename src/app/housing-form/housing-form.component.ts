import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  sEditMode: any;

  constructor(
    private fb: FormBuilder,
    private housingService: HousingService,
    private router: Router
  ) {
    this.housingForm = this.fb.group({
      name: [''],
      image: [''],
      location: [''],
      price: ['']
    });
  }

  onSubmit() {
    this.housingService.createHousing(this.housingForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']); // Rediriger vers la liste des logements après la création
      },
      error: (err) => {
        console.error('Erreur lors de la création du logement :', err);
      }
    });
  }
}

