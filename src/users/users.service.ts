import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user';

@Injectable()
export class UsersService {
  private temporalUsers: User[] = [
    { id: '1asd12e', email: 'aaa@aaa.com', name: 'Aaaa', password: 'aaa' },
  ];

  findByEmail(email: string): User {
    return this.temporalUsers.find(
      (temporalUser) => temporalUser.email === email,
    );
  }
}
