import {
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
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .send(await this.authService.login((req as any).user));
  }

  @UseGuards(JwtAuthGuard)
  @Get('logged')
  getIfUserIsLogged(@Res() res: Response) {
    return res.status(HttpStatus.OK).send();
  }
}
