import { PositionIdentifierWrapper } from "../../lib-crdt/positionIdentifierWrapper";
import { document } from "../../lib-proto/document";
import PositionIdentifier = document.data.PositionIdentifier;

describe("PositionIdentifierWrapper", () => {
    let positionIdentifier: PositionIdentifier;
    let subject: PositionIdentifierWrapper;

    beforeEach(() => {
        positionIdentifier = PositionIdentifier.create();
    });

    // This is just a simple test to make sure Jest is working.
    // TODO: Remove this test once we have real logic.
    test("should return digit", () => {
        positionIdentifier.digit = 1;
        subject = new PositionIdentifierWrapper(positionIdentifier);

        const digit: number = subject.digit;

        expect(digit).toEqual(positionIdentifier.digit);
    });
});
