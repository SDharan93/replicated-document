import Vue from "vue";
import Vuex from "vuex";
import { documentModule } from "./document/index";
import { IRootState } from "./state";

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({
    modules: {
        documentModule
    }
});
