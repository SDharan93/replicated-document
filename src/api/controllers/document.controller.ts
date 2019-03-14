import { Controller, Get } from "@nestjs/common";
import { DocumentService } from "../../lib-document/service/document.service";

/**
 * This controller is responsible for handling all traffic that is pointing to the document endpoints.
 */
@Controller("document")
export class DocumentController {
    // @ts-ignore
    public constructor(private readonly documentService: DocumentService) {

    }

    @Get()
    public async findAll(): Promise<string> {
        return "this is working";
    }
}
