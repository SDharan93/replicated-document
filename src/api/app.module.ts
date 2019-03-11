import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentModule } from "../lib-document/document.module";

@Module({
    imports: [TypeOrmModule.forRoot(), DocumentModule]
})

export class ApplicationModule {}
