import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemandesService } from '../services/demandes-service';
import { CommonModule } from '@angular/common';
import { HistoriqueComponent } from '../../historique/historique-component/historique-component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-demandes-component',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HistoriqueComponent, 
    FormsModule,
    MatFormFieldModule, 
    MatSelectModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './demandes-component.html',
  styleUrl: './demandes-component.css',
})
export class DemandesComponent {

  demandesService = inject(DemandesService);
  demandes: any[] = [];
    
  cdr = inject(ChangeDetectorRef);

  errorMessage = '';

  ngOnInit() {
    this.loadDemandes();
  }

  //Charger les demandes
  loadDemandes(): void {
    this.demandesService.getDemandes().subscribe({
      next: (data) => {
      this.demandes = data;
      this.cdr.detectChanges();
      console.log('lines recues', data);
    },
    error: (err) => {
      this.errorMessage = 'Échec du chargement: ' + err.message;
      console.error(err);
    }
    });
  }



  // Filter par status
  selectedStatus = '';
  statusOptions: string[] = ['Brouillon', 'Soumise', 'Validée'];
  get filteredDemandes() {
    if (!this.selectedStatus) {
      return this.demandes;
    }
    return this.demandes.filter(demande => demande.status === this.selectedStatus);
  }



  // Afficher l'historique d'une seul demande
  expandedId: number | null = null;
  toggleHistorique(id: number): void {
    this.expandedId = this.expandedId === id ? null : id;
  }

  // Creer ou modifier une demande //
  // form
  showForm = false;
  editingId: number | null = null
  form = {
    titre: '',
    details: '',
    status: ''
  };


  // pop up vide
  openCreate() {
    this.editingId = null;
    this.form = { titre: '', details: '', status: '' };
    this.showForm = true;
  }

  // pop up avec champs remplis
  openEdit(demande: any) {
    this.editingId = demande.id;
    this.form = { titre: demande.titre, details: demande.details, status: demande.status };
    this.showForm = true;
  }

  cancel() {
    this.showForm = false;
  }

  // Confirmer action ajouter / modifier //
  submit() {
  if (this.editingId) {
    this.demandesService.updateDemande(this.editingId, this.form).subscribe({
      next: (response) => { 
        this.showForm = false; 
        this.editingId = null;
        this.cdr.detectChanges();
        this.loadDemandes();
        alert(response.message);
        
      },
      error: (err) => console.error(err)
    });
  } else {
    this.demandesService.createDemande(this.form).subscribe({
      next: (response) => { 
        this.showForm = false; 
        this.cdr.detectChanges();
        this.loadDemandes(); 
        alert(response.message);
      },
      error: (err) => console.error(err)
    });
  }
}


  //Supprimer une demande / soft delete
  deleteDemande(id: number): void {
    const confirmed = confirm('Confirmer la suppression?');
    if (!confirmed) {
      return;
    }
    this.demandesService.deleteDemande(id).subscribe({
      next: (response) => {
        // this.demandes = this.demandes.filter(demande => demande.id !== id);
        this.loadDemandes();
        alert(response.message);
      },
      error: (err) => {
        console.error('Suppression a echouee!!', err);
        alert('Suppression a echouee');
      }
    });
  }

}
