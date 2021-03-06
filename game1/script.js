
/*  by VVG 2012年6月1日
    E-MAIL:mysheller@163.com
    博客地址：http://www.cnblogs.com/NNUF/
*/
// 获取对象.
function getId(id) {
    return typeof id === "string" ? document.getElementById(id) : id
}
// 设置透明度
function setOpacity(node, level) {
    if (document.all) {
        node.style.filter = 'alpha(opacity=' + level + ')';
    } else {
        node.style.opacity = level / 100;
    }
}

//设置第几关
var vvg = {};
vvg.step = 1;

/* 游戏 内容代码 */
function makeGame(url) {
    var imgArray = [],
        imgArray_bak = [],
        dragging = null,
        draggingL, draggingT, dear, dearL, dearT, top, left, effectEnd,
        posArray = [],
        posArray_bak = [],
        canvas = getId('gameCanvas'),
        vvgBox = getId('vvgBox'),
        successTimer;
    // posx,posy 为鼠标相对于拖动对象的左上角距离， sLeft sTop 为拖动对象的初始位置
    var posx, posy, zindex = 0, isMouseMove;
    var imgWidth, imgHeight;
    var img = new Image();
    img.src = url;
    // 图片加载完毕
    img.onload = function () {
        //获取图片的尺寸
        imgWidth = img.width;
        imgHeight = img.height;
        // 设置以 4* 4 为背景 的 图片.
        var myw = Math.floor(imgWidth / 4),
            myh = Math.floor(imgHeight / 4);

        vvgBox.style.width = imgWidth + 'px';
        vvgBox.style.height = imgHeight + 'px';

        canvas.style.width = imgWidth + 'px';
        canvas.style.height = imgHeight + 'px';
        //清空gameCanvas
        while (canvas.firstChild) {
            canvas.removeChild(canvas.firstChild);
        }
        // 文档碎片
        var oFragment = document.createDocumentFragment();
        //循环生成方块状态的小图，以背景的形式展现，生成16格,并添加到数组
        for (var i = 0; i < 16; i++) {
            var li = document.createElement('li');
            li.style.width = myw + 'px';
            li.style.height = myh + 'px';
            li.style.backgroundImage = 'url(' + url + ')';
            // 计算坐标
            if (i < 4) {//0,1,2,3 第一排
                top = 0;
                left = i * myw;
            } else if (i >= 4 && i < 8) {// 4,5,6,7 第二排
                top = myh;
                left = (i - 4) * myw;
            } else if (i >= 8 && i < 12) {// 8,9,10,11 第三排
                top = 2 * myh;
                left = (i - 8) * myw;
            } else if (i >= 12) { // 12，13，14，15 第四排
                top = 3 * myh;
                left = (i - 12) * myw;
            }
            // 记录还未打乱次序的初始ID对应的每个id的正确位置，用于比较拼图是否完成
            posArray.push([i, left, top]);
            // 赋值背景backgroundPosition 与 位置
            li.style.backgroundPosition = -left + 'px' + ' ' + (-top) + 'px';
            // 赋值ID为i, 用于检查拼图的位置
            li.id = i;
            // 对象是否在移动
            li.isMove = false;
            // 存储到数组imgArray中
            imgArray.push(li);
            li.style.left = left + 'px';
            li.style.top = top + 'px';
            // 事件绑定
            li.onmousedown = function (event) {
                event = event || window.event;
                var target = event.target || event.srcElement;
                isMouseMove = false;
                dragging = target;
                //记录拖动对象的初始位置
                draggingL = parseInt(dragging.style.left);
                draggingT = parseInt(dragging.style.top);
                // 鼠标当前坐标X - 画布左边的距离 - 事件发生源

                posx = event.clientX - canvas.offsetLeft - dragging.offsetLeft;
                posy = event.clientY - canvas.offsetTop - dragging.offsetTop;

                zindex++;
                // 在移动的图片就不绑定事件
                if (!dragging.isMove) {
                    document.onmousemove = function (event) {
                        event = event || window.event;
                        var myleft = event.clientX - canvas.offsetLeft - posx;
                        var mytop = event.clientY - canvas.offsetTop - posy;
                        if (myleft < 0)myleft = 0;
                        if (mytop < 0)mytop = 0;
                        if (myleft > canvas.offsetWidth - dragging.offsetWidth)myleft = canvas.offsetWidth - dragging.offsetWidth;
                        if (mytop > canvas.offsetHeight - dragging.offsetHeight)mytop = canvas.offsetHeight - dragging.offsetHeight;
                        dragging.style.left = myleft + 'px';
                        dragging.style.top = mytop + 'px';
                        dragging.style.zIndex = zindex;
                        // 设置拖动的元素的不透明度
                        setOpacity(dragging, 80);
                        // 获取离拖动元素最近的元素
                        dear = checkMeet(dragging);
                        // 循环设置透明度为100....就是为了改变最近距离的透明度
                        for (var i = 0, n = imgArray_bak.length; i < n; i++) {
                            setOpacity(imgArray_bak[i], 100);
                        }
                        setOpacity(dear, 50);
                        dearL = parseInt(dear.style.left);
                        dearT = parseInt(dear.style.top);
                        isMouseMove = true;
                        return false;
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                        // 只发生单击事件鼠标没有移动时不会设置透明度移动动画操作
                        if (isMouseMove === true) {
                            dear.style.zIndex = zindex;
                            setOpacity(dragging, 100);
                            setOpacity(dear, 100);
                            startMove(dear, draggingL, draggingT, 10);
                            startMove(dragging, dearL, dearT, 10);
                        }
                        isMouseMove = false;
                        dragging = null;
                        return false;
                    };
                }
                return false;
            };
            oFragment.appendChild(li);
        }
        canvas.appendChild(oFragment);
        // 复制一份密码到posArray_bak,用于检查拼图是否完成(id对应正确的位置时，则拼图完成)
        imgArray_bak = imgArray.concat(); //只包含对象
        // posArray.push([i, left, top]);
        posArray_bak = posArray.concat(); //包含对象id以及未打乱对象的位置属性
        play();
        // 打乱数组imgArray

    };
    // 随机排列
    function rank() {
        while (imgArray.length > 0) {
            // 在数组的长度中获取随机值下标
            // 随机获取ID
            var ranLi = imgArray.splice(random(0, imgArray.length), 1);
            // 随机获取位置,并从原数组移除，返回移除项组成的数组
            var ranCss = posArray.splice(random(0, posArray.length), 1);
            // 赋值随机位置
            startMove(ranLi[0], ranCss[0][1], ranCss[0][2], 10);
        }
    }

    // 返回随机数函数
    function random(from, to) {
        return Math.floor(Math.random() * (to - from) + from);
    }

    // 检测与谁相交,判断对象的中心点的距离最近即相交
    function checkMeet(obj) {
        // 存储与每个对象的最小距离的数组
        var disArray = [];
        //循环图片对象列表，求距离并计入数组
        for (var i = 0, n = imgArray_bak.length; i < n; i++) {
            // 排除自身和正在移动的对象
            if (imgArray_bak[i] != obj && !imgArray_bak[i].isMove) {
                var item = getDistance(obj, imgArray_bak[i]);
                //数组只传入一个值，后面的值与第一个值比较，如果比它小这替换这个值,剩下的就是最小的距离
                if (disArray.length == 0) {
                    disArray.push([imgArray_bak[i], item]);
                }
                if (item - 0 < disArray[0][1] - 0) {
                    disArray.splice(0, 1, [imgArray_bak[i], item]);
                }
            }
        }
        // 返回距离最小的对象
        return disArray[0][0];
    }

    // 求两对象中心两点之间的距离,传入对象,利用勾股定理求值
    function getDistance(obj1, obj2) {
        var a = (obj1.offsetLeft + obj1.offsetWidth / 2) - (obj2.offsetLeft + obj2.offsetWidth / 2);
        var b = (obj1.offsetTop + obj1.offsetHeight / 2) - (obj2.offsetTop + obj2.offsetHeight / 2);
        return Math.ceil(Math.sqrt(a * a + b * b));
    }

    // 检查拼图是否完成
    function check() {
        for (var j = 0, n = posArray_bak.length; j < n; j++) {
            // posArray.push([i, left, top]);
            var loopLi = getId(posArray_bak[j][0] + ''); //加空转换成字符串
            var loopLiLeft = parseInt(loopLi.style.left);
            var loopLiTop = parseInt(loopLi.style.top);
            if (loopLiLeft != posArray_bak[j][1]) return false;
            if (loopLiTop != posArray_bak[j][2]) return false;
        }
        return true;
    }

    // 设置移动
    function startMove(obj, x2, y2, time) {
        clearInterval(obj.timer);
        if (!obj.timer) {
            obj.timer = setInterval(function () {
                move(obj, x2, y2);
            }, time);
        }
    }

    // 移动效果
    function move(obj, x2, y2) {
        //判断对象是否移动
        obj.isMove = true;
        var x1 = parseInt(obj.style.left), y1 = parseInt(obj.style.top),
            movex = (x2 > x1 ? Math.ceil : Math.floor)((x2 - x1) / 10),
            movey = (y2 > y1 ? Math.ceil : Math.floor)((y2 - y1) / 10);
        obj.style.left = (x1 + movex) + 'px';
        obj.style.top = (y1 + movey) + 'px';
        if (parseInt(obj.style.left) == x2 && parseInt(obj.style.top) == y2) {
            clearInterval(obj.timer);
            obj.isMove = false;
            obj.timer = null;
            // 通过拼图检查，并已经执行了拼图成功后的效果，避免成功动画也执行拼图成功，产生循环
            if (!!check() && !effectEnd) {
                successTimer && clearTimeout(successTimer);
                successTimer = setTimeout(sucessEffect, 800);
            }
        }
    }

    // 拼图成功后效果
    function sucessEffect() {
        var num = 0, cTimer;
        effect();
        function effect() {
            var copy2 = imgArray_bak.concat();
            var copy1 = posArray_bak.concat();
            // 打乱数组imgArray
            while (copy2.length > 0) {
                // 随机获取ID
                var ranLi = copy2.splice(random(0, copy2.length), 1);
                // 随机获取位置,并从原数组移除，返回移除项组成的数组
                var ranCss = copy1.splice(random(0, copy1.length), 1);
                startMove(ranLi[0], ranCss[0][1], ranCss[0][2], 10);
            }
            num++;
            if (num < 4) {
                setTimeout(effect, 800);
            } else {
                setTimeout(back, 800);
            }
        }

        function back() {
            var copy1 = posArray_bak.concat();
            while (copy1.length > 0) {
                var ranCss = copy1.splice(random(0, copy1.length), 1);
                startMove(getId(ranCss[0][0] + ''), ranCss[0][1], ranCss[0][2], 30);
                // 特效过后弹出蒙板
                cTimer && clearTimeout(cTimer);
                cTimer = setTimeout(tipNextStep, 1000);
            }
            effectEnd = true;
        }
    }

    function play() {
        var mask = document.createElement('div');
        mask.id = 'mask';
        mask.style.width = imgWidth + 'px';
        mask.style.height = imgHeight + 'px';
        setOpacity(mask, 80);
        var playBtn = document.createElement('div');
        playBtn.id = 'button';
        playBtn.onclick = function () {
            canvas.removeChild(mask);
            vvgBox.removeChild(playBtn);
            // 打乱排序
            rank();
        };
        canvas.appendChild(mask);
        vvgBox.appendChild(playBtn);
    }

    // 下一张图按钮
    function tipNextStep() {
        vvg.step += 1;
        var mask = document.createElement('div');
        mask.id = 'mask';
        mask.style.width = imgWidth + 'px';
        mask.style.height = imgHeight + 'px';
        setOpacity(mask, 80);
        var playBtn = document.createElement('div');
        playBtn.id = 'button';
        if (vvg.step < 5) {
            playBtn.onclick = function () {
                canvas.removeChild(mask);
                vvgBox.removeChild(playBtn);
                vvgBox.removeChild(textTip);
                var step = getId('step');
                step.innerHTML = vvg.step;
                makeGame('images/0' + vvg.step + '.jpg');
            }
        } else {
            playBtn.onclick = function () {
                while (canvas.firstChild) {
                    canvas.removeChild(canvas.firstChild);
                }
                var btn = getId('button');
                btn.parentNode.removeChild(btn);
                var tip = getId('textTip');
                tip.innerHTML = '';
                var desTip = getId('desTip');
                desTip.innerHTML = '现在你可以自定义图片了，请在下面的文本框中输入图片的地址：';
                var imgDiy = getId('imgDiy');
                var startDiy = getId('startDiy');
                var imgUrl = getId('imgUrl');
                imgDiy.style.display = 'block';
                startDiy.onclick = function () {
                    if (imgUrl.value == '') {
                        alert('请填入图片地址');
                    } else {
                        makeGame(imgUrl.value);
                    }
                }
            }
        }


        var textTip = document.createElement('div');
        textTip.id = 'textTip';
        textTip.innerHTML = "点击开始第" + vvg.step + "关";
        canvas.appendChild(mask);
        vvgBox.appendChild(playBtn);
        vvgBox.appendChild(textTip);
    }
}

// 默认播放第一关
makeGame('images/01.jpg');
