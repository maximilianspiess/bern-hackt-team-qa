import {Injectable, Scope} from "@nestjs/common";
import {Session} from "../entities/session.model";

@Injectable({scope: Scope.DEFAULT})
export class SessionService{
    inMemorySessionCache: Session[] = [];

    createSession(userId: string) {
        if (this.inMemorySessionCache.some(s => s.userId = userId)) {
            // session already exists for this user
            return;
        }

        let session = new Session(userId, 1);
        this.inMemorySessionCache.push(session);
    }

    findSession(userId: string){
        return this.inMemorySessionCache.find(s => s.userId = userId);
    }

    hasValidSession(userId: string){
        let session =  this.findSession(userId);

        if (session == undefined){
            return false;
        }

        return session.validUntil.getTime() > Date.now();
    }

    removeSession(userId: string){
        this.inMemorySessionCache = this.inMemorySessionCache.filter(s => s.userId != userId);
    }
}