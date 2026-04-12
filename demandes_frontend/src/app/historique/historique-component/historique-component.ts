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

  // pour historique par demande id
  historiques$!: Observable<any[]>;

  @Input() demandeId: number | null = null;
  
  // Charger l'historique par id demande / ou tous
  ngOnInit() {
    this.historiques$ = this.demandeId
    ? this.historiqueService.getHistoriquesByDemandeId(this.demandeId)
    : this.historiqueService.getHistoriques();
  }

}
