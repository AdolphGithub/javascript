var EventUtil = {
    /**
     * 添加事件
     * @param element   事件发生对象.
     * @param type      事件类型.
     * @param handler   事件回调函数.
     */
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            // dom2 的事件添加
            element.addEventListener(type,handler);
        }else if(element.attachEvent){
            // IE的事件添加
            element.attachEvent('on'+type,handler);
        }else{
            // dom1 的事件添加
            element['on'+type] = handler;
        }
    },
    /**
     * 移除事件.
     * @param element   事件移除对象.
     * @param type      事件类型.
     * @param handler   事件回调函数.
     */
    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            // dom2的事件移除
            element.removeEventListener(type,handler);
        }else if(element.detachEvent){
            // IE的事件移除
            element.detachEvent('on'+type,handler);
        }else{
            // dom1的事件移除
            element['on'+type]=handler;
        }
    },
    /**
     * 得到事件发生对象.
     * @param event
     * @returns {string|EventTarget|Node|*|Object}
     */
    getTarget:function(event){
        // 事件发生对象         IE 事件对象
        return event.target || event.srcElement;
    },
    /**
     * 事件.
     * @param event
     * @returns {Event}
     */
    getEvent:function(event){
        return event ? event : window.event;
    },
    /**
     * 阻止事件冒泡
     * @param event
     */
    preventDefault:function(event){
        if(event.preventDefault){
            // dom2 事件冒泡
            event.preventDefault();
        }else{
            // IE 事件冒泡
            event.returnValue = false;
        }
    },
    /**
     * 阻止事件的默认事件
     * @param event
     */
    stopPropagation:function(event){
        if(event.stopPropagation){
            // dom2的默认事件
            event.stopPropagation();
        }else{
            // IE的默认事件
            event.cancelBubble = true;
        }
    }
};