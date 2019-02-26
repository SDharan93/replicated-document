import { Module } from "@nestjs/common";
import { CatsController } from "./cat.controller/cats.controller";
import { CatsService } from "./cat.controller/cats.service";

@Module({
    imports: [],
    controllers: [CatsController],
    providers: [CatsService],
})
export class ApplicationModules {}
