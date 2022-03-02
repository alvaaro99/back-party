import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUser } from 'src/models/createUser.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .send(await this.authService.login((req as any).user));
  }

  @Post('register')
  async register(@Body() user: CreateUser, @Res() res: Response) {
    const newUser = await this.userService.addNewUser(user);
    return res
      .status(HttpStatus.CREATED)
      .send(await this.authService.login(newUser));
  }

  @UseGuards(JwtAuthGuard)
  @Get('logged')
  getIfUserIsLogged(@Res() res: Response) {
    return res.status(HttpStatus.OK).send();
  }
}
