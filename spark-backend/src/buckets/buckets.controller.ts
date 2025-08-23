import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { BucketsService } from './buckets.service';
import {JwtAuthGuard} from "../users/auth/jwt-auth.guard";
import {CurrentUser} from "../users/auth/user.decorator";
import {UserPayload} from "../users/auth/user-payload.model";
import {CreateFriendBucketDto} from "./dto/create-friend-bucket.dto";
import {AddToFriendBucketDto} from "./dto/add-to-friend-bucket.dto";

@Controller('buckets')
export class BucketsController {
  constructor(private readonly bucketsService: BucketsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('friends/me')
  public getCurrentUserFriendBuckets(@CurrentUser() user: UserPayload){
    return this.bucketsService.getCurrentUserFriendBuckets(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('habit/me')
  public getCurrentUserHabitBuckets(@CurrentUser() user: UserPayload){
    return this.bucketsService.getCurrentUserHabitBuckets(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('friends')
  public createNewFriendsBucket(@Body() createDto: CreateFriendBucketDto, @CurrentUser() user: UserPayload){
    return this.bucketsService.createFriendBucket(createDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('friends/add')
  public addUserToFriendsBucket(@Body() addDto: AddToFriendBucketDto, @CurrentUser() user: UserPayload){
    return this.bucketsService.addUserToFriendBucket(addDto, user.id);
  }
}
