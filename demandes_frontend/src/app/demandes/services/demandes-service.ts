import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DemandesService {
  host = 'http://localhost:3000';
  private http = inject(HttpClient);

  //Charger les demandes
  getDemandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/demandes`);
  }

  // Ajouter une demande
  createDemande(data: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.host}/demandes`, data);
  }

  // Modifier une demande
  updateDemande(id: number, data: any): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${this.host}/demandes/${id}`, data);
  }

  //supprimer une demande
  deleteDemande(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.host}/demandes/${id}`);
  }
}