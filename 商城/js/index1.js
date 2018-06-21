//1.获取要操作的元素
var header = document.getElementById('header')
var btnList = header.getElementsByTagName('a')
var shopList = document.getElementById('shopList')
var data = null


//2.通过AJAX获取要操作的数据
var xhr = new XMLHttpRequest//创建一个ajax对象
xhr.open('get', 'data/product.json', false)//打开一个请求链接 (请求方式 请求链接 是否异步)
xhr.onreadystatechange = function () {//监听xhr的准备状态  状态码等于200并且准备状态等于4 说明ajax请求成功 准备结束
    if (xhr.status == 200 && xhr.readyState == 4) {
        data = JSON.parse(xhr.responseText)
    }
}
xhr.send()//发送ajax请求
console.log(data);


//3.将数据绑定到页面当中
function bindHtml() {
    var str = ''
    data.forEach(item => {
        str += `<li>
            <img src="${item.img}"/>
            <p>${item.title}</p>
            <p class="hot">热度:${item.hot}</p>
            <del>$9999</del>
            <span>￥${item.price}</span>
            <p class="time">上架时间:${item.time}</p>
        </li>`
    })
    shopList.innerHTML = str
}

bindHtml()


//4.绑定点击事件,实现sort排序
//方法一
for (var i = 0; i < btnList.length; i++) {
    btnList[i].flg = -1
    btnList[i].onclick=function () {
    var  value =btnList[i].getAttribute('attrName')
            this.flg*=-1
        sortAll.call(this,value)
    }
}
function sortAll(value) {
       if(value=='time'){
           data.sort((a, b) => {
               return (new Date(a[value]) - new Date(b[value])) * this.flg
           })

       }else{
           data.sort((a, b) => {
               return (a[value] - b[value]) * this.flg
           })

       }
    bindHtml()
    }


//
//     btnList[i].onclick = function () {
//         this.flg *= -1
//         data.sort((a, b) => {
//             return (a.price - b.price) * this.flg
//         })
//         bindHtml()
//     }
// }