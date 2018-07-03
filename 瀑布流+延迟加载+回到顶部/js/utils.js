var utils = (function () {

    //获取元素到body的偏移量
    function offset(ele) {
        let L = ele.offsetLeft
        let T = ele.offsetTop
        let parent = ele.offsetParent
        while (parent) {
            L += parent.offsetLeft;
            T += parent.offsetTop;
            T += parent.clientTop;
            L += parent.clientLeft
            parent = parent.offsetParent
        }
        return {left: L, top: T}
    }

//获取设置可视窗口的属性
    function win(attr, value) {
        if (value == undefined) {
            return document.documentElement[attr] || document.body[attr]
        }
        document.documentElement[attr] = value;
        document.body[attr] = value
    }

//获取元素属性的属性值
    function getCss(ele, attr) {
        if ('getComputedStyle' in window) {
            var value = window.getComputedStyle(ele)[attr];
            var reg = /^-?([1-9]\d+|\d+)(\.\d+)?(px|pt|em|rem)?$/i;
            if (reg.test(value)) {
                value = parseFloat(value)
            }
        }
        return value
    }


//类数组转数组
    function toArray(arg) {
        return [].slice.call(arg)
    }


    //设置当前元素的样式
    function setCss(ele, attr, value) {
        var reg = /^(width|height|fontsize|((margin|padding)?(top|bottom|left|right)?))$/i
        if (reg.test(attr)) {
            /px/.test(value) ? null : value += 'px'
        }
        ele.style[attr] = value
    }


    //批量设置样式
    function setGroupCss(ele, obj) {
        //先检验obj是不是一个对象,如果是对象,就遍历这个对象,然后判断obj里面的属性是不是它的私有属性,如果是私有属性 然后调用setCss方法 来设置属性.
        if (Object.prototype.toString.call(obj) == '[object object]') {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    setCss(ele, key, obj[key])
                }
            }
        }
    }


    function css(ele, ...arg) {
        if (arg.length >= 2) {//如果长度大于等于2,是三个参数,就调用setCss
            setCss(ele, arg[0], arg[1])
        } else if (arg.length == 1) {//如果长度等于1,先判断arg[0]是不是对象,如果是对象就调用setGroupCss,如果不是对象就调用getCss
            if (arg[0] instanceof Object) {
                setGroupCss(ele, arg[0])
            } else {
                return getCss(ele, arg[0])
            }
        }

    }

    return {
        offset,
        win,
        getCss,
        toArray,
        setCss,
        setGroupCss,
        css

    }
})();