//Gesture 框架代码

window.gesture = window.gesture || {};

["capture","listen"].forEach(function(method){
    var useCapture = {
        capture:true,
        listen:false
    }
    gesture[method] = function(element){
        
        if(window.ontouchstart === undefined) {
            return gesture.captureMouse(element)//.concat(gesture.captureTouch());
        } else {
            return gesture.captureTouch(element)//.concat(gesture.captureTouch());
        }
    }

    gesture[method+"Touch"] = function(element){
        var pm = new ParserManager;
        element.addEventListener("touchstart",function(event){
            Array.prototype.forEach.call(event.changedTouches,function(touch){
                pm.start(event,touch);
            });
            document.addEventListener("touchmove",move,useCapture[method]);
            document.addEventListener("touchend",end,useCapture[method]);
            document.addEventListener("touchcancel",cancel,useCapture[method]);
        },true);
    

        function move(event){
            Array.prototype.forEach.call(event.changedTouches,function(touch){
                pm.move(event,touch);
            });
        }
        function end(event){
            Array.prototype.forEach.call(event.changedTouches,function(touch){
                pm.end(event,touch);
            });
            document.removeEventListener("touchmove",move,useCapture[method]);
            document.removeEventListener("touchend",end,useCapture[method]);
            document.removeEventListener("touchcancel",cancel,useCapture[method]);
        }
        function cancel(event){
            Array.prototype.forEach.call(event.changedTouches,function(touch){
                pm.cancel(event,touch);
            });
            document.removeEventListener("touchmove",move,useCapture[method]);
            document.removeEventListener("touchend",end,useCapture[method]);
            document.removeEventListener("touchcancel",cancel,useCapture[method]);
        }
        return pm;
    }

    gesture[method+"Mouse"] = function(element){
        var pm = new ParserManager;
        element.addEventListener("mousedown",function(event){
            pm.start(event,event);
            document.addEventListener("mousemove",mousemove,useCapture[method]);
            document.addEventListener("mouseup",mouseup,useCapture[method]);
        },true);

        function mousemove(event){
            pm.move(event,event);
        }
        function mouseup(event){
            pm.end(event,event);
            document.removeEventListener("mousemove",mousemove,useCapture[method]);
            document.removeEventListener("mouseup",mouseup,useCapture[method]);
        }
        return pm;
    }

});



var parsers = {};


function ParserManager() {
    var fingers = {};
    var dispatcher = new Dispatcher(fingers);
    var activeParsers = [];
    
    var parserContexts = {};
    var fingerContexts = {};

    
    this.start = function(event,point){
        var id = point.identifier || " ";
        fingers[id] = {events:[],parsers:{}};
        
        for(var i = 0; i < activeParsers.length; i++) {
            fingers[id].parsers[activeParsers[i]] = new parsers[activeParsers[i]].class(dispatcher,parserContexts[activeParsers[i]],fingers[id]);
        }

        dispatcher.event = event;
        dispatcher.point = point;
        for(var p in fingers[id].parsers) {
            fingers[id].parsers[p].start(event,point);
        }
        dispatcher.commit();
    };
    this.move = function(event,point){
        var id = point.identifier || " ";
        dispatcher.event = event;
        dispatcher.point = point;
        for(var p in fingers[id].parsers) {
            fingers[id].parsers[p].move(event,point);
        }
        dispatcher.commit();
    };
    this.end = function(event,point){
        var id = point.identifier || " ";
        dispatcher.event = event;
        dispatcher.point = point;
        for(var p in fingers[id].parsers) {
            fingers[id].parsers[p].end(event,point);
        }
        dispatcher.commit();
        delete fingers[id];
    };
    this.cancel = function(event,point){
        var id = point.identifier || " ";
        dispatcher.event = event;
        dispatcher.point = point;
        for(var p in fingers[id].parsers) {
            fingers[id].parsers[p].cancel(event,point);
        }
        dispatcher.commit();
        delete fingers[id];
    };
    this.parse = function(){
        
        activeParsers = [];
        for(var i = 0 ; i < arguments.length; i++ ) {
            parserContexts[arguments[i].name] = Object.create(null);
            activeParsers.push(arguments[i].name || arguments[i]);
            //activeParsers.push(new parsers[arguments[i].name || arguments[i]](dispatcher.getDispatcher(arguments[i]["as"] || arguments[i])));
        }
        return dispatcher;
    }
}

function Dispatcher(fingers) {
    this.events = {}
    this.handlers = [];
    this.point = null;
    this.event = null;
    this.queue = [];
    
    this.getDispatcher = function(name){
        var dispatcher = Object.create(this);
        with(this) {
            dispatcher.trigger = function(params){
                triggerEvent(name,params);
            }
        }
        return dispatcher;
    }
    this.triggerEvent = function(name,params) {
        this.queue.push({name:name,params:params});
    }
    this.commit = function(){
        for(var i = 0; i < this.queue.length; i++) {
            var name = this.queue[i].name, params = this.queue[i].params;
            with(this) {
                finger = fingers[point.identifier||" "];
                finger.events[name] = true;
                handlers.forEach(function(handler){
                    var gesture = Object.create(params || null);
                    gesture.touchEvent = event;
                    gesture.point = point;
                    gesture.finger = finger;
                    gesture.name = name;
                    handler(gesture);
                })
            }
        }
        this.queue = [];
    }
    this.dispatch = function(){
        this.handlers.push(function(gesture){
            var event = document.createEvent('HTMLEvents');
            event.initEvent(gesture.name, true, true);
            for(var p in gesture) {
                event[p] = gesture[p];
            }
            
            
            gesture.point.target.dispatchEvent(event);
        })
        return this;
    }
    this.handler = function(handler){
        this.handlers.push(handler);
        return this;
    }
}


gesture.register = function(name,parser,fingerCount){
    parsers[name] = {
        class:parser,
        fingerCount: 0
    };
}
gesture.unregister = function(name,parser){
    if(parser!==parsers[name]) debugger;
    delete parsers[name];
}

/*
//使用方式2，作为一个原生事件派发
gesture.listen(document.documentElement).parse({name:"hold",as:"hold2"}).dispatch({hold:"hold2"});

document.documentElement.addEventListener("hold2",function(event){
    console.log(event.type);
},false);
*/


/*
gesture.capture(document.documentElement).parse("tap").handler(function(){

});
*/
/*
gesture.register("tap",{
    start:
    move:
    end:
    cancel:
})
*/
//gesture.listen(document.documentElement).recogonize("tap")
//gesture.register("tap",function(){})
/*
document.documentElement.addEventListener("touchstart",function(event){
    console.log(event.changedTouches[0]);

},true);
*/
/*
;(function(win, lib, undef) {

var doc = win.document,
    docEl = doc.documentElement,
    slice = Array.prototype.slice,
    gestures = {}, lastTap = null
    ;

function getCommonAncestor (el1, el2) {
    var el = el1;
    while (el) {
        if (el.contains(el2) || el == el2) {
            return el;
        }
        el = el.parentNode;
    }    
    return null;
}

function fireEvent(element, type, extra) {
    var event = doc.createEvent('HTMLEvents');
    event.initEvent(type, true, true);

    if(typeof extra === 'object') {
        for(var p in extra) {
            event[p] = extra[p];
        }
    }

    element.dispatchEvent(event);
}

function calc(x1, y1, x2, y2, x3, y3, x4, y4) {
    var rotate = Math.atan2(y4 - y3, x4 - x3) - Math.atan2(y2 - y1, x2 - x1),
        scale = Math.sqrt((Math.pow(y4 - y3, 2) + Math.pow(x4 - x3, 2)) / (Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))),
        translate = [x3 - scale * x1 * Math.cos(rotate) + scale * y1 * Math.sin(rotate), y3 - scale * y1 * Math.cos(rotate) - scale * x1 * Math.sin(rotate)]
        ;
    return {
        rotate: rotate,
        scale: scale,
        translate: translate,
        matrix: [
            [scale * Math.cos(rotate), -scale * Math.sin(rotate), translate[0]],
            [scale * Math.sin(rotate), scale * Math.cos(rotate), translate[1]],
            [0, 0, 1]
        ]
    }
}

function touchstartHandler(event) {

    if (Object.keys(gestures).length === 0) {
        docEl.addEventListener('touchmove', touchmoveHandler, false);
        docEl.addEventListener('touchend', touchendHandler, false);
        docEl.addEventListener('touchcancel', touchcancelHandler, false);
    }
    
    for(var i = 0 ; i < event.changedTouches.length ; i++ ) {
        var touch = event.changedTouches[i],
            touchRecord = {};

        for (var p in touch) {
            touchRecord[p] = touch[p];
        }

        var gesture = {
            startTouch: touchRecord,
            startTime: Date.now(),
            status: 'tapping',
            element: event.srcElement,
            pressingHandler: setTimeout(function(element) {
                return function () {
                    if (gesture.status === 'tapping') {
                        gesture.status = 'pressing';

                        fireEvent(element, 'press', {
                            touchEvent:event
                        });
                    }

                    clearTimeout(gesture.pressingHandler);
                    gesture.pressingHandler = null;
                }
            }(event.srcElement), 500)
        }
        gestures[touch.identifier] = gesture;
    }

    if (Object.keys(gestures).length == 2) {
        var elements = [];

        for(var p in gestures) {
            elements.push(gestures[p].element);
        }

        fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchstart', {
            touches: slice.call(event.touches),
            touchEvent: event
        });
    }
}



function touchmoveHandler(event) {
    for(var i = 0 ; i < event.changedTouches.length ; i++ ) {
        var touch = event.changedTouches[i],
            gesture = gestures[touch.identifier];

        if (!gesture) {
            return;
        }
        
        if(!gesture.lastTouch) {
            gesture.lastTouch = gesture.startTouch;
        }
        if(!gesture.lastTime) {
            gesture.lastTime = gesture.startTime;
        }
        if(!gesture.velocityX) {
            gesture.velocityX = 0;
        }
        if(!gesture.velocityY) {
            gesture.velocityY = 0;
        }
        if(!gesture.duration) {
            gesture.duration = 0;
        }
        
        var time =  Date.now()-gesture.lastTime;
        var vx = (touch.clientX - gesture.lastTouch.clientX)/time,
            vy = (touch.clientY - gesture.lastTouch.clientY)/time;
        
            
        var RECORD_DURATION = 70;
        if( time > RECORD_DURATION ) {
            time = RECORD_DURATION;
        }
        if( gesture.duration + time > RECORD_DURATION ) {
            gesture.duration = RECORD_DURATION - time;
        }

        gesture.velocityX = (gesture.velocityX * gesture.duration + vx * time) / (gesture.duration+ time);
        gesture.velocityY = (gesture.velocityY * gesture.duration + vy * time) / (gesture.duration+ time);
        gesture.duration += time;

        gesture.lastTouch = {};
        
        for (var p in touch) {
            gesture.lastTouch[p] = touch[p];
        }
        gesture.lastTime = Date.now();
        
        //if(gesture.duration>=300)
        
        //ctx.lineTo(xxx+=2,gesture.velocityY*100+200);
        //ctx.stroke();
        
        console.log([gesture.velocityX, gesture.velocityY])

        var displacementX = touch.clientX - gesture.startTouch.clientX,
            displacementY = touch.clientY - gesture.startTouch.clientY,
            distance = Math.sqrt(Math.pow(displacementX, 2) + Math.pow(displacementY, 2));
        
        // magic number 10: moving 10px means pan, not tap
        if (gesture.status === 'tapping' && distance > 10) {
            gesture.status = 'panning';
            fireEvent(gesture.element, 'panstart', {
                touch:touch,
                touchEvent:event
            });

            if(Math.abs(displacementX) > Math.abs(displacementY)) {
                fireEvent(gesture.element, 'horizontalpanstart', {
                    touch: touch,
                    touchEvent: event
                });
                gesture.isVertical = false;
            } else {
                fireEvent(gesture.element, 'verticalpanstart', {
                    touch: touch,
                    touchEvent: event
                });
                gesture.isVertical = true;
            }
        }

        if (gesture.status === 'panning') {
            gesture.panTime = Date.now();
            fireEvent(gesture.element, 'pan', {
                displacementX: displacementX,
                displacementY: displacementY,
                touch: touch,
                touchEvent: event
            });


            if(gesture.isVertical) {
                fireEvent(gesture.element, 'verticalpan',{
                    displacementY: displacementY,
                    touch: touch,
                    touchEvent: event
                });
            } else {
                fireEvent(gesture.element, 'horizontalpan',{
                    displacementX: displacementX,
                    touch: touch,
                    touchEvent: event
                });
            }
        }
    }

    if (Object.keys(gestures).length == 2) {
        var position = [],
            current = [],
            elements = [],
            transform
            ;
        
        for(var i = 0 ; i < event.touches.length ; i++ ) {
            var touch = event.touches[i];
            var gesture = gestures[touch.identifier];
            position.push([gesture.startTouch.clientX, gesture.startTouch.clientY]);
            current.push([touch.clientX, touch.clientY]);
        }

        for(var p in gestures) {
            elements.push(gestures[p].element);
        }

        transform = calc(position[0][0], position[0][1], position[1][0], position[1][1], current[0][0], current[0][1], current[1][0], current[1][1]);
        fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouch',{
            transform : transform,
            touches : event.touches,
            touchEvent: event
        });
    }
}


function touchendHandler(event) {

    if (Object.keys(gestures).length == 2) {
        var elements = [];
        for(var p in gestures) {
            elements.push(gestures[p].element);
        }
        fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
            touches: slice.call(event.touches),
            touchEvent: event
        });
    }
    
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i],
            id = touch.identifier,
            gesture = gestures[id];

        if (!gesture) continue;

        if (gesture.pressingHandler) {
            clearTimeout(gesture.pressingHandler);
            gesture.pressingHandler = null;
        }

        if (gesture.status === 'tapping') {
            gesture.timestamp = Date.now();
            fireEvent(gesture.element, 'tap', {
                touch: touch,
                touchEvent: event
            });

            if(lastTap && gesture.timestamp - lastTap.timestamp < 300) {
                fireEvent(gesture.element, 'doubletap', {
                    touch: touch,
                    touchEvent: event
                });
            }

            this.lastTap = gesture;
        }

        if (gesture.status === 'panning') {
            var duration = Date.now() - gesture.startTime,
                velocityX = (touch.clientX - gesture.startTouch.clientX) / duration,
                velocityY = (touch.clientY - gesture.startTouch.clientY) / duration,
                displacementX = touch.clientX - gesture.startTouch.clientX,
                displacementY = touch.clientY - gesture.startTouch.clientY
                ;

            var velocity = Math.sqrt(gesture.velocityY*gesture.velocityY+gesture.velocityX*gesture.velocityX);

            fireEvent(gesture.element, 'panend', {
                isflick: velocity > 0.5 ,
                touch: touch,
                touchEvent: event
            });
            
            if (velocity > 0.5 ) {
                fireEvent(gesture.element, 'flick', {
                    duration: duration,
                    velocityX: gesture.velocityX,
                    velocityY: gesture.velocityY,
                    displacementX: displacementX,
                    displacementY: displacementY,
                    touch: touch,
                    touchEvent: event
                });

                if(gesture.isVertical) {
                    fireEvent(gesture.element, 'verticalflick', {
                        duration: duration,
                        velocityY: gesture.velocityY,
                        displacementY: displacementY,
                        touch: touch,
                        touchEvent: event
                    });
                } else {
                    fireEvent(gesture.element, 'horizontalflick', {
                        duration: duration,
                        velocityX: gesture.velocityX,
                        displacementX: displacementX,
                        touch: touch,
                        touchEvent: event
                    });
                }
            }
        }

        if (gesture.status === 'pressing') {
            fireEvent(gesture.element, 'pressend', {
                touch: touch,
                touchEvent: event
            });
        }

        delete gestures[id];
    }

    if (Object.keys(gestures).length === 0) {
        docEl.removeEventListener('touchmove', touchmoveHandler, false);
        docEl.removeEventListener('touchend', touchendHandler, false);
        docEl.removeEventListener('touchcancel', touchcancelHandler, false);
    }
}

function touchcancelHandler(event) {

    if (Object.keys(gestures).length == 2) {
        var elements = [];
        for(var p in gestures) {
            elements.push(gestures[p].element);
        }
        fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
            touches: slice.call(event.touches),
            touchEvent: event
        });
    }

    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i],
            id = touch.identifier,
            gesture = gestures[id];

        if (!gesture) continue;

        if (gesture.pressingHandler) {
            clearTimeout(gesture.pressingHandler);
            gesture.pressingHandler = null;
        }

        if (gesture.status === 'panning') {
            fireEvent(gesture.element, 'panend', {
                touch: touch,
                touchEvent: event
            });
        }
        if (gesture.status === 'pressing') {
            fireEvent(gesture.element, 'pressend', {
                touch: touch,
                touchEvent: event
            });
        }
        delete gestures[id];
    }

    if (Object.keys(gestures).length === 0) {
        docEl.removeEventListener('touchmove', touchmoveHandler, false);
        docEl.removeEventListener('touchend', touchendHandler, false);
        docEl.removeEventListener('touchcancel', touchcancelHandler, false);
    }
}

docEl.addEventListener('touchstart', touchstartHandler, false);

})(window, window['lib']||(window['lib']={}))
*/