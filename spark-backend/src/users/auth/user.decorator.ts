import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {UserPayload} from "./user-payload.model";

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): UserPayload => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);