// 挑战一：数字
var pattern1 = /^\d+/;  // 补全该正则表达式
console.log(pattern1.test('123')); // true
console.log(pattern1.test('abc')); // false
// 挑战二：3位的数字
var pattern2 = /^\d{3}$/;  // 补全该正则表达式
console.log(pattern2.test('123'));  // true
console.log(pattern2.test('1234')); // false
// 挑战三：至少3位的数字
var pattern3 = /^\d{4}/;  // 补全该正则表达式
console.log(pattern3.test('1234')); // true
console.log(pattern3.test('12'));   // false
// 挑战四：3-5位的数字
var pattern4 = /^\d{4}/;  // 补全该正则表达式
console.log(pattern4.test('1234')); // true
console.log(pattern4.test('1'));    // false
// 挑战五：由26个英文字母组成的字符串
var pattern5 = /^[a-z]+$/;  // 补全该正则表达式
console.log(pattern5.test('abc'));  // true
console.log(pattern5.test('1abc')); // false
// 挑战六：由数字和26个英文字母组成的字符串
var pattern6 = /^([0-9]|[a-z])+$/;  // 补全该正则表达式
console.log(pattern6.test('1abc'));  // true
console.log(pattern6.test('_abc'));  // false
// 挑战七：日期格式：年-月-日
var pattern7 = /^\d{4}\-\d{2}\-\d{2}$/;  // 补全该正则表达式
console.log(pattern7.test('2016-08-20'));  // true
console.log(pattern7.test('2016/08/20'));  // false
// 挑战八：时间格式：小时:分钟, 24小时制
var pattern8 = /^\d{2}\:\d{2}$/;  // 补全该正则表达式
console.log(pattern8.test('13:45'));  // true
console.log(pattern8.test('13点45')); // false
// 挑战九：中国大陆身份证号，15位或18位
var pattern9 = /\d{18}|\d{15}/;  // 补全该正则表达式
console.log(pattern9.test('4223222199901090033'));  // true
console.log(pattern9.test('asdfasdfasfasdf1234'));  // false