import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDemandeDto } from './dto/createDemande.dto';
import { UpdateDemandeDto } from './dto/updateDemande.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Demandes } from './entities/demande.entity';
import { DemandesResponseDto } from './dto/demandesResponse.dto';
import { HistoriqueService } from 'src/historique/historique.service';
import { Transactional } from 'typeorm-transactional';
import { UtilisateursService } from 'src/utilisateurs/utilisateurs.service';

@Injectable()
export class DemandesService {
  // Injecter le repository
  constructor(
    @InjectRepository(Demandes)
    private demandesRepository: Repository<Demandes>,
    private historiqueService: HistoriqueService,
    private utilisateursService: UtilisateursService,
  ) {}

  // Charger tous les demandes
  async findAll(): Promise<DemandesResponseDto[]> {
    const demandes = await this.demandesRepository.find({
      where: { supprimer: false },
      order: { date_creation: 'DESC' },
    });

    return demandes.map((demande) => ({
      id: demande.id,
      titre: demande.titre,
      details: demande.details,
      status: demande.status,
      dateCreation: demande.date_creation,
      dateDerniereModification: demande.date_der_mod,
    }));
  }

  // Trouver demande par id
  async findOne(id: number): Promise<DemandesResponseDto> {
    const demande = await this.demandesRepository.findOneBy({ id });
    if (!demande) {
      throw new NotFoundException(`Demande ${id} non trouvée`);
    }
    return {
      id: demande.id,
      titre: demande.titre,
      details: demande.details,
      status: demande.status,
    };
  }

  // Ajouter demande
  @Transactional()
  async create(createDemandeDto: CreateDemandeDto) {
    const utilisateur = await this.utilisateursService.findOne(1);
    const demande = this.demandesRepository.create({
      ...createDemandeDto,
      supprimer: false,
    });
    await this.demandesRepository.save(demande);
    await this.historiqueService.auditDemandes(
      demande.id,
      utilisateur,
      'CREATION',
      '_',
      `Titre: ${demande.titre} | Status: ${demande.status} | Details: ${demande.details}`,
    );
    return { message: 'Demande ' + demande.titre + ' ajouter avec success' };
  }

  // Modifier demande
  @Transactional()
  async update(id: number, updateDemandeDto: UpdateDemandeDto) {
    const utilisateur = await this.utilisateursService.findOne(1);
    const demande = await this.demandesRepository.findOneBy({ id });
    if (!demande) {
      throw new NotFoundException(`Demande ${id} non trouvée`);
    }
    const ancienneValeur = `Titre: ${demande.titre} | Status: ${demande.status} | Details: ${demande.details}`;
    Object.assign(demande, updateDemandeDto);
    await this.demandesRepository.save(demande);
    await this.historiqueService.auditDemandes(
      id,
      utilisateur,
      'MODIFICATION',
      ancienneValeur,
      `Titre: ${updateDemandeDto.titre ?? demande.titre} | Status: ${updateDemandeDto.status ?? demande.status} | Details: ${updateDemandeDto.details ?? demande.details}`,
    );
    return { message: 'Demande ' + demande.titre + ' modifier avec success' };
  }

  // Supprimer demande (soft delete)
  @Transactional()
  async remove(id: number) {
    const utilisateur = await this.utilisateursService.findOne(1);
    const demande = await this.demandesRepository.findOneBy({ id });
    if (!demande) {
      throw new NotFoundException(`Demande ${id} non trouvée`);
    }
    const ancienne_valeur = String('Supprimer: ' + demande.supprimer);
    demande.supprimer = true;

    await this.demandesRepository.save(demande);
    await this.historiqueService.auditDemandes(
      id,
      utilisateur,
      'SUPPRESSION',
      ancienne_valeur,
      String('Supprimer: ' + true),
    );
    return { message: 'Demande ' + demande.titre + ' supprimee avec success' };
  }
}
