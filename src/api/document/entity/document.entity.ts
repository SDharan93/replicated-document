import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Log } from "../../../lib-common/log";
import { DocumentWrapper } from "../../../lib-crdt/documentWrapper";
import { document } from "../../../lib-proto/document";
import Document = document.data.Document;

@Entity({name: "document"})
export class DocumentEntity {
    private readonly log: Log = new Log(__filename);

    @PrimaryGeneratedColumn("uuid", {name: "document_id"})
    protected _documentId: string;

    @Column({type: "json", name: "document_json", nullable: true})
    protected _documentJson: string;

    @CreateDateColumn({name: "created_at"})
    protected _createdAt: Date;

    @UpdateDateColumn({name: "updated_at"})
    protected _updatedAt: Date;

    public get documentId(): string {
        return this._documentId;
    }

    public set documentId(id: string) {
        this._documentId = id;
    }

    public get document(): DocumentWrapper | undefined {
        if (!this._documentJson || this._documentJson.length === 0) {
            return undefined;
        }

        try {
            const documentJson: Document = JSON.parse(this._documentJson);
            return new DocumentWrapper(documentJson);
        } catch (e) {
            this.log.error(`Failed to convert string to proto for document ${this.documentId}`, e);
            return undefined;
        }
    }

    public set document(documentWrapper: DocumentWrapper) {
        const documentProto: Document = Document.create(documentWrapper.proto);
        this._documentJson = JSON.stringify(documentProto.toJSON());
    }

    public set documentJson(documentJson: string) {
        this._documentJson = documentJson;
    }
}
