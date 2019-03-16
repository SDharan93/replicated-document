import { TypeOrmModuleOptions } from "@nestjs/typeorm";

/**
 * Configuration class for the API. This class will create configuration for all services. To take full advantage
 * of this file, please enter your environment variables through the .env file.
 */
class Config {

    public constructor() {
        // Load all environment variables for the project. If this file does not exist within your root folder, we will
        // rely on the environment variables set on the machine.
        require("dotenv").config();
    }

    /**
     * Gets the type orm configuration.
     */
    public getTypeOrmConfig(): TypeOrmModuleOptions {
        // Only enable logging and sync in development environment.
        const logging: boolean = (process.env.NODE_ENV === "development");
        const synchronize: boolean = (process.env.NODE_ENV === "development");

        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: ["dist/**/**.entity.js"],
            logging: logging,
            synchronize: synchronize
        };
    }
}

export { Config };
