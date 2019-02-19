import { document } from "../lib-proto/document";
import IPositionIdentifier = document.data.IPositionIdentifier;
import { ProtoWrapper } from "../lib-common/protoWrapper";

class PositionIdentifierWrapper extends ProtoWrapper<IPositionIdentifier> {
    private _proto: IPositionIdentifier;

    public constructor(proto: IPositionIdentifier) {
        super();
        this._proto = proto;
    }

    public get proto(): IPositionIdentifier {
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
