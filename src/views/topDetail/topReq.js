import {
    get,
    post
} from "../../network/request"

// 获取搜索热词
export const getTopDetail = (p) => get('/top', p);
// 下载
export const DownSong = (p) => get('/song/url', p)
// 播放链接请求
export const getSongUrl = (p) => get('/song/urls', p)