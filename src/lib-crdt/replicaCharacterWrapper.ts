import { ProtoWrapper } from "../lib-common/protoWrapper";
import { document } from "../lib-proto/document";
import { PositionIdentifierWrapper } from "./positionIdentifierWrapper";
import IReplicaCharacter = document.data.IReplicaCharacter;

/**
 * Wrapper for the ReplicaCharacter proto.
 */
class ReplicaCharacterWrapper extends ProtoWrapper<IReplicaCharacter> {
    private readonly _proto: IReplicaCharacter;
    private readonly _positionIdentifiers: PositionIdentifierWrapper[];

    public constructor(proto: IReplicaCharacter) {
        super();
        this._proto = proto;

        this._positionIdentifiers = [];
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

    /**
     * Compares to another replica character.
     * @param {ReplicaCharacterWrapper} comparable: The character that will be compared.
     * @return {number} 1 if the comparable object is smaller, -1 if the comparable object is bigger and 0 if equal.
     */
    public compare(comparable: ReplicaCharacterWrapper): number {
        const p1: PositionIdentifierWrapper[] = this._positionIdentifiers;
        const p2: PositionIdentifierWrapper[] = comparable.positionIdentifiers;
        const commonPrefixLength: number = Math.min(p1.length, p2.length);

        // Compare position from head to tail. If there is a difference in value, we can perform the comparison. If
        // there is no comparison made at the end of the loop, the two characters share the same prefix.
        for (let i: number = 0; i < commonPrefixLength; i++) {
            if (p1[i].digit > p2[i].digit) {
                return 1;
            } else if (p1[i].digit < p2[i].digit) {
                return -1;
            }
        }

        // If both characters share a common prefix. check if a value is greater by comparing the length of the
        // positions. Example ([1.5.1] > [1.5])
        if (p1.length > p2.length) {
            return 1;
        } else if (p1.length < p2.length) {
            return -1;
        }

        // Compare siteIds as a fallback comparison.
        const maxIndex: number = commonPrefixLength - 1;
        if (p1[maxIndex].siteId > p2[maxIndex].siteId) {
            return 1;
        } else if (p1[maxIndex].siteId < p2[maxIndex].siteId) {
            return -1;
        }

        // It is not possible to distinguish between both characters, assume they are equal.
        return 0;
    }
}

export { ReplicaCharacterWrapper };
