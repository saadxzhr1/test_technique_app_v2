import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDemandeDto } from './dto/createDemande.dto';
import { UpdateDemandeDto } from './dto/updateDemande.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Demandes } from './entities/demande.entity';
import { DemandesResponseDto } from './dto/demandesResponse.dto';
import { HistoriqueService } from 'src/historique/historique.service';

@Injectable()
export class DemandesService {
  utilisateur: string = 'testUser';

  // Injecter le repository
  constructor(
    @InjectRepository(Demandes)
    private demandesRepository: Repository<Demandes>,
    private historiqueService: HistoriqueService,
    private dataSource: DataSource,
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
  async create(createDemandeDto: CreateDemandeDto) {
    const demande = this.demandesRepository.create({
      ...createDemandeDto,
      supprimer: false,
    });
    await this.demandesRepository.save(demande);
    await this.historiqueService.auditDemandes(
      demande.id,
      this.utilisateur,
      'CREATION',
      '_',
      `Titre: ${demande.titre} | Status: ${demande.status} | Details: ${demande.details}`,
    );
    return { message: 'Demande ' + demande.titre + ' ajouter avec success' };
  }

  // Modifier demande
  async update(id: number, updateDemandeDto: UpdateDemandeDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const demande = await queryRunner.manager.findOneBy(Demandes, { id });
      if (!demande) {
        throw new NotFoundException(`Demande ${id} non trouvée`);
      }
      const ancienneValeur = `Titre: ${demande.titre} | Status: ${demande.status} | Details: ${demande.details}`;
      Object.assign(demande, updateDemandeDto);
      await queryRunner.manager.save(demande);
      await this.historiqueService.auditDemandes(
        id,
        this.utilisateur,
        'MODIFICATION',
        ancienneValeur,
        `Titre: ${updateDemandeDto.titre ?? demande.titre} | Status: ${updateDemandeDto.status ?? demande.status} | Details: ${updateDemandeDto.details ?? demande.details}`,
      );

      await queryRunner.commitTransaction();
      return { message: 'Demande ' + demande.titre + ' modifier avec success' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // Supprimer demande (soft delete)
  async remove(id: number) {
    const demande = await this.demandesRepository.findOneBy({ id });
    if (!demande) {
      throw new NotFoundException(`Demande ${id} non trouvée`);
    }
    const ancienne_valeur = String('Supprimer: ' + demande.supprimer);
    demande.supprimer = true;

    await this.demandesRepository.save(demande);
    await this.historiqueService.auditDemandes(
      id,
      this.utilisateur,
      'SUPPRESSION',
      ancienne_valeur,
      String('Supprimer: ' + true),
    );
    return { message: 'Demande ' + demande.titre + ' supprimee avec success' };
  }
}
