import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, housing, { headers });
  }

  updateHousing(id: number, housing: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/${id}`, housing, { headers });
  }

  deleteHousing(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}