var utils = (function () {
    //获取当前可视窗口的属性,改变scrollLeft和scrollTop
    function win(attr, value) {
        //当value没有,或者为null和undefined的时候
        if (value == undefined) {
            return document.documentElement[attr] || document.body[attr]
        }
        document.documentElement[attr] = value;
        document.body[attr] = value

    }


//当前元素到body的偏移量
    function offset(ele) {
        let L = ele.offsetLeft;
        let T = ele.offsetTop;
        let parent = ele.offsetParent;
        while (parent) {
            if (!(/MSIE 8/i.test(window.navigator.userAgent))) {
                T += parent.clientTop;
                L += parent.clientLeft
            }
            T += parent.offsetTop;
            L += parent.offsetLeft;
            parent = parent.offsetParent
        }
        return {left: L, top: T}
    }


    //获取一个css属性,获取一个scc属性名对应的属性值
    function getCss(ele, attr) {
        //window.getComputedStyle(元素,元素伪类(一般不写或者写null))获取当前元素设置的样式
        //获取浏览器已经成功渲染出来的样式,不兼容ie6-8
        if ('getComputedStyle' in window) {
            var value = window.getComputedStyle(ele)[attr]
            var reg = /^-?([1-9]\d+|\d+)(\.\d+)?(px|pt|em|rem)?$/i;
            if (reg.test(value)) {
                value = parseFloat(value)
            }

        }
        return value
    }


    //设置属性
    function setCss(ele, attr, value) {
        var reg = /^width|height|fontSize|(margin|padding)?(top|left|bottom|right)$/i;
        if (reg.test(attr)) {
            //判断当前的值有没有px属性,如果没有,给它加上,如果有就不用管
            /px/.test(value) ? null : value += 'px'

        }
        //最后将当前的属性名和属性值设置给当前的元素
        ele.style[attr] = value
    }


//批量给元素设置属性
    //当前元素,对象
    function setGroupCss(ele, obj) {
        //检测obj是一个对象
        if (Object.prototype.toString.call(obj) == '[object object]') {
            for (var key in obj) {//遍历obj,判断里面的属性是否是私有属性,如果是就调用上面的setCss方法给ele批量设置属性
                if (obj.hasOwnProperty(key)) {
                    setCss(ele, key, obj[key])
                }
            }
        }
    }

//
    function css(...arg) {
        if (arg.length === 3) {
            setCss(...arg)//批量设置属性
        } else if (arg.length == 2) {
            if (arg[1] instanceof Object) {
                setGroupCss(...arg)//设置属性
            } else {
                return getCss(...arg)//获取属性
            }

        }
    }



//获取随机数
function getRandom(n, m) {
    n = Number(n);
    m = Number(m);
    if (!isNaN(n) && !isNaN(m)) {
        if (n > m) {
            [n, m] = [m, n]
        }
        return Math.round(Math.random() * (m - n) + n)
    }
}
function toArray(ary) {
    return [].slice.call(ary)
}

return {
    win,
    offset,
    getCss,
    setCss,
    setGroupCss,
    css,
    getRandom,
    toArray

    }

})();
// utils.setCss('box', 'height', '500')
// // utils.setGroupCss('box', {'width': 300, 'height': 300})