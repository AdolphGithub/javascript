// 面向对象.
(function(window){
    function Picture(){
        this.box = ''; // 盒子.
        this.canvas = '';  // 画布.
        this.img = '';      // image对象.
        this.posArray_bak = []; // 记录坐标对象.

        this.getID = function(id){
            return document.getElementById(id);
        };
        this.init = (function(box_name,canvas){
            // 获取box对象.画布对象.
            this.box = this.getID(box_name);
            this.canvas = this.getID(canvas);
            if(!this.box || !this.canvas){
                return false;
            }
            this.img = new Image();
            return true;
        }).bind(this);
        this.make = function(url){
            this.img.src = url;

            var imageArray = [];
            var posArray = [];
            // 保存源li对象.
            var sourceLi = '';
            // 加载图像.
            this.img.onload = (function(){
                var avgWidth = this.img.width / 4;
                var avgHeight = this.img.height / 4;
                var top = 0;
                var left = 0;
                this.canvas.style.width = this.img.width + 'px';
                this.canvas.style.height = this.img.height + 'px';

                this.box.style.width = this.img.width + 'px';
                this.box.style.height = this.img.height + 'px';

                // 相当于是一个缓存对象.用于一次行添加.
                var oFragment = document.createDocumentFragment();
                for(var i=0;i<16;i++){
                    var li = document.createElement('li');
                    li.style.width = avgWidth + 'px';
                    li.style.height = avgHeight + 'px';
                    li.style.backgroundImage = 'url('+url+')';
                    if(i<4){
                        top = 0;
                        left = i * avgWidth;
                    }else if(i<8){
                        top = avgHeight;
                        left = (i -4) * avgWidth;
                    }else if (i < 12) {// 8,9,10,11 第三排
                        top = 2 * avgHeight;
                        left = (i - 8) * avgWidth;
                    } else if (i >= 12) { // 12，13，14，15 第四排
                        top = 3 * avgHeight;
                        left = (i - 12) * avgWidth;
                    }
                    li.style.backgroundPosition = -left + 'px '+ -top + 'px';
                    // 根据坐标来生成.
                    li.style.left = left + 'px';
                    li.style.top = top + 'px';
                    li.setAttribute('id',i);
                    li.setAttribute('draggable',true);
                    // 开始拖动.
                    li.ondragstart = function(event){};
                    // 拖动结束.
                    li.ondragend = (function(event){
                        event = event || window.event;
                        var target = event.target || event.srcElement;
                        if(event.preventDefault){
                            event.preventDefault();
                        }else{
                            event.returnValue = false;
                        }

                        target.style.opacity = 1;
                        // 这里要保存移动对象.
                        var left = target.style.left;
                        var top = target.style.top;

                        target.style.left = sourceLi.style.left;
                        target.style.top = sourceLi.style.top;

                        sourceLi.style.left = left;
                        sourceLi.style.top = top;

                        // 如何检查是否完成了.
                        if(this.check()){
                            this.resetEvent();
                        }
                    }).bind(this);
                    // 当拖动目标移开.
                    li.ondragleave = function(event){
                        event = event || window.event;
                        // 阻止事件冒泡.
                        if(event.preventDefault){
                            event.preventDefault();
                        }else{
                            event.returnValue = false;
                        }
                        var target = event.target || event.srcElement;
                        // 这里要交换.
                        target.style.opacity = 1;
                        sourceLi = target;
                    };
                    // 当拖动目标进入到放置位置.
                    li.ondragenter = function(event){
                        event = event || window.event;
                        // 阻止事件冒泡.
                        if(event.preventDefault){
                            event.preventDefault();
                        }else{
                            event.returnValue = false;
                        }

                        var target = event.target || event.srcElement;
                        target.style.opacity = .5;
                    };
                    imageArray.push(li);
                    posArray.push([i,left,top]);
                    // 要记录 不然无法检查.
                    oFragment.appendChild(li);
                }
                this.posArray_bak = posArray.concat();
                this.canvas.appendChild(oFragment);
                // 随机目标.
                this.rand();
            }).bind(this);

            this.rand = function(){
                while(imageArray.length > 0){
                    var li = imageArray.splice(parseInt(Math.random() * imageArray.length) , 1);
                    var pos = posArray.splice(parseInt(Math.random() * posArray.length),1);
                    // 移动目标.
                    this.move(li[0],pos);
                }
            };
            // 检查是否完成.
            this.check = function(){
                for(var i = 0,len=this.posArray_bak.length;i<len;i++){
                    var li = this.getID(this.posArray_bak[i][0]);
                    var left = li.style.left;
                    var top = li.style.top;
                    if(parseInt(left) != this.posArray_bak[i][1]) return false;
                    if(parseInt(top) != this.posArray_bak[i][2]) return false;
                }
                return true;
            };
            // 重置所有事件.
            this.resetEvent=function(){
                var lis = document.getElementsByTagName('li');
                for(var i = lis.length - 1;i>0;i--){
                    lis[i].ondragstart = null;
                    lis[i].ondragend = null;
                    lis[i].ondragleave = null;
                    lis[i].ondragenter = null;
                }
                if(confirm('拼图完成,是否重新开始!')){
                    this.make('./images/01.jpg');
                }
            };

            this.move = function(li,pos){
                li.style.left = parseInt(pos[0][1]) + 'px';
                li.style.top = parseInt(pos[0][2]) + 'px';
            }
        }
    };

    var picture = new Picture();

    if(picture.init('vvgBox','gameCanvas')){
        picture.make('./images/01.jpg');
    }
})(window);