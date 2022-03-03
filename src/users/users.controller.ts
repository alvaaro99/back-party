import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../models/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async myUser(@Req() req: Request, @Res() res: Response) {
    const { password, ...user } = await this.userService.findByEmail(
      (req.user as User).email,
    );
    return res.status(HttpStatus.OK).json(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('changePassword')
  async changePassword(
    @Req() req: Request,
    @Res() res: Response,
    @Body()
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
  ) {
    const userModified = await this.userService.changePassword(
      req.user as User,
      oldPassword,
      newPassword,
    );
    return res.status(HttpStatus.OK).json(userModified);
  }
}
