import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Benefit} from "../../benefits/entities/benefit.entity";

@Entity()
export class BenefitRedemption{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'userId'})
    user: User;

    @ManyToOne(() => Benefit)
    @JoinColumn({name: 'benefitId'})
    benefit: Benefit

    constructor(user: User, benefit: Benefit) {
        this.user = user;
        this.benefit = benefit;
    }
}