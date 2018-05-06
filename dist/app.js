!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=24)}([function(e,t,n){"use strict";function r(){var e=0,t={};return{subscribe:function(n){var r=e;return t[e++]=n,r},unsubscribe:function(e){delete t[e]},reset:function(){e=0,Object.keys(t).forEach(function(e){delete t[e]})},publish:function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];Object.keys(t).forEach(function(e){t[e].apply(t,n)})}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=t.CREATE_TERRAIN="create-terrain",a=t.ADD_PLAYER="add-player",o=t.NEXT_PLAYER="next-player",i=t.NEXT_ROUND="next-round",u=t.GROUND_EXPLODED="ground-exploded",c=t.TURRET_ROTATE="turret-rotate",l=t.FIRING_END="firing-end",f=t.FIRING_START="firing-start",s=t.ASSIGN_DAMAGE="assign-damage",d=t.CHANGE_POWER="change-power",p=t.ROUND_END="round-end",v=t.NEXT_WEAPON="next-weapon";t.createTerrain=function(e){return{type:r,terrain:e}},t.addPlayer=function(e){return{type:a,player:e}},t.nextPlayer=function(e){return{type:o,wind:e}},t.groundExploded=function(e){return{type:u,x:e}},t.turretRotate=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return{type:c,by:e}},t.changePower=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return{type:d,by:e}},t.firingEnd=function(){return{type:l}},t.firingStart=function(){return{type:f}},t.assignDamage=function(e){var t=(e.x,e.y,e.player),n=e.damage;return{type:s,player:t,damage:n}},t.nextRound=function(){return{type:i}},t.roundEnd=function(){return{type:p}},t.nextWeapon=function(){return{type:v}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=(t.getActivePlayer=function(e){return e.players[e.playerIdx]},t.getActivePlayerIdx=function(e){return e.playerIdx},t.getPlayers=function(e){return e.players});t.getTerrain=function(e){return e.terrain},t.isKeyNavActive=function(e){return!e.blockKeyNav},t.getPlayersInRange=function(e,t,n,a){return r(e).filter(function(e){return e.distance(t,n)<=a})},t.getWind=function(e){return e.wind}},function(e,t){function n(e,t){return e+A(k()*(t-e+1))}function r(e,t){return!!(t=null==t?h:t)&&("number"==typeof e||R.test(e))&&e>-1&&e%1==0&&e<t}function a(e,t,n){if(!l(n))return!1;var a=typeof t;return!!("number"==a?i(n)&&r(t,n.length):"string"==a&&t in n)&&o(n[t],e)}function o(e,t){return e===t||e!==e&&t!==t}function i(e){return null!=e&&c(e.length)&&!u(e)}function u(e){var t=l(e)?N.call(e):"";return t==m||t==_}function c(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=h}function l(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function f(e){return!!e&&"object"==typeof e}function s(e){return"symbol"==typeof e||f(e)&&N.call(e)==P}function d(e){if(!e)return 0===e?e:0;if((e=p(e))===y||e===-y){return(e<0?-1:1)*g}return e===e?e:0}function p(e){if("number"==typeof e)return e;if(s(e))return b;if(l(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=l(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(w,"");var n=O.test(e);return n||E.test(e)?M(e.slice(2),n?2:8):x.test(e)?b:+e}function v(e,t,r){if(r&&"boolean"!=typeof r&&a(e,t,r)&&(t=r=void 0),void 0===r&&("boolean"==typeof t?(r=t,t=void 0):"boolean"==typeof e&&(r=e,e=void 0)),void 0===e&&void 0===t?(e=0,t=1):(e=d(e),void 0===t?(t=e,e=0):t=d(t)),e>t){var o=e;e=t,t=o}if(r||e%1||t%1){var i=k();return S(e+i*(t-e+T("1e-"+((i+"").length-1))),t)}return n(e,t)}var y=1/0,h=9007199254740991,g=1.7976931348623157e308,b=NaN,m="[object Function]",_="[object GeneratorFunction]",P="[object Symbol]",w=/^\s+|\s+$/g,x=/^[-+]0x[0-9a-f]+$/i,O=/^0b[01]+$/i,E=/^0o[0-7]+$/i,R=/^(?:0|[1-9]\d*)$/,T=parseFloat,M=parseInt,j=Object.prototype,N=j.toString,A=Math.floor,S=Math.min,k=Math.random;e.exports=v},function(e,t,n){"use strict";function r(e){var t={},n=function(){return function(e){var n=e.keyCode;n in t&&(e.preventDefault(),e.stopPropagation(),t[n].notify(e))}},r=function(e,n){t[e]=t[e]||a(),t[e].register(n)},p=function(e){return function(t){return r(e,t)}};return{register:r,init:function(){return e.addEventListener("keydown",n(),!1),this},onKeyLeft:p(o),onKeyRight:p(i),onKeyUp:p(u),onKeyDown:p(c),onKeyEnter:p(l),onKeyPageUp:p(f),onKeyPageDown:p(s),onKeyTab:p(d)}}function a(){var e=[];return{register:function(t){e.push(t)},notify:function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];e.forEach(function(e){return e.apply(void 0,n)})}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var o=37,i=39,u=38,c=40,l=13,f=33,s=34,d=9},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(t){r(this,e),this.register(t),this._hnd=null,this._cancelled=!1}return a(e,[{key:"register",value:function(e){this._cancelled=!1,this.frame=e}},{key:"request",value:function(){var e=this;this.frame&&(this._hnd=window.requestAnimationFrame(function(t){e._cancelled||e.frame(t)}))}},{key:"cancel",value:function(){this._cancelled=!0,window.cancelAnimationFrame(this._hnd),this.frame=null}}]),e}();t.default=o},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t,n,r){function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return{armory:e,weapon:function(){return e[t]},next:function(){return o(e,(t+1)%e.length)},prev:function(){return o(e,(t-1)%e.length)}}}var u=(0,f.default)((0,c.default)(t.L0)),l=(0,d.default)((0,c.default)(t.L1)),s=(0,v.default)((0,c.default)(t.L2)),p=(0,h.default)((0,c.default)(t.L3)),y=(0,b.default)((0,c.default)(t.L4)),g=(0,J.default)((0,H.default)(t.UI)),m=(0,Z.default)(e),w=function(){return(0,te.default)(m,l.width,l.height)},O=(0,k.default)(_.default,{players:[],terrain:null,playerIdx:0,wind:m.from(-200,200),blockKeyNav:!1,roundState:"in-progress",round:-1});(0,B.default)({store:O,bgRenderer:u,terrainRenderer:l,tankRenderer:p,statusBarRenderer:g.statusBar(),uiRenderer:g,createRandomTerrain:w,rand:m});var R={getTerrain:function(){return(0,P.getTerrain)(O.getState())},scheduleParticlesEmission:function(e){return S.schedule(e)},createParticlesEmitter:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return X.ParticlesEmitter.apply(void 0,[N].concat(t))},radialGenerator:X.radialGenerator,particlesRenderer:y};O.dispatch((0,q.createTerrain)(w()));var M=function(e){return(0,j.default)(i({wind:(0,P.getWind)(O.getState())/100},e))},N={createTimer:function(){return(0,A.default)(n())},createProjectileSolver:M,renderer:y},S=(0,X.ParticlesManager)(N),D={getTerrain:function(){return(0,P.getTerrain)(O.getState())},getPlayers:function(){return(0,P.getPlayers)(O.getState())}},L=function(e){return function(){return O.dispatch(e.apply(void 0,arguments))}},G=i({createTimer:function(){return(0,A.default)(n())},getTerrain:function(){return(0,P.getTerrain)(O.getState())},getPlayersInRange:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return P.getPlayersInRange.apply(void 0,[O.getState()].concat(t))},renderer:s,createProjectileSolver:M,dispatch:O.dispatch,createCollisionDetector:function(){return(0,W.default)(D)},explosion:function(){return(0,U.default)(R).apply(void 0,arguments)},burn:function(){return(0,$.default)(R).apply(void 0,arguments)}},function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(function(e,t){return i({},e,a({},t.name,L(t)))},{})}(q.firingStart,q.firingEnd,q.assignDamage,q.groundExploded)),K=l.width,F=K/10,z=(0,I.default)({name:"Player1",x:F,y:(0,P.getTerrain)(O.getState()).at(F),armory:o([(0,x.default)(G),(0,E.default)(G),(0,T.default)(G)]),tank:(0,C.default)({power:400,angle:43,color:"#498706"})}),Y=(0,I.default)({name:"Player2",x:K-F,y:(0,P.getTerrain)(O.getState()).at(K-F),armory:o([(0,x.default)(G),(0,E.default)(G),(0,T.default)(G)]),tank:(0,C.default)({power:200,angle:155,color:"#9e0707"})});O.dispatch((0,q.addPlayer)(z)),O.dispatch((0,q.addPlayer)(Y)),O.dispatch((0,q.nextRound)());var V=function(e){return function(){(0,P.isKeyNavActive)(O.getState())&&e()}};r.onKeyLeft(V(function(){return O.dispatch((0,q.turretRotate)(1))})),r.onKeyRight(V(function(){return O.dispatch((0,q.turretRotate)(-1))})),r.onKeyUp(V(function(){return O.dispatch((0,q.changePower)(1))})),r.onKeyDown(V(function(){return O.dispatch((0,q.changePower)(-1))})),r.onKeyPageUp(V(function(){return O.dispatch((0,q.changePower)(10))})),r.onKeyPageDown(V(function(){return O.dispatch((0,q.changePower)(-10))})),r.onKeyEnter(V(function(){return(0,P.getActivePlayer)(O.getState()).fire()})),r.onKeyTab(V(function(){return O.dispatch((0,q.nextWeapon)())}))}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=o;var u=n(26),c=r(u),l=n(25),f=r(l),s=n(31),d=r(s),p=n(29),v=r(p),y=n(30),h=r(y),g=n(28),b=r(g),m=n(21),_=r(m),P=n(2),w=n(8),x=r(w),O=n(9),E=r(O),R=n(7),T=r(R),M=n(14),j=r(M),N=n(18),A=r(N),S=n(11),k=r(S),D=n(13),I=r(D),L=n(16),C=r(L),G=n(10),W=r(G),K=n(20),U=r(K),F=n(19),$=r(F),X=n(12),q=n(1),z=n(22),B=r(z),Y=n(27),H=r(Y),V=n(32),J=r(V),Q=n(15),Z=r(Q),ee=n(23),te=r(ee)},function(e,t,n){"use strict";function r(e){var t=e.createTimer,n=e.getTerrain,r=e.getPlayersInRange,a=e.renderer,o=e.createProjectileSolver,i=e.createCollisionDetector,u=e.explosion,c=e.burn,l=e.firingStart,f=e.firingEnd,s=e.assignDamage,d=e.groundExploded,p=function(e,t){var n=v(t),r=y(t),a=0;return function(t,o,i){var u=e.solve(.0048*o),c=u.x,l=u.y;l<a?r(c,l,t,i):n(c,l,i),a=l}},v=function(e){return function(t,n,r){if(a.clear(),e.withBoundary(t))return r.reset(),void f();if(e.withTerrain(t,n))return r.reset(),void h(t,n).then(function(){return f()});var o=e.withPlayer(t,n);if(o.length)return r.reset(),void g(o,t,n).then(function(){return f()});a.renderMissile(t,n)}},y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,n=new Array(t).fill(null).map(function(){return{active:!0,exploded:!1}}),r=0;return function(o,i,u,c){r+=.08*u,a.clear(),n.forEach(function(n,u){var c=o+(u-~~(t/2))*r;if(n.active){if(e.withBoundary(c))return n.active=!1,void(n.exploded=!0);if(e.withTerrain(c,i))return n.active=!1,void h(c,i).then(function(){return n.exploded=!0});var l=e.withPlayer(c,i);if(l.length)return n.active=!1,void g(l,c,i).then(function(){return n.exploded=!0});a.renderMissile(c,i)}}),n.every(function(e){return e.exploded})&&(c.reset(),f())}},h=function(e,t){d(e);var a=[];a.push(u(e,n().at(e)));return r(e,t,30).forEach(function(e){s({player:e,damage:30}),e.canTake(30)||a.push(c(e))}),Promise.all(a)},g=function(e){var t=[];return e.forEach(function(e){s({player:e,damage:100}),t.push(c(e))}),Promise.all(t)};return{name:"MIRV",icon:"mirv.png",fire:function(e){var n=e.x0,r=e.y0,a=e.v,u=e.angle,c=o({x0:n,y0:r,v:a,angle:u}),f=i();l(),t().immediate(p(c,f))}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e){var t=e.createTimer,n=e.getTerrain,r=e.getPlayersInRange,a=e.renderer,o=e.createProjectileSolver,i=e.createCollisionDetector,u=e.explosion,c=e.burn,l=e.firingStart,f=e.firingEnd,s=e.assignDamage,d=e.groundExploded,p=function(e,t){return function(n,r,o){var i=e.solve(.0048*r),u=i.x,c=i.y;if(a.clear(),t.withBoundary(u))return o.reset(),void f();if(t.withTerrain(u,c))return o.reset(),void v(u,c);var l=t.withPlayer(u,c);if(l.length)return o.reset(),void y(l,u,c);a.renderMissile(u,c)}},v=function(e,t){console.warn("TERRAIN COLLISION",e,t),d(e);var a=[];a.push(u(e,n().at(e)));r(e,t,40).forEach(function(e){s({player:e,damage:34}),e.canTake(34)||a.push(c(e))}),Promise.all(a).then(function(){return f()})},y=function(e){console.warn("PLAYER COLLISION",e);var t=[];e.forEach(function(e){s({player:e,damage:100}),t.push(c(e))}),Promise.all(t).then(function(){return f()})};return{name:"Missile",icon:"missile.png",fire:function(e){var n=e.x0,r=e.y0,a=e.v,u=e.angle,c=o({x0:n,y0:r,v:a,angle:u}),f=i();l(),t().immediate(p(c,f))}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e){var t=e.createTimer,n=e.getTerrain,r=e.getPlayersInRange,a=e.renderer,o=e.createProjectileSolver,i=e.createCollisionDetector,u=e.explosion,c=e.burn,l=e.firingStart,f=e.firingEnd,s=e.assignDamage,d=e.groundExploded,p=function(e,t,n){if(e.withBoundary(t))return f(),!0;var r=e.withPlayer(t,n);return!!r.length&&(v(r,t,n),!0)},v=function(e){console.warn("PLAYER COLLISION",e);var t=[];e.forEach(function(e){s({player:e,damage:100}),t.push(c(e))}),Promise.all(t).then(function(){return f()})},y=function(e,t){return function(r,o,i){var u=e.solve(.0048*o),c=u.x,l=u.y;return a.clear(),p(t,c,l)?void i.reset():t.withTerrain(c,l)?(i.reset(),void g(c,n().at(c))):void a.renderMissile(c,l)}},h=function(e,t,o){return function(i,l,v){var y=n(),h=t+e*l*.054,g=y.at(h),b=y.at(h+e);if(a.clear(),p(o,h,g))return void v.reset();if(~~b>~~g){v.reset(),d(h);var m=[];return m.push(u(h,n().at(h))),r(h,g,10).forEach(function(e){s({player:e,damage:30}),e.canTake(30)||m.push(c(e))}),void Promise.all(m).then(function(){return f()})}a.renderMissile(h,y.at(h)+2,2)}},g=function(e,r){console.warn("ROLLING",e,r);var a=n().getRollDirection(e);t().immediate(h(a,e,i()))};return{name:"Roller",icon:"roller.png",fire:function(e){var n=e.x0,r=e.y0,a=e.v,u=e.angle,c=o({x0:n,y0:r,v:a,angle:u}),f=i();l(),t().immediate(y(c,f))}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e){var t=e.getTerrain,n=e.getPlayers,r=(0,i.default)(),a=(0,i.default)();return{withTerrain:r,withPlayer:a,detect:function(e,o){var i=!1;o<t().at(e)&&(i=!0,r.publish({x:e,y:o}));var u=n().filter(function(t){return t.collides(e,o)});return u.length&&(i=!0,a.publish(u,e,o)),i},reset:function(){r.reset(),a.reset()}}}function a(e){var t=e.getTerrain,n=e.getPlayers;return{withTerrain:function(e,n){return n<t().at(e)},withPlayer:function(e,t){return n().filter(function(n){return n.collides(e,t)})},withBoundary:function(e){return!t().isWithin(e)}}}Object.defineProperty(t,"__esModule",{value:!0}),t._CollisionDetector=r,t.default=a;var o=n(0),i=function(e){return e&&e.__esModule?e:{default:e}}(o)},function(e,t,n){"use strict";function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=a({},t),r=(0,i.default)();return r.subscribe(function(t){var r=e(n,t);console.group("action: "+t.type),console.log("prev",n),console.log("action",t),console.log("next",r),console.groupEnd("action: "+t.type),n=r}),{getState:function(){return n},dispatch:function(e){r.publish(e)},subscribe:function(e){r.subscribe(e)}}}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=r;var o=n(0),i=function(e){return e&&e.__esModule?e:{default:e}}(o)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e){var t=e.createTimer,n=e.renderer,r=0,a={},o=t(),i=function(e,t,r){if(0===Object.keys(a).length)return void n.clear();n.clear(),Object.keys(a).forEach(function(n){var o=a[n];o.update({dt:e,gt:t}),o.isDone()&&(delete a[n],console.warn("removing...",n),0===Object.keys(a).length&&(r.stop(),console.warn("stopping...")))})};return o.subscribe(i),{schedule:function(e){Object.keys(a).length||(console.warn("starting..."),o.start());var t=r++;console.warn("scheduling...",t),a[t]=e},stop:function(){o.reset()}}}function o(e,t){var n=e.createProjectileSolver,r=[],a=!1,o=(0,s.default)(),i=(0,s.default)();return{progress:o,done:i,isDone:function(){return a},emit:function(e,o,i){r=t(),r.forEach(function(t){t.solver=n({v:i+t.v,angle:t.angle,x0:e+t.x,y0:o+t.y})}),a=!1},update:function(e){for(var t=e.dt,n=!1,u=0,c=r.length;u<c;++u){var l=r[u];if(l.t+=.08*t*60/1e3,l.active)if(l.t<0)n=!0;else{var f=l.solver.solve(l.t),s=f.x,d=f.y,p=Math.max(0,1-l.t/l.shutdownDuration);l.x=s,l.y=d,l.opacity=p,o.publish(l),n=l.active||n}}(a=!n)&&i.publish()}}}function i(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.count,n=void 0===t?1e3:t,r=e.emissionDuration,a=void 0===r?5:r,o=e.shutdownDuration,i=void 0===o?5:o,u=e.angle,l=void 0===u?45:u,f=e.spread,s=void 0===f?30:f,p=e.radius,v=void 0===p?0:p,y=new Array(n),h=0;h<n;h++){var g=(0,c.default)(l-s/2,l+s/2,!0);y[h]={shutdownDuration:i,v:(0,c.default)(0,25,!0),t:(0,c.default)(-a,0,!0),x:v*Math.cos(d(g)),y:v*Math.sin(d(g)),angle:g,active:!0}}return function(){return y}}Object.defineProperty(t,"__esModule",{value:!0}),t.ParticlesManager=a,t.ParticlesEmitter=o,t.radialGenerator=i;var u=n(3),c=r(u),l=n(35),f=(r(l),n(0)),s=r(f),d=function(e){return e*Math.PI/180}},function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.name,n=e.x,u=e.y,c=e.armory,l=e.tank,f=e.score,s=void 0===f?0:f,d=e.dead,p=void 0!==d&&d,v={name:t,x:n,y:u,dead:p,armory:c,tank:l,score:s},y=function(e,t){return o({x:n,y:u},{x:e,y:t})},h=function(e){return r(a({},v,e))};return a({},v,{update:h,changePower:function(e){return h({tank:l.update({power:l.power+e})})},fire:function(){c.weapon().fire({x0:n,y0:u+10,v:l.power/i,angle:l.angle})},nextWeapon:function(){return h({armory:c.next()})},rotateTurret:function(e){return h({tank:l.update({angle:l.angle+e})})},rotateLeft:function(){return h({tank:l.update({angle:l.angle+1})})},rotateRight:function(){return h({tank:l.update({angle:l.angle-1})})},spawn:function(){return h({dead:!1,tank:l.spawn()})},addDamage:function(e){console.warn("--DAMAGE--",e);var t=l.stamina-e;return h({dead:t<=0,tank:l.update({stamina:t})})},addScore:function(e){return h({score:v.score+e})},canTake:function(e){return l.stamina-e>0},collides:function(e,t){return y(e,t)<9},distance:function(e,t){return y(e,t)}})}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=r;var o=function(e,t){var n=Math.pow(Math.abs(e.x-t.x),2),r=Math.pow(Math.abs(e.y-t.y),2);return~~Math.sqrt(n+r)},i=5.5},function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.v,n=e.angle,r=e.x0,o=void 0===r?0:r,i=e.y0,u=void 0===i?0:i,c=e.wind,l=void 0===c?0:c,f=e.g,s=void 0===f?9.81:f,d=a(n),p=function(e){return o+t*Math.cos(d)*e+l*Math.pow(e,2)},v=function(e){return u+t*Math.sin(d)*e-s*Math.pow(e,2)/2};return{solve:function(e){return{x:p(e),y:v(e)}},x:p,y:v}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var a=function(e){return e*Math.PI/180}},function(e,t,n){"use strict";function r(e){var t=e,n=2147483648,r=function(){return(1103515245*t+12345)%n},a=function(){return(t=r())/n};return{next:a,from:function(e,t){return Math.floor(a()*(~~t-~~e+1))+~~e}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e){var t=e.power,n=e.angle,o=e.color,c=e.stamina,l=void 0===c?100:c,f=e.size,s=void 0===f?18:f;l=(0,i.default)(l,0,100),t=(0,i.default)(t,0,l*u/100),n=(0,i.default)(n,0,180);var d=function(e){return r(a({power:t,angle:n,color:o,stamina:l},e))};return{power:t,stamina:l,angle:n,color:o,size:s,update:d,spawn:function(){return d({stamina:100,power:u/2,angle:90})}}}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=r;var o=n(33),i=function(e){return e&&e.__esModule?e:{default:e}}(o),u=1e3},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n){var r=function(e){return n[~~e]};return{heightMap:n,at:r,flat:function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t/5,o=n.map(function(e){return r});return a(e,t,o)},flatten:function(o,i){var u=.8*i,c=r(o-u),l=r(o+u),f=Math.min(c,l),s=n.map(function(e,t){return Math.abs(o-t)<u?f:e});return a(e,t,s)},peak:function(r,o){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:100,u=n.map(function(e,t){return e+o/Math.pow(Math.E,Math.pow((t-r)/i,2))});return a(e,t,u)},sharpen:function(o,u){for(var l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.default,f=(0,c.default)(function(e){return l(-u,u)}),s=[],d=0,p=void 0,v=void 0,y=void 0,h=1;h<=o+1;h++){p=Math.floor(n.length/(o+1)*h-.5),v=r(d)+f(d),y=r(p)+f(p);for(var g=d;g<=p;g++)s[g]=(y-v)/(p-d)*(g-d)+v;d=p}return a(e,t,s)},getSlope:function(e){var t=~~e,n={x:t-15,y:r(t-15)},a={x:t+15,y:r(t+15)},o=(n.y-a.y)/(n.x-a.x);return 180*Math.atan(o)/Math.PI},getRollDirection:function(e){return r(e-1)<r(e)?-1:r(e+1)<r(e)?1:0},isWithin:function(t){return t>0&&t<e}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=a;var o=n(3),i=r(o),u=n(34),c=r(u);a.ofSize=function(e,t){return a(e,t,new Array(e).fill(0))}},function(e,t,n){"use strict";function r(e){var t=(0,o.default)(),n=0,r=0,a=function(){e.register(function(t){d(t),e.request()}),e.request()},i=function(){e.cancel(),r=0},u=function(){i(),t.reset()},c=t.subscribe,l=t.unsubscribe,f=function(e){var t=c(e);return a(),t},s={start:a,stop:i,reset:u,immediate:f,subscribe:c,unsubscribe:l},d=function(e){r||(r=e,n=0);var a=e-r,o=a-n;t.publish(o,a,s),n=a};return s}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var a=n(0),o=function(e){return e&&e.__esModule?e:{default:e}}(a)},function(e,t,n){"use strict";function r(e){var t=e.createParticlesEmitter,n=e.scheduleParticlesEmission,r=e.particlesRenderer,a=e.radialGenerator;return function(e){var o=e.x,i=e.y;return new Promise(function(e){var u=a({angle:90,radius:30,spread:40,emissionDuration:10,shutdownDuration:1}),c=t(u);c.progress.subscribe(function(e){e.opacity<=0&&(e.active=!1),r.fire(e,{size:3})}),c.done.subscribe(e),c.emit(o-2,i-20,0),n(c)})}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e){var t=e.getTerrain,n=e.createParticlesEmitter,r=e.scheduleParticlesEmission,a=e.particlesRenderer,o=e.radialGenerator;return function(e,i){return new Promise(function(u){var c=t().getSlope(e);c=c>90?90-c:90+c;var l=o({angle:c,emissionDuration:.5,shutdownDuration:6,spread:180}),f=n(l);f.progress.subscribe(function(e){(e.y<t().at(e.x)||e.opacity<=0)&&(e.active=!1),t().isWithin(e.x)||(e.active=!1),a.render(e,{size:1.6})}),f.done.subscribe(u),f.emit(e,i,0),r(f)})}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function a(e,t){switch(t.type){case i.GROUND_EXPLODED:var n=(0,u.getTerrain)(e).peak(t.x,-10,15),r=(0,u.getPlayers)(e).map(function(e){var t=n.at(e.x);return e.y>t?e.update({y:t}):e});return o({},e,{players:r,terrain:n});case i.ASSIGN_DAMAGE:return g(h(e,t));case i.CREATE_TERRAIN:return c(e,t.terrain);case i.ADD_PLAYER:return d(e,t.player);case i.NEXT_PLAYER:return f(l(e),t.wind);case i.NEXT_ROUND:return P(g(s(e)));case i.TURRET_ROTATE:return v(e,t.by);case i.CHANGE_POWER:return p(e,t.by);case i.ROUND_END:case i.FIRING_START:return _(e);case i.FIRING_END:return P(e);case i.NEXT_WEAPON:return b(e)}return e}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=a;var i=n(1),u=n(2),c=function(e,t){return o({},e,{terrain:t})},l=function(e){var t=(0,u.getPlayers)(e),n=e.playerIdx,r=n;if(1===t.length)return e;do{r=function(e){return(e+1)%t.length}(r)}while(t[r].dead);return o({},e,{playerIdx:r})},f=function(e,t){return o({},e,{wind:t})},s=function(e){var t=e.round,n=void 0===t?0:t,a=e.players,i=e.terrain,u=r(e,["round","players","terrain"]),c=i;a.forEach(function(e){c=c.flatten(e.x,e.tank.size)});var l=a.map(function(e){return e.spawn().update({y:c.at(e.x)})});return o({},u,{playerIdx:0,round:n+1,players:l,terrain:c})},d=function(e,t){var n=e.terrain.flatten(t.x,t.tank.size),r=t.update({y:n.at(t.x)});return o({},e,{terrain:n,players:e.players.concat(r)})},p=function(e,t){return y(e,function(e){return e.changePower(t)})},v=function(e,t){return y(e,function(e){return e.rotateTurret(t)})},y=function(e,t){var n=(0,u.getActivePlayerIdx)(e);return o({},e,{players:e.players.map(function(e,r){return r===n?t(e):e})})},h=function(e,t){var n=t.player,r=t.damage,a=(0,u.getActivePlayer)(e),i=(0,u.getPlayers)(e).map(function(e){return e===n?e.addDamage(r):e}).map(function(e){return e===a&&a!==n?e.addScore(r):e});return o({},e,{players:i})},g=function(e){var t=(0,u.getPlayers)(e),n=t.filter(function(e){return!e.dead}),r=n.length>1?"in-progress":"finished";return o({},e,{roundState:r})},b=function(e){var t=(0,u.getActivePlayer)(e);return o({},e,{players:e.players.map(function(e){return e===t?t.nextWeapon():e})})},m=function(e){return function(t){return o({},t,{blockKeyNav:e})}},_=m(!0),P=m(!1)},function(e,t,n){"use strict";function r(e){var t=e.store,n=e.bgRenderer,r=e.terrainRenderer,i=e.tankRenderer,u=e.statusBarRenderer,c=e.uiRenderer,l=e.createRandomTerrain,f=e.rand;t.subscribe(function(e){var s=t.getState();switch(e.type){case a.CREATE_TERRAIN:return n.render(),void r.update((0,o.getTerrain)(s));case a.GROUND_EXPLODED:return i.updateAll((0,o.getPlayers)(s)),void r.update((0,o.getTerrain)(s));case a.FIRING_END:if("finished"===s.roundState)t.dispatch((0,a.roundEnd)());else{var d=(0,o.getWind)(s),p=f.from(1,100)>=70?d+f.from(-100,100):d;t.dispatch((0,a.nextPlayer)(p))}return;case a.ADD_PLAYER:return i.render(e.player),u.render({player:(0,o.getActivePlayer)(s),wind:(0,o.getWind)(s)}),void r.update((0,o.getTerrain)(s));case a.TURRET_ROTATE:case a.CHANGE_POWER:case a.NEXT_PLAYER:return i.updateAll((0,o.getPlayers)(s)),void u.render({player:(0,o.getActivePlayer)(s),wind:(0,o.getWind)(s)});case a.ROUND_END:return void c.roundSummaryDialog({players:(0,o.getPlayers)(s),round:s.round,onNextRound:function(){t.dispatch((0,a.createTerrain)(l())),t.dispatch((0,a.nextRound)())}});case a.NEXT_ROUND:return i.updateAll((0,o.getPlayers)(s)),u.render({player:(0,o.getActivePlayer)(s),wind:(0,o.getWind)(s)}),void r.update((0,o.getTerrain)(s));case a.NEXT_WEAPON:return void u.render({player:(0,o.getActivePlayer)(s),wind:(0,o.getWind)(s)})}})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var a=n(1),o=n(2)},function(e,t,n){"use strict";function r(e,t,n){var r=new Array(e.from(1,t/200)).fill(null).map(function(){return{x:e.from(0,t-1),h:e.from(-n/6,n/3),slope:e.from(100,300)}}),a=o.default.ofSize(t,n).flat(n/3);return r.forEach(function(e){a=a.peak(e.x,e.h,e.slope)}),a.sharpen(100,4,e.from)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var a=n(17),o=function(e){return e&&e.__esModule?e:{default:e}}(a)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var a=n(6),o=r(a),i=n(5),u=r(i),c=n(4),l=r(c),f=function(e){var t=document.querySelector(e);return t.width=document.documentElement.clientWidth,t.height=document.documentElement.clientHeight,t},s={L0:f("#layer-0"),L1:f("#layer-1"),L2:f("#layer-2"),L3:f("#layer-3"),L4:f("#layer-4"),UI:document.querySelector("#ui")},d=document.location.href.match(/seed=(\d+)/)||[],p=parseInt(d[1],10)||Math.trunc(Math.random()*Math.pow(10,6)),v=(0,l.default)(window).init(),y=new FontFace("Rubik","url(Rubik-Regular.ttf)");y.load().then(function(){document.fonts.add(y),document.title+=" ["+p+"]",(0,o.default)(p,s,function(){return new u.default},v)})},function(e,t,n){"use strict";function r(e){var t=e.draw;return{render:function(){t(function(e){var t=e.ctx,n=e.width,r=e.height,a=t.createLinearGradient(0,0,0,r);a.addColorStop(0,"#6dc2f9"),a.addColorStop(1,"#fff"),t.fillStyle=a,t.fillRect(0,0,n,r)})}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e){var t=e.width,n=e.height,r=e.getContext("2d"),a=function(e){r.save(),r.translate(.5,.5),e({ctx:r,width:t,height:n}),r.restore()},o=function(){a(function(e){var t=e.ctx,n=e.width,r=e.height;t.clearRect(0,0,n,r)})};return{width:t,height:n,draw:a,clear:o,update:function(e){o(),a(e)}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function o(e){var t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return Array.isArray(e)?e:[e]},n=function(e){return function(){var n,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments[1],u=o.className,c=o.style,l=a(o,["className","style"]),f=document.createElement(e);return u&&(n=f.classList).add.apply(n,r(u.split(/\s+/))),c&&Object.assign(f.style,c),Object.keys(l).forEach(function(e){return f.setAttribute(e,l[e])}),t(i).forEach(function(e){return f.appendChild(e)}),f}},o=n("div"),i=function(e){return document.createTextNode(e)},u=n("button"),c=function(t){return e.appendChild(t)},l=function(t){return e.removeChild(t)},f=function(t,n){return e.replaceChild(t,n)};return{div:o,txt:i,button:u,append:c,remove:l,replace:f,update:function(e,t){return t?f(e,t):c(e),e}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},function(e,t,n){"use strict";function r(e){var t=e.clear,n=e.draw;return{clear:t,render:function(e){var t=e.x,r=e.y,a=e.opacity,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=o.size,u=void 0===i?1:i;n(function(e){var n=e.ctx,o=e.height;n.fillStyle="rgba(68, 68, 68, "+a,n.fillRect(t,o-r,u,u)})},fire:function(e){var t=e.x,r=e.y,a=e.opacity,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=o.size,u=void 0===i?1:i;n(function(e){var n=e.ctx,o=e.height;n.fillStyle="rgba(249, 144, 6, "+a,n.globalCompositeOperation="lighter",n.fillRect(t,o-r,u,u)})}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e){var t=e.clear,n=e.draw,r=function(e){return n(function(t){var n=t.ctx;n.beginPath(),n.lineWidth=.5,n.strokeStyle="#000",n.moveTo(e,0),n.lineTo(e,23),n.stroke()})};return{draw:n,clear:t,renderMissile:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2;n(function(n){var o=n.ctx,i=n.height;t>i&&r(e),o.fillStyle="#f00",o.fillRect(e-a/2,i-t-a/2,a,a)})},renderAtom:function(e,t,r){n(function(n){var a=n.ctx,o=a.createRadialGradient(e,t,r/6,e,t,r);o.addColorStop(0,"rgba(255, 0, 0, 1.0)"),o.addColorStop(1,"rgba(0, 0, 0, 1.0)"),a.fillStyle=o,a.beginPath(),a.arc(e,t,r,0,2*Math.PI),a.fill()})}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e){function t(e,t,n,r,a,o){i(function(i){var u=i.ctx,c=i.height,l=c-t,f=e+n,s=l+r;u.beginPath(),u.strokeStyle=o,u.lineWidth="5",u.moveTo(e+a,l),u.lineTo(f-a,l),u.quadraticCurveTo(f,l,f,l+a),u.lineTo(f,l+r-a),u.quadraticCurveTo(f,s,f-a,s),u.lineTo(e+a,s),u.quadraticCurveTo(e,s,e,s-a),u.lineTo(e,l+a),u.quadraticCurveTo(e,l,e+a,l),u.stroke()})}function n(e,t,n,r){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:11;i(function(i){var u=i.ctx,c=i.height,l=e,f=c-t,s=l+o*Math.cos(a(n)),d=f-o*Math.sin(a(n));u.beginPath(),u.lineWidth="1.5",u.strokeStyle=r,u.moveTo(l,f),u.lineTo(s,d),u.stroke()})}function r(e){var r=e.x,a=e.y,o=e.tank,i=e.dead,u=o.size,c=u/4,l=r-u/2,f=a+4,s=i?"#333":o.color;n(r+0,a+8,o.angle,s),t(l,f,u,2,1,s),t(l+(u-c)/2+0,f+4,c,4,1,s)}var o=e.clear,i=e.draw;return{clear:o,render:r,updateAll:function(e){o(),e.forEach(r)}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var a=function(e){return e*Math.PI/180}},function(e,t,n){"use strict";function r(e){var t=e.update;return{width:e.width,height:e.height,update:function(e){t(function(t){var n=t.ctx,r=t.height;n.strokeStyle="#444",n.lineWidth=1,n.lineCap="round",n.beginPath(),e.heightMap.forEach(function(e,t){n.moveTo(t,r),n.lineTo(t,r-e)}),n.stroke(),n.closePath()})}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function a(e){var t=e.div,n=e.txt,a=e.button,i=e.append,u=e.update,c=e.remove,l=function(e){return t({className:"dialog"},e)};return{roundSummaryDialog:function(e){var r=e.players,o=e.round,u=e.onNextRound,f=function(e){return t({className:"player-rank"},n("#"+(e+1)))},s=function(e){return t({className:"player-name",style:{color:e.tank.color}},n(e.name))},d=function(e){return t({className:"player-score"},n(e.score))},p=function(e,n){return t({className:"rank-row"},[f(n),s(e),d(e)])},v=r.slice(0).sort().map(p),y=function(){return a({className:"btn rank-table-next-btn"},n("Next Round"))}(),h=l([function(){return t({className:"rank-table-header"},n("Rankings"))}(),function(){return t({className:"rank-table-subheader"},n("Round #"+(o+1)))}(),function(e){return t({className:"rank-table"},e)}(v),y]);y.addEventListener("click",function(){u(),c(h)}),i(h)},statusBar:function(){var e=function(e){return t({className:"status-bar"},e)},a=function(e,a){var i=e.className,u=r(e,["className"]);return t(o({className:"status-bar-label "+i},u),n(a))},i=void 0,c=function(e){i=u(e,i)};return{render:function(n){var r=n.player,o=n.wind,i=r.tank,u=r.armory,l=i.angle>90?180-i.angle:i.angle,f=o>0?"▶":o<0?"◀":"●",s=e([function(){return a({className:"status-bar-power"},"Power: "+i.power)}(),function(){return a({className:"status-bar-angle"},"Angle: "+l)}(),function(){return a({className:"status-bar-stamina"},"Stamina: "+i.stamina)}(),function(){return a({className:"status-bar-player",style:{color:i.color}},r.name)}(),function(){return t({className:"status-bar-weapon"},[t({className:"status-bar-weapon-icon",style:{backgroundImage:"url("+u.weapon().icon+")"}}),a({className:"status-bar-weapon-title"},u.weapon().name)])}(),function(){return a({className:"status-bar-wind"},"Wind: "+Math.abs(o)+" "+f)}()]);c(s)}}}}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=a},function(e,t){function n(e,t,n){return e===e&&(void 0!==n&&(e=e<=n?e:n),void 0!==t&&(e=e>=t?e:t)),e}function r(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function a(e){return!!e&&"object"==typeof e}function o(e){return"symbol"==typeof e||a(e)&&h.call(e)==l}function i(e){if("number"==typeof e)return e;if(o(e))return c;if(r(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=r(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(f,"");var n=d.test(e);return n||p.test(e)?v(e.slice(2),n?2:8):s.test(e)?c:+e}function u(e,t,r){return void 0===r&&(r=t,t=void 0),void 0!==r&&(r=i(r),r=r===r?r:0),void 0!==t&&(t=i(t),t=t===t?t:0),n(i(e),t,r)}var c=NaN,l="[object Symbol]",f=/^\s+|\s+$/g,s=/^[-+]0x[0-9a-f]+$/i,d=/^0b[01]+$/i,p=/^0o[0-7]+$/i,v=parseInt,y=Object.prototype,h=y.toString;e.exports=u},function(e,t,n){(function(t){function n(e,t){return null==e?void 0:e[t]}function r(e){var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"")}catch(e){}return t}function a(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function o(){this.__data__=Z?Z(null):{}}function i(e){return this.has(e)&&delete this.__data__[e]}function u(e){var t=this.__data__;if(Z){var n=t[e];return n===D?void 0:n}return Y.call(t,e)?t[e]:void 0}function c(e){var t=this.__data__;return Z?void 0!==t[e]:Y.call(t,e)}function l(e,t){return this.__data__[e]=Z&&void 0===t?D:t,this}function f(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function s(){this.__data__=[]}function d(e){var t=this.__data__,n=w(t,e);return!(n<0)&&(n==t.length-1?t.pop():J.call(t,n,1),!0)}function p(e){var t=this.__data__,n=w(t,e);return n<0?void 0:t[n][1]}function v(e){return w(this.__data__,e)>-1}function y(e,t){var n=this.__data__,r=w(n,e);return r<0?n.push([e,t]):n[r][1]=t,this}function h(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function g(){this.__data__={hash:new a,map:new(Q||f),string:new a}}function b(e){return O(this,e).delete(e)}function m(e){return O(this,e).get(e)}function _(e){return O(this,e).has(e)}function P(e,t){return O(this,e).set(e,t),this}function w(e,t){for(var n=e.length;n--;)if(N(e[n][0],t))return n;return-1}function x(e){return!(!S(e)||T(e))&&(A(e)||r(e)?V:G).test(M(e))}function O(e,t){var n=e.__data__;return R(t)?n["string"==typeof t?"string":"hash"]:n.map}function E(e,t){var r=n(e,t);return x(r)?r:void 0}function R(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}function T(e){return!!z&&z in e}function M(e){if(null!=e){try{return B.call(e)}catch(e){}try{return e+""}catch(e){}}return""}function j(e,t){if("function"!=typeof e||t&&"function"!=typeof t)throw new TypeError(k);var n=function(){var r=arguments,a=t?t.apply(this,r):r[0],o=n.cache;if(o.has(a))return o.get(a);var i=e.apply(this,r);return n.cache=o.set(a,i),i};return n.cache=new(j.Cache||h),n}function N(e,t){return e===t||e!==e&&t!==t}function A(e){var t=S(e)?H.call(e):"";return t==I||t==L}function S(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}var k="Expected a function",D="__lodash_hash_undefined__",I="[object Function]",L="[object GeneratorFunction]",C=/[\\^$.*+?()[\]{}|]/g,G=/^\[object .+?Constructor\]$/,W="object"==typeof t&&t&&t.Object===Object&&t,K="object"==typeof self&&self&&self.Object===Object&&self,U=W||K||Function("return this")(),F=Array.prototype,$=Function.prototype,X=Object.prototype,q=U["__core-js_shared__"],z=function(){var e=/[^.]+$/.exec(q&&q.keys&&q.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}(),B=$.toString,Y=X.hasOwnProperty,H=X.toString,V=RegExp("^"+B.call(Y).replace(C,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),J=F.splice,Q=E(U,"Map"),Z=E(Object,"create");a.prototype.clear=o,a.prototype.delete=i,a.prototype.get=u,a.prototype.has=c,a.prototype.set=l,f.prototype.clear=s,f.prototype.delete=d,f.prototype.get=p,f.prototype.has=v,f.prototype.set=y,h.prototype.clear=g,h.prototype.delete=b,h.prototype.get=m,h.prototype.has=_,h.prototype.set=P,j.Cache=h,e.exports=j}).call(t,n(36))},function(e,t){function n(){}e.exports=n},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n}]);