//具体手势编写者代码

gesture.register("tap",function (dispatcher,context,finger){
    var startX, startY;
    var startTime;
    var isTap = true;

    this.start = function(event,point){
        startX = point.clientX;
        startY = point.clientY;
        finger.isTap = true;
        startTime = Date.now();
    };
    this.move = function(event,point){
        var x = point.clientX;
        var y = point.clientY;
        var dx = x - startX,
            dy = x - startY,
            d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        if(d > 10 * window.devicePixelRatio) {
            finger.isTap = false;
        }
    };
        
    this.end = function(event,point){
        if( finger.isTap && Date.now() - startTime < 500 && !finger.events["hold"]) {
            dispatcher.triggerEvent("tap");
        }
        
    };
    this.cancel = function(event,point){

    };
})
gesture.register("hold",function (dispatcher,context,finger){
    var startX, startY;
    var startTime;
    var fail = false;

    this.start = function(event,point){
        startX = point.clientX;
        startY = point.clientY;
        startTime = Date.now();
        finger.timer = setTimeout(function(){
            if( !finger.events["tap"]) {
                dispatcher.triggerEvent("hold",{});
                dispatcher.commit();
            }
        },500)
    };
    this.move = function(event,point){
        var x = point.clientX;
        var y = point.clientY;
        var dx = x - startX,
            dy = x - startY,
            d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        if(d > 10 * window.devicePixelRatio) {
            clearTimeout(finger.timer);
        }
    };
        
    this.end = function(event,point){
        clearTimeout(finger.timer);
    };
    this.cancel = function(event,point){
        clearTimeout(finger.timer);
    };
});

gesture.register("pan",function (dispatcher,context,finger){

    var startX, startY;
    var startTime;

    this.start = function(event,point){
        startX = point.clientX;
        startY = point.clientY;
        startTime = Date.now();
    };
    this.move = function(event,point){
        var x = point.clientX;
        var y = point.clientY;
        var dx = x - startX,
            dy = y - startY,
            d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            
        if(!finger.panning && d > 10 * window.devicePixelRatio) {
            finger.panning = true;
            if(Math.abs(dx) > Math.abs(dy)) {
                finger.isHorizontal = true;
                finger.isVertical = false;
            } else {
                finger.isHorizontal = false;
                finger.isVertical = true;
            }
            dispatcher.triggerEvent("panstart",{
                startX:startX,
                startY:startY,
                isHorizontal:finger.isHorizontal,
                isVertical:finger.isVertical 
            });
        }
        if(finger.panning) {
            dispatcher.triggerEvent("pan",{
                displacementX:dx,
                displacementY:dy,
                isHorizontal:finger.isHorizontal,
                isVertical:finger.isVertical 
            });
        }
    };
        
    this.end = function(event,point){
        var x = point.clientX;
        var y = point.clientY;
        var dx = x - startX,
            dy = y - startY;
        if(finger.panning) {
            dispatcher.triggerEvent("panend",{
                displacementX:dx,
                displacementY:dy,
                isHorizontal:finger.isHorizontal,
                isVertical:finger.isVertical 
            });
        }
    };
    this.cancel = function(event,point){
        var x = point.clientX;
        var y = point.clientY;
        var dx = x - startX,
            dy = y - startY;
        if(finger.panning) {
            dispatcher.triggerEvent("panend",{
                displacementX:dx,
                displacementY:dy,
                isHorizontal:finger.isHorizontal,
                isVertical:finger.isVertical 
            });
        }
    };
})


gesture.register("flick",function (dispatcher,context,finger){

    var startX, startY;
    var lastX, lastY;
    var lastT
    var vx, vy;
    var startTime;
    var panning = false;
    var avx = 0;
    var avy = 0;
    var duration = 0;
    var maxduration = 500;

    this.start = function(event,point){
        startX = point.clientX;
        startY = point.clientY;
        lastX = startX;
        lastY = startY;
        lastT = Date.now();
    };
    this.move = function(event,point){
        var x = point.clientX;
        var y = point.clientY;
        var dx = x - startX;
        var dy = y - startY;
        var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        var now = Date.now()
        var dt = now - lastT;
        var vx = (x - lastX)/dt;
        var vy = (y - lastY)/dt;
        
        if(dt>maxduration) {
            dt = maxduration;
        }
        
        duration = Math.min(duration,  maxduration - dt);
        if(!panning && d > 10 * window.devicePixelRatio) {
            panning = true;
            if(Math.abs(dx) > Math.abs(dy)) {
                finger.isHorizontal = true;
                finger.isVertical = false;
            } else {
                finger.isHorizontal = false;
                finger.isVertical = true;
            }
        }
        if(!panning) {
            return;
        }
        avx = (vx * dt + avx * duration) / (duration + dt);
        avy = (vy * dt + avy * duration) / (duration + dt);
        
        duration += dt;
        lastX = x;
        lastY = y;
        lastT = now;
    };
        
    this.end = function(event,point){
        this.move(event,point);
        if(panning && (Math.abs(avx) > 0.5 || Math.abs(avy) > 0.5) ) {
            dispatcher.triggerEvent("flick",{
                isHorizontal:finger.isHorizontal,
                isVertical:finger.isVertical
            });
        }
    };
    this.cancel = function(event,point){

    };
})

gesture.register("touch",function (dispatcher,context,finger){
    var startX, startY;
    var startTime;
    var isTap = true;

    this.start = function(event,point){
        dispatcher.triggerEvent("touchstart",{});
    };
    this.move = function(event,point){
        dispatcher.triggerEvent("touchmove",{});
    };
        
    this.end = function(event,point){
        dispatcher.triggerEvent("touchend",{});
        
    };
    this.cancel = function(event,point){
        dispatcher.triggerEvent("touchcancel",{});

    };
})
/*
gesture.register("zoom",2,function (dispatcher,context,finger){
    var startX, startY;
    var startTime;
    var isTap = true;

    this.start = function(event,point){
        dispatcher.triggerEvent("touchstart",{});
    };
    this.move = function(event,point){
        dispatcher.triggerEvent("touchmove",{});
    };
        
    this.end = function(event,point){
        dispatcher.triggerEvent("touchend",{});
        
    };
    this.cancel = function(event,point){
        dispatcher.triggerEvent("touchcancel",{});

    };
});
*/