import { DocumentWrapper } from "../../lib-crdt/documentWrapper";
import { ReplicaCharacterWrapper } from "../../lib-crdt/replicaCharacterWrapper";
import { document } from "../../lib-proto/document";
import Document = document.data.Document;
import PositionIdentifier = document.data.PositionIdentifier;
import ReplicaCharacter = document.data.ReplicaCharacter;

describe("DocumentWrapper", () => {
    let document: Document;
    let subject: DocumentWrapper;
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
            }),
            ReplicaCharacter.create({
                positions: [
                    PositionIdentifier.create({digit: 2, siteId: "b67d409a"})
                ]
            }),
            ReplicaCharacter.create({
                positions: [
                    PositionIdentifier.create({digit: 3, siteId: "b67d409a"})
                ]
            }),
            ReplicaCharacter.create({
                positions: [
                    PositionIdentifier.create({digit: 4, siteId: "b67d409a"})
                ]
            })
        ];
    });

    describe("deleteCharacter", () => {
        beforeEach(() => {
            document = Document.create({
                documentId: "1",
                characters: characters
            });
        });

        test("should delete middle character", () => {
            const removedChar: ReplicaCharacterWrapper = new ReplicaCharacterWrapper(characters[2]);
            subject = new DocumentWrapper(document);

            const success: boolean = subject.deleteCharacter(removedChar);

            expect(success).toEqual(true);
            expect(subject.replicaCharacters.length).toEqual(4);
            expect(subject.replicaCharacters).not.toContain(removedChar);
        });

        test("should delete first character", () => {
            const removedChar: ReplicaCharacterWrapper = new ReplicaCharacterWrapper(characters[0]);
            subject = new DocumentWrapper(document);

            const success: boolean = subject.deleteCharacter(removedChar);

            expect(success).toEqual(true);
            expect(subject.replicaCharacters).toHaveLength(4);
            expect(subject.replicaCharacters).not.toContain(removedChar);
        });

        test("should delete last character", () => {
            const lastCharIndex: number = characters.length - 1;
            const removedChar: ReplicaCharacterWrapper = new ReplicaCharacterWrapper(characters[lastCharIndex]);
            subject = new DocumentWrapper(document);

            const success: boolean = subject.deleteCharacter(removedChar);

            expect(success).toEqual(true);
            expect(subject.replicaCharacters).toHaveLength(4);
            expect(subject.replicaCharacters).not.toContain(removedChar);
        });

        test("should report unsuccessful when large character is not found", () => {
            const nonExistingChar: ReplicaCharacter = ReplicaCharacter.create({
                positions: [
                    PositionIdentifier.create({digit: 100, siteId: "b67d409a"})
                ]
            });
            const removedChar: ReplicaCharacterWrapper = new ReplicaCharacterWrapper(nonExistingChar);
            subject = new DocumentWrapper(document);

            const success: boolean = subject.deleteCharacter(removedChar);

            expect(success).toEqual(false);
            expect(subject.replicaCharacters).toHaveLength(5);
        });

        test("should report unsuccessful when small character is not found", () => {
            const nonExistingChar: ReplicaCharacter = ReplicaCharacter.create({
                positions: [
                    PositionIdentifier.create({digit: -1, siteId: "b67d409a"})
                ]
            });
            const removedChar: ReplicaCharacterWrapper = new ReplicaCharacterWrapper(nonExistingChar);
            subject = new DocumentWrapper(document);

            const success: boolean = subject.deleteCharacter(removedChar);

            expect(success).toEqual(false);
            expect(subject.replicaCharacters).toHaveLength(5);
        });
    });

    describe("insertCharacter", () => {
        beforeEach(() => {
            document = Document.create({
                documentId: "1",
                characters: characters
            });
        });

        test("should insert character to head of document", () => {
            const insertCharacter: ReplicaCharacterWrapper = new ReplicaCharacterWrapper(ReplicaCharacter.create({
                positions: [
                    PositionIdentifier.create({digit: -1, siteId: "b67d409a"})
                ]
            }));
            subject = new DocumentWrapper(document);

            const success: boolean = subject.insertCharacter(insertCharacter);

            expect(success).toEqual(true);
            expect(subject.replicaCharacters).toHaveLength(characters.length + 1);
            expect(subject.replicaCharacters[0]).toEqual(insertCharacter);
        });

        test("should insert character to tail of document", () => {
            const insertCharacter: ReplicaCharacterWrapper = new ReplicaCharacterWrapper(ReplicaCharacter.create({
                positions: [
                    PositionIdentifier.create({digit: 100, siteId: "b67d409a"})
                ]
            }));
            subject = new DocumentWrapper(document);

            const success: boolean = subject.insertCharacter(insertCharacter);

            expect(success).toEqual(true);
            expect(subject.replicaCharacters).toHaveLength(characters.length + 1);
            expect(subject.replicaCharacters[5]).toEqual(insertCharacter);
        });

        test("should insert character to midde of document", () => {
            const insertCharacter: ReplicaCharacterWrapper = new ReplicaCharacterWrapper(ReplicaCharacter.create({
                positions: [
                    PositionIdentifier.create({digit: 3, siteId: "b67d409a"}),
                    PositionIdentifier.create({digit: 5, siteId: "b67d409a"})
                ]
            }));
            subject = new DocumentWrapper(document);

            const success: boolean = subject.insertCharacter(insertCharacter);

            expect(success).toEqual(true);
            expect(subject.replicaCharacters).toHaveLength(characters.length + 1);
            expect(subject.replicaCharacters[4]).toEqual(insertCharacter);
        });

        test("should not insert duplicate character", () => {
            const insertCharacter: ReplicaCharacterWrapper = new ReplicaCharacterWrapper(ReplicaCharacter.create({
                positions: [
                    PositionIdentifier.create({digit: 3, siteId: "b67d409a"})
                ]
            }));
            subject = new DocumentWrapper(document);

            const success: boolean = subject.insertCharacter(insertCharacter);

            expect(success).toEqual(true);
            expect(subject.replicaCharacters).toHaveLength(characters.length);
        });
    });
});
