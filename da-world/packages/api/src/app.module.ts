import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controler";
import { Config } from "./config";
import { DocumentModule } from "./document/document.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(new Config().getTypeOrmConfig()),
        DocumentModule],
    controllers: [
        AppController
    ],
})

export class ApplicationModule {}
