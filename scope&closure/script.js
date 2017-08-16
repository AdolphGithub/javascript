// 挑战一
function func1() {
    function func2() {
        console.log(this)
    }
    return func2;
}
func1()();  // windows
// 挑战二
scope = "stone";

function Func() {
    var scope = "sophie";

    function inner() {
        console.log(scope);
    }
    return inner;
}

var ret = Func();
ret();    // sophie
// 挑战三
scope = "stone";

function Func() {
    var scope = "sophie";

    function inner() {
        console.log(scope);
    }
    scope = "tommy";
    return inner;
}

var ret = Func();
ret();    // tommy
// 挑战四
scope = "stone";

function Bar() {
    console.log(scope);
}

function Func() {
    var scope = "sophie";
    return Bar;
}

var ret = Func();
ret();    // sophie    stone
// 挑战五
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function() {
        return function() {
            // 这里被改变了作用域 window
            return this.name;
        };
    }
};
console.log(object.getNameFunc()());    // the window
// 挑战六
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function() {
        var that = this;
        return function() {
            return that.name;
        };
    }
};
console.log(object.getNameFunc()());    // My Object