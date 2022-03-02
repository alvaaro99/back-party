import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.entity';
import { userLogin } from '../models/userLogin.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userToLogin: userLogin): Promise<User> {
    const user = await this.usersService.findByEmail(userToLogin.email);
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
