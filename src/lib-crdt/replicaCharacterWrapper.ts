import { ProtoWrapper } from "../lib-common/protoWrapper";
import { document } from "../lib-proto/document";
import { PositionIdentifierWrapper } from "./positionIdentifierWrapper";
import IReplicaCharacter = document.data.IReplicaCharacter;

class ReplicaCharacterWrapper extends ProtoWrapper<IReplicaCharacter> {
    private _proto: IReplicaCharacter;
    private _positionIdentifiers: PositionIdentifierWrapper[];

    public constructor(proto: IReplicaCharacter) {
        super();
        this._proto = proto;
        for (const positionIdentifier of proto.positions) {
            this._positionIdentifiers.push(new PositionIdentifierWrapper(positionIdentifier));
        }
    }

    public get proto(): IReplicaCharacter {
        return this._proto;
    }

    public get value(): string {
        return this._proto.value;
    }

    public get vectorClock(): number {
        return this._proto.vectorClock;
    }

    public get positionIdentifiers(): PositionIdentifierWrapper[] {
        return this._positionIdentifiers;
    }
}

export { ReplicaCharacterWrapper };
