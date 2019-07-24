## 腾讯电面
1. 自我介绍一下
2. 讲一下项目经验
3. 遇到过性能问题吗
4. 遇到过跨域问题吗，讲一下如何解决的
5. 事件流的过程
6. 浏览器的工作原理
7. js会阻塞渲染吗
8. 数据双向绑定的原理
9. Angular与VUI的对比
10. 讲一下快速排序的原理
11. 手机按钮点击延迟，怎么处理
12. 听过PWA吗
13. 听过虚拟节点吗
14. 听过CSP吗
15. 10分的话，前端你给自己打几分
16. 你有什么想问的

## 腾讯笔试
请编写一个单机【五子棋】游戏，要求如下：

使用原生技术实现，兼容 Chrome 浏览器即可。

实现胜负判断，并给出赢棋提示；任意玩家赢得棋局，锁定棋盘。

请尽可能的考虑游戏的扩展性，界面可以使用 DOM / Canvas 实现。考虑后续切换界面实现的方式成本最低。（比如选择使用 DOM 实现界面，需求改变为使用 Canvas 实现时尽可能少的改动代码）。

实现一个悔棋功能

实现一个撤销悔棋功能

实现一个人机对战功能

尽可能的考虑实现的灵活性和扩展性 

## 阿里一面 (支付宝)
1. 自我介绍一下；
2. html的viewport是干嘛的
3. 你们的小图标是如何使用的；
4. css如何实现旋转；
5. 什么情况会出现margin重叠；如何解决。
6. html5新增的有哪些元素；
7. js中声明变量的有哪些命令。他们有啥区别？const定义的对象，能改变它的属性值吗
8. 节流和防抖有啥区别。用到过节流吗？什么场景？
9. promise的then，resolve，reject，catch的执行情况
new promise()和setTimeOut(function(){}, 0);的执行顺序
10. 箭头函数的this指向谁
11. 什么情况下会造成内存泄漏
12. 浏览器访问网址的整个过程；
13. 对称加密和非对称加密的区别；什么是混合加密
14. http 返回状态码301和302的区别；
15. 浏览器常见的攻击有哪些？如何防御
16. 看过框架的源码吗？Angular的双向数据绑定的原理是啥？
17. VUE的生命周期有哪些？
18. 主要是做app端？还是做PC端？
19. 你在项目中做的一些工作？
20. 讲一下你在项目管理中两个比较实用的管理经验？
21. 你觉得你有什么优势？
22. 你为什么离开上一家公司？
23. 你有什么想问的？


## 阿里二面（支付宝）
```
/*** 题目1： 找出最接近的值 ***/
/* 尽量不使用 JS 特有的语法糖，尽量不使用如 Array.sort 等语言特有的方法。*/
const arr2 = [1, 5, 9, 15, 28, 33, 55, 78, 99];

/**
 * 返回最接近输入值的数字，如果有多个，返回最大的那个
 * @param {number} n
 * @return {number}
 */
function findNext(n, arr) {
  // your code here...
}

console.log(findNext(1, arr2)); // should print 1
console.log(findNext(44, arr2)); // should print 55
console.log(findNext(6, arr2)); // should print 5
console.log(findNext(7, arr2)); // should print 9
console.log(findNext(8, arr2)); // should print 9


/*** 题目2：选择器考察 ***/
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        
    </style>
</head>
<body>
<!--题目说明-->
<!--将children下，第3个div子元素，背景颜色置为红色-->
<!--将children下，第2个子元素，文字颜色置为蓝色-->
<!--将children下，lang属性包含bcd，文字颜色置为绿色-->
<div>
    <div class="children">
        <div>test</div>
        <p >test</p>
        <div>test</div>
        <p>test</p>
        <div lang="abc">test</div>
        <div lang="abcd">test</div>
        <div>test</div>
        <div>test</div>
    </div>
</div>
</body>
</html>


/*** 题目3：用 DFS or BFS 来实现遍历DOM树 ***/
/**
 * 从页面根节点开始，遍历页面上所有 DOM 元素，并且返回每个DOM标签的名称和出现次数
 * 分别用「深度优先」和「广度优先」的策略来实现
 * @param {HTMLElement} 页面根节点
 * @return {Object} - 包含页面上所有标签名-该标签出现次数的对象,eg: { div: 10, p: 20, h1: 3 }
 */
function collectAllElements(e) {
    // your code here...
}


/*** 题目4：深拷贝--实现一个函数，返回对象的深拷贝 ***/

const origin = {
  a: {
    b: {
      c: [1, 5, 11, 23, 422]
    }
  },
  d: function() {
    console.log('hello world');
  },
  e: new Date()
};

/**
 * 返回输入值的深拷贝对象
 * 
 * tips: 对象可能包含 Function、Date 等特殊对象
 * 
 * @param origin {any}
 * @return {Object}
 */
function deepClone(origin) {
  // your code here...
}


/*** 题目5：实现一个AST解析方法，解析下列输入，输出对应树形结构（区分标签、属性、内容等） ***/

const htmlStr = `<div class="widget-body" data-spm-anchor-id="a1z4o.xxss.i3.14803e15bAFF41">
         <span class="ctr-val g-csscut-more" style="display: inline-block;vertical-align: top;width:200px;”><a target="_blank" href="positionDetail.htm?id=44106" title="欢迎应聘蚂蚁金服支付宝前端工程师-杭州、上海、北京、成都">欢迎应聘蚂蚁金服支付宝前端工程师-杭州、上海、北京、成都</a></span>
    </div>`;

function astParser(){
    // your code here...
}
```

## 微众银行
### 一、笔试部分
1. 下面的输出结果  
```
for(var i = 0; i++ ; i < 5) {
    setTimeout(function() {
        conosole.log(i)
    }, 1000);
}
console.log(i); 
```

2. 每隔1s分别输出1,2,3,4,5
3. 最后a[b]为多少？
```
var a = {};
var b = {key: "b"};
var c = {key: "c"};
a[b] = 123;
a[c] = 456;
```
4. 请解释一下。为什么0.1+0.2输出为0.30000000000000004，0.1+0.2 == 0.3为false
5. 下面程序的输出结果
```
console.log(1);
new Promise((resovle, err) => {
    console.log(2);
    resovle(3);
}).then(res => {
    console.log(res)
});
setTimeOut(() => {
    console.log(4);
}, 1000);
setTimeOut(() => {
    console.log(5);
}, 0);
```
6. 下面输出什么？
```
(function() {
    var a = b = 1;
}());
console.log(a);
console.log(b);
```

7. 用js实现从10s倒计时
下面的输出结果是
```
function MyObject() {
    this.age = 18;
    
    function aa() {
        let self = this;
        console.log(this.age);
        console.log(self.age);
    }
    
    (function() {
        console.log(this.age);
        console.log(self.age);
    }());
}

let myObj = new MyObject();
myObj.aa();
```

8. 写一个方法实现2^n的计算
9. 实现两个数的交换，不能用第三个变量。

### 二、面试官1问题
#### Angular
1. 说说AOT、JIT，分别适合什么样子的场景应用
2. 说说懒加载
3. 装饰器做了什么
4. angularJS和angular2的异同

#### 其他
1. 高阶函数的应用
2. 加班的看法
3. 希望得到什么样的工作体验
4. async
5. flex grid
6. 小程序经验
7. web component
8. shadow dom
9.  tree shark
10. rollup
11. webpack


### 面试官2的问题
1. 为什么要离开原来公司
2. 讲讲你带的这个项目最大的困难是什么，是如何解决的
3. 写一个程序获取两个字符串最长的相同部分
