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