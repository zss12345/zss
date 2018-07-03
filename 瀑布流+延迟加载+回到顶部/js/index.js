//获取元素
let uls = document.getElementsByTagName('ul')
let winH = utils.win('clientHeight')
console.log(winH);
let imgs = document.getElementsByTagName('img')
let bodyH=null;
let pag=null
uls = [...uls]//通过es6中的剩余运算符 展开运算符调用数组方法
//在页面中插入内容
function bindHtml(n) {
    pag++;
    if (pag>2){
       return
    }
    for (var i = 0; i < n; i++) {
        uls.sort((a, b) => {//a,b指的是每一个ul
            return a.offsetHeight - b.offsetHeight
        })
        //对排好序的高度最小的ul插入图片
        uls[0].innerHTML += `<li style="height:${utils.getRandom(300, 350)}px">
            <div class="bg">
                <img pic="./img/${utils.getRandom(1, 30)}.jpg" alt="" >
            </div>
            <a href="javascript:;">点击详情</a>
        </li>`
    }
    bodyH = uls[0].offsetHeight

}

bindHtml(30);
forImg();

function forImg() {
    for (var i = 0; i < imgs.length; i++) {
        lazyImg(imgs[i])
    }
}

//滑动鼠标执行方法,当鼠标滑动到最底部时候,让页面重新再加载一次
window.onscroll = function () {

    let winT = utils.win('scrollTop');
    console.log(bodyH);

    if ((winT + winH + 50) >=bodyH) {
        bindHtml(30)
    }

    forImg();

};


function lazyImg(ele) {
    let H = ele.offsetHeight / 2;
    let T = utils.offset(ele).top;
    let winT = utils.win('scrollTop');
    if (winH + winT > (H + T)) {
        let newImg = new Image();
        let url = ele.getAttribute('pic');
        newImg.src = url;
        newImg.onload = function () {
            ele.src = this.src;
            newImg = null
            fadeIn(ele)
        }
    }
}
function fadeIn(ele) {
    let opacity=utils.css(ele,'opacity')
    let timer =setInterval(()=>{
        utils.css(ele,'opacity',opacity+=0.05)
        console.log(opacity);
        if (utils.css(ele,'opacity')>=1){
            clearInterval(timer)
            utils.css(ele,'opacity',1)
        }
    },50)
}