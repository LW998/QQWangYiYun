import {
    get,
    post
} from "../../../../network/request"

// 获取搜索热词
export const getHot = () => get('/search/hot');
// 搜索歌曲内容
export const getSearch = (p) => get('/search', p);
// 获取首页轮播图
export const getBanner = () => get('/recommend/banner')
// 获取歌单
export const getAlbum = (p) => get('/songlist/list', p)
// 播放链接请求
export const getSongUrl = (p) => get('/song/urls', p)

export class SearchRes {
    constructor(list) {
        this.songname = list.songname;
        this.songmid = list.songmid;
        this.singer = this.getSinger(list.singer)
    }
    getSinger(singer) {
        let ary = [];
        if (singer.length === 1) {
            ary.push(singer[0].name)
        } else {
            singer.forEach(item => {
                ary.push(item.name)
            })
            ary = ary.join('$.$').split('$')
        }
        return ary
    }
}