import Vue from "vue";
import Router from 'vue-router';


Vue.use(Router);

const Recommend = (resolve) => {
    import('../components/recommend/recommend.vue').then((module) => {
        resolve(module)
    })
}

const Singer = (resolve) => {
    import('../components/singer/singer.vue').then((module) => {
        resolve(module)
    })
}

const Rank = (resolve) => {
    import('../components/rank/rank.vue').then((module) => {
        resolve(module)
    })
}

const Search = (resolve) => {
    import('../components/search/search.vue').then((module) => {
        resolve(module)
    })
}

const SingerDetail = (resolve) => {
    import('../components/singer-detail/singer-detail.vue').then((module) => {
        resolve(module)
    })
}

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
            component: Singer,
            children: [
                {
                    path: ':id',
                    component: SingerDetail,
                },
            ]
        },
        {
            path: '/rank',
            component: Rank
        },
        {
            path: '/search',
            component: Search
        }
    ]
});
