import Vue from "vue";
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from "./state";
import mutations from './mutations';
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
// 高版本挂载到vuex上使用
// const logs = Vuex.createLogger()  

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})