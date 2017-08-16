var EventUtil = {
    addHandler: function(element, type, handler){
        // 待补充的代码
        if(element.addEventListener){
            element.addEventListener(type,handler);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }else{
            element['on'+type]=handler;
        }
    }
    ,
    removeHandler: function(element, type, handler){
        // 待补充的代码
        if(element.removeEventListener){
            element.removeEventListener(type,handler);
        }else if(element.detachEvent){
            element.detachEvent('on'+type,handler);
        }else{
            element['on'+type]=null;
        }
    },
    getEvent: function(event){
        // 待补充的代码
        return event ? event :window.event;
    },
    getTarget: function(event){
        // 待补充的代码
        return event.target || event.srcElement;
    },
    preventDefault: function(event){
        // 待补充的代码
        // 阻止事件冒泡.
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopPropagation: function(event){
        // 待补充的代码
        // 阻止发生对象的默认事件.
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = false;
        }
    }
};