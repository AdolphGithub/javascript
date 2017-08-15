var person={
    name:'person name',
    age:50,
    sex:0,
    weight:50,
    height:170,
    run:function(){
        console.dir('i am '+this.name+', i have '+this.age+' years old');
    }
};

var women={
    sex:1,
    age:18,
    drink:'jude',
    eat:'apple'
};
/*
 * 把 p 中的可枚举属性复制到 o 中，并返回 o
 * 如果 o 和 p 中含有同名属性，则覆盖 o 中的属性
 */
function extend(o, p) {
    // 请实现函数体
    for(var key in p){
        if(p.hasOwnProperty(key)){
            o[key]=p[key];
        }
    }
    return o;
}
/*
 * 将 p 中的可枚举属性复制至 o 中，并返回 o
 * 如果 o 和 p 中有同名的属性，o 中的属性将不受影响
 */
function merge(o, p) {
    // 请实现函数体
    for(var key in p){
        if(p.hasOwnProperty(key) && !o.hasOwnProperty(key)){
            o[key] = p[key];
        }
    }
    return o;
}
/*
 * 如果 o 中的属性在 p 中没有同名属性，则从 o 中删除这个属性
 * 返回 o
 */
function restrict(o, p) {
    // 请实现函数体
    for(var key in o){
        if(!p.hasOwnProperty(key)){
            delete o[key];
        }
    }
    return key;
}
/*
 * 如果 o 中的属性在 p 中存在同名属性，则从 o 中删除这个属性
 * 返回 o
 */
function subtract(o, p) {
    // 请实现函数体
    for(var key in o){
        if(p.hasOwnProperty(key) && o.hasOwnProperty(key)){
            delete o[key];
        }
    }
    return o;
}

/*
 * 返回一个新对象，这个对象同时拥有 o 的属性和 p 的属性
 * 如果 o 和 p 中有重名属性，使用 p 中的属性值
 */
function union(o, p) {
    // 请实现函数体
    var result = {};
    for(var key in p){
        if(p.hasOwnProperty(key) && o.hasOwnProperty(key)){
            result[key]=p[key];
        }
    }
    return result;
}
/*
 * 返回一个新对象，这个对象拥有同时在 o 和 p 中出现的属性
 * 很像求 o 和 p 的交集，但 p 中属性的值被忽略
 */
function intersection(o, p) {
    // 请实现函数体
    var result={};
    for(var key in o){
        if(o.hasOwnProperty(key) && p.hasOwnProperty(key)){
            result[key]=o[key];
        }
    }
    return result;
}
/*
 * 返回一个数组，这个数组包含的是 o 中可枚举的自有属性的名字
 */
function keys(o) {
    // 请实现函数体
    var result = [];
    for(var key in o){
        result.push(key);
    }
    return result;
}