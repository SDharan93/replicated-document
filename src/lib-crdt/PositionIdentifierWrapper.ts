import { ProtoWrapper } from "../lib-common/protoWrapper";
import { document } from "../lib-proto/document";
import PositionIdentifier = document.data.PositionIdentifier;

class PositionIdentifierWrapper extends ProtoWrapper<PositionIdentifier> {
    private _proto: PositionIdentifier;

    public constructor(proto: PositionIdentifier) {
        super();
        this._proto = proto;
    }

    public get proto(): document.data.PositionIdentifier {
        return this._proto;
    }

    public get siteId(): string {
        return this._proto.siteId;
    }

    public get digit(): number {
        return this._proto.digit;
    }
}

export { PositionIdentifierWrapper };
