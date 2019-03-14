import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentModule } from "../lib-document/document.module";
import { DocumentService } from "../lib-document/service/document.service";
import { DocumentController } from "./controllers/document.controller";
import { RootController } from "./controllers/root.controler";

@Module({
    imports: [TypeOrmModule.forRoot(), DocumentModule],
    controllers: [RootController, DocumentController],
    providers: [DocumentService],
})

export class ApplicationModule {}
