import { INestApplication, INestExpressApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { join } from "path";
import { ApplicationModule } from "./app.module";
import { Config } from "./config";

async function bootstrap(): Promise<void> {
    const config: Config = new Config();
    const app: INestApplication & INestExpressApplication = await NestFactory.create(ApplicationModule);

    app.useStaticAssets(join(__dirname, "../node_modules", "@replicated-doc/client/dist/"));
    app.setGlobalPrefix("api");

    if (config.isCorsEnabled()) {
        app.enableCors();
    }

    const port: string = process.env.PORT || "5000";
    await app.listen(port);
}

bootstrap();
