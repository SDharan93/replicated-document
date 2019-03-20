import { Controller, Get, Render } from "@nestjs/common";

/**
 * This controller is responsible for handling traffic that is pointing at the root endpoint. This controller should
 * only handler a GET request to the "/" endpoint.
 */
@Controller()
export class AppController {
    public constructor() {
    }

    @Get()
    @Render("index.html")
    public root(): void {
    }
}
