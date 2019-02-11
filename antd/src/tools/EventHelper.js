export default class EventHelper{
    static lazyResize = (func) => {
        if (window.resizeTimer) {
            clearTimeout(window.resizeTimer)
        }

        window.resizeTimer = window.setTimeout(function(){   
            console.log("delayed onresize event", window.resizeTimer);

            if('function' === typeof func){
                func();
            }
        }, 500);
    }
}