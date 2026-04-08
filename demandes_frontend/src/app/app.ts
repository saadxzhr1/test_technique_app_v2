import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatTabsModule} from '@angular/material/tabs';
import { DemandesComponent } from './demandes/demandes-component/demandes-component';
import { HistoriqueComponent } from './historique/historique-component/historique-component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTabsModule, DemandesComponent, HistoriqueComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None,
})
export class App {
}
