import { DocumentService } from "@/services/documentService";
import { AxiosError } from "axios";
import { ActionContext, ActionTree } from "vuex";
import { IRootState } from "../state";
import { IDocumentState } from "./state";

export const actions: ActionTree<IDocumentState, IRootState> = {
    fetchData({ commit }: ActionContext<IDocumentState, IRootState>): void {
        const documentService: DocumentService = new DocumentService();
        documentService.getDocumentData()
            .then((response: string) => {
                console.log(`response is ${response}`);
                commit("profileLoaded", response);
            })
            .catch((error: AxiosError) => {
                console.log(error);
                commit("profileError");
            });
    }
};
