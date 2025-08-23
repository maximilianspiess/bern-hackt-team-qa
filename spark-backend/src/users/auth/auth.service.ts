import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {LoginRequestDto} from "../dto/login-request.dto";
import {SessionService} from "./session.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private sessionService: SessionService,
        private jwtService: JwtService
    ) {}

    async login(request: LoginRequestDto){
        let user = await this.userRepository.findOneBy({
            username: request.username
        });

        if (user == null){
            throw new NotFoundException(`User with username '${request.username}' not found`);
        }

        const passwordMatch = await bcrypt.compare(request.password, user.password)
        if (!passwordMatch){
            throw new BadRequestException("Incorrect password");
        }

        this.sessionService.removeSession(user.id);
        this.sessionService.createSession(user.id);
        const payload = {sub: user.id, username: user.username};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}