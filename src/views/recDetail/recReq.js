import {
    get,
    post
} from "../../network/request"

// 获取推荐歌单详情
export const getRecDetail = (p) => get('/songlist/detail', p);
//下载歌曲
export const DownSong = (p) => get('/song/url', p)
// 播放链接请求
export const getSongUrl = (p) => get('/song/urls', p)
// // 播放链接请求
// export const getSongUrls = (p) => post('/song/urls', p)