// 如何高效产生m个n范围内的不重复随机数（m<=n)
var getRandomNumber = function(n, m){
    // 待实现方法体
    var result =[],
        i=0,
        j=0,
        arr=[],
        num = 0,
        tempNumber=0;
    function getNum(upperValue,lowerValue){
            var choices = upperValue - lowerValue + 1;
            return Math.floor(Math.random() * choices + lowerValue);
    }
    for(;i<n;i++){
        arr[i]=i;
    }
    for(;j<m;j++){
        num=getNum(j,n-1);
        tempNumber = arr[j];
        arr[j] = arr[num];
        arr[num] = tempNumber;
        result.push(arr[j]);
    }
    return result;
}
console.log(getRandomNumber(20, 3));  // 8,4,19