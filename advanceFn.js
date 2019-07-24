// 高阶函数的应用，来源：https://www.cnblogs.com/laixiangran/p/5468567.html
// 两个特点：1、函数最为参数传递；2、函数作为返回值

// 一些引用场景：
// 一、作为参数传递
// 1、ajax 请求
// function getUserInfo(userId, callback)  {
//     $.ajax("http://xxx.com?userId=" + userId, function(res) {
//             if(typeof callback == 'function') {
//                 callback(res);
//             }
//         }
//     );
// }
// getUserInfo("11", function(data) {
//     alert(data)
// });

// 2、Array.prototype.sort
var arr = [1, 4, 2].sort(function(a, b) {
    return a - b;// 升序
});

console.log(arr);

// 二、函数作为返回值
// 1、判断类型

var Type = {};
 
for(let i = 0, typeArr = ['String', 'Array', 'Number']; i < typeArr.length; i++) {
    Type['is' + typeArr[i]] = function(obj) {
        return Object.prototype.toString.call(obj) === '[object ' + typeArr[i] + ']';
    }
}

console.log('the typeof [] is Array? ' + Type.isArray([]));
console.log('the typeof 1 is Nubmer? ' + Type.isNumber(1));


// 2、单例模式
function getSingle(fn) {
    var ret;
    return function() {
        return ret || (ret = fn.apply(this, arguments));
    }
}
function fn1(a, b) {
    console.log(a + b);
}

function fn2() {
    console.log(222);
} 

var singleFn1 = getSingle(fn1);
singleFn1(1, 2);
singleFn1(1, 3);

// 3、AOP(Aspect Oriented Programming)面向切面编程，就是把跟主要业务逻辑模块不相关（如：日志管理，安全管理，异常管理等）的功能抽离出来，
// 然后通过“动态植入”的方式参入到业务中去
Function.prototype.before = function(beforeFn) {
    var _self = this; // 保存原函数
    return function() { // 返回包含原函数和新函数的“代理函数”
        beforeFn.apply(this, arguments); // 新函数调用，修正this
        return _self.apply(this, arguments); // 执行原函数
    }
}

Function.prototype.after = function(afterFn) {
    var _self = this; // 保存原函数
    return function() { // 返回包含原函数和新函数的“代理函数”
        var fn = _self.apply(this, arguments);// 执行原函数
        afterFn.apply(this, arguments); // 新函数调用，修正this
        return fn; 
    }
}

function func() {
    console.log(2);
}

func.before(function() {
    console.log(1);
}).after(function() {
    console.log(3);
})();

// 4、curry(柯里化),又称部分求值。一个currying的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，
// 而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有
// 参数都会被一次性用于求值
var currying = function(fn) {
    var args = [];

    return function() {
        if(arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            return arguments.callee;
        }
    }
}

var sum =  (function() {
        var total = 0;
        return function() {
            for(var i = 0, l = arguments.length; i < l; i++) {
                total += arguments[i];
            }
            return total;
        }
    })();


var curry = currying(sum);
// curry(100); // 可以简写为 curry(100)(200)(300)();
// curry(200);
// curry(300);
console.log('柯里化', curry(100)(200)(300)()); 

// 4、去柯里化（鸭子类型思想），对象可以使用原本不属于自己的方法，不关心对象是否被设计为拥有此方法，这是动态语言的特性
// 目的是将泛化this的过程提取出来，将fn.call或者fn.apply抽象成通用的函数
Function.prototype.uncurrying = function() {
    var self = this;

    return function() {
        Function.prototype.call.apply(self, arguments);// ！！这个有点难懂，这个用的很妙，利用call和apply
    }
}

// 将Array.prototype.push进行uncurrying，此时push函数的作用就跟Array.prototype.push一样了，
// 且不仅仅局限于只能操作array对象
var push = Array.prototype.push.uncurrying();

var objPush = {
    length: 1,
    2: 'hh'
};

push(objPush, 'mm', 'gg');
// push(objPush, 'gg');

console.log('objPush', objPush);

// 5、函数节流，防止函数被频繁调用造成性能问题
var throttle = function(fn, interval) {
    var timmer,
        firstTime = true;
    
    return function() {
        var __me = this;

        if(firstTime) {
            firstTime = false;
            fn.apply(__me, arguments);
        } 

        if(timmer) {
            return false;
        }
        timmer = setTimeout(function() {
            clearTimeout(timmer);
            timmer = null;
            fn.apply(__me, arguments); //修正作用域
        }, interval || 500);
        
    }
}

window.onresize = throttle(function() {
        console.log("throttle", new Date());
    }, 1000);

// 6、分时函数
/**
 * 
 * @param {*} fn 执行函数
 * @param {*} array 数据数组
 * @param {*} count 每次执行的数量
 */
var chunckTime = function(fn, array, count) {
    var start = function() {
        for(var i = 0, l = Math.min(array.length, count); i < l; i++) {
            fn(array.shift());
        }
    }

    return function() {
        var interval = setInterval(function() {
            if(array.length === 0) {
                clearInterval(interval);
            } else {
                start();
            }
        }, 1000);
    }
}

chunckTime(function(data) {
    console.log(new Date(), data);
}, [1,2,3,4,5,6,7,8,9,10], 3)();

// 7、惰性加载函数
// 给不同浏览器加通用的事件监听的方法
// 方案一：缺点：每次调用都要分支判断
var addEvent1 = function(ele, type, fn) {
    if(window.addEventListener) {
        ele.addEventListener(type, fn, false)
    }
    if(window.attachEvent) {
        ele.attachEvent('on' + type, fn);
    }
}

// 方案二：缺点：如果没有调用addEvent2方法，第一次是多余的
var addEvent2 = (function() {
    return function(ele, type, fn) {
        if(window.addEventListener) {
            ele.addEventListener(type, fn)
        }
        if(window.attachEvent) {
            ele.attachEvent('on' + type, fn);
        }
    }
})();

// 方案三
var addEvent3 = function(ele, type, fn) {
    if(window.addEventListener) {
        addEvent3 = function(ele, type, fn) {
            ele.addEventListener(type, fn, false)
        }
    }
    if(window.attachEvent) {
        addEvent3 = function(ele, type, fn) {
            ele.attachEvent('on' + type, fn);
        }
    }

    addEvent3(ele, type, fn);
}

// 防抖函数
var debounce = function(fn, delay) {
    var timer = null;
    return function() {
        timer && clearTimeout(timer);
        timer = setTimeout(_ => {
            fn.apply(this, arguments);
        }, delay);
    }
}