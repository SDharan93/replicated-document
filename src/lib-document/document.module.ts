import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentEntity } from "./entity/document.entity";
import { DocumentService } from "./service/document.service";

@Module({
    imports: [TypeOrmModule.forFeature([DocumentEntity])],
    providers: [DocumentService],
})

export class DocumentModule {}
