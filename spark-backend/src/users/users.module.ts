import {Logger, Module} from '@nestjs/common';
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
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
      TypeOrmModule.forFeature([User]),
      PassportModule,
      JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => ({
              secret: config.get<string>('JWT_SECRET'),
              signOptions: { expiresIn: '1440m'}
          }),
      }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, AuthService, SessionService],
})
export class UsersModule {}
