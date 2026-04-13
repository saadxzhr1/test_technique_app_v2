import { Injectable } from '@nestjs/common';
import { HistoriqueResponseDto } from './dto/responseHistorique.dto';
import { Historique } from './entities/historique.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateurs } from 'src/utilisateurs/entities/utilisateurs.entity';

@Injectable()
export class HistoriqueService {
  constructor(
    @InjectRepository(Historique)
    private historiqueRepository: Repository<Historique>,
  ) {}

  // Charger tous l'historiques
  async findAll(): Promise<HistoriqueResponseDto[]> {
    const historiques = await this.historiqueRepository.find({
      order: { date_creation: 'DESC' },
    });
    return historiques.map((historique) => ({
      id: historique.id,
      date_creation: historique.date_creation,
      type_action: historique.type_action,
      id_demande: historique.id_demande,
      utilisateur: historique.utilisateur.nom_utilisateur,
      ancienne_valeur: historique.ancienne_valeur,
      nouvelle_valeur: historique.nouvelle_valeur,
    }));
  }

  // Charger les historiques d'une demande
  async findSome(id_d: number): Promise<HistoriqueResponseDto[]> {
    const historiques = await this.historiqueRepository.find({
      where: { id_demande: id_d },
      order: { date_creation: 'DESC' },
    });
    return historiques.map((historique) => ({
      id: historique.id,
      date_creation: historique.date_creation,
      type_action: historique.type_action,
      id_demande: historique.id_demande,
      utilisateur: historique.utilisateur.nom_utilisateur,
      ancienne_valeur: historique.ancienne_valeur,
      nouvelle_valeur: historique.nouvelle_valeur,
    }));
  }

  // Enregistrer les actions sur demandes
  async auditDemandes(
    id_demande: number,
    utilisateur: Utilisateurs,
    type_action: 'MODIFICATION' | 'SUPPRESSION' | 'CREATION',
    ancienne_valeur: string,
    nouvelle_valeur: string | null,
  ): Promise<void> {
    await this.historiqueRepository.save({
      id_demande,
      utilisateur,
      type_action,
      ancienne_valeur,
      nouvelle_valeur,
      date_creation: new Date(),
    });
  }
}
