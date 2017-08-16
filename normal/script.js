// 挑战一
var falseObject = new Object(false);
console.log(typeof falseObject);             // object
console.log(falseObject instanceof Object);  // true
console.log(falseObject instanceof Boolean); // true
// 挑战二
var numberObject = new Object(100);
console.log(typeof numberObject);             // object
console.log(numberObject instanceof Object);  // true
console.log(numberObject instanceof Number);  // true
// 挑战三
var stringObject = new Object("abcde");
console.log(typeof stringObject);             // object
console.log(stringObject instanceof Object);  // true
console.log(stringObject instanceof String);  // true
// 挑战四，翻转一个字符串
// 提示：可以使用数组的 reverse() 方法
var reverse = function(str) {
    // 待实现方法体
    return str.split('').reverse().join('');
}
console.log(reverse("hello"));  // "olleh"