import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Goal} from "../../goals/entities/goal.entity";


export enum MediaType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
}

@Entity()
export class Post {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column({
        type: "enum",
        enum: MediaType
    })
    mediaType: MediaType;

    @Column({nullable: true})
    imageMedia?: string;

    @Column({nullable: true})
    videoMedia?: string;

    @OneToOne(() => User)
    User: User;

    @Column()
    date: Date;

    @ManyToOne(() => Goal)
    Goal: Goal;

    @Column({default: 0})
    rewardedSparks: number;

    @Column({default: 0})
    likes: number;


    constructor(
        title?: string,
        imageMedia?: string,
        videoMedia?: string,
        user?: User,
        goal?: Goal,
    ) {
        if (title) this.title = title;
        if (user) this.User = user;
        if (goal) this.Goal = goal;
        this.imageMedia = imageMedia || undefined;
        this.videoMedia = videoMedia || undefined;

        if (imageMedia && !videoMedia) this.mediaType = MediaType.IMAGE;
        else if (videoMedia && !imageMedia) this.mediaType = MediaType.VIDEO;
        else if (imageMedia && videoMedia) this.mediaType = MediaType.IMAGE;
        this.date = new Date();
    }
}
