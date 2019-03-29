import { GetterTree } from "vuex";
import { IRootState } from "../state";
import { IDocumentState } from "./state";

export const getters: GetterTree<IDocumentState, IRootState> = {
    documentText(state: IDocumentState): string {
        return `Is This working? Document text: ${state.documentText}`;
    }
};
