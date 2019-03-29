import SimpleMDE from "simplemde";
import { MutationTree } from "vuex";
import { IDocumentState } from "./state";

export const mutations: MutationTree<IDocumentState> = {
    profileLoaded(state: IDocumentState, documentText: string): void {
        state.error = false;
        state.documentData = undefined;
        state.documentText = documentText;

        if (state.editor) {
            state.editor.value(documentText);
        }
    },
    profileError(state: IDocumentState): void {
        state.error = true;
        state.documentData = undefined;
        state.documentText = undefined;
    },
    setEditor(state: IDocumentState, editor: SimpleMDE): void {
        state.editor = editor;
    }
};
