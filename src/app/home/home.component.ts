import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Ajoutez cette ligne
import { HousingService } from '../housing.service';
import { Router } from '@angular/router'; // Importez Router

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  housingList: any[] = []; // Liste des logements

  constructor(private housingService: HousingService, private router: Router) {}

  ngOnInit() {
    this.loadHousings();
  }

  // Récupérer les logements depuis l'API
  loadHousings() {
    this.housingService.getHousings().subscribe({
      next: (data) => {
        this.housingList = data; // Mettre à jour la liste des logements
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des logements :', err);
      }
    });
  }
  navigateToCreate() {
    this.router.navigate(['/create']); // Méthode pour naviguer
  }
}

