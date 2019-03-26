import { Api } from "@/services/api";
import { AxiosInstance, AxiosResponse } from "axios";

export class DocumentService {
    private readonly _connection: AxiosInstance;

    public constructor() {
        this._connection = Api.getConnection();
    }

    public async getDocumentData(): Promise<void> {
        const data: AxiosResponse<string> = await this._connection.get("/api/document");
        console.log(`data is ${data.data}`);
    }
}
