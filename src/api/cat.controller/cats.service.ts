import { Injectable } from "@nestjs/common";

@Injectable()
export class CatsService {
    public getHello(): string {
        return "Hello World!";
    }
}
