import { Controller, Get } from "@nestjs/common";
import { CatsService } from "./cats.service";

@Controller()
export class CatsController {
    private service: CatsService;
    public constructor(private readonly catsService: CatsService) {
        this.service = this.catsService;
    }

    @Get()
    public getHello(): string {
        return this.service.getHello();
    }
}
