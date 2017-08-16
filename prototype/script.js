// 挑战一
// 1.定义一个构造函数 Animal，它有一个 name 属性，以及一个 eat() 原型方法。
// 2.eat() 的方法体为：console.log(this.name + " is eating something.")。
// 3.new 一个 Animal 的实例 tiger，然后调用 eat() 方法。
// 4.用 __proto__ 模拟 new Animal() 的过程，然后调用 eat() 方法。

// 函数的prototype 指向 函数的实例. 改变这个的指向 即可继承

var Animal = function(name){
    // 待补充的代码
    this.name = name ;
};

Animal.prototype.eat = function(){
    console.dir(this.name + ' is eating something');
}
var tiger = new Animal("tiger");
// 待补充的代码
tiger.eat();
var tiger2 = {};
tiger2.__proto__ = new Animal();
Animal.call(tiger2,'tiger2');
tiger2.eat();
// 待补充的代码
// 挑战二
// 1.定义一个构造函数 Bird，它继承自 Animal，它有一个 name 属性，以及一个 fly() 原型方法。
// 2.fly() 的方法体为：console.log(this.name + " want to fly higher.");。
// 3.new 一个 Bird 的实例 pigeon，然后调用 eat() 和 fly() 方法。
// 4.用 __proto__ 模拟 new Bird() 的过程，然后用代码解释 pigeon2 为何能调用 eat() 方法。

var Bird = function(name){
    // 待补充的代码
    this.name = name;
}
Bird.prototype = new Animal();
Bird.prototype.fly = function(){
    console.dir(this.name + ' want to fly higher.');
}

var pigeon = new Bird("pigeon");
// 待补充的代码
pigeon.eat();
pigeon.fly();
var pigeon2 = {};
// 待补充的代码  非重要  只有实例话后才有
pigeon2.__proto__ = new Bird();
Bird.call(pigeon2,'pigeon2');
pigeon2.fly();
pigeon2.eat();
// 挑战三
// 1.定义一个构造函数 Swallow，它继承自 Bird，它有一个 name 属性，以及一个 nesting() 原型方法。
// 2.nesting() 的方法体为：console.log(this.name + " is nesting now.");。
// 3.new 一个 Swallow 的实例 yanzi，然后调用 eat()、fly() 和 nesting() 方法。
// 4.用 __proto__ 模拟 new Swallow() 的过程，然后用代码解释 yanzi2 为何能调用 eat() 方法。

var Swallow = function(name){
    // 待补充的代码
    this.name = name;
}
Swallow.prototype = new Bird();
Swallow.prototype.nesting = function(){
    console.dir(this.name+ ' is nesting now.');
}

var yanzi = new Swallow("yanzi");
// 待补充的代码
yanzi.nesting();
yanzi.eat();
yanzi.fly();
var yanzi2 = {};
// 待补充的代码
yanzi2.__proto__ = new Swallow();
Swallow.call(yanzi2,'yanzi2');
yanzi2.eat();
yanzi2.fly();
yanzi2.nesting();
