// Reference: https://www.cnblogs.com/chenxygx/p/5754101.html

// prototype与面向对象的取舍，会不会产生多个实例

!(function(){
    function Valitor(){
        this.cache = [];
    }
    
    Valitor.prototype.add = function(data) {
        this.cache.push(data);
    }
    
    var valitor = new Valitor();valitor.add('aa');console.log(valitor.cache);
    var valitorr = new Valitor();valitorr.add('bb');console.log(valitorr.cache);
    
    var Valitor1 = {
        cache: [],
        add: function(data) {
            this.cache.push(data);
        }
    }
    
    var valitor1 = Valitor1;valitor1.add("cc");console.log(valitor1);
    var valitorr1 = Valitor1;valitorr1.add("dd");console.log(valitorr1);
}());

// 调用父类构造函数
!(function() {
    function A(light) {
        this.light1 = light;
    }

    function B(light) {
        this.light = light;
        A.apply(this, arguments);
    }

    B.prototype = new A();
    var c = new B('light is turn on');
    console.log('light1', c.light1);
    console.log('light', c.light);


}());

/* 单例模式 */
// 保证一个类仅有一个实例，并提供一个访问它的全局访问点。
// 应用场景：线程池，全局缓存，登录浮窗
!(function(){
    function getSignle(fn) {
        var result;

        return function() {
            return result || (result = fn.apply(this, arguments));
        }
    }

    function loginBox() {
        var div = document.createElement('div');
        div.innerText = "点击登录";
        div.style.display = "none";
        document.body.appendChild(div);
        return div;
    }

    var LoginBox = getSignle(loginBox)();
    LoginBox.style.display = "block";
}());

/* 策略模式 */
// 定义一系列的算法，把它们一个一个封装起来。将算法的使用与算法的实现分离开来
// 应用场景：登录表单的验证
!(function () {
    //定义算法方法
    var strategies = {
        "S":function(salary){
          return salary * 4;
        },
        "A":function(salary){
            return salary * 3;
        },
        "B":function(salary){
            return salary * 2;
        }
    };
    //执行算法
    var calculateBouns = function(level,salary){
      return strategies[level](salary);
    };
    console.log(calculateBouns('S',2000));
})() 

/* 代理模式 */
// 为一个对象提供占位符或者代用品，以控制对他的访问
// 分类：1）虚拟代理：对于代销比较大的对象，延迟到真正需要使用的时候才去创建；2）控制代理：控制对象对目标对象的访问权限
// 应用场景：图片预加载，缓存代理，代理工厂

!(function(win) {
    var myImage = (function() {
        var imgNode = win.document.createElement('img');
        win.document.body.appendChild(imgNode);

        return {
            setSrc: function(src) {
                imgNode.src = src;
            }
        }
    })();

    // 预加载
    var proxyImage = (function() {
        var img = new Image();
        img.onload = function() {
            myImage.setSrc(this.src);
        }

        return {
            setSrc: function(src) {
                myImage.setSrc('./image/default.png');
                img.src = src;
            }
        }
    })();

    proxyImage.setSrc('./image/real.png');
    // myImage.setSrc('./image/real.png')

})(this);

/* 订阅-观察者模式 */
// 定义对象一对多的关系，当一个对象改变时，依赖他的对象将作出相应的改变
// 事件监听，登录后各模块的刷新
!(function() {
    var ObserverEvent = (function() {
        var clientsList = [], listen, trigger, remove;

        listen = function(key, fn) {
            if(!clientsList[key]) {
                clientsList[key] = [];
            }
            clientsList[key].push(fn);
        }

        trigger = function() {
            var key = Array.prototype.shift.apply(arguments), fns = clientsList[key];
            if(!fns || fns.length === 0) {
                return;
            }
            for(var i = 0, len = fns.length; i < len; i++) {
                fns[i].apply(this, arguments);
            }
        }

        remove = function(key, fn) {
            var fns = clientsList[key];
            if(!fns) {
                return;
            }
            if(!fn) {
                fns && (fns.length = 0);
            }
            for(var i = 0, len = fns.length; i < len; i++) {
                var _fn = fns[i];
                if(_fn === fn) {
                    fns.splice(i, 1);
                }
            }
        }

        return {
            listen: listen,
            trigger: trigger,
            remove: remove
        }
    })();

    ObserverEvent.listen('squareMeter88', fn1 = function (price) {
        console.log('价格=' + price);
    });
    ObserverEvent.listen('squareMeter100', function (price) {
        console.log('价格=' + price);
    });
    ObserverEvent.trigger('squareMeter88', 200000);
    ObserverEvent.trigger('squareMeter100', 300000);
    ObserverEvent.remove('squareMeter88', fn1);
    ObserverEvent.trigger('squareMeter88', 200000);
})();

/* 装饰者模式 */
// 装饰者模式可以为对象提供额外的功能，而不影响到从该对象派生出来的其他对象
// 应用场景：AOP

// 装饰者模式和代理模式：
// 相同点：都是提供一个对象间接访问对象
// 不同点：主要是目的和设计意图不同。
//        代理模式：当访问本地不方便或者不符合需求时，为这个本体提供一个代替者。
//        装饰者模式：为对象动态添加一些方法
!(function() {
    Function.prototype.after = function(afterFn) {
        var _self = this;
        return function() {
            var ret = _self.apply(this, arguments);
            afterFn.apply(this), arguments;

        }
    }
    var Plance = function(){};
    Plance.prototype.fire = function() {
        console.log('发射子弹');
    }
    var misslieDecorator = function() {
        console.log('发射导弹');
    }

    var p1 = new Plance();
    p1.fire = p1.fire.after(misslieDecorator);
    p1.fire();
})();

// 模块方法模式
// 封装了子类的算法架构，包含了一些公共方法，一级封装了子类所有的方法执行顺序
!(function() {
    var Beverage = function() {}
    Beverage.prototype.boilWater = function() {
        console.log('把水煮沸');
    }
    Beverage.prototype.brew = function() {}
    Beverage.prototype.pourInCup = function() {}
    Beverage.prototype.addCondiments = function() {}

    Beverage.prototype.init = function() {
        this.boilWater();
        this.brew();
        this.pourInCup();
        this.addCondiments();
    }

    var Coffee = function() {}
    Coffee.prototype = new Beverage();
    Coffee.prototype.brew = function() {
        console.log('沸水冲泡咖啡');
    }
    Coffee.prototype.pourInCup = function() {
        console.log('把咖啡倒入杯子');
    }
    Coffee.prototype.addCondiments = function() {
        console.log('加入牛奶');
    }
    var coffee = new Coffee();
    coffee.init();
})();

/* 命令模式 */
// 命令模式指的是一个执行某些特定事情的指令
// 常见的应用场景是：有时候需要向对象发送请求，但不知道接受者是谁，也不知道请求的操作是什么。
// 应用场景：撤销、回放
!(function(btn) {
    var setCommand = function(btn, command) {
        btn.addEventListener('click', function() {
            command.execute();
        });
    } 

    var menuBar = {
        refresh: function() {
            console.log('刷新页面');
        }
    }

    var RefreshMenuBarCommad = function(reciver) {
        return {
            execute: function() {
                reciver.refresh();
            }
        }
    }

    var refreshMenuBarCommad = RefreshMenuBarCommad(menuBar);
    setCommand(btn, refreshMenuBarCommad);

})(document.getElementById('refresh'));

// 享元模式
// 核心是利用共享计数来支持大量细粒度的对象。
// 享元模式的使用取决于：一个程序中使用了大量相似对象。造成很大的内存开销。大多数状态是外部状态。可以用较少的功效对象取代大量对象。
// 应用场景：对象池
!(function() {
    function Model(sex) {
        this.sex = sex;
    }
    Model.prototype.takephoto = function() {
        console.log("sex: " + this.sex + " underwear: " + this.underwear);
    }

    var maleModel = new Model('male');
    var femaleModel = new Model('female');

    for(var i = 1;i <= 50;i++) {
        maleModel.underwear = 'underware'+i;
        maleModel.takephoto();
    }
})();

// 职责链模式
// 使多个对象都有机会处理，形成一条链，并沿着这条链传递请求
!(function() {
    var order500 = function(orderType, pay, stock) {
        if(orderType === 1 && pay === true) {
            console.log('500定金');
        } else {
            return 'nextSuccessor';
        }
    }

    var order200 = function(orderType, pay, stock) {
        if(orderType === 2 && pay === true) {
            console.log('200定金');
        } else {
            return 'nextSuccessor';
        }
    }

    var orderNomarl = function(orderType, pay, stock) {
        if(stock > 0) {
            console.log('普通购买');
        } else {
            console.log('库存不足');
        }
    }

    var Chain = function(fn) {
        this.fn = fn;
        this.success = null
    }
    Chain.prototype.setNextSuccessor = function(succseror) {
        return this.success = succseror;
    }
    Chain.prototype.passRequest = function() {
        var ret = this.fn.apply(this, arguments);
        if(ret === 'nextSuccessor') {
            this.success && this.success.passRequest.apply(this.success, arguments);
        }
    }

    var order500Chain = new Chain(order500);
    var order200Chain = new Chain(order200);
    var orderNormalChain = new Chain(orderNomarl);
    order500Chain.setNextSuccessor(order200Chain);
    order200Chain.setNextSuccessor(orderNormalChain);

    order500Chain.passRequest(3, true, 200);

})();

// 中介者模式
// 中介者模式的作用是解除对象与对象之间的紧耦合关系。增加中介者后，所有的相关对象都通过中介者对象来通信
!(function () {
    var playerDirector = (function () {
        var players = {}, operations = {};
        operations.addPlayer = function (player) {
            var teamColor = player.teamColor;
            players[teamColor] = players[teamColor] || [];
            players[teamColor].push(player);
        };
        operations.removePlayer = function (player) {
            var teamColor = player.teamColor, teamPlayers = players[teamColor] || [];
            for (var i = teamPlayers.length - 1; i >= 0; i++) {
                if (teamPlayers[i] === player) {
                    teamPlayers.splice(i, 1);
                }
            }
        };
        operations.changeTeam = function (player, newTeamColor) {
            operations.removePlayer(player);
            player.teamColor = newTeamColor;
            operations.addPlayer(player);
        };
        operations.playerDead = function (player) {
            var teamColor = player.teamColor, teamPlays = players[teamColor];
            var all_dead = true;
            for (var i = 0, player; player = teamPlays[i++];) {
                if (player.state !== "dead") {
                    all_dead = false;
                    break;
                }
            }
            if (all_dead === true) {
                for (var i = 0, player; player = teamPlays[i++];) {
                    player.lose();
                }
                for (var color in players) {
                    if (color != teamColor) {
                        var teamPlayers = players[color];
                        for (var i = 0, player; player = teamPlayers[i++];) {
                            player.win();
                        }
                    }
                }
            }
        };
        var ReceiveMessage = function () {
            var message = Array.prototype.shift.call(arguments);
            operations[message].apply(this, arguments);
        };
        return {
            ReceiveMessage:ReceiveMessage
        };
    })();
    function Player(name, teamColor) {
        this.name = name;
        this.teamColor = teamColor;
        this.state = "alive";
    }
    Player.prototype.win = function () {
        console.log(this.name + " win ");
    };
    Player.prototype.lose = function () {
        console.log(this.name + " lose ");
    }
    Player.prototype.die = function () {
        this.state = "dead";
        playerDirector.ReceiveMessage("playerDead", this);
    };
    Player.prototype.remove = function () {
        playerDirector.ReceiveMessage("removePlayer", this);
    };
    Player.prototype.changeTeam = function (color) {
        playerDirector.ReceiveMessage("changeTeam", this, color);
    };
    var PlayerFacotry = function (name, teamColor) {
        var newPlayer = new Player(name, teamColor);
        playerDirector.ReceiveMessage("addPlayer", newPlayer);
        return newPlayer;
    };

    //测试
    var player1 = PlayerFacotry("皮蛋","red"),
        player2 = PlayerFacotry("小乖","red");
    var player3 = PlayerFacotry("黑妞","blue"),
        player4 = PlayerFacotry("葱头","blue");
    player1.die();player2.die();
})()

// 状态模式
// 状态模式关键是区分事物内部的状态，事物内部状态改变会带来事物行为的改变
// 策略模式中各个策略类是平等又平行的，他们之间没有任何联系。状态类的行为早已被封装好了，改变行为发生在状态模式内部。
!(function () {
    var delegate = function(client,delegation){
        return {
            buttonWasPressed:function(){
                return delegation.buttonWasPressed.apply(client,arguments);
            }
        };
    };
    var FSM = {
        off: {
            buttonWasPressed: function () {
                console.log("关灯");
                this.currState = this.onState;
            }
        },
        on: {
            buttonWasPressed: function () {
                console.log("开灯");
                this.currState = this.offState;
            }
        }
    };
    var Light = function () {
        this.offState = delegate(this,FSM.off);
        this.onState = delegate(this,FSM.on);
        this.currState = FSM.off;
        this.button = null;
    };
    Light.prototype.init = function () {
        var button = document.createElement("button"), self = this;
        button.innerHTML = "开关";
        this.button = document.body.appendChild(button);
        this.button.onclick = function () {
            self.currState.buttonWasPressed.call(self);
        };
    };
    var light = new Light();
    light.init();
})()