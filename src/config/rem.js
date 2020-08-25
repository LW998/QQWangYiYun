(function(doc, win) {
    var docEl = doc.documentElement,
        desW = 640;
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= desW) {
                docEl.style.fontSize = '100px';
                return;
            }
            docEl.style.fontSize = clientWidth / desW * 100 + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);