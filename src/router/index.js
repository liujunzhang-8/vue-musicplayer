import Vue from "vue";
import Router from 'vue-router';
import Mheader from '../components/m-header/m-header.vue'
import Rank from '../components/rank/rank.vue'
import Singer from '../components/singer/singer.vue'
import Search from '../components/search/search.vue'
import Tab from '../components/tab/tab.vue'
import Recommend from '../components/recommend/recommend.vue'


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            component: Recommend
        },
        {
            path: '/singer',
            component: Singer
        },
        {
            path: '/mheader',
            component: Mheader
        },
        {
            path: '/rank',
            component: Rank
        },
        {
            path: '/tab',
            component: Tab
        },
        {
            path: '/search',
            component: Search
        }
    ]
})
