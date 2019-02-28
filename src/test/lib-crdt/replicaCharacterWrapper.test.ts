import { ReplicaCharacterWrapper } from "../../lib-crdt/replicaCharacterWrapper";
import { document } from "../../lib-proto/document";
import ReplicaCharacter = document.data.ReplicaCharacter;
import PositionIdentifier = document.data.PositionIdentifier;

describe("ReplicaCharacterWrapper", () => {
    let replicaCharacter: ReplicaCharacter;
    let subject: ReplicaCharacterWrapper;

    beforeEach(() => {
        replicaCharacter = ReplicaCharacter.create();
    });

    describe("compare", () => {
        let comparable: ReplicaCharacter;

        beforeEach(() => {
            comparable = ReplicaCharacter.create();
        });

        test("should be greater than with no prefix", () => {
            replicaCharacter.positions = [
                PositionIdentifier.create({digit: 2})
            ];
            comparable.positions = [
                PositionIdentifier.create({digit: 1})
            ];
            subject = new ReplicaCharacterWrapper(replicaCharacter);

            const digit: number = subject.compare(new ReplicaCharacterWrapper(comparable));

            expect(digit).toEqual(1);
        });

        test("should be less than with no prefix", () => {
            replicaCharacter.positions = [
                PositionIdentifier.create({digit: 1})
            ];
            comparable.positions = [
                PositionIdentifier.create({digit: 2})
            ];
            subject = new ReplicaCharacterWrapper(replicaCharacter);

            const digit: number = subject.compare(new ReplicaCharacterWrapper(comparable));

            expect(digit).toEqual(-1);
        });

        test("should be greater than with common prefix", () => {
            replicaCharacter.positions = [
                PositionIdentifier.create({digit: 1}),
                PositionIdentifier.create({digit: 2}),
                PositionIdentifier.create({digit: 3})
            ];
            comparable.positions = [
                PositionIdentifier.create({digit: 1}),
                PositionIdentifier.create({digit: 2})
            ];
            subject = new ReplicaCharacterWrapper(replicaCharacter);

            const digit: number = subject.compare(new ReplicaCharacterWrapper(comparable));

            expect(digit).toEqual(1);
        });

        test("should be less than with common prefix", () => {
            replicaCharacter.positions = [
                PositionIdentifier.create({digit: 1}),
                PositionIdentifier.create({digit: 2})
            ];
            comparable.positions = [
                PositionIdentifier.create({digit: 1}),
                PositionIdentifier.create({digit: 2}),
                PositionIdentifier.create({digit: 3})
            ];
            subject = new ReplicaCharacterWrapper(replicaCharacter);

            const digit: number = subject.compare(new ReplicaCharacterWrapper(comparable));

            expect(digit).toEqual(-1);
        });

        test("should be greater than with higher siteId", () => {
            replicaCharacter.positions = [
                PositionIdentifier.create({digit: 1, siteId: "b77d409a"})
            ];
            comparable.positions = [
                PositionIdentifier.create({digit: 1, siteId: "b67d409a"})
            ];
            subject = new ReplicaCharacterWrapper(replicaCharacter);

            const digit: number = subject.compare(new ReplicaCharacterWrapper(comparable));

            expect(digit).toEqual(1);
        });

        test("should be less than with lower siteId", () => {
            replicaCharacter.positions = [
                PositionIdentifier.create({digit: 1, siteId: "b67d409a"})
            ];
            comparable.positions = [
                PositionIdentifier.create({digit: 1, siteId: "b77d409a"})
            ];
            subject = new ReplicaCharacterWrapper(replicaCharacter);

            const digit: number = subject.compare(new ReplicaCharacterWrapper(comparable));

            expect(digit).toEqual(-1);
        });

        test("should be equal", () => {
            replicaCharacter.positions = [
                PositionIdentifier.create({digit: 1, siteId: "b77d409a"})
            ];
            comparable.positions = [
                PositionIdentifier.create({digit: 1, siteId: "b77d409a"})
            ];
            subject = new ReplicaCharacterWrapper(replicaCharacter);

            const digit: number = subject.compare(new ReplicaCharacterWrapper(comparable));

            expect(digit).toEqual(0);
        });
    });
});
