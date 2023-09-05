(()=>{"use strict";var t={9662:(t,r,e)=>{var n=e(614),o=e(6330),i=TypeError;t.exports=function(t){if(n(t))return t;throw i(o(t)+" is not a function")}},9670:(t,r,e)=>{var n=e(111),o=String,i=TypeError;t.exports=function(t){if(n(t))return t;throw i(o(t)+" is not an object")}},8533:(t,r,e)=>{var n=e(2092).forEach,o=e(9341)("forEach");t.exports=o?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},1318:(t,r,e)=>{var n=e(5656),o=e(1400),i=e(6244),a=function(t){return function(r,e,a){var c,u=n(r),s=i(u),l=o(a,s);if(t&&e!=e){for(;s>l;)if((c=u[l++])!=c)return!0}else for(;s>l;l++)if((t||l in u)&&u[l]===e)return t||l||0;return!t&&-1}};t.exports={includes:a(!0),indexOf:a(!1)}},2092:(t,r,e)=>{var n=e(9974),o=e(1702),i=e(8361),a=e(7908),c=e(6244),u=e(5417),s=o([].push),l=function(t){var r=1===t,e=2===t,o=3===t,l=4===t,f=6===t,p=7===t,d=5===t||f;return function(v,g,m,h){for(var b,y,x=a(v),S=i(x),w=n(g,m),O=c(S),j=0,E=h||u,L=r?E(v,O):e||p?E(v,0):void 0;O>j;j++)if((d||j in S)&&(y=w(b=S[j],j,x),t))if(r)L[j]=y;else if(y)switch(t){case 3:return!0;case 5:return b;case 6:return j;case 2:s(L,b)}else switch(t){case 4:return!1;case 7:s(L,b)}return f?-1:o||l?l:L}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6),filterReject:l(7)}},9341:(t,r,e)=>{var n=e(7293);t.exports=function(t,r){var e=[][t];return!!e&&n((function(){e.call(null,r||function(){return 1},1)}))}},7475:(t,r,e)=>{var n=e(3157),o=e(4411),i=e(111),a=e(5112)("species"),c=Array;t.exports=function(t){var r;return n(t)&&(r=t.constructor,(o(r)&&(r===c||n(r.prototype))||i(r)&&null===(r=r[a]))&&(r=void 0)),void 0===r?c:r}},5417:(t,r,e)=>{var n=e(7475);t.exports=function(t,r){return new(n(t))(0===r?0:r)}},4326:(t,r,e)=>{var n=e(1702),o=n({}.toString),i=n("".slice);t.exports=function(t){return i(o(t),8,-1)}},648:(t,r,e)=>{var n=e(1694),o=e(614),i=e(4326),a=e(5112)("toStringTag"),c=Object,u="Arguments"===i(function(){return arguments}());t.exports=n?i:function(t){var r,e,n;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=function(t,r){try{return t[r]}catch(t){}}(r=c(t),a))?e:u?i(r):"Object"===(n=i(r))&&o(r.callee)?"Arguments":n}},9920:(t,r,e)=>{var n=e(2597),o=e(3887),i=e(1236),a=e(3070);t.exports=function(t,r,e){for(var c=o(r),u=a.f,s=i.f,l=0;l<c.length;l++){var f=c[l];n(t,f)||e&&n(e,f)||u(t,f,s(r,f))}}},8880:(t,r,e)=>{var n=e(9781),o=e(3070),i=e(9114);t.exports=n?function(t,r,e){return o.f(t,r,i(1,e))}:function(t,r,e){return t[r]=e,t}},9114:t=>{t.exports=function(t,r){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:r}}},8052:(t,r,e)=>{var n=e(614),o=e(3070),i=e(6339),a=e(3072);t.exports=function(t,r,e,c){c||(c={});var u=c.enumerable,s=void 0!==c.name?c.name:r;if(n(e)&&i(e,s,c),c.global)u?t[r]=e:a(r,e);else{try{c.unsafe?t[r]&&(u=!0):delete t[r]}catch(t){}u?t[r]=e:o.f(t,r,{value:e,enumerable:!1,configurable:!c.nonConfigurable,writable:!c.nonWritable})}return t}},3072:(t,r,e)=>{var n=e(7854),o=Object.defineProperty;t.exports=function(t,r){try{o(n,t,{value:r,configurable:!0,writable:!0})}catch(e){n[t]=r}return r}},9781:(t,r,e)=>{var n=e(7293);t.exports=!n((function(){return 7!==Object.defineProperty({},1,{get:function(){return 7}})[1]}))},4154:t=>{var r="object"==typeof document&&document.all,e=void 0===r&&void 0!==r;t.exports={all:r,IS_HTMLDDA:e}},317:(t,r,e)=>{var n=e(7854),o=e(111),i=n.document,a=o(i)&&o(i.createElement);t.exports=function(t){return a?i.createElement(t):{}}},8324:t=>{t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},8509:(t,r,e)=>{var n=e(317)("span").classList,o=n&&n.constructor&&n.constructor.prototype;t.exports=o===Object.prototype?void 0:o},8113:t=>{t.exports="undefined"!=typeof navigator&&String(navigator.userAgent)||""},7392:(t,r,e)=>{var n,o,i=e(7854),a=e(8113),c=i.process,u=i.Deno,s=c&&c.versions||u&&u.version,l=s&&s.v8;l&&(o=(n=l.split("."))[0]>0&&n[0]<4?1:+(n[0]+n[1])),!o&&a&&(!(n=a.match(/Edge\/(\d+)/))||n[1]>=74)&&(n=a.match(/Chrome\/(\d+)/))&&(o=+n[1]),t.exports=o},748:t=>{t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},2109:(t,r,e)=>{var n=e(7854),o=e(1236).f,i=e(8880),a=e(8052),c=e(3072),u=e(9920),s=e(4705);t.exports=function(t,r){var e,l,f,p,d,v=t.target,g=t.global,m=t.stat;if(e=g?n:m?n[v]||c(v,{}):(n[v]||{}).prototype)for(l in r){if(p=r[l],f=t.dontCallGetSet?(d=o(e,l))&&d.value:e[l],!s(g?l:v+(m?".":"#")+l,t.forced)&&void 0!==f){if(typeof p==typeof f)continue;u(p,f)}(t.sham||f&&f.sham)&&i(p,"sham",!0),a(e,l,p,t)}}},7293:t=>{t.exports=function(t){try{return!!t()}catch(t){return!0}}},9974:(t,r,e)=>{var n=e(1470),o=e(9662),i=e(4374),a=n(n.bind);t.exports=function(t,r){return o(t),void 0===r?t:i?a(t,r):function(){return t.apply(r,arguments)}}},4374:(t,r,e)=>{var n=e(7293);t.exports=!n((function(){var t=function(){}.bind();return"function"!=typeof t||t.hasOwnProperty("prototype")}))},6916:(t,r,e)=>{var n=e(4374),o=Function.prototype.call;t.exports=n?o.bind(o):function(){return o.apply(o,arguments)}},6530:(t,r,e)=>{var n=e(9781),o=e(2597),i=Function.prototype,a=n&&Object.getOwnPropertyDescriptor,c=o(i,"name"),u=c&&"something"===function(){}.name,s=c&&(!n||n&&a(i,"name").configurable);t.exports={EXISTS:c,PROPER:u,CONFIGURABLE:s}},1470:(t,r,e)=>{var n=e(4326),o=e(1702);t.exports=function(t){if("Function"===n(t))return o(t)}},1702:(t,r,e)=>{var n=e(4374),o=Function.prototype,i=o.call,a=n&&o.bind.bind(i,i);t.exports=n?a:function(t){return function(){return i.apply(t,arguments)}}},5005:(t,r,e)=>{var n=e(7854),o=e(614);t.exports=function(t,r){return arguments.length<2?(e=n[t],o(e)?e:void 0):n[t]&&n[t][r];var e}},8173:(t,r,e)=>{var n=e(9662),o=e(8554);t.exports=function(t,r){var e=t[r];return o(e)?void 0:n(e)}},7854:function(t,r,e){var n=function(t){return t&&t.Math===Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e.g&&e.g)||function(){return this}()||this||Function("return this")()},2597:(t,r,e)=>{var n=e(1702),o=e(7908),i=n({}.hasOwnProperty);t.exports=Object.hasOwn||function(t,r){return i(o(t),r)}},3501:t=>{t.exports={}},4664:(t,r,e)=>{var n=e(9781),o=e(7293),i=e(317);t.exports=!n&&!o((function(){return 7!==Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},8361:(t,r,e)=>{var n=e(1702),o=e(7293),i=e(4326),a=Object,c=n("".split);t.exports=o((function(){return!a("z").propertyIsEnumerable(0)}))?function(t){return"String"===i(t)?c(t,""):a(t)}:a},2788:(t,r,e)=>{var n=e(1702),o=e(614),i=e(5465),a=n(Function.toString);o(i.inspectSource)||(i.inspectSource=function(t){return a(t)}),t.exports=i.inspectSource},9909:(t,r,e)=>{var n,o,i,a=e(4811),c=e(7854),u=e(111),s=e(8880),l=e(2597),f=e(5465),p=e(6200),d=e(3501),v="Object already initialized",g=c.TypeError,m=c.WeakMap;if(a||f.state){var h=f.state||(f.state=new m);h.get=h.get,h.has=h.has,h.set=h.set,n=function(t,r){if(h.has(t))throw g(v);return r.facade=t,h.set(t,r),r},o=function(t){return h.get(t)||{}},i=function(t){return h.has(t)}}else{var b=p("state");d[b]=!0,n=function(t,r){if(l(t,b))throw g(v);return r.facade=t,s(t,b,r),r},o=function(t){return l(t,b)?t[b]:{}},i=function(t){return l(t,b)}}t.exports={set:n,get:o,has:i,enforce:function(t){return i(t)?o(t):n(t,{})},getterFor:function(t){return function(r){var e;if(!u(r)||(e=o(r)).type!==t)throw g("Incompatible receiver, "+t+" required");return e}}}},3157:(t,r,e)=>{var n=e(4326);t.exports=Array.isArray||function(t){return"Array"===n(t)}},614:(t,r,e)=>{var n=e(4154),o=n.all;t.exports=n.IS_HTMLDDA?function(t){return"function"==typeof t||t===o}:function(t){return"function"==typeof t}},4411:(t,r,e)=>{var n=e(1702),o=e(7293),i=e(614),a=e(648),c=e(5005),u=e(2788),s=function(){},l=[],f=c("Reflect","construct"),p=/^\s*(?:class|function)\b/,d=n(p.exec),v=!p.exec(s),g=function(t){if(!i(t))return!1;try{return f(s,l,t),!0}catch(t){return!1}},m=function(t){if(!i(t))return!1;switch(a(t)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return v||!!d(p,u(t))}catch(t){return!0}};m.sham=!0,t.exports=!f||o((function(){var t;return g(g.call)||!g(Object)||!g((function(){t=!0}))||t}))?m:g},4705:(t,r,e)=>{var n=e(7293),o=e(614),i=/#|\.prototype\./,a=function(t,r){var e=u[c(t)];return e===l||e!==s&&(o(r)?n(r):!!r)},c=a.normalize=function(t){return String(t).replace(i,".").toLowerCase()},u=a.data={},s=a.NATIVE="N",l=a.POLYFILL="P";t.exports=a},8554:t=>{t.exports=function(t){return null==t}},111:(t,r,e)=>{var n=e(614),o=e(4154),i=o.all;t.exports=o.IS_HTMLDDA?function(t){return"object"==typeof t?null!==t:n(t)||t===i}:function(t){return"object"==typeof t?null!==t:n(t)}},1913:t=>{t.exports=!1},2190:(t,r,e)=>{var n=e(5005),o=e(614),i=e(7976),a=e(3307),c=Object;t.exports=a?function(t){return"symbol"==typeof t}:function(t){var r=n("Symbol");return o(r)&&i(r.prototype,c(t))}},6244:(t,r,e)=>{var n=e(7466);t.exports=function(t){return n(t.length)}},6339:(t,r,e)=>{var n=e(1702),o=e(7293),i=e(614),a=e(2597),c=e(9781),u=e(6530).CONFIGURABLE,s=e(2788),l=e(9909),f=l.enforce,p=l.get,d=String,v=Object.defineProperty,g=n("".slice),m=n("".replace),h=n([].join),b=c&&!o((function(){return 8!==v((function(){}),"length",{value:8}).length})),y=String(String).split("String"),x=t.exports=function(t,r,e){"Symbol("===g(d(r),0,7)&&(r="["+m(d(r),/^Symbol\(([^)]*)\)/,"$1")+"]"),e&&e.getter&&(r="get "+r),e&&e.setter&&(r="set "+r),(!a(t,"name")||u&&t.name!==r)&&(c?v(t,"name",{value:r,configurable:!0}):t.name=r),b&&e&&a(e,"arity")&&t.length!==e.arity&&v(t,"length",{value:e.arity});try{e&&a(e,"constructor")&&e.constructor?c&&v(t,"prototype",{writable:!1}):t.prototype&&(t.prototype=void 0)}catch(t){}var n=f(t);return a(n,"source")||(n.source=h(y,"string"==typeof r?r:"")),t};Function.prototype.toString=x((function(){return i(this)&&p(this).source||s(this)}),"toString")},4758:t=>{var r=Math.ceil,e=Math.floor;t.exports=Math.trunc||function(t){var n=+t;return(n>0?e:r)(n)}},3070:(t,r,e)=>{var n=e(9781),o=e(4664),i=e(3353),a=e(9670),c=e(4948),u=TypeError,s=Object.defineProperty,l=Object.getOwnPropertyDescriptor,f="enumerable",p="configurable",d="writable";r.f=n?i?function(t,r,e){if(a(t),r=c(r),a(e),"function"==typeof t&&"prototype"===r&&"value"in e&&d in e&&!e[d]){var n=l(t,r);n&&n[d]&&(t[r]=e.value,e={configurable:p in e?e[p]:n[p],enumerable:f in e?e[f]:n[f],writable:!1})}return s(t,r,e)}:s:function(t,r,e){if(a(t),r=c(r),a(e),o)try{return s(t,r,e)}catch(t){}if("get"in e||"set"in e)throw u("Accessors not supported");return"value"in e&&(t[r]=e.value),t}},1236:(t,r,e)=>{var n=e(9781),o=e(6916),i=e(5296),a=e(9114),c=e(5656),u=e(4948),s=e(2597),l=e(4664),f=Object.getOwnPropertyDescriptor;r.f=n?f:function(t,r){if(t=c(t),r=u(r),l)try{return f(t,r)}catch(t){}if(s(t,r))return a(!o(i.f,t,r),t[r])}},8006:(t,r,e)=>{var n=e(6324),o=e(748).concat("length","prototype");r.f=Object.getOwnPropertyNames||function(t){return n(t,o)}},5181:(t,r)=>{r.f=Object.getOwnPropertySymbols},7976:(t,r,e)=>{var n=e(1702);t.exports=n({}.isPrototypeOf)},6324:(t,r,e)=>{var n=e(1702),o=e(2597),i=e(5656),a=e(1318).indexOf,c=e(3501),u=n([].push);t.exports=function(t,r){var e,n=i(t),s=0,l=[];for(e in n)!o(c,e)&&o(n,e)&&u(l,e);for(;r.length>s;)o(n,e=r[s++])&&(~a(l,e)||u(l,e));return l}},1956:(t,r,e)=>{var n=e(6324),o=e(748);t.exports=Object.keys||function(t){return n(t,o)}},5296:(t,r)=>{var e={}.propertyIsEnumerable,n=Object.getOwnPropertyDescriptor,o=n&&!e.call({1:2},1);r.f=o?function(t){var r=n(this,t);return!!r&&r.enumerable}:e},288:(t,r,e)=>{var n=e(1694),o=e(648);t.exports=n?{}.toString:function(){return"[object "+o(this)+"]"}},2140:(t,r,e)=>{var n=e(6916),o=e(614),i=e(111),a=TypeError;t.exports=function(t,r){var e,c;if("string"===r&&o(e=t.toString)&&!i(c=n(e,t)))return c;if(o(e=t.valueOf)&&!i(c=n(e,t)))return c;if("string"!==r&&o(e=t.toString)&&!i(c=n(e,t)))return c;throw a("Can't convert object to primitive value")}},3887:(t,r,e)=>{var n=e(5005),o=e(1702),i=e(8006),a=e(5181),c=e(9670),u=o([].concat);t.exports=n("Reflect","ownKeys")||function(t){var r=i.f(c(t)),e=a.f;return e?u(r,e(t)):r}},4488:(t,r,e)=>{var n=e(8554),o=TypeError;t.exports=function(t){if(n(t))throw o("Can't call method on "+t);return t}},6200:(t,r,e)=>{var n=e(2309),o=e(9711),i=n("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},5465:(t,r,e)=>{var n=e(7854),o=e(3072),i="__core-js_shared__",a=n[i]||o(i,{});t.exports=a},2309:(t,r,e)=>{var n=e(1913),o=e(5465);(t.exports=function(t,r){return o[t]||(o[t]=void 0!==r?r:{})})("versions",[]).push({version:"3.32.1",mode:n?"pure":"global",copyright:"© 2014-2023 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.32.1/LICENSE",source:"https://github.com/zloirock/core-js"})},6293:(t,r,e)=>{var n=e(7392),o=e(7293),i=e(7854).String;t.exports=!!Object.getOwnPropertySymbols&&!o((function(){var t=Symbol("symbol detection");return!i(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&n&&n<41}))},1400:(t,r,e)=>{var n=e(9303),o=Math.max,i=Math.min;t.exports=function(t,r){var e=n(t);return e<0?o(e+r,0):i(e,r)}},5656:(t,r,e)=>{var n=e(8361),o=e(4488);t.exports=function(t){return n(o(t))}},9303:(t,r,e)=>{var n=e(4758);t.exports=function(t){var r=+t;return r!=r||0===r?0:n(r)}},7466:(t,r,e)=>{var n=e(9303),o=Math.min;t.exports=function(t){return t>0?o(n(t),9007199254740991):0}},7908:(t,r,e)=>{var n=e(4488),o=Object;t.exports=function(t){return o(n(t))}},7593:(t,r,e)=>{var n=e(6916),o=e(111),i=e(2190),a=e(8173),c=e(2140),u=e(5112),s=TypeError,l=u("toPrimitive");t.exports=function(t,r){if(!o(t)||i(t))return t;var e,u=a(t,l);if(u){if(void 0===r&&(r="default"),e=n(u,t,r),!o(e)||i(e))return e;throw s("Can't convert object to primitive value")}return void 0===r&&(r="number"),c(t,r)}},4948:(t,r,e)=>{var n=e(7593),o=e(2190);t.exports=function(t){var r=n(t,"string");return o(r)?r:r+""}},1694:(t,r,e)=>{var n={};n[e(5112)("toStringTag")]="z",t.exports="[object z]"===String(n)},6330:t=>{var r=String;t.exports=function(t){try{return r(t)}catch(t){return"Object"}}},9711:(t,r,e)=>{var n=e(1702),o=0,i=Math.random(),a=n(1..toString);t.exports=function(t){return"Symbol("+(void 0===t?"":t)+")_"+a(++o+i,36)}},3307:(t,r,e)=>{var n=e(6293);t.exports=n&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},3353:(t,r,e)=>{var n=e(9781),o=e(7293);t.exports=n&&o((function(){return 42!==Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},4811:(t,r,e)=>{var n=e(7854),o=e(614),i=n.WeakMap;t.exports=o(i)&&/native code/.test(String(i))},5112:(t,r,e)=>{var n=e(7854),o=e(2309),i=e(2597),a=e(9711),c=e(6293),u=e(3307),s=n.Symbol,l=o("wks"),f=u?s.for||s:s&&s.withoutSetter||a;t.exports=function(t){return i(l,t)||(l[t]=c&&i(s,t)?s[t]:f("Symbol."+t)),l[t]}},9554:(t,r,e)=>{var n=e(2109),o=e(8533);n({target:"Array",proto:!0,forced:[].forEach!==o},{forEach:o})},7941:(t,r,e)=>{var n=e(2109),o=e(7908),i=e(1956);n({target:"Object",stat:!0,forced:e(7293)((function(){i(1)}))},{keys:function(t){return i(o(t))}})},1539:(t,r,e)=>{var n=e(1694),o=e(8052),i=e(288);n||o(Object.prototype,"toString",i,{unsafe:!0})},4747:(t,r,e)=>{var n=e(7854),o=e(8324),i=e(8509),a=e(8533),c=e(8880),u=function(t){if(t&&t.forEach!==a)try{c(t,"forEach",a)}catch(r){t.forEach=a}};for(var s in o)o[s]&&u(n[s]&&n[s].prototype);u(i)},1144:(t,r,e)=>{e.d(r,{Z:()=>c});var n=e(8081),o=e.n(n),i=e(3645),a=e.n(i)()(o());a.push([t.id,'.p2{padding:2px}.mt3{margin-top:3rem}*,*::after,*::before{margin:0;padding:0;box-sizing:inherit;font-family:inherit}html{font-size:62.5%}@media(prefers-reduced-motion: no-preference){html{scroll-behavior:smooth}}@media only screen and (min-width: 180em){html{font-size:100%}}body{height:100vh;background:var(--main-gradient);background:-webkit-linear-gradient(to right, var(--secondary-gradient), var(--main-gradient));background:linear-gradient(to right, var(--secondary-gradient), var(--main-gradient));box-sizing:border-box;text-align:center;font-family:"Rubik",sans-serif;color:var(--text_color);overflow-y:hidden}ul{list-style-type:none;margin:0;padding:0}img,video{width:100%;height:auto;object-fit:cover}a{text-decoration:none;color:inherit}li{list-style:none}button{border:none;background:none;cursor:pointer}textarea{resize:none}.drag{max-width:180rem;margin:0 auto}.drag__container{display:flex;align-items:flex-start;flex-wrap:wrap;margin:2rem}.theme-light{--text-color: #666;--background-color: #eee;--main-gradient: #757f9a;--secondary-gradient: #d7dde8}.theme-dark{--text-color: #eee;--background-color: #666;--main-gradient: #232526;--secondary-gradient: #414345}.heading-primary{letter-spacing:2px;text-shadow:2px 2px 5px var(--text-color);font-size:4rem}.heading-secondary{letter-spacing:1px;text-shadow:1px 1px 1px var(--text-color);font-size:2.4rem}.add{display:flex;justify-content:space-between;font-size:1.8rem}.add__btn{margin:10px;padding:5px 10px;display:flex;align-items:center;cursor:pointer;width:fit-content;border-radius:5px;transition:all .3s ease-in;user-select:none}.add__btn:hover{background-color:rgba(255,255,255,.9);color:#000}.add__btn:active{transform:scale(0.97)}.add__btn-save{display:none}.add__btn-save:hover{transition:unset;filter:brightness(95%);color:#fff}.add__btn-plus{font-size:2rem;margin-right:5px;transform:translateY(-1px)}.drag__column{flex:1 30rem;margin:1rem;position:relative;background-color:rgba(0,0,0,.1);border-radius:1rem;overflow-x:hidden}.todo__title{background-color:#f05852}.inprogress__title{background-color:#55b7ea}.done__title{background-color:#85c555}.add-container{margin:1rem;padding:.5rem 1rem;border-radius:1rem;background-color:rgba(255,255,255,.1);min-height:10rem;display:none}.add-item{width:100%;min-height:10rem;height:auto;background-color:var(--background-color);border-radius:1rem;margin:.5rem auto;resize:none;color:var(--text-color);padding:1rem}.add-item:focus{outline:none}.custom-scroll{overflow-y:auto;max-height:75vh}.custom-scroll::-webkit-scrollbar-track{box-shadow:inset 0 0 .5rem rgba(0,0,0,.4);border-radius:1rem;background-color:rgba(255,255,255,.3);margin-right:.5rem}.custom-scroll::-webkit-scrollbar{width:1rem}.custom-scroll::-webkit-scrollbar-thumb{border-radius:1rem;box-shadow:inset 0 0 .5rem rgba(0,0,0,.3);background-color:rgba(0,0,0,.8)}.drag__list{min-height:5rem}.drag__list-item{font-size:1.8rem;line-height:1.8rem;letter-spacing:1px;text-align:left;margin:1rem;padding:.8rem;height:fit-content;background-color:rgba(0,0,0,.1);border-radius:1rem;cursor:pointer}.drag__list-item:focus{outline:none;background-color:#fff;color:#000}',""]);const c=a},3645:t=>{t.exports=function(t){var r=[];return r.toString=function(){return this.map((function(r){var e="",n=void 0!==r[5];return r[4]&&(e+="@supports (".concat(r[4],") {")),r[2]&&(e+="@media ".concat(r[2]," {")),n&&(e+="@layer".concat(r[5].length>0?" ".concat(r[5]):""," {")),e+=t(r),n&&(e+="}"),r[2]&&(e+="}"),r[4]&&(e+="}"),e})).join("")},r.i=function(t,e,n,o,i){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(n)for(var c=0;c<this.length;c++){var u=this[c][0];null!=u&&(a[u]=!0)}for(var s=0;s<t.length;s++){var l=[].concat(t[s]);n&&a[l[0]]||(void 0!==i&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=i),e&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=e):l[2]=e),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),r.push(l))}},r}},8081:t=>{t.exports=function(t){return t[1]}},3379:t=>{var r=[];function e(t){for(var e=-1,n=0;n<r.length;n++)if(r[n].identifier===t){e=n;break}return e}function n(t,n){for(var i={},a=[],c=0;c<t.length;c++){var u=t[c],s=n.base?u[0]+n.base:u[0],l=i[s]||0,f="".concat(s," ").concat(l);i[s]=l+1;var p=e(f),d={css:u[1],media:u[2],sourceMap:u[3],supports:u[4],layer:u[5]};if(-1!==p)r[p].references++,r[p].updater(d);else{var v=o(d,n);n.byIndex=c,r.splice(c,0,{identifier:f,updater:v,references:1})}a.push(f)}return a}function o(t,r){var e=r.domAPI(r);return e.update(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap&&r.supports===t.supports&&r.layer===t.layer)return;e.update(t=r)}else e.remove()}}t.exports=function(t,o){var i=n(t=t||[],o=o||{});return function(t){t=t||[];for(var a=0;a<i.length;a++){var c=e(i[a]);r[c].references--}for(var u=n(t,o),s=0;s<i.length;s++){var l=e(i[s]);0===r[l].references&&(r[l].updater(),r.splice(l,1))}i=u}}},569:t=>{var r={};t.exports=function(t,e){var n=function(t){if(void 0===r[t]){var e=document.querySelector(t);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(t){e=null}r[t]=e}return r[t]}(t);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(e)}},9216:t=>{t.exports=function(t){var r=document.createElement("style");return t.setAttributes(r,t.attributes),t.insert(r,t.options),r}},3565:(t,r,e)=>{t.exports=function(t){var r=e.nc;r&&t.setAttribute("nonce",r)}},7795:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var r=t.insertStyleElement(t);return{update:function(e){!function(t,r,e){var n="";e.supports&&(n+="@supports (".concat(e.supports,") {")),e.media&&(n+="@media ".concat(e.media," {"));var o=void 0!==e.layer;o&&(n+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),n+=e.css,o&&(n+="}"),e.media&&(n+="}"),e.supports&&(n+="}");var i=e.sourceMap;i&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),r.styleTagTransform(n,t,r.options)}(r,t,e)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(r)}}}},4589:t=>{t.exports=function(t,r){if(r.styleSheet)r.styleSheet.cssText=t;else{for(;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(document.createTextNode(t))}}}},r={};function e(n){var o=r[n];if(void 0!==o)return o.exports;var i=r[n]={id:n,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.exports}e.n=t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},e.d=(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),e.o=(t,r)=>Object.prototype.hasOwnProperty.call(t,r),e.nc=void 0,(()=>{e(9554),e(1539),e(4747),e(7941);var t=["Plan a day","Make a coffee"],r=["Do workout","Listen to music"],n=["Check LinkedIn messages","Read emails"],o=[t,r,n];function i(t,r){t.forEach((function(t,e){localStorage.setItem("".concat(t,"Items"),JSON.stringify(r[e]))}))}var a=[document.getElementById("todo-list"),document.getElementById("inprogress-list"),document.getElementById("done-list")],c=!1,u=e(3379),s=e.n(u),l=e(7795),f=e.n(l),p=e(569),d=e.n(p),v=e(3565),g=e.n(v),m=e(9216),h=e.n(m),b=e(4589),y=e.n(b),x=e(1144),S={};S.styleTagTransform=y(),S.setAttributes=g(),S.insert=d().bind(null,"head"),S.domAPI=f(),S.insertStyleElement=h(),s()(x.Z,S),x.Z&&x.Z.locals&&x.Z.locals,c||(localStorage.getItem("todoItems")?(t=JSON.parse(localStorage.todoItems),r=JSON.parse(localStorage.inprogressItems),n=JSON.parse(localStorage.doneItems)):i(["todo","inprogress","done"],o)),a.forEach((function(t){return t.textContent=""})),o.forEach((function(t,r){t.forEach((function(t){!function(t,r,e){var n=document.createElement("li");n.classList.add("drag__list-item"),n.textContent=e,t.appendChild(n)}(a[r],0,t)}))})),c=!0,i()})()})();