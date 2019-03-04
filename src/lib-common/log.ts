import { createLogger, format, Logger, LoggerOptions, transports } from "winston";

/**
 * Used as a common logging wrapper to create an easy integration for all files. By creating a common logger class
 * we can swap out the transports and underlying logger classes without effecting the other classes.
 */
class Log {
    private readonly _logger: Logger;

    // filename is passed in so it can be referenced in all the logs.
    public constructor(fileName: string) {
        const options: LoggerOptions = {
            defaultMeta: {file: fileName},
            format: format.combine(
                format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss"
                }),
                format.prettyPrint(),
                format.json()
            ),
            // TODO: Control the log level via a config.
            level: "debug",
            transports: [
                new transports.Console()
            ]
        };

        this._logger = createLogger(options);
    }

    public get logger(): Logger {
        return this._logger;
    }
}

export { Log };
