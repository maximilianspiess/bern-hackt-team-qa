import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Company} from "./company.entity";

@Entity()
export class Benefit {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    discount: number;

    @Column()
    expirationDate: Date;

    @Column()
    sparkPrice: number;

    @ManyToOne(() => Company)
    @JoinColumn({name: 'company_id'})
    company: Company;
}
