webpackJsonp([1,2],{0:function(e,t,r){r("+prg"),e.exports=r("lVK7")},"4HHy":function(e,t,r){"use strict";r.d(t,"b",function(){return a}),r.d(t,"a",function(){return n});var a="INIT",n="SET_STATE"},"6e+x":function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=r("U7vG"),s=r.n(o),u=r("JglD"),c=r("WwO4");r.n(c);r.d(t,"a",function(){return f});var l,h,f=(h=l=function(e){function t(){var r,i,o;a(this,t);for(var s=arguments.length,u=Array(s),c=0;c<s;c++)u[c]=arguments[c];return r=i=n(this,e.call.apply(e,[this].concat(u))),i.inner=i.props.multiLine?"textarea":"input",i.id="labeled-control-"+i.props.id,i.stateName=i.props.stateName||i.props.id,i.refHandler=function(e){i.control=e},o=r,n(i,o)}return i(t,e),t.prototype.render=function(){return s.a.createElement("div",{className:"labeled-input"},s.a.createElement("label",{htmlFor:this.id},this.props.label),s.a.createElement(this.inner,{id:this.id,label:this.props.label,ref:this.refHandler,value:this.props.state[this.stateName]||this.props.value,readOnly:this.props.readOnly,onChange:this.props.onChange(this.stateName),onClick:this.props.onClick(this),onFocus:this.props.onFocus(this)}))},t}(s.a.Component),l.defaultProps={value:"",onChange:u.a,onClick:u.a,onFocus:u.a,multiLine:!1},h)},"7lKn":function(e,t,r){"use strict";function a(e){var t=e.threats,r=e.game,a=r.frame,n=r.frameLength,o=r.fieldWidth,u=r.fieldHeight,h=t.threats.map(function(e){return s({},e,{x:e.x+e.speed.x,y:e.y+e.speed.y})}).map(c(t.removeProbability,t.size,o,u)),f=h.length;h=h.filter(function(e){return e.isAroundField});var d=f-h.length,p=0;h=h.map(function(e){return e.isGoingOut&&!e.isOut&&(p+=1,delete e.isGoingOut),e},0);var m=0;h.length<t.limit&&a>=t.lastTime+t.addTimeout/n&&(h.push(l(t.size,t.index,o,u,t.maxSpeed)),m=1);var b=i.a.merge({},e,{game:{beats:e.game.beats+p,outs:e.game.outs+d},threats:{lastTime:m?a:t.lastTime,index:t.index+m}});return b.threats.threats=h,b}var n=r("M4fF"),i=r.n(n),o=r("vlrw");t.a=a;var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},u=function(e,t,a){return function(n,i){return e.isGoingOut=r.i(o.a)(i)===r.i(o.a)(e.speed[n]),e.isOut||(a&&e.isGoingOut?e.isOut=!0:e.speed[n]=(e.isGoingOut?-1:1)*(e.speed[n]||1)),Math.abs(i)>3*t&&(e.isAroundField=!1),e}},c=function(e,t,r,a){return function(n){var i=s({},n),o=Math.random()<1/e,c=u(i,t,o);i.x<0&&(i=c("x",i.x));var l=r-t;i.x>l&&(i=c("x",i.x-l)),i.y<0&&(i=c("y",i.y));var h=a-t;return i.y>h&&(i=c("y",i.y-h)),i}},l=function(e,t,r,a,n){var i=Math.round(Math.random()*(r-e)),o=0-e,s={x:Math.round((2*Math.random()-1)*n),y:Math.ceil(Math.random()*n)};return Math.random()<.5?(i=0-e,o=Math.round(Math.random()*(a-e)),s={x:Math.ceil(Math.random()*n),y:Math.round((2*Math.random()-1)*n)},Math.random()<.5&&(i=r,s.x*=-1)):Math.random()<.5&&(o=a,s.y*=-1),{id:t,x:i,y:o,speed:s,isOut:!1,isAroundField:!0}}},"9jEl":function(e,t,r){"use strict";var a=r("4HHy"),n=r("bHK7"),i=(r("YhS/"),{redSquares:null,inputController:null,status:n.c.stop,beats:0,highestBeats:0,outs:0,frame:0,startTime:0,frameLength:n.e.frameLength,fieldWidth:n.e.fieldWidth,fieldHeight:n.e.fieldHeight,sideWidth:n.e.sideWidth});t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments[1];switch(t.type){case a.b:return _.extend({},e,t.data);case a.a:return _.extend({},e,t.data.game);default:return e}}},BCEp:function(e,t){e.exports={hero:"Hero__hero__2Sa-c",heroInTrouble:"Hero__heroInTrouble__3oF4r"}},BCOr:function(e,t,r){"use strict";var a=r("hB/+");r.d(t,"a",function(){return a})},ChGC:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("9jEl");r.d(t,"game",function(){return a.a});var n=r("ZJmM");r.d(t,"hero",function(){return n.a});var i=r("WNaE");r.d(t,"threats",function(){return i.a})},EBfR:function(e,t,r){"use strict";function a(e,t){switch(e.game.status){case s.c.play:return f(e,s.c.pause);case s.c.pause:return f(e,s.c.play);case s.c.stop:default:return o.a.merge({},e,{game:{status:s.c.play,beats:0,outs:0,frame:0,startTime:t},threats:{threats:[],lastTime:0-e.threats.addTimeout/e.game.frameLength}})}}function n(e){var t=h({},e);return t.game.status===s.c.play&&(t=d(t)),t}var i=r("M4fF"),o=r.n(i),s=r("bHK7"),u=r("vlrw"),c=r("iMa0"),l=r("7lKn");t.a=a,t.b=n;var h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},f=function(e,t){return o.a.merge({},e,{game:{status:t}})},d=r.i(u.b)(l.a,c.a)},J2UN:function(e,t,r){"use strict";var a=r("EBfR");r.d(t,"a",function(){return a.a}),r.d(t,"b",function(){return a.b});r("iMa0"),r("7lKn")},JglD:function(e,t,r){"use strict";r.d(t,"a",function(){return a});var a=function(){}},QCNp:function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=r("U7vG"),s=r.n(o),u=r("RH2O"),c=r("2KeS"),l=r("M4fF"),h=(r.n(l),r("BCOr")),f=r("bHK7"),d=r("t9xF"),p=r("tNBi"),m=r.n(p);r.d(t,"a",function(){return y});var b,g,y=(b=r.i(u.b)(function(e){return{sideWidth:e.game.sideWidth,status:e.game.status,beats:e.game.beats,highestBeats:e.game.highestBeats,outs:e.game.outs,threatsLength:e.threats.threats.length,heroSize:e.hero.size,threatSize:e.threats.size,threatLimit:e.threats.limit,threatAddTimeout:e.threats.addTimeout,threatRemoveProbability:e.threats.removeProbability,fieldWidth:e.game.fieldWidth,fieldHeight:e.game.fieldHeight}},function(e){return r.i(c.e)({processSpacePress:h.a.processSpacePress,setState:h.a.setState,clearHighest:h.a.clearHighest},e)}))(g=function(e){function t(){var r,i,o;a(this,t);for(var s=arguments.length,u=Array(s),c=0;c<s;c++)u[c]=arguments[c];return r=i=n(this,e.call.apply(e,[this].concat(u))),i.getS=function(e,t){return(t||"No")+" "+e+(1!==t?"s":"")},i.changeHandler=function(e){return function(t){var r=t.target.value,a=void 0;switch(e){default:a=parseInt(r,10)||1}i.props.setState(e,a)}},o=r,n(i,o)}return i(t,e),t.prototype.render=function(){return s.a.createElement("div",{className:m.a.side,style:{width:this.props.sideWidth+"px"}},s.a.createElement("button",{onClick:this.props.processSpacePress},f.a[this.props.status])," (Press Space)",s.a.createElement("h2",null,this.getS("beat",this.props.beats)),s.a.createElement("p",null,"Highest beats: ",this.props.highestBeats),s.a.createElement("p",null,this.getS("out",this.props.outs)),s.a.createElement("p",null,this.getS("threat",this.props.threatsLength)," on field"),s.a.createElement(d.a,{state:this.props,onChange:this.changeHandler},s.a.createElement(d.b,{id:f.b.heroSize,label:"Hero size (px)"}),s.a.createElement(d.b,{id:f.b.threatSize,label:"Threat size (px)"}),s.a.createElement(d.b,{id:f.b.threatLimit,label:"Threat limit"}),s.a.createElement(d.b,{id:f.b.threatAddTimeout,label:"Threat add timeout (ms)"}),s.a.createElement(d.b,{id:f.b.threatRemoveProbability,label:"Threat remove probability (1/x)"}),s.a.createElement(d.b,{id:f.b.fieldWidth,label:"Field width (px)"}),s.a.createElement(d.b,{id:f.b.fieldHeight,label:"Field height (px)"})),s.a.createElement("button",{onClick:this.props.clearHighest},"Clear highest"))},t}(s.a.Component))||g},WNaE:function(e,t,r){"use strict";var a=r("4HHy"),n=r("bHK7"),i={threats:[],size:n.e.threatSize,lastTime:0,addTimeout:n.e.threatAddTimeout,index:0,limit:n.e.threatLimit,removeProbability:n.e.threatRemoveProbability,maxSpeed:4};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments[1];switch(t.type){case a.a:return _.extend({},e,t.data.threats);default:return e}}},WS4u:function(e,t,r){"use strict";var a=r("U7vG"),n=r.n(a),i=r("JglD");r.d(t,"a",function(){return o});var o=function(e){var t=e.children,r=e.state,a=e.onChange,i=e.onClick,o=e.onFocus;return n.a.createElement("div",null,n.a.Children.map(t,function(e){return n.a.isValidElement(e)?n.a.cloneElement(e,{state:r,onChange:a,onClick:i,onFocus:o}):e}))};o.defaultProps={state:{},onChange:i.a,onClick:i.a,onFocus:i.a}},WwO4:function(e,t){},"YhS/":function(e,t,r){"use strict";r.d(t,"a",function(){return a});var a={normal:"normal",trouble:"trouble"}},ZJmM:function(e,t,r){"use strict";var a=r("4HHy"),n=r("bHK7"),i=r("YhS/"),o={x:(n.e.fieldWidth-n.e.heroSize)/2,y:(n.e.fieldHeight-n.e.heroSize)/2,status:i.a.normal,size:n.e.heroSize};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,t=arguments[1];switch(t.type){case a.a:return _.extend({},e,t.data.hero);default:return e}}},bHK7:function(e,t,r){"use strict";r.d(t,"d",function(){return n}),r.d(t,"e",function(){return i}),r.d(t,"c",function(){return o}),r.d(t,"a",function(){return s}),r.d(t,"b",function(){return u});var a,n="highestBeats",i={frameLength:20,heroSize:50,threatSize:30,threatLimit:20,threatAddTimeout:1e3,threatRemoveProbability:5,fieldWidth:800,fieldHeight:600,sideWidth:200},o={play:"play",pause:"pause",stop:"stop"},s=(a={},a[o.play]="Pause",a[o.pause]="Resume",a[o.stop]="Start",a),u={heroSize:"heroSize",threatSize:"threatSize",threatLimit:"threatLimit",threatAddTimeout:"threatAddTimeout",threatRemoveProbability:"threatRemoveProbability",fieldWidth:"fieldWidth",fieldHeight:"fieldHeight"}},cilB:function(e,t){},gIL8:function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=r("U7vG"),s=r.n(o),u=r("2KeS"),c=r("RH2O"),l=r("M4fF"),h=(r.n(l),r("BCOr")),f=r("YhS/"),d=r("BCEp"),p=r.n(d),m=r("tNBi"),b=r.n(m),g=r("yPl1"),y=r("w0AC"),v=r("QCNp");r.d(t,"a",function(){return H});var S,x,E,w=(S={},S[f.a.normal]=p.a.hero,S[f.a.trouble]=p.a.heroInTrouble,S),H=(x=r.i(c.b)(function(e){return{fieldWidth:e.game.fieldWidth,fieldHeight:e.game.fieldHeight,sideWidth:e.game.sideWidth,heroStatus:e.hero.status,heroSize:e.hero.size,heroPos:{x:e.hero.x,y:e.hero.y},threatSize:e.threats.size,threats:e.threats.threats}},function(e){return r.i(u.e)({init:h.a.init},e)}))(E=function(e){function t(){var r,i,o;a(this,t);for(var s=arguments.length,u=Array(s),c=0;c<s;c++)u[c]=arguments[c];return r=i=n(this,e.call.apply(e,[this].concat(u))),i.getFieldSize=function(){var e=i.field;return{left:e.offsetLeft,top:e.offsetTop,right:e.offsetLeft+e.clientWidth,bottom:e.offsetTop+e.clientHeight}},i.refHandler=function(e){i.field=e},o=r,n(i,o)}return i(t,e),t.prototype.componentDidMount=function(){this.props.init(this)},t.prototype.render=function(){var e=this;return s.a.createElement("div",{className:b.a.wrapper,style:{width:this.props.fieldWidth+this.props.sideWidth+"px"}},s.a.createElement(g.a,{style:b.a.field,refHandler:this.refHandler,width:this.props.fieldWidth,height:this.props.fieldHeight},s.a.createElement(y.a,{style:w[this.props.heroStatus],size:this.props.heroSize,left:this.props.heroPos.x,top:this.props.heroPos.y}),this.props.threats.map(function(t){return s.a.createElement(y.a,{key:t.id,style:b.a.threat,size:e.props.threatSize,left:t.x,top:t.y})})),s.a.createElement(v.a,null))},t}(s.a.Component))||E},"hB/+":function(e,t,r){"use strict";function a(){return function(e,t){e({type:u.a,data:d(t())})}}function n(e,t){return function(){var a=t();a.game.inputController.reactToKeys({32:function(){a=d(a)}}),a=f({},a,{mousePos:l.a.mousePos,field:a.game.redSquares.getFieldSize()}),a.game.frame+=1,a=r.i(h.b)(a);var i=a.game.startTime+a.game.frameLength*a.game.frame-performance.now();i<-1e3&&(a.game.frame=Math.floor((performance.now()-a.game.startTime)/a.game.frameLength)),a.game.status===c.c.stop&&t().game.status===c.c.play&&localStorage.setItem(c.d,a.game.highestBeats=Math.max(a.game.beats,a.game.highestBeats)),a.game.status!==c.c.play&&t().game.status!==c.c.play||e({type:u.a,data:a}),setTimeout(n(e,t),Math.max(i,0))}}function i(){return function(e){localStorage.removeItem(c.d),e({type:u.b,data:{highestBeats:0}})}}function o(e){return function(t,r){t({type:u.b,data:{redSquares:e,inputController:new l.a,highestBeats:localStorage[c.d]?parseInt(localStorage[c.d],10):0}}),n(t,r)()}}function s(e,t){return function(r){var a;switch(e){case c.b.frameLength:case c.b.fieldWidth:case c.b.fieldHeight:r({type:u.a,data:{game:(a={},a[e]=t,a)}});break;case c.b.heroSize:r({type:u.a,data:{hero:{size:t}}});break;case c.b.threatSize:r({type:u.a,data:{threats:{size:t}}});break;case c.b.threatLimit:r({type:u.a,data:{threats:{limit:t}}});break;case c.b.threatAddTimeout:r({type:u.a,data:{threats:{addTimeout:t}}});break;case c.b.threatRemoveProbability:r({type:u.a,data:{threats:{removeProbability:t}}})}}}Object.defineProperty(t,"__esModule",{value:!0});var u=r("4HHy"),c=r("bHK7"),l=r("liqn"),h=r("J2UN");t.processSpacePress=a,t.clearHighest=i,t.init=o,t.setState=s;var f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},d=function(e){return r.i(h.a)(e,performance.now())}},iMa0:function(e,t,r){"use strict";function a(e){var t=e.mousePos,r=e.field,a=e.hero,n=e.threats.threats,c=e.threats.size,l=Math.max(t.x-a.size/2,r.left);l=Math.min(l,r.right-a.size),l-=r.left;var h=Math.max(t.y-a.size/2,r.top);h=Math.min(h,r.bottom-a.size),h-=r.top;var f=u(l,h,a.size,c,n);return i.a.merge({},e,{game:{status:f===s.a.normal?o.c.play:o.c.stop},hero:{x:l,y:h,status:f}})}var n=r("M4fF"),i=r.n(n),o=r("bHK7"),s=r("YhS/");t.a=a;var u=function(e,t,r,a,n){var i=(r+a)/2,o=(a-r)/2;return n.some(function(r){return Math.abs(r.x-e+o)<i&&Math.abs(r.y-t+o)<i})?s.a.trouble:s.a.normal}},lVK7:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("U7vG"),n=r.n(a),i=r("O27J"),o=(r.n(i),r("sMfP")),s=r("cilB");r.n(s);r.i(i.render)(n.a.createElement(o.a,null),document.querySelector("#app"))},liqn:function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}r.d(t,"a",function(){return s});var n,i,o,s=(i=n=function e(t){if(a(this,e),o.call(this),this.initialKeymap=t,e.instance)return e.instance;e.instance=this,document.onmousemove=this.saveMousePos,window.document.onkeydown=this.process},n.mousePos={},n.keyPressed=[],o=function(){var e=this;this.initialKeymap={},this.saveMousePos=function(e){s.mousePos={x:e.pageX,y:e.pageY}},this.process=function(t){32===t.keyCode&&t.preventDefault(),e.saveKeyPressed(t)},this.saveKeyPressed=function(e){var t=e.keyCode;return s.keyPressed.push(t)},this.reactToKeys=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e.initialKeymap;s.keyPressed.forEach(function(e){return t[e]&&t[e]()}),s.keyPressed=[]}},i)},sMfP:function(e,t,r){"use strict";var a=r("U7vG"),n=r.n(a),i=r("2KeS"),o=r("4ufr"),s=r.n(o),u=r("RH2O"),c=r("ChGC"),l=r("gIL8"),h=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||i.a,f=r.i(i.b)(r.i(i.c)(c),h(r.i(i.d)(s.a))),d=function(){return n.a.createElement(u.a,{store:f},n.a.createElement(l.a,null))};t.a=d},t9xF:function(e,t,r){"use strict";var a=r("6e+x");r.d(t,"b",function(){return a.a});var n=r("WS4u");r.d(t,"a",function(){return n.a});r("tozq")},tNBi:function(e,t){e.exports={wrapper:"RedSquares__wrapper__n469N",field:"RedSquares__field__3S_U-",threat:"RedSquares__threat__3sdY0",side:"RedSquares__side__1Qama"}},tozq:function(e,t,r){"use strict";var a=r("U7vG"),n=r.n(a),i=function(e){var t=e.text,r=e.tabIndex,a=e.onClick;return n.a.createElement("div",{className:"setter"},n.a.createElement("a",{onClick:a,tabIndex:r},t))};(function(e){var t=e.setters,r=e.setState,a=e.tabIndexOffset;return n.a.createElement("div",null,t.map(function(e,t){return n.a.createElement(i,{onClick:function(){return r(e.params)},key:t,tabIndex:t+a,text:e.text})}))}).defaultProps={tabIndexOffset:1}},vlrw:function(e,t,r){"use strict";function a(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return t.reduce(function(e,t){return t(e)},e)}}function n(e){return 0===e||isNaN(e)?e:e>0?1:-1}t.b=a,t.a=n},w0AC:function(e,t,r){"use strict";var a=r("U7vG"),n=r.n(a),i=r("M4fF"),o=r.n(i),s=function(e){var t=e.top,r=e.left,a=e.size,i=e.style,o=e.refHandler;return n.a.createElement("div",{ref:o,className:i,style:{width:a+"px",height:a+"px",top:t+"px",left:r+"px"}})};s.defaultProps={refHandler:o.a.noop},t.a=s},yPl1:function(e,t,r){"use strict";var a=r("U7vG"),n=r.n(a),i=r("M4fF"),o=r.n(i),s=function(e){var t=e.style,r=e.children,a=e.refHandler,i=e.width,o=e.height;return n.a.createElement("div",{ref:a,className:t,style:{width:i+"px",height:o+"px"}},r)};s.defaultProps={children:null,refHandler:o.a.noop,width:640,height:480},t.a=s}},[0]);
//# sourceMappingURL=app.21ebbdbd.js.map