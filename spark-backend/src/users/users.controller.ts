import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {LoginRequestDto} from "./dto/login-request.dto";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {CurrentUser} from "./auth/user.decorator";
import {UserPayload} from "./auth/user-payload.model";

@Controller('users')
export class UsersController {
  constructor(
      private readonly usersService: UsersService,
      private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginRequest: LoginRequestDto) {
    return this.authService.login(loginRequest);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUser(@CurrentUser() user: UserPayload){
    return this.usersService.findCurrent(user);
  }

  // TODO: consider this use case, remove if necessary
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return this.usersService.findOne(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
