import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(ApplicationModule);
    await app.listen(3000);
}

bootstrap();
