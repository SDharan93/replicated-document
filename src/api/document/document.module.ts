import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentController } from "./controller/document.controller";
import { DocumentEntity } from "./entity/document.entity";
import { DocumentService } from "./service/document.service";

@Module({
    imports: [TypeOrmModule.forFeature([DocumentEntity])],
    controllers: [DocumentController],
    providers: [DocumentService],
})

export class DocumentModule {}
