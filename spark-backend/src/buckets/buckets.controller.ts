import { Controller } from '@nestjs/common';
import { BucketsService } from './buckets.service';

@Controller('buckets')
export class BucketsController {
  constructor(private readonly bucketsService: BucketsService) {
    
  }
}
