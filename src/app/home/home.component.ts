import { Component, OnInit } from '@angular/core';
import { HousingService } from '../housing.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  housingList: any[] = [];

  constructor(private housingService: HousingService, private router: Router) { }

  ngOnInit(): void {
    this.housingService.getHousings().subscribe(housings => {
      this.housingList = housings;
    });
  }

  deleteHousing(id: number): void {
    if (confirm('Are you sure you want to delete this housing?')) {
      this.housingService.deleteHousing(id).subscribe({
        next: () => {
          this.housingList = this.housingList.filter(h => h.id !== id);
        },
        error: (err) => {
          console.error('Error deleting housing:', err);
        }
      });
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/create']);
  }
}