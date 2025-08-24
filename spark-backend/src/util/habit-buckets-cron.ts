import {Injectable} from "@nestjs/common";
import {Cron, CronExpression} from "@nestjs/schedule";
import {BucketsService} from "../buckets/buckets.service";

@Injectable()
export class HabitBucketCronJob {
    constructor(private bucketService: BucketsService) {
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleHabitBuckets() {
        await this.bucketService.createHabitBuckets();
        console.log("HabitBuckets created successfully.");
    }
}