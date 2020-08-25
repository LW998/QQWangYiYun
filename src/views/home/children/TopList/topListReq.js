import {
    get,
    post
} from "../../../../network/request"

// 获取歌单排行榜
export const getTop = () => get('/top/category');