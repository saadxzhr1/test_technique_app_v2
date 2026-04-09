import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateurs } from './entities/utilisateurs.entity';

@Injectable()
export class UtilisateursService {
  constructor(
    @InjectRepository(Utilisateurs)
    private usersRepository: Repository<Utilisateurs>,
  ) {}

  async findOne(id: number): Promise<Utilisateurs> {
    const utilisateur = await this.usersRepository.findOneBy({ id });
    if (!utilisateur)
      throw new NotFoundException(`Utilisateur ${id} non trouvé`);
    return utilisateur;
  }
}
