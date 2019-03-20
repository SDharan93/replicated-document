import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DocumentEntity } from "../entity/document.entity";

@Injectable()
export class DocumentService {
    public constructor(
        @InjectRepository(DocumentEntity) private readonly documentRepository: Repository<DocumentEntity>) {

    }

    public async findAll(): Promise<DocumentEntity[]> {
        return await this.documentRepository.find();
    }

    public async findById(documentId: string): Promise<DocumentEntity> {
        return await this.documentRepository.findOne(documentId);
    }
}
