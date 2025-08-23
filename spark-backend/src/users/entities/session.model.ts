export class Session {
    userId: string;
    createdAt: Date;
    validUntil: Date;

    constructor(userId: string, expirationDays: number){
        this.userId = userId;
        this.createdAt = new Date();
        this.validUntil = new Date(this.createdAt.getDay() + expirationDays);
    }
}