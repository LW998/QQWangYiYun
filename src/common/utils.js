import Vue from 'vue'
//防抖
export function debounce(func, wait) {
    let timer = null,
        result = null;
    return function anonymous(...args) {
        let context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            result = func.call(context, ...args);
            timer = null;
        }, wait);
        return result;
    };
};

// 防抖立即执行版
export function FirstDebounce(func, wait) {
    let timer = null,
        firstClick = false;
    return function anonymous(...args) {
        let context = this;
        if (timer && !firstClick) {
            // 频繁点击时做的事
            // Vue.prototype.$tip.show(`请勿频繁点击`, 'info')
            console.log(1111111);
        }
        if (timer) clearTimeout(timer);
        firstClick = true
        let callNow = !timer;
        timer = setTimeout(() => {
            // 等待wait时间后放行请求
            timer = null
        }, wait)
        if (callNow) {
            firstClick = false
            // 首次进入点击执行
            return func.call(context, ...args);
        }
    }
}


//歌词
export function handleLyric(str, obj) {
    const dom = document.createElement('div');
    dom.innerHTML = str;
    const arr = dom.innerHTML.split('\n');
    arr.forEach((item) => {
        item.replace(/\[(\d+):(\d+)\.(\d+)\](.+)/, (...[, $1, $2, $3, $4]) => {
            // console.log($1, $2, $3, $4)
            let timeKey = Number($1) * 60000 + Number($2) * 1000 + Number($3) * 10
            $4 = $4.replace(/\/\//, '');
            if (!$4) {
                return;
            }
            obj[timeKey] = obj[timeKey] || {};
            obj[timeKey]['str'] = $4;
        })
    });
    return obj;
}

//翻译
export function handTrans(str, obj) {
    const dom = document.createElement('div');
    dom.innerHTML = str;
    const arr = dom.innerHTML.split('\n');
    arr.forEach((item) => {
        item.replace(/\[(\d+):(\d+)\.(\d+)\](.+)/, (...[, $1, $2, $3, $4]) => {
            // console.log($1, $2, $3, $4)
            let timeKey = Number($1) * 60000 + Number($2) * 1000 + Number($3) * 10
            $4 = $4.replace(/(\/\/| )/, '');
            if (!$4) {
                return;
            }
            if (obj[`${timeKey + 10}`]) {
                // obj[`${timeKey + 10}`] = obj[timeKey] || {};
                obj[`${timeKey + 10}`]['trans'] = $4;
            } else if (obj[`${timeKey - 10}`]) {
                // obj[`${timeKey - 10}`] = obj[timeKey] || {};
                obj[`${timeKey - 10}`]['trans'] = $4;
            } else {
                obj[timeKey] = obj[timeKey] || {};
                obj[timeKey]['trans'] = $4;
            }
        })
    });
    return obj;
}

export const Num = (a, b = 0, c = 0) => {
    a = Number(a || 0);
    const d = 0.499999999;
    return Number((a + (c * d)).toFixed(b));
};

export function offset(curEle) {
    //获取当前元素的父参照物
    let par = curEle.offsetParent,
        //获取当前元素的左偏移
        l = curEle.offsetLeft,
        //获取当前元素的上偏移
        t = curEle.offsetTop;
    //判断当前元素是否存在，或者是否为body
    //par.tagName !== 'BODY' 少做一次加body边框的操作
    while (par && par.tagName !== 'BODY') {
        //当前元素加上父参照物的边框宽度
        if (!/MSIE 8\.0/.test(navigator.userAgent)) {
            //IE8中偏移值自己就算了边框，不需要再加上边框的值
            //navigator.userAgent获取当前浏览器的版本信息
            l += par.clientLeft;
            t += par.clientTop;
        }
        //当前元素加上父参照物的偏移
        l += par.offsetLeft;
        t += par.offsetTop;
        //获取到父参照物的参照物
        par = par.offsetParent;
    }
    return {
        left: l,
        top: t
    }
}

String.prototype.formatTime = function formatTime(template) {
    typeof template === 'undefined' ? template = '{0}年{1}月{2}日 {3}时{4}分{5}秒' : null;
    let matchAry = this.match(/\d+/g);
    template = template.replace(/\{(\d+)\}/g, (x, y) => {
        let val = matchAry[y] || '00';
        //不足十补零
        val = val.padStart(2, '0');
        // val.length < 2 ? val = '0' + val : null;
        return val;
    });
    return template;
};