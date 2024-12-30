import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/entities/contensterdb/user.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Establishment) private establishmentRepo: Repository<Establishment>,
  ) {}
}
