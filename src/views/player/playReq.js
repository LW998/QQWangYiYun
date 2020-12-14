import {
    get,
    post
} from "../../network/request"

// 播放链接请求
export const getSongUrl = (p) => get('/song/urls', p)

// 歌词请求
export const getLyric = (p) => get('/song/lyric', p)