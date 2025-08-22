import { PartialType } from '@nestjs/mapped-types';
import { CreateSparkAccountDto } from './create-spark-account.dto';

export class UpdateSparkAccountDto extends PartialType(CreateSparkAccountDto) {}
