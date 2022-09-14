(self.webpackChunkjs_just_code=self.webpackChunkjs_just_code||[]).push([[143],{89:(e,n,t)=>{"use strict";window.addLoadEventListener=function(e,n=1e3){let t=!1;const o=()=>{t||(t=!0,e())};window.addEventListener("DOMContentLoaded",o),window.addEventListener("load",o),document.addEventListener("load",o),window.addEventListener("ready",o),setTimeout(o,n)};var o=t(4763);const r=document.querySelector("#output");let a=0,i=0,c=null,d=null;function s(){performance.now()-i>100&&c&&(r.appendChild(c),c=null,i=performance.now())}function l(e,n){const t=function(e,n){const t=document.createElement("pre");return t.classList.add("log-item"),t.style.color=`var(--${n})`,t.innerText=e,a%2!=0&&t.classList.add("odd"),a++,t}(e,n);performance.now()-i>100?(r.appendChild(t),i=performance.now()):(c||(c=document.createDocumentFragment()),c.appendChild(t),i=performance.now(),d||clearTimeout(d),d=setTimeout(s,100))}function u(e,...n){for(const t of n)l("object"==typeof t?JSON.stringify(t):t.toString(),e)}let m=[],g=[];function f(e,n,t){return new Promise((async(n,o)=>{try{m.forEach((e=>document.body.removeChild(e))),m=[],m.push(e);let o=e.contentWindow.eval(t);o instanceof Promise&&(o=await o),n(o)}catch(e){console.error(e),o(e)}}))}function h(e){const n=document.createElement("iframe");n.style.display="none",document.body.appendChild(n);let t=e;t||(t={}),function(e){e.console={log:u.bind(null,"foreground"),error:u.bind(null,"error"),warn:u.bind(null,"warning"),info:u.bind(null,"foreground"),dir:u.bind(null,"foreground"),debug:u.bind(null,"accent")}}(t);for(const o in t)e.hasOwnProperty(o)&&(n.contentWindow[o]=e[o]);return n.evaluate=f.bind(this,n,e),n}function w(){function e(e,...n){self.postMessage({event:"log",type:e,text:n.map((e=>{return(n=e,n instanceof Error?n.stack||n.message:"object"==typeof n?JSON.stringify(n):n.toString()).replaceAll(new RegExp(self.name,"g"),"(sandbox)");var n})).join(" ")})}self.console={log:e.bind(null,"log"),info:e.bind(null,"log"),dir:e.bind(null,"log"),debug:e.bind(null,"log"),error:e.bind(null,"error"),warn:e.bind(null,"warn")}}function p(e){if(e&&e.data&&"log"===e.data.event)switch(e.data.type){case"log":l(e.data.text);break;case"error":l(e.data.text,"error");break;case"warn":case"warning":l(e.data.text,"warning")}}function v(e){let n="Unknown error!";e&&e.stack?n=e.stack:e&&e.message?n=e.message:e&&"string"==typeof e&&(n=e),l(n,"error")}async function b({code:e}){g.forEach((e=>e.terminate())),g=[];const n=w.toString().replace(w.name,""),t=new Blob([`"use strict";\n\t\t\t(${n})();\n\t\t\t(async function(){\n\t\t\t\t${e}\n\t\t\t})().then(x => {}).catch(e => console.error(e));`],{type:"application/javascript"}),o=URL.createObjectURL(t),r=new Worker(o,{name:o});g.push(r),r.onmessage=p.bind(this),r.onerror=r.onunhandledrejection=v.bind(this)}var y=t(2138);async function E(){const e=window._instance.getValue(),n={};r.innerHTML="",a=0;let t=null;t="worker"==y.Xd.evaluatorMode?b({code:e,context:n}):async function({code:e,context:n}){const t=h(n);return await t.evaluate(e)}({code:e,context:n}),t.then((e=>{e&&(l("-- Program exited, output: "),l(e))}),(e=>{l("stack"in e?e.stack:e,o.Z.getColor("error"))}))}t.e(915).then(t.bind(t,4915)),t.e(750).then(t.bind(t,3750)),window.runCode=e=>E(),window.addLoadEventListener((async e=>{await t.e(216).then(t.t.bind(t,7287,23)),await t.e(216).then(t.t.bind(t,8805,23)),document.body.classList.add("loaded"),await Promise.all([t.e(216),t.e(425)]).then(t.bind(t,3425))}))},2138:(e,n,t)=>{"use strict";t.d(n,{Xd:()=>d});var o=t(4763);const r=document.getElementById("settingsModal"),a=r.querySelector("button"),i=r.querySelector("input[name='settingLightMode']"),c=r.querySelector("select[name='settingEvaluator']");a.addEventListener("click",(function(){a.disabled=!0,r.classList.add("hide"),setTimeout((()=>{a.disabled=!1,r.classList.remove("hide"),r.close()}),500)})),i.addEventListener("change",(e=>{d.lightMode=!0===i.checked;const n=d.lightMode?"XCode":"OneDarkPro";o.Z.loadTheme(t(5876)(`./${n}.json`),n),s()})),c.addEventListener("change",(e=>{d.evaluatorMode=c.value,s()}));const d={lightMode:!1,evaluatorMode:"sandbox"};function s(){localStorage.setItem("settings",JSON.stringify(d))}!function(){let e=localStorage.getItem("settings");if(e){e=JSON.parse(e);for(const n in e)e.hasOwnProperty(n)&&(d[n]=e[n])}i.checked=d.lightMode,c.value=d.evaluatorMode}()},4763:(e,n,t)=>{"use strict";async function o(e){async function n(n){!function(e){[...document.querySelectorAll(`link[rel='${e}']`)].forEach((e=>e.parentElement.removeChild(e)))}(n);const t=function(e){const n=document.createElement("link");return n.rel=e,n.type="apple-touch-icon"==e?"image/png":"image/x-icon",n}(n),o=await async function(){const e=localStorage.getItem("svg-favicon");if(e)return e;const n=await fetch("https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15/svgs/solid/code.svg");let t=await n.text();return t=`data:image/svg+xml;base64,${btoa(t)}`,localStorage.setItem("svg-favicon",t),t}(),r=await function(e){return new Promise(((n,t)=>{const o=document.createElement("img");o.src=e,o.onload=()=>n(o),o.onerror=e=>t(e)}))}(o),a=function(e,n){const t=document.createElement("canvas"),o=t.getContext("2d");return t.width=e.width,t.height=e.height,o.fillStyle=n,o.fillRect(0,0,t.width,t.height),o.globalCompositeOperation="destination-atop",o.drawImage(e,0,0),t}(r,e);"apple-touch-icon"==n?a.toBlob((e=>{t.href=URL.createObjectURL(e),document.head.appendChild(t)}),"image/png"):(t.href=a.toDataURL(),document.head.appendChild(t))}await n("shortcut icon"),await n("apple-touch-icon"),await n("icon")}t.d(n,{Z:()=>s});var r=t(5558);const a={};function i({r:e,g:n,b:t,a:o}){return`rgba(${e}, ${n}, ${t}, ${o})`}function c(e,n=null){let t=n;return t||(t=window._instance._themeService._theme.colors),t instanceof Map?i(t.get(e).rgba):i(t[e].rgba)}function d({name:e,value:n}){document.documentElement.style.setProperty(`--${e}`,n),a[e]=n}const s={loadTheme:async function(e,n){const t=await e;r.j6.defineTheme(n,t),r.j6.setTheme(n),d({name:"background",value:c("editor.background")}),d({name:"foreground",value:c("editor.foreground")}),d({name:"accent",value:c("symbolIcon.methodForeground",window._instance._themeService._theme.defaultColors)}),o(a.accent),d({name:"error",value:c("editorError.foreground")}),d({name:"warning",value:c("editorWarning.foreground")})},getColor:e=>e in a?a[e]:e}},5876:(e,n,t)=>{var o={"./OneDarkPro.json":[9462,462],"./XCode.json":[9784,784]};function r(e){if(!t.o(o,e))return Promise.resolve().then((()=>{var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=o[e],r=n[0];return t.e(n[1]).then((()=>t.t(r,19)))}r.keys=()=>Object.keys(o),r.id=5876,e.exports=r}},e=>{e.O(0,[216],(()=>{return n=89,e(e.s=n);var n}));e.O()}]);