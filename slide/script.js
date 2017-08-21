;(function (window,document) {
    function Slider(element,options){
        if(!element){
            element = 'slide';
        }
        if(!options){
            options = {};
        }
        this._init(element,options);
    }
    // 初始化方法.
    Slider.prototype._init=function(element,options){
        var ele = document.getElementsByClassName(element);
        if(ele.length){
            var divs = ele[0].getElementsByTagName('div');
            this.options = options;
            if(divs.length && divs.length > 0){
                var clone_div = this._clone(divs),
                    img = divs[0].getElementsByTagName('img')[0];
                ele[0].style.width = (parseInt(divs.length) + 1) * parseInt(img.width) + 'px';
                ele[0].appendChild(clone_div);
                // divs = ele[0].getElementsByTagName('div');
                // 这里是索引建立.
                ele.index = 0;
                if(options.autoplay){
                    this._autoPlay(ele,options);
                }
            }
        }else{
            throw '没有找到具体对象!';
        }
    };
    // 移动.
    Slider.prototype._move = function(ele){
        var divs = ele[0].getElementsByTagName('div');
        if(ele.index == divs.length - 1){
            ele.index = 0;
        }
        var img = divs[0].getElementsByTagName('img');
        var width = img[0].width;
        ele[0].style.left = '-'+ ((ele.index * width) + parseInt(width)) + 'px';
        ele.index++;
    };

    Slider.prototype._autoPlay = function(ele){
        // 清除默认的定时器.
        if(ele.timer){
            clearInterval(ele.timer);
        }
        // 开始计算目标.
        var divs = ele[0].getElementsByTagName('div');
        // 清除默认的索引.
        if(ele.index == divs.length){
            ele.index = 0;
        }
        var time = this.options.time || 1000;
        ele.timer = setInterval(function(){
            this._move(ele);
        }.bind(this),time);
    };

    // 查找.
    Slider.prototype._find = function(){

    };

    // clone最后一个.
    Slider.prototype._clone = function(divs){
        return divs.length ? divs[0].cloneNode(true) : null;
    };

    // 挂载到window对象.
    window.Slider = Slider;
})(window,document);