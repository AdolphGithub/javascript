// 挑战一
setTimeout(function () {
    console.log("1");
}, 0)
console.log("2");   // 2,1
// 挑战二
for (var i = 0;i<5;i++) {
    setTimeout(function () {
        console.log(i);     // 5,5,5,5,5
    }, 0)
};
挑战三
var a = 1;
var obj = {
    a : 2,
    b : function(){
        setTimeout(function () {
            // 这里的this指待window对象
            console.log(this.a);
        }, 0)
    }
}
obj.b();    // 1
// 挑战四
var a = 1;
var obj = {
    a : 2,
    b : function(){
        // 被call 改变了作用域,将obj对象传入进去,而这里的this指待obj对象
        setTimeout(function () {
            console.log(this.a);
        }.call(this), 0);
    }
}
obj.b();    // 2
