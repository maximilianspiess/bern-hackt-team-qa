import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import * as process from "node:process";
import {JwtStrategy} from "./auth/jwt.strategy";
import {AuthService} from "./auth/auth.service";
import {SessionService} from "./auth/session.service";

@Module({
  imports: [
      TypeOrmModule.forFeature([User]),
      PassportModule,
      JwtModule.register({
          secret: process.env.JWT_SECRET || 'test',
          signOptions: { expiresIn: '1440'}
      })
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, AuthService, SessionService],
})
export class UsersModule {}
