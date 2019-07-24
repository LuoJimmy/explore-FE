// 考点：1️⃣变量提升，函数提升；2️⃣this的指向问题；3️⃣变量的查找规则；4️⃣运算符的优先级；5️⃣原型链
// !(function() {
    function Foo() {
        getName = function() {
            console.log(1);
        }

        return this;
    }
    Foo.getName = function() {
        console.log(2);
    }
    Foo.prototype.getName = function() {
        console.log(3);
    }
    var getName = function() {
        console.log(4);
    }
    function getName() {
        console.log(5);
    }

    // 下面的输出结果
    Foo.getName(); //2
    getName(); //4
    Foo().getName(); //1
    getName(); //1
    new Foo.getName();//2
    new Foo().getName();//3
    new new Foo().getName();//3

// }());

/**
 * 获取两个字符串的最长的公共部分
 * @param {*} str1 
 * @param {*} str2 
 */
function findMaxCommonOfTwoStr(str1, str2) {
    var longer,
        shorter,
        result = '';

    if (str1.length > str2.length) {
        longer = str1;
        shorter = str2;
    } else {
        longer = str2;
        shorter = str1;
    }

    for (var subLen = shorter.length; subLen > 0; subLen--) {
        for (var i = 0; i <= shorter.length - subLen; i++) {
            var subStr = shorter.substr(i, subLen);
            if (longer.indexOf(subStr) > -1) {
                result = subStr;
                return result;
            }
        }
    }
    return result;
}

console.log('Hello Word和Hello的最长公共部分', findMaxCommonOfTwoStr('Hello Word', 'hello'));

// 去掉数组重复性的
// 方法一、利用ES6的Set容器
console.log("数组去重，[1, 2, 4, 2, 3, 1]", Array.from(new Set([1, 2, 4, 2, 3, 1])));

// 方法二
console.log("数组去重，[1, 2, 4, 2, 3, 1]", [1, 2, 4, 2, 3, 1].filter(function (value, index, array) {
    return index === array.indexOf(value);
}));

/* start 阿里在线评测 */
//评测题目: //题目1：
//提取url中search部分参数，www.taobao.com?a=1&b=2
!(function () {
    function getUrlParam(url) {
        var paramObj = {};

        try {
            var paramStr = url.split("?")[1];
            var paramArr = paramStr.split("&");

            for (var i = 0; i < paramArr.length; i++) {
                paramObj[paramArr[i].split("=")[0]] = paramArr[i].split("=")[1];
            }
        } catch (e) {
            console.log(e)
        }

        return paramObj;
    }
    console.log('获取www.taobao.com?a=1&b=2的参数', getUrlParam('www.taobao.com?a=1&b=2'));
}());

//题目2:
//2个正整数字符串的相加，即‘1’+’19’——>’20’（考虑超长字符串相加）
!(function() {
    function reserveStr(str) {
        var result = '';
        for(var i = str.length-1;i >= 0;i--) {
            result  = `${result}${str.charAt(i)}`;
        }
        return result;
    }
    function AddTwoInt(a, b) {
        if(typeof a !== "string" || typeof b !== "string") return;
        var reserseA = reserveStr(a);
        var reserseB = reserveStr(b);
        var longer = '', shorter = '', result = '', tmp = 0;
        if(reserseA.length > reserseB.length) {
            longer = reserseA;
            shorter = reserseB;
        } else {
            longer = reserseB;
            shorter = reserseA;
        }
        for(var i = 0, len = longer.length;i < len;i++) {
            var charA = longer.charAt(i),
                charB = shorter.charAt(i)?shorter.charAt(i):'0';
            var char = parseInt(charA) + parseInt(charB) + tmp;
            if(char > 9) {
                tmp = parseInt(`${char}`.charAt(0));
                result += `${char}`.charAt(1);
            } else {
                result += `${char}`;
                tmp = 0;
            }
        }
        if(tmp != 0) {
            result = `${tmp}${result}`;
        }
        return reserveStr(result);
    }

    console.log('"1"+"19"', AddTwoInt('1', '19'));
    console.log('"2"+"199999999999999999999999999999999999"', AddTwoInt('2', '199999999999999999999999999999999999'));
}());


//题目3:实现es5,es6两种方式
//写一个类Person，拥有属性age和name，拥有方法say(something)
//再写一个类Superman，继承Person，拥有自己的属性power，拥有自己的方法fly(height)
!(function () {
    // es5实现
    // function Person(name, age) {
    //     this.name = name || "jimmy";
    //     this.age = age || 18;
    // }

    // Person.prototype.say = function (something) {
    //     console.log(something)
    // }

    // function Superman(name, age, power) {
    //     this.power = power || "fly";
    //     Person.call(this, name, age)
    //     Superman.prototype.fly = function (height) {
    //         console.log("飞行高度", height);
    //     }
    // }

    // Superman.prototype = new Person();
    // Superman.prototype.constructor = Superman;

    // var superman = new Superman("Iron Man", "28", "can fly");
    // console.log(`名字：${superman.name}，年龄：${superman.age}，能力：${superman.power}`);
    // superman.say("HaHa! I Can fly in the sky!");
    // superman.fly(10000);

    // //2、es6
    class Person {
        age = 18;
        name = "jimmy";
        say = function (something) {
            console.log(something)
        }

        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }

    class Superman extends Person {
        power = "fly";
        fly = function (height) {
            console.log("飞行高度", height);
        }

        constructor(name, age, power) {
            super(name, age);
            this.power = power;
        }
    }
    var superman = new Superman("Iron Man", "28", "can fly");
    console.log(`名字：${superman.name}，年龄：${superman.age}，能力：${superman.power}`);
    superman.say("HaHa! I Can fly in the sky!");
    superman.fly(10000);
}());

/* end 阿里在线评测 */

/* 特定语法匹配替换
说明：匹配字符串中形如 =g文字文字= 的语法，并将相应部分转化为对应的标签文字文字
示例：
transform('=g1.18 进入开发=');  // <g>1.18 进入开发</g>
transform('=g1.23 联调(-1)=，=g1.25 发布(+1)=')；//  <g>1.23 联调(-1)</g>，<g>1.25 发布(+1)</g>
transform('1.25 发布')； // 1.25 发布 */
!(function() {
    function transform(str) {
        var result = '';
        result = str.replace(/=g/g, '<g>');
        result = result.replace(/=/g, '</g>');
        return result;
    }
    console.log(transform('=g1.18 进入开发='));
    console.log(transform('=g1.23 联调(-1)=，=g1.25 发布(+1)='));
    console.log(transform('1.25 发布'));
}());

/* 合并数组中相邻且重复的元素
说明：请实现一个函数 merge，传入一个数组，合并数组中【相邻且重复】的元素。
示例：
merge([3,2,2,4,5,5,6,2,1]); // 输出[3,2,4,5,6,2,1]
merge([3,2,3]); // 输出[3,2,3]
merge([2,2,3]); // 输出[2,3] */
!(function() {
    function merge(arr) {
        if(!Array.isArray(arr)) {
            return;
        }
        var arrtmp = arr.filter(function(value, index, array) {
            return value != array[index+1];
        });
        return arrtmp;
    }
    console.log(merge([3,2,2,4,5,5,6,2,1])); // 输出[3,2,4,5,6,2,1]
    console.log(merge([3,2,3])); // 输出[3,2,3]
    console.log(merge([2,2,3])); // 输出[2,3] */

}());

/* 函数组合运行
说明：实现一个方法，可将多个函数方法按从左到右的方式组合运行。
如composeFunctions(fn1,fn2,fn3,fn4)等价于fn4(fn3(fn2(fn1))。 示例：
const add = x => x + 1;
const multiply = (x, y) => x * y;
const multiplyAdd = composeFunctions(multiply, add);
multiplyAdd(3, 4) // 返回 13 */

!(function() {
    function composeFunctions() {
        var __args = arguments;
        return function() {
            var __argsArr = [].slice.apply(__args);
            var args = [].slice.apply(arguments);
            for(var i = 0, len = __argsArr.length;i < len;i++) {
                if(Array.isArray(args)) {
                    args = __argsArr[i].apply(this, args);
                } else {
                    args = __argsArr[i].call(this, args);
                }
            }
            return args;
        }
    }
    const add = x => x + 1;
    const multiply = (x, y) => x * y;
    const multiplyAdd = composeFunctions(multiply, add);
    console.log('multiplyAdd(3, 4)', multiplyAdd(3, 4)); // 返回 13 */
}());

!(function() {
    function A() {
        this.name = 'A';
    }
    function B() {
        this.name = 'B';
    }

    let a = new A();
    a.prototype = new B();
    let b = new B();

    console.log(a.__proto__);
    console.log(A.prototype);
    
    console.log(b.__proto__);
    console.log(B.prototype);

})()

