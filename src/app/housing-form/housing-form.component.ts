import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HousingService } from '../housing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-housing-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './housing-form.component.html',
  styleUrls: ['./housing-form.component.css']
})
export class HousingFormComponent implements OnInit {
  housingForm: FormGroup;
  housingId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private housingService: HousingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.housingForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  ngOnInit(): void {
    this.housingId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.isEditMode = this.housingId !== null;

    if (this.isEditMode) {
      this.housingService.getHousing(this.housingId!).subscribe(housing => {
        this.housingForm.patchValue({
          name: housing.name,
          image: housing.image,
          location: housing.location,
          price: String(housing.price)
        });
      });
    }
  }

  onSubmit() {
    if (this.housingForm.valid) {
      const formValues = { ...this.housingForm.value, price: String(this.housingForm.value.price) };

      if (this.isEditMode) {
        this.housingService.updateHousing(this.housingId!, formValues).subscribe({
          next: () => {
            this.router.navigate(['/']); // Rediriger vers la liste des logements après la mise à jour
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour du logement :', err);
          }
        });
      } else {
        this.housingService.createHousing(formValues).subscribe({
          next: () => {
            this.router.navigate(['/']); // Rediriger vers la liste des logements après la création
          },
          error: (err) => {
            console.error('Erreur lors de la création du logement :', err);
          }
        });
      }
    } else {
      console.error('Formulaire invalide', this.housingForm.errors);
    }
  }
}