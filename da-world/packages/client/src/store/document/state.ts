import { DocumentWrapper } from "@replicated-doc/lib-common/dist/src/crdt/documentWrapper";
import SimpleMDE from "simplemde";

export interface IDocumentState {
    documentData?: DocumentWrapper;
    documentText?: string;
    editor?: SimpleMDE;
    error: boolean;
}
