/**
 * Created by adolph on 17-8-15.
 */
function outer(){
    inner();
}

function inner(){
    console.dir(arguments.callee.caller);
}
// function outer
outer();
// 全局调用则为null
inner();
// 阶乘
function factorial(num){
    if(num<=1){
        return num;
    }else{
        // arguments.callee 指代的即函数本身.
        return num * factorial(num-1);
    }
}

console.dir(factorial(5));



// 挑战一，合并任意个数的字符串
var concat = function(){
    // 待实现方法体
    var result = '';
    for(var i=0,len=arguments.length;i<len;i++){
        result+=arguments[i];
    }
    return result;
}
console.log(concat('st','on','e'));  // stone
// 挑战二，输出指定位置的斐波那契数列
var fioacciSequece = function(count){
    var func = function(count){
        // 待实现方法体
        if(count <= 1){
            return count;
        }
        return arguments.callee(count-1)+arguments.callee(count-2);
    }(--count);
    return func;
};
console.log(fioacciSequece(12));  // 0、1、1、2、3、5、8、13、21、34、55、89
// 挑战三，三维数组或 n 维数组去重，使用 arguments 重写
var arr = [2,3,4,[2,3,[2,3,4,2],5],3,5,[2,3,[2,3,4,2],2],4,3,6,2];
// var unique = function(arr){
//     // 待实现方法体
//     var result = [];
//     var func = function(arr){
//         for(var key in arr){
//             if(Array.isArray(arr[key])){
//                 arr = arr.concat(arguments.callee(arr[key]));
//                 arr.splice(key,1);
//             }
//         }
//         return arr;
//     };
//     arr = func(arr);
//     for(var key in arr){
//         if(result.indexOf(arr[key]) < 0){
//             result.push(arr[key]);
//         }
//     }
//     return result;
// }
// 重构方法.
var unique = function(arr){
    var result = [];
    (function(arr) {
        for (var key in arr) {
            if(Array.isArray(arr[key])){
                arguments.callee(arr[key]);
            }else{
                if(result.indexOf(arr[key]) < 0){
                    result.push(arr[key]);
                }
            }
        }
    })(arr);
    return result;
};
console.log(unique(arr)); // [2,3,4,5,6]