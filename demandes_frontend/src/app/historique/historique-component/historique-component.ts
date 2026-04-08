import { ChangeDetectorRef, Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { HistoriqueService } from '../historiqueService/historique-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-historique-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historique-component.html',
  styleUrl: './historique-component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class HistoriqueComponent {

  
  historiqueService = inject(HistoriqueService);

  historiques: any[] = [];

  // pour historique par demande id
  historiques$!: Observable<any[]>;

  errorMessage = '';

  @Input() demandeId: number | null = null;
  
  cdr = inject(ChangeDetectorRef);

  // Charger l'historique par id demande / ou tous
  ngOnInit() {
    this.historiques$ = this.demandeId
    ? this.historiqueService.getHistoriquesByDemandeId(this.demandeId)
    : this.historiqueService.getHistoriques();
  }

  // Charger tous l'historique
  loadHistoriques(): void {
    this.historiqueService.getHistoriques().subscribe({
      next: (data) => {
      this.historiques = data;
      this.cdr.detectChanges();
      console.log('Lignes reçues', data);
    },
    error: (err) => {
      this.errorMessage = 'Échec du chargement: ' + err.message;
      console.error(err);
    }
    });
  }
}
