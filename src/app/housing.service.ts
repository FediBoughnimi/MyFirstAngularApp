import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private apiUrl = 'http://localhost:5156/api/Housing';

  constructor(private http: HttpClient) {}

  getHousings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getHousing(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createHousing(housing: any): Observable<any> {
    return this.http.post(this.apiUrl, housing);
  }

  updateHousing(id: number, housing: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, housing);
  }

  deleteHousing(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}