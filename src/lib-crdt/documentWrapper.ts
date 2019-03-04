import { Logger } from "winston";
import { Log } from "../lib-common/log";
import { ProtoWrapper } from "../lib-common/protoWrapper";
import { document } from "../lib-proto/document";
import IDocument = document.data.IDocument;
import { ReplicaCharacterWrapper } from "./replicaCharacterWrapper";

/**
 * Wrapper for the Document proto.
 */
class DocumentWrapper extends ProtoWrapper<IDocument> {
    private readonly log: Logger = new Log(__filename).logger;

    private readonly _proto: IDocument;
    private readonly _replicaCharacters: ReplicaCharacterWrapper[];

    public constructor(proto: IDocument) {
        super();
        this._proto = proto;

        this._replicaCharacters = [];
        for (const character of proto.characters) {
            this._replicaCharacters.push(new ReplicaCharacterWrapper(character));
        }
    }

    public get proto(): IDocument {
        return this._proto;
    }

    public get documentId(): string {
        return this._proto.documentId;
    }

    public get replicaCharacters(): ReplicaCharacterWrapper[] {
        return this._replicaCharacters;
    }

    /**
     * Insets a character into the document.
     * @param {ReplicaCharacterWrapper} character the character to be inserted.
     * @param {number} [startingIndex=0] The starting position of the document insertion.
     * @param {number} [endingIndex=document length] The ending position of the document insertion.
     */
    public insertCharacter(character: ReplicaCharacterWrapper,
        startingIndex?: number, endingIndex?: number): boolean {
        const start: number = isNaN(startingIndex) ? 0 : startingIndex;
        const end: number = isNaN(endingIndex) ? this._replicaCharacters.length - 1 : endingIndex;
        const mid: number = Math.ceil((start + end) / 2);
        // If the insertion is less than the smaller character, it gets inserted at the head.
        if (character.compare(this._replicaCharacters[start]) < 0) {
            this._replicaCharacters.splice(0, 0, character);
            return true;
        }

        // If the insertion is greater than the largest character, it gets inserted at the tail.
        if (character.compare(this._replicaCharacters[end]) > 0) {
            this._replicaCharacters.push(character);
            return true;
        }

        // If we find an exact match of the character we are attempting to insert, we have likely already inserted it
        // into the document.
        if (character.compare(this._replicaCharacters[mid]) === 0) {
            this.log.info(
                `Already inserted character ${character.toString()} into document ${this.documentId}`);
            return true;
        }

        // Finds and inserts into a position that will keep the sorted order of the document.
        if (character.compare(this._replicaCharacters[mid]) < 0) {
            if (character.compare(this._replicaCharacters[mid - 1]) > 0) {
                this._replicaCharacters.splice(mid, 0, character);
                return true;
            } else {
                return this.insertCharacter(character, start, mid - 1);
            }
        } else {
            if (character.compare(this._replicaCharacters[mid + 1]) < 0) {
                this._replicaCharacters.splice(mid + 1, 0, character);
                return true;
            } else {
                return this.insertCharacter(character, mid + 1, end);
            }
        }
    }

    /**
     * Deletes a character from the document, if it exists.
     * @param {ReplicaCharacterWrapper} character the character to be deleted.
     * @return {boolean} True if the deletion was successful, false if character was not found.
     */
    public deleteCharacter(character: ReplicaCharacterWrapper): boolean {
        const charPosition: number = this.findCharacterIndex(character);
        // Could not find the desired character to delete, this is a no op but notify that the operation was
        // not successful.
        if (charPosition === -1) {
            return false;
        }

        this._replicaCharacters.splice(charPosition, 1 /*deleteCount*/);
        return true;
    }

    /**
     * Finds a character and returns its index position in the document.
     * @param {ReplicaCharacterWrapper} character the character that will be searched for in the document.
     * @param {number} startingIndex the starting index for the search. Note this is only used for recursive searches,
     *                 do not provide an argument.
     * @param {number} endingIndex the ending index for the search. Note this is only used for recursive searches, do
     *                 not provide an argument.
     * @return {number} returns the index position if the character is found. If the character is not found, -1 is
     *                  returned.
     */
    private findCharacterIndex(character: ReplicaCharacterWrapper,
                               startingIndex?: number, endingIndex?: number): number {
        const start: number = isNaN(startingIndex) ? 0 : startingIndex;
        const end: number = isNaN(endingIndex) ? this._replicaCharacters.length - 1 : endingIndex;
        const mid: number = Math.ceil((start + end) / 2);

        // If the parameters of the search is out of bounds of the document, the character likely has been already
        // deleted from the document.
        if (start < 0 || end > this._replicaCharacters.length || start > end) {
            this.log.info(
                `Already deleted character ${character.toString()} from document ${this.documentId}`);
            return -1;
        }

        if (character.compare(this._replicaCharacters[mid]) === 0) {
            return mid;
        } else if (character.compare(this._replicaCharacters[mid]) < 0) {
            return this.findCharacterIndex(character, start, mid - 1);
        } else {
            return this.findCharacterIndex(character, mid + 1, end);
        }
    }
}

export { DocumentWrapper };
