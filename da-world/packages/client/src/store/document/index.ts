import { Module } from "vuex";
import { IRootState } from "../state";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { IDocumentState } from "./state";

export const state: IDocumentState = {
    documentData: undefined,
    documentText: undefined,
    editor: undefined,
    error: false
};

const namespaced: boolean = true;

export const documentModule: Module<IDocumentState, IRootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
