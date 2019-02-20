import { ProtoWrapper } from "../lib-common/protoWrapper";
import { document } from "../lib-proto/document";
import IDocument = document.data.IDocument;
import { DocumentLineWrapper } from "./documentLineWrapper";

/**
 * Wrapper for the Document proto.
 */
class DocumentWrapper extends ProtoWrapper<IDocument> {
    private readonly _proto: IDocument;
    private readonly _documentLines: DocumentLineWrapper[];

    public constructor(proto: IDocument) {
        super();
        this._proto = proto;
        for (const documentLines of proto.lines) {
            this._documentLines.push(new DocumentLineWrapper(documentLines));
        }
    }

    public get proto(): IDocument {
        return this._proto;
    }

    public get documentId(): string {
        return this._proto.documentId;
    }

    public get documentLines(): DocumentLineWrapper[] {
        return this._documentLines;
    }
}

export { DocumentWrapper };
