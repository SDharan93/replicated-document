import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ApplicationModules } from "./app.module";

const port: number = 3000;

async function bootstrap(): Promise<void>{
    const app: INestApplication = await NestFactory.create(ApplicationModules);
    await app.listen(port);
}
bootstrap();
