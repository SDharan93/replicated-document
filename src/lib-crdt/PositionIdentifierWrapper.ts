import { ProtoWrapper } from "../lib-common/protoWrapper";
import { document } from "../lib-proto/document";
import PositionIdentifier = document.data.PositionIdentifier;

class PositionIdentifierWrapper extends ProtoWrapper<PositionIdentifier> {
    private proto: PositionIdentifier;

    public constructor(proto: PositionIdentifier) {
        super();
        this.proto = proto;
    }

    public getProto(): document.data.PositionIdentifier {
        return this.proto;
    }

    public getSiteId(): string {
        return this.proto.siteId;
    }

    public getDigit(): number {
        return this.proto.digit;
    }
}

export { PositionIdentifierWrapper };
