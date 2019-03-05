/**
 * Used as a common logging wrapper to create an easy integration for all files. By creating a common logger class
 * we can swap out the transports and underlying logger classes without effecting the other classes.
 */
import { createLogger } from "bunyan";
import Logger = require("bunyan");

class Log {
    private readonly _logger: Logger;

    // filename is passed in so it can be referenced in all the logs.
    public constructor(className: string) {

        this._logger = createLogger({
            name: className,
            stream: process.stdout,
            level: Logger.DEBUG
        });
    }

    public debug(message: string): void {
        this._logger.debug(message);
    }

    public info(message: string): void {
        this._logger.info(message);
    }

    public warn(message: string, error?: Error): void {
        if (error) {
            this._logger.warn(error, message);
        } else {
            this._logger.warn(message);
        }
    }

    public error(message: string, error: Error): void {
        this._logger.error(error, message);
    }
}

export { Log };
