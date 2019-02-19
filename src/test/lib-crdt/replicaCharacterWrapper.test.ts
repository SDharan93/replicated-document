import { ReplicaCharacterWrapper } from "../../lib-crdt/replicaCharacterWrapper";
import { document } from "../../lib-proto/document";
import ReplicaCharacter = document.data.ReplicaCharacter;

describe("ReplicaCharacterWrapper", () => {
    let replicaCharacter: ReplicaCharacter;
    let subject: ReplicaCharacterWrapper;

    beforeEach(() => {
        replicaCharacter = ReplicaCharacter.create();
    });

    // This is just a simple test to make sure Jest is working.
    // TODO: Remove this test once we have real logic.
    test("should return value", () => {
        replicaCharacter.value = "A";
        subject = new ReplicaCharacterWrapper(replicaCharacter);

        const value: string = subject.value;

        expect(value).toEqual(replicaCharacter.value);
    });
});
