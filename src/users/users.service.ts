import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUser } from '../models/createUser.dto';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { UserRepeatedException } from 'src/exceptions/user-repeated.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async addNewUser(user: CreateUser): Promise<User> {
    try {
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    } catch (err) {
      if (err.code == 'ER_DUP_ENTRY') throw new UserRepeatedException();
    }
  }
}
