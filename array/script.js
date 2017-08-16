// 挑战一，一维数组
var arr = [2,3,4,2,3,5,6,4,3,2];
var unique = function(arr){
    // 待实现方法体
    var result = [];
    for(var key in arr){
        if(result.indexOf(arr[key]) < 0){
            result.push(arr[key]);
        }
    }
    return result;
}
console.log(unique(arr)); // [2,3,4,5,6]
// 挑战二，二维数组
var arr = [2,3,4,[2,3,4,5],3,5,[2,3,4,2],4,3,6,2];
var unique = function(arr){
    // 待实现方法体
    var result = [];
    for(var key in arr){
        if(Array.isArray(arr[key])){
            arr = arr.concat(arr[key]);
            arr.splice(key,1);
        }
    }
    for(var key in arr){
        if(result.indexOf(arr[key]) < 0){
            result.push(arr[key]);
        }
    }
    return result;
}
console.log(unique(arr)); // [2,3,4,5,6]
// 挑战三，三维数组或 n 维数组
var arr = [2,3,4,[2,3,[2,3,4,2],5],3,5,[2,3,[2,3,4,2],2],4,3,6,2];
var unique = function(arr){
    // 待实现方法体
    var result = [];
    var func = function(arr){
        for(var key in arr){
            if(Array.isArray(arr[key])){
                // 这里需要改动.
                arr = arr.concat(func(arr[key]));
                arr.splice(key,1);
            }
        }
        return arr;
    };
    arr = func(arr);
    for(var key in arr){
        if(result.indexOf(arr[key]) < 0){
            result.push(arr[key]);
        }
    }
    return result;
}
console.log(unique(arr)); // [2,3,4,5,6]
