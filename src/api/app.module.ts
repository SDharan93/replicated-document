import { Module } from "@nestjs/common";
import { CatsController } from "./controllers/cats.controller";
import { CatsService } from "./controllers/cats.service";

@Module({
    imports: [],
    controllers: [CatsController],
    providers: [CatsService],
})
export class ApplicationModules {}
