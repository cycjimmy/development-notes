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

    gesture[method+"Pointer"] = function(element){
        var pm = new ParserManager;
        element.addEventListener("pointerdown",function(event){
            pm.start(event,event);
            element.setPointerCapture(event.pointerId);
            document.addEventListener("pointermove",move,useCapture[method]);
            document.addEventListener("pointerup",end,useCapture[method]);
            document.addEventListener("pointercancel",end,useCapture[method]);
        },true);

        function move(event){
            pm.move(event,event);
        }
        function end(event){
            pm.end(event,event);
            element.releasePointerCapture(event.pointerId);
            document.removeEventListener("pointermove",move,useCapture[method]);
            document.removeEventListener("pointerup",end,useCapture[method]);
            document.removeEventListener("pointercancel",end,useCapture[method]);
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

/*
function compareNode(node1,node2){ 
    var r = node1.compareDocumentPosition(node2)
    with(node1) {
        if( ) {
            return 0;
        }
        if(r & document.DOCUMENT_POSITION_CONTAINED_BY || r & document.DOCUMENT_POSITION_FOLLOWING) {
            return 1;
        }
        if( r & document.DOCUMENT_POSITION_PRECEDING || r & document.DOCUMENT_POSITION_CONTAINS) {
            return -1;
        }
    }
}
*/
function ParserManager() {
    var pointerContexts = {};
    var parserContexts = {}
    var globalContext = {};
    
    var dispatcher = new Dispatcher(pointerContexts);
    var activeParsers = [];



    
    this.start = function(event,point){
        var id = point.identifier || point.pointerId || " ";
        pointerContexts[id] = {events:[],parsers:{}};
        
        for(var i = 0; i < activeParsers.length; i++) {
            pointerContexts[id].parsers[activeParsers[i]] = new parsers[activeParsers[i]].class(dispatcher, parserContexts[activeParsers[i]] ,pointerContexts[id]);
        }

        dispatcher.event = event;
        dispatcher.point = point;
        for(var p in pointerContexts[id].parsers) {
            pointerContexts[id].parsers[p].start(event,point);
        }
        dispatcher.commit();
    };
    this.move = function(event,point){
        var id = point.identifier || " ";
        dispatcher.event = event;
        dispatcher.point = point;
        for(var p in pointerContexts[id].parsers) {
            pointerContexts[id].parsers[p].move(event,point);
        }
        dispatcher.commit();
    };
    this.end = function(event,point){
        var id = point.identifier || " ";
        dispatcher.event = event;
        dispatcher.point = point;
        for(var p in pointerContexts[id].parsers) {
            pointerContexts[id].parsers[p].end(event,point);
        }
        dispatcher.commit();
        delete pointerContexts[id];
    };
    this.cancel = function(event,point){
        var id = point.identifier || " ";
        dispatcher.event = event;
        dispatcher.point = point;
        for(var p in pointerContexts[id].parsers) {
            pointerContexts[id].parsers[p].cancel(event,point);
        }
        dispatcher.commit();
        delete pointerContexts[id];
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


gesture.register = function(name,fingerCount,parser){
    if(!parser) {
        parser = fingerCount;
    }
    parsers[name] = {
        class:parser,
        fingerCount: fingerCount
    };
}
gesture.unregister = function(name,parser){
    if(parser!==parsers[name]) debugger;
    delete parsers[name];
}