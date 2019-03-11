import { DocumentWrapper } from "../../../lib-crdt/documentWrapper";
import { DocumentEntity } from "../../../lib-document/entity/document.entity";
import { document } from "../../../lib-proto/document";
import Document = document.data.Document;
import PositionIdentifier = document.data.PositionIdentifier;
import ReplicaCharacter = document.data.ReplicaCharacter;

describe("DocumentEntity", () => {
    let document: Document;
    let subject: DocumentEntity;
    let characters: ReplicaCharacter[];

    beforeEach(() => {
        characters = [
            ReplicaCharacter.create({
                positions: [
                    PositionIdentifier.create({digit: 0, siteId: "b67d409a"})
                ]
            }),
            ReplicaCharacter.create({
                positions: [
                    PositionIdentifier.create({digit: 1, siteId: "b67d409a"})
                ]
            })
        ];

        document = Document.create({
            documentId: "1",
            characters: characters
        });

        subject = new DocumentEntity();
    });

    describe("Getting Document Wrapper", () => {
        test("should parse valid json into document wrapper", () => {
            // Although this test looks extremely redundant, we are testing to make sure that we can correctly convert
            // between the document wrapper to string and back to document wrapper. Since this is the backbone of the
            // document storage, we need to make sure this works.
            const expectedDocument: DocumentWrapper = new DocumentWrapper(document);
            subject.document = expectedDocument;

            const actualDocument: DocumentWrapper = subject.document;

            expect(actualDocument).toEqual(expectedDocument);
        });

        test("should return undefined with no json string", () => {
            const actualDocument: DocumentWrapper = subject.document;

            expect(actualDocument).toEqual(undefined);
        });

        test("should return undefined with invalid json", () => {
            // Set the documentJson to be an invalid json string. This test is unlikely to occur from code, however we
            // should handle an issue with data integrity.
            subject.documentJson = "{ this is invalid";

            const actualDocument: DocumentWrapper = subject.document;

            expect(actualDocument).toEqual(undefined);
        });
    });
});
