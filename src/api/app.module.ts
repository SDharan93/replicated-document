import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controler";
import { DocumentModule } from "./document/document.module";

@Module({
    imports: [TypeOrmModule.forRoot(), DocumentModule],
    controllers: [AppController],
})

export class ApplicationModule {}
