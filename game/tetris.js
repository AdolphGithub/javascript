var tetris = {
    x:0,
    y:0,
    size:20,
    container:'',
    rowCount:20,
    colCount:20,
    shape:[],
    result:{},
    data:[
        [2, 0, 2, 1, 2, 2, 1, 2],
        [0, 1, 1, 1, 1, 2, 2, 2],
        [0, 1, 1, 1, 2, 1, 3, 1],
        [1, 0, 1, 1, 1, 2, 2, 2],
        [1, 2, 2, 2, 2, 1, 3, 1],
        [1, 1, 2, 1, 1, 2, 2, 2],
        [0, 2, 1, 2, 1, 1, 2, 2]
    ],
    interVal:'',
    _score:0,
    // 初始化.
    init:function(){
        this.container = document.getElementsByClassName('container')[0];
        this.rowCount = this.container.offsetHeight / this.size;
        this.colCount = this.container.offsetWidth  / this.size;
    },
    // 渲染方块.
    show:function(){
        var divs = document.getElementsByClassName('activityModel');
        for(var i=0,len=divs.length;i<len;i++){
            divs[i].style.top = (this.shape[i * 2 + 1] - -this.y) * this.size + 'px';
            divs[i].style.left = (this.shape[i * 2] - -this.x) * this.size + 'px';
        }
    },
    // 创建.
    create:function(){
        console.dir(this.score);
        this.shapeDiv = [];
        for(var i=0;i<4;i++){
            var div = document.createElement('div');
            div.className = 'activityModel';
            this.shapeDiv.push(div);
            this.container.appendChild(div);
        }
        this.randShape();
        this.show();
        this.interVal = setInterval(function(){
            this.move(0,1);
        }.bind(this),600);
    },
    // 返回随机的方块.
    randShape:function(){
        var index = parseInt(Math.random() * this.data.length);
        this.shape = this.data[index];
    },
    // 开始游戏.
    start:function(){
        this.create();
        document.onkeydown=function(e){
            var event = e || window.event;
            switch (event.keyCode){
                case 40:
                    this.move(0,1);
                    break;
                case 38:
                    // move(0,-1);
                    this.rotate();
                    break;
                case 37:
                    this.move(-1,0);
                    break;
                case 39:
                    this.move(1,0);
                    break;
            }
        }.bind(this);
    },
    // 移动.
    move:function(a,b){
        // 这里是移动函数.
        if(this.check(this.x+a,this.y+b,this.shape)){
            this.x+=a;
            this.y+=b;
            this.show();
        }else{
            if(b == 0)return;
            clearInterval(this.interVal);
            // 先改变  然后在创建字段.
            this.changeColor();
            if(this.findFull()){
                this.create();
            }else{
                alert('游戏结束');
            }
        }
    },
    // 变化.
    rotate:function(){
        var temp =[this.shape[1], 3 - this.shape[0], this.shape[3], 3 - this.shape[2], this.shape[5], 3 - this.shape[4], this.shape[7], 3 - this.shape[6]];
        if(!this.check(this.x,this.y,temp)) return false;
        this.shape = temp;
        this.show();
    },
    // 判断是否超越边界.
    check:function(x,y,shape){
        var divs = document.getElementsByClassName('activityModel');
        var top = this.rowCount,
            right = 0,
            bottom = 0,
            overlap = false,
            left = this.colCount;

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
            if (this.result[px + "_" + py])
                overlap = true;
        }

        // 开始判断.
        if(((parseInt(left + x) < 0) || parseInt(right + x ) + 1 > this.colCount) || (parseInt(bottom + y) + 1 > this.rowCount || parseInt(top + y ) < 0 ) || overlap){
            return false;
        }
        return true;
    },
    // 扫描所有的,消除掉.
    findFull:function(){
        for(var i=0;i<this.rowCount;i++){
            var count = 0;
            for(var j = 0;j<this.colCount;j++){
                if(this.result[i+'_'+j]){
                    if(i == 0){
                        return false;
                    }
                    count++;
                }
            }
            if(count === this.colCount){
                this.score ++;
                this.removeLine(i);
            }
        }
        return true;
    },
    // 删除一行.
    removeLine:function(row){
        // 删除掉对应的一行.
        for(var i =0;i<this.colCount;i++){
            this.container.removeChild(this.result[row + '_' + i]);
        }
        // 同时把上一行给移动下来.
        for (var i = row; i > 0; i--) {
            for (var j = 0; j < this.colCount; j++) {
                this.result[i + "_" + j] = this.result[(i - 1) + "_" + j];
                if (this.result[i + "_" + j]){
                    this.result[i + "_" + j].style.top = i * this.size + "px";
                }
            }
        }
    },
    // 改变颜色.
    changeColor:function () {
        var divs = document.getElementsByClassName('activityModel');
        if(divs.length > 0){
            for(var len=divs.length - 1;len>=0;len--){
                var px = this.shape[2 * len + 1] + this.y;
                var py = this.shape[2 * len] + this.x;
                this.result[px + "_" + py] = this.shapeDiv[len];
                divs[len].className = 'stationaryModel';
            }
        }
        this.x = 3;
        this.y = 0;
    },
    getScore:function(){
        return this._score;
    }
};

tetris.init();
tetris.start();
tetris.getScore();