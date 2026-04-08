import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class HistoriqueService {
  host = 'http://localhost:3000';
  private http = inject(HttpClient);

  // Charger tous l'historique
  getHistoriques(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/historique`);
  }

  // Charger les historiques par id demande
  getHistoriquesByDemandeId(id: number){
    return this.http.get<any[]>(`${this.host}/historique/${id}`);
  }
}
