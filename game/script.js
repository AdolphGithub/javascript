(function (window) {
    var x = 0;
    var y = 0;
    var size = 20;

    var container = document.getElementsByClassName('container')[0];
    var rowCount = container.offsetHeight / 20;
    var colCount = container.offsetWidth / 20;
    var shape = [];
    var result = {};
    var shapeDiv = [];
    var data = [
        [2, 0, 2, 1, 2, 2, 1, 2],
        [0, 1, 1, 1, 1, 2, 2, 2],
        [0, 1, 1, 1, 2, 1, 3, 1],
        [1, 0, 1, 1, 1, 2, 2, 2],
        [1, 2, 2, 2, 2, 1, 3, 1],
        [1, 1, 2, 1, 1, 2, 2, 2],
        [0, 2, 1, 2, 1, 1, 2, 2]
    ];

    // 初始化函数.
    function init(){
        create();
        document.onkeydown=function(e){
            var event = e || window.event;
            switch (event.keyCode){
                case 40:
                    move(0,1);
                    break;
                case 38:
                    // move(0,-1);
                    rotate();
                    break;
                case 37:
                    move(-1,0);
                    break;
                case 39:
                    move(1,0);
                    break;
                case 32:
                    // 这里 急速下落.

                    break;
            }
        };
    }

    var randShape = function(){
        var index = parseInt(Math.random() * data.length);
        shape = data[index];
    };

    // var interVal = setInterval(function(){
    //     move(0,1);
    // },600);

    var create = function(){
        shapeDiv = [];
        for(var i=0;i<4;i++){
            var div = document.createElement('div');
            div.className = 'activityModel';
            shapeDiv.push(div);
            container.appendChild(div);
        }
        randShape();
        show();
    };

    // 重新渲染.
    var show = function(){
        var divs = document.getElementsByClassName('activityModel');
        for(var i=0,len=divs.length;i<len;i++){
            divs[i].style.top = (shape[i * 2 + 1] - -y) * size + 'px';
            divs[i].style.left = (shape[i * 2] - -x) *size + 'px';
        }
    };
    // 变化.
    var rotate = function () {
        var temp =[shape[1], 3 - shape[0], shape[3], 3 - shape[2], shape[5], 3 - shape[4], shape[7], 3 - shape[6]];
        if(!check(x,y,temp)) return false;
        shape = temp;
        show();
    };
    // 这里是移动函数.
    var move = function(a,b){
        if(check(x+a,y+b,shape)){
            x+=a;
            y+=b;
            show();
        }else{
            if(b == 0)return;
            clearInterval(interVal);
            changeColor();
            create();
            // 扫描并消除.
            findFull();
            interVal = setInterval(function(){
                move(0,1);
            },600);
        }
    };

    init();

    // 开始检测是否超过边界.
    var check = function(x,y,shape){
        var divs = document.getElementsByClassName('activityModel');
        var top = rowCount,
            right = 0,
            bottom = 0,
            overlap = false,
            left = colCount;

        for (var i = divs.length - 1; i >= 0; i--) {
            // 记录方块最左/右坐标
            if (shape[2 * i] < left){
                left = shape[2 * i];
            }
            if (shape[2 * i] > right){
                right = shape[2 * i];
            }
            // 记录方块最上/下边坐标
            if (shape[2 * i + 1] < top){
                top = shape[2 * i + 1];
            }
            if (shape[2 * i + 1] > bottom){
                bottom = shape[2 * i + 1];
            }
            // 判断方块之间是否重叠
            var px = shape[2 * i + 1] + y;
            var py = shape[2 * i] + x;
            if (result[px + "_" + py])
                overlap = true;
        }
        // 开始判断.
        if(((parseInt(left + x) < 0) || parseInt(right + x ) + 1 > colCount) || (parseInt(bottom + y) + 1 > rowCount || parseInt(top + y ) < 0 ) || overlap){
            return false;
        }
        return true;
    };
    // 改变颜色.
    var changeColor = function(){
        var divs = document.getElementsByClassName('activityModel');
        if(divs.length > 0){
            for(var len=divs.length - 1;len>=0;len--){
                var px = shape[2 * len + 1] + y;
                var py = shape[2 * len] + x;
                result[px + "_" + py] = shapeDiv[len];
                divs[len].className = 'stationaryModel';
            }
        }
        x = 3;
        y = 0;
    };
    
    var findFull = function () {
        var score = 0;
        for(var i=0;i<rowCount;i++){
            var count = 0;
            for(var j = 0;j<colCount;j++){
                if(result[i+'_'+j]){
                    count++;
                }
            }
            if(count === colCount){
                score++;
                removeLine(i);
            }
        }
    };
    
    var removeLine = function(row){
        // 删除掉对应的一行.
        for(var i =0;i<colCount;i++){
            container.removeChild(result[row + '_' + i]);
        }
        // 同时把上一行给移动下来.
        for (var i = row; i > 0; i--) {
            for (var j = 0; j < colCount; j++) {
                result[i + "_" + j] = result[(i - 1) + "_" + j];
                if (result[i + "_" + j])
                    result[i + "_" + j].style.top = i * size + "px";
            }
        }

    }

})(window);

