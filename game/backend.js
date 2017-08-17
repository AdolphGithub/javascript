// // 获取最大值和最小值.
// var maxLeft = function(){
//     var element = document.getElementsByClassName('activityModel');
//     var lefts = [],result=[];
//     for(var i=0,len=element.length;i<len;i++){
//         lefts.push(parseInt(element[i].style.left));
//     }
//     result.push(Math.min.apply(Math,lefts));
//     result.push(Math.max.apply(Math,lefts));
//     return result;
// };
// // 获取最大值和最小值.
// var maxTop = function () {
//     var element = document.getElementsByClassName('activityModel');
//     var tops = [],result=[];
//     for(var i=0,len=element.length;i<len;i++){
//         tops.push(parseInt(element[i].style.top));
//     }
//     result.push(Math.min.apply(Math,tops));
//     result.push(Math.max.apply(Math,tops));
//     return result;
// }