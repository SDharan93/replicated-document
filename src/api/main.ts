import { INestApplication, INestExpressApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { join } from "path";
import { ApplicationModule } from "./app.module";

async function bootstrap(): Promise<void> {
    const app: INestApplication & INestExpressApplication = await NestFactory.create(ApplicationModule);

    app.useStaticAssets(join(__dirname, "../", "client/"));

    await app.listen(5000);
}

bootstrap();
