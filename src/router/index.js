import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () =>
    import('../views/home/Home.vue')
const Recommend = () =>
    import('../views/home/children/Recommend/Recommend.vue')
const TopList = () =>
    import('../views/home/children/TopList/TopList.vue')
const RecDetail = () =>
    import('../views/recDetail/recDetail.vue')
const TopDetail = () =>
    import('../views/topDetail/topDetail.vue')
const Player = () =>
    import('../views/player/Player.vue')

const routes = [{
    path: '/',
    redirect: '/home',
}, {
    path: '/home',
    name: '首页',
    component: Home,
    meta: {
        keepAlive: true
    },
    redirect: '/recommend',
    children: [{
        path: '/recommend',
        component: Recommend,
        meta: {
            keepAlive: true
        },
    }, {
        path: '/toplist',
        component: TopList,
        meta: {
            keepAlive: true
        },
    }]
}, {
    path: '/recdetail/:id',
    name: '歌单详情',
    component: RecDetail,
    meta: {
        keepAlive: false
    },
}, {
    path: '/topdetail/:id',
    name: '榜单详情',
    component: TopDetail,
    meta: {
        keepAlive: false
    },
}, {
    path: '/player',
    name: '音乐播放',
    component: Player,
    meta: {
        keepAlive: false
    },
}]

const router = new VueRouter({
    mode: 'history',
    routes,
    // scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition
    //     } else {
    //         if (from.meta.keepAlive) {
    //             from.meta.savedPosition = document.body.scrollTop;
    //         }
    //         return {
    //             x: 0,
    //             y: to.meta.savedPosition || 0
    //         }
    //     }
    // }
})

export default router