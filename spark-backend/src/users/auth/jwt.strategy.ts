import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {UserPayload} from "./user-payload.model";
import * as process from "node:process";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name)

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')!,
        });
    }

    async validate(payload: any) {
        // this is attached to req.user
        this.logger.log("Validating JWT.")

        let user = await this.userRepository.findOneBy({
            id: payload.sub
        })

        if (user == null){
            throw new UnauthorizedException("User does not exist.");
        }

        return new UserPayload(payload.sub, payload.username);
    }
}
