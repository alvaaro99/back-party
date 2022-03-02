import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/models/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async myUser(@Req() req: Request, @Res() res: Response) {
    const { password, ...user } = this.userService.findByEmail(
      (req.user as User).email,
    );
    res.status(HttpStatus.OK).json(user);
  }
}
