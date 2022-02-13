import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user';
import { userLogin } from 'src/models/userLogin.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(userToLogin: userLogin): User {
    const user = this.usersService.findByEmail(userToLogin.email);
    if (user && user.password === userToLogin.password) {
      const { password, ...userWithoutPass } = user;
      return userWithoutPass;
    }
    return null;
  }

  async login(user: User) {
    const payload = { name: user.name, id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
