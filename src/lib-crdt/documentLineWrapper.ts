import { ProtoWrapper } from "../lib-common/protoWrapper";
import { document } from "../lib-proto/document";
import IDocumentLine = document.data.IDocumentLine;
import { ReplicaCharacterWrapper } from "./replicaCharacterWrapper";

/**
 * Wrapper for the DocumentLine proto.
 */
class DocumentLineWrapper extends ProtoWrapper<IDocumentLine> {
    private readonly _proto: IDocumentLine;
    private readonly _replicaCharacters: ReplicaCharacterWrapper[];

    public constructor(proto: IDocumentLine) {
        super();
        this._proto = proto;
        for (const replicaCharacter of proto.characters) {
            this._replicaCharacters.push(new ReplicaCharacterWrapper(replicaCharacter));
        }
    }

    public get proto(): IDocumentLine {
        return this._proto;
    }

    public get replicaCharacters(): ReplicaCharacterWrapper[] {
        return this._replicaCharacters;
    }
}

export { DocumentLineWrapper };
