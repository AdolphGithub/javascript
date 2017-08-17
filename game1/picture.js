function getID(id){
    return document.getElementById(id);
}

var box = getID('vvgBox');
var canvas = getID('gameCanvas');

var img = new Image();

function make(url){
    img.src = url;
    var imageArray = [16];
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
            imageArray[i] = [left,top];
            // 要记录 不然无法检查.
            oFragment.appendChild(li);
        }
        console.dir(imageArray);
        canvas.appendChild(oFragment);
    }
}

make('./images/01.jpg');