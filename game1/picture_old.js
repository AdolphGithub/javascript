// 函数式编程.
function getID(id){
    return document.getElementById(id);
}

var box = getID('vvgBox');
var canvas = getID('gameCanvas');

var img = new Image();

function make(url){
    img.src = url;
    var imageArray = [];
    var posArray = [];
    var posArray_bak = [];
    var sourceLi = '';
    img.onload = function(){
        var avgWidth = img.width / 4;
        var avgHeight = img.height / 4;
        var top = 0;
        var left = 0;
        canvas.style.width = img.width + 'px';
        canvas.style.height = img.height + 'px';

        box.style.width = img.width + 'px';
        box.style.height = img.height + 'px';

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
            li.ondragstart = function(event){};
            li.ondragend = function(event){
                event = event || window.event;
                var target = event.target || event.srcElement;
                target.style.opacity = 1;
                // 这里要保存移动对象.
                var left = target.style.left;
                var top = target.style.top;

                target.style.left = sourceLi.style.left;
                target.style.top = sourceLi.style.top;

                sourceLi.style.left = left;
                sourceLi.style.top = top;

                // 如何检查是否完成了.
                if(check()){
                    resetEvent();
                }
            };
            li.ondragleave = function(event){
                event = event || window.event;
                var target = event.target || event.srcElement;
                // 这里要交换.
                target.style.opacity = 1;
                sourceLi = target;
            };
            li.ondragenter = function(event){
                event = event || window.event;
                var target = event.target || event.srcElement;
                target.style.opacity = .5;
            };
            imageArray.push(li);
            posArray.push([i,left,top]);
            // 要记录 不然无法检查.
            oFragment.appendChild(li);
        }
        posArray_bak = posArray.concat();
        canvas.appendChild(oFragment);
        rand();
    };

    function rand(){
        while(imageArray.length > 0){
            var li = imageArray.splice(parseInt(Math.random() * imageArray.length) , 1);
            var pos = posArray.splice(parseInt(Math.random() * posArray.length),1);
            move(li[0],pos);
        }
    }

    function check(){
        for(var i = 0,len=posArray_bak.length;i<len;i++){
            var li = getID(posArray_bak[i][0]);
            var left = li.style.left;
            var top = li.style.top;
            if(parseInt(left) != posArray_bak[i][1]) return false;
            if(parseInt(top) != posArray_bak[i][2]) return false;
        }
        return true;
    }

    function resetEvent(){
        var lis = document.getElementsByTagName('li');
        for(var i = lis.length - 1;i>0;i--){
            lis[i].ondragstart = null;
            lis[i].ondragend = null;
            lis[i].ondragleave = null;
            lis[i].ondragenter = null;
        }
        if(confirm('拼图完成,是否重新开始!')){
            make('./images/01.jpg');
        }
    }

    function move(li,pos){
        li.style.left = parseInt(pos[0][1]) + 'px';
        li.style.top = parseInt(pos[0][2]) + 'px';
    }
}

make('./images/01.jpg');