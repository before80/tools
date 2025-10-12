(function(){
    "use strict";
    var articleEle = document.querySelector('div.td-content')
    var nodeList = articleEle.querySelectorAll('p')
    var reg = /^\u200b/i
    for(var node of nodeList) {
        if (reg.test(node.textContent)) {
            node.style.textIndent = "2em"
        }
    }

    function adjustTocHeight() {
        const toc = document.querySelector('.td-sidebar-toc');
        const mainContent = document.querySelector('main');
        const tdToc = toc.querySelector(".td-toc")
    
        if (toc && mainContent) {
            // const mainHeight = mainContent.scrollHeight;
            const viewportHeight = window.innerHeight;
            const tdTocHeight = tdToc.scrollHeight;
            console.log("tdTocHeight=",tdTocHeight)
            let tocH = tdTocHeight + 156 + 12 + 24 + 1
            if ((tocH + 64) < viewportHeight ) {
                toc.style.maxHeight = tocH + 'px';
            } else {
                toc.style.maxHeight = viewportHeight + 'px';
            }

            // // 如果主内容不高，就减少 TOC 高度
            // if ((mainHeight - 64) < viewportHeight * 0.8) {
            //     toc.style.maxHeight = (mainHeight - 200) + 'px';
            // } else {
            //     toc.style.maxHeight = 'calc(100vh - 6rem)';
            // }
        }
    }

    // 在页面加载和调整大小时调用
    window.addEventListener('load', adjustTocHeight);
    window.addEventListener('resize', adjustTocHeight);
})();