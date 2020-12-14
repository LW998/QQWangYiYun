import {
    get,
    post
} from "../../network/request"

// 获取排行歌单详情
export const getTopDetail = (p) => get('/songlist/top', p);
// 下载
export const DownSong = (p) => get('/song/url', p)
// 播放链接请求
export const getSongUrl = (p) => get('/song/urls', p)