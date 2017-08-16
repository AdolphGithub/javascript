(function (window) {
    var element = document.getElementsByClassName('activityModel')[0];
    // element.style.top = 0;
    // element.style.left = 0;

    document.onkeydown=function(e){
        var event = e || window.event;
        console.dir(event.keyCode);
        switch (event.keyCode){
            case 40:
                element.style.top = parseInt(element.style.top) + 20 + 'px';
                break;
            case 38:
                element.style.top = parseInt(element.style.top) - 20 + 'px';
                break;
            case 37:
                element.style.left = parseInt(element.style.left) - 20 + 'px';
                break;
            case 39:
                element.style.left = parseInt(element.style.left) + 20 + 'px';
                break;
            case 32:
                // 这里移动.
                break;
        }
    };
})(window);

