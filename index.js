import{d as e,c as t,o as n,a as r,t as a,u as s,r as o,b as i,e as l,f as u,w as c,g as f,h as p,i as d,j as v,n as m,T as y,k as h,l as g,m as D,p as E,q as S,s as w}from"./vendor.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))processPreload(e);new MutationObserver((e=>{for(const t of e)if("childList"===t.type)for(const e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&processPreload(e)})).observe(document,{childList:!0,subtree:!0})}function processPreload(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const F={class:"default-hover-text"},_export_sfc=(e,t)=>{const n=e.__vccOpts||e;for(const[r,a]of t)n[r]=a;return n},T=_export_sfc(e({__name:"FileInputDefaultHoverText",props:{state:null},setup(e){const o=e,{dropHoverItemCount:i}=o.state.private,l=t((()=>{const e=i.value>1?"s":"";return`Drop ${i.value} file${e}`}));return(e,t)=>(n(),r("div",F,a(s(l)),1))}}),[["__scopeId","data-v-387a5e57"]]),_=["title"],b={key:0,class:"parsing"},I={key:1},Y={key:2,style:{display:"contents"}},k=_export_sfc(e({__name:"FileInputDefaultText",props:{state:null},setup(e){const l=e,{count:u,fileEntries:c,parsing:f}=l.state.private,p=t((()=>c.value.slice(0,50).map((e=>e.name)).join("\n")));return(e,t)=>(n(),r("div",{class:"default-prompt-text",title:s(p)},[s(f)?(n(),r("div",b,"Parsing...")):s(u)?(n(),r("div",I,a(s(u))+" file"+a(s(u)>1?"s":""),1)):(n(),r("div",Y,[o(e.$slots,"default",{},(()=>[i("Select file")]),!0)]))],8,_))}}),[["__scopeId","data-v-d987e1fa"]]),M=["accept","multiple","nwdirectory"],L={key:0,class:"content hover"},H={key:1,class:"content selected"},z={key:2,class:"content prompt"},$=_export_sfc(e({__name:"FileInput",props:{state:null,globalDropZone:{type:Boolean,default:!0},dropZoneSelector:{default:null},accept:{default:"*/*"},multiple:{type:Boolean,default:!0},nwdirectory:{type:Boolean,default:!1}},setup(e){const a=e,i=l(null),{globalDropZone:g,dropZoneSelector:D,nwdirectory:E}=u(a),{parsing:S,file:w,dropHover:F,setFiles:_,setDataTransfer:b,setDataTransferHover:I,resetDataTransferHover:Y,isNwDirectory:$,inputElem:B}=a.state.private;function onFileInputChange(e){const t=e.target;_(t.files)}c((()=>{$.value=E.value})),f((()=>{B.value=i.value}));const P=l(null),C=t((()=>D.value?document.querySelector(D.value):g.value?document.body:P.value));function stopEvent(e){e.preventDefault(),e.stopPropagation()}function onDrop(e){stopEvent(e),F.value=!1,b(e.dataTransfer)}function onDragOver(e){stopEvent(e),e.dataTransfer&&(e.dataTransfer.dropEffect="copy")}function onDragEnter(e){stopEvent(e),F.value||(F.value=!0,I(e.dataTransfer))}function onDragLeave(e){stopEvent(e),C.value?.contains(e.relatedTarget)||(F.value=!1,Y())}function onDragOverNonDropZone(e){C.value?.contains(e.target)||(stopEvent(e),e.dataTransfer&&(e.dataTransfer.dropEffect="none"))}function onKeyDown(e){"Enter"===e.key&&P.value?.querySelector("label")?.click()}return f((()=>{!function(){if(!C.value)return;C.value.addEventListener("dragenter",onDragEnter),C.value.addEventListener("dragleave",onDragLeave),C.value.addEventListener("drop",onDrop),C.value.addEventListener("dragover",onDragOver),document.body.addEventListener("dragover",onDragOverNonDropZone)}()})),p((()=>{!function(){if(!C.value)return;C.value.removeEventListener("dragenter",onDragEnter),C.value.removeEventListener("dragleave",onDragLeave),C.value.removeEventListener("drop",onDrop),C.value.removeEventListener("dragover",onDragOver),document.body.removeEventListener("dragover",onDragOverNonDropZone)}()})),(t,a)=>(n(),r("div",{class:m(["file-input",{"drop-hover":s(F)}]),ref_key:"fileInputElem",ref:P,tabindex:"0",onKeydown:onKeyDown},[d("label",null,[d("input",{type:"file",accept:e.accept,multiple:e.multiple,onChange:onFileInputChange,style:{display:"none"},nwdirectory:s(E),ref_key:"templateInputElem",ref:i},null,40,M),s(F)?(n(),r("span",L,[o(t.$slots,"hover",{},(()=>[h(T,{state:e.state},null,8,["state"])]),!0)])):s(w)&&!s(S)?(n(),r("span",H,[o(t.$slots,"selected",{},(()=>[h(k,{state:e.state},null,8,["state"])]),!0)])):(n(),r("span",z,[o(t.$slots,"prompt",{},(()=>[h(k,{state:e.state},null,8,["state"])]),!0)]))]),(n(),v(y,{to:"body"},[d("div",{class:m(["file-input-hover-modal",{"drop-hover":s(F)}])},null,2)]))],34))}}),[["__scopeId","data-v-2f9e9767"]]);function dateToDayDateTimeString(e,t=!0){return function(e=new Date,t="YYYY.MM.DD",n=!0){function isString(e){return"string"==typeof e||e instanceof String}function firefoxDateFix(e){return isString(e)?e.replace(/(?<y>\d{4})\.(?<m>\d{2})\.(?<d>\d{2})/,"$<y>-$<m>-$<d>"):e}function pad0(e,t=2){return e.toString().padStart(t,"0")}class DateFormatter{constructor(e=new Date,t=!0){this.date=e,this.utc=t?"UTC":""}get SS(){return pad0(this.date[`get${this.utc}Seconds`]())}get mm(){return pad0(this.date[`get${this.utc}Minutes`]())}get HH(){return pad0(this.date[`get${this.utc}Hours`]())}get MM(){return pad0(this.date[`get${this.utc}Month`]()+1)}get DD(){return pad0(this.date[`get${this.utc}Date`]())}get YYYY(){return pad0(this.date[`get${this.utc}FullYear`](),4)}get YY(){return this.YYYY.slice(2)}}e=firefoxDateFix(e);const r=new Date(e);"Invalid Date"===r.toString()&&console.warn("Invalid Date value: ",e);const a=new DateFormatter(r,n);return t.replaceAll(/YYYY|YY|MM|DD|HH|mm|SS/g,((...e)=>a[e[0]]))}(e,"YYYY.MM.DD HH:mm:SS",t)+(t?"Z":"")}function bytesToSizeWinLike(e){if(e<1024)return e+" B";let t=Math.floor(Math.log(e)/Math.log(1024)),n=e/Math.pow(1024,t);return n>=1e3&&(t++,n/=1024),function(e){let t;e<10?t=Math.trunc(100*e)/100:e<100?t=Math.trunc(10*e)/10:e<1e3&&(t=Math.trunc(e));if(e<.1)return t.toPrecision(1);if(e<1)return t.toPrecision(2);return t.toPrecision(3)}(n)+" "+["B","KB","MB","GB","TB","PB","EB","ZB","YB"][t]}const B={key:0,class:"file-info"},P=["title"],C=["title"],W={key:0,class:"file-mtime"},x=_export_sfc(e({__name:"FileInputSelectedInfo",props:{state:null},setup(e){const t=e,{file:o}=t.state.private;return(e,t)=>s(o)?(n(),r("span",B,[d("span",{class:"file-name",title:s(o).name},a(s(o).name),9,P),d("span",{class:"file-size",title:s(o).size},a(s(bytesToSizeWinLike)(s(o).size)),9,C),s(o).mtime?(n(),r("span",W,a(s(dateToDayDateTimeString)(s(o).mtime,!1)),1)):g("",!0)])):g("",!0)}}),[["__scopeId","data-v-0d979e03"]]);class WebFileEntry{constructor({file:e,type:t,name:n,parent:r}){this.file=e,this.type=t,n&&(this._name=n),r&&(this.parent=r,r.addChild(this))}get nativePath(){return this.file.path}get name(){return this._name||this.file.name}addChild(e){this.children||(this.children=[]),this.children.push(e),this.increaseContentSize(e.size)}increaseContentSize(e){e&&(this._contentSize||(this._contentSize=0),this._contentSize+=e,this.parent&&this.parent.increaseContentSize(e))}get size(){return"folder"===this.type?this._contentSize||0:this.file.size||0}get mtime(){return this.file.lastModified||0}get path(){return this.parent?[...this.parent.path,this]:[this]}*[Symbol.iterator](){if(yield this,this.children)for(const e of this.children)yield*e}flat(){return[...this]}static flat(e){return e.map((e=>[...e])).flat()}static async fromDataTransfer(e,t){const n=[...e.items],r=[...e.files],a=await async function(e){const t=[];for(const n of e)t.push(await dtItemToFileSystemEntry(n));return t}(n);console.log("[fileSystemEntries]:",a);const s=[];for(const o of a)s.push(await fromFileSystemEntry(o,null,t,r.shift()));return s}static fromFiles(e,t="file"){const n=[];for(const r of e)n.push(new WebFileEntry({type:t,file:r}));return n}}async function fromFileSystemEntry(e,t=null,n=!1,r){if(!e.isFile){if(e.isDirectory&&n){const a=new WebFileEntry({type:"folder",parent:t,name:e.name,file:r}),s=async function*(e){const t=e.createReader();let n=[];do{n=await new Promise(((e,n)=>t.readEntries(e,n)));for(const e of n)yield e}while(n.length)}(e);for await(const e of s)await fromFileSystemEntry(e,a,n);return a}return new WebFileEntry({type:"folder",parent:t,name:e.name,file:r})}try{const n=await(a=e,new Promise(((e,t)=>a.file(e,t))));return new WebFileEntry({file:n,type:"file",parent:t})}catch(s){return console.error("[fromFileSystemEntry][error]",e.name,s),null}var a}async function dtItemToFileSystemEntry(e){return e.webkitGetAsEntry()}const N="undefined"!=typeof nw&&1===nw.process?.__nwjs;function getStateInstance(e={}){const n={recursive:!1,debug:!1};Object.assign(n,e);const{recursive:r,debug:a}=n,s=l([]),o=l([]),i=l(null),u=l(!1),f=l([]),p=l(null),d=l(!1),v=l(0),m=l([]),y=l(!1),h=function(e){return e?(...e)=>{console.log(...e)}:()=>{}}(a);c((async()=>{const e=Date.now();u.value=!0,p.value?(h("[fromDataTransferItems]"),s.value=await WebFileEntry.fromDataTransfer(p.value,r)):N&&y.value?(h("[isNwDirectory]"),s.value=WebFileEntry.fromFiles(o.value,"folder")):(h("[fromFiles]"),s.value=WebFileEntry.fromFiles(o.value)),u.value=!1,h("[WebFileEntry parsing][time]:",Date.now()-e,"ms"),h("[fileEntries]",E(s.value))}));const g=t((()=>s.value[0])),S=t((()=>s.value.length));function setFiles(e,t=!0){const n=[...e];o.value=n,h("[setFiles]:",n),t&&(p.value=null,f.value=[])}return{fileEntries:D(s),clearInput:function(){i.value&&(i.value.value=""),o.value=[],p.value=null,f.value=[]},private:{dropHover:d,dropHoverItemCount:v,dropHoverTypes:m,fileEntries:s,parsing:u,file:g,count:S,setDataTransferHover:function(e){if(!e)return;const t=e.items.length,n=[...e.items].map((e=>e.type)),r=[...new Set(n)];v.value=t,m.value=r,h("[setDataTransferHover]:",t,r)},resetDataTransferHover:function(){v.value=0,m.value=[]},setDataTransfer:function(e){e&&(h("setDataTransfer",e),setFiles(e.files,!1),function(e){const t=[...e];f.value=t,h("[_setDtItems]:",t),h("[_setDtItems][0]:",{kind:t[0].kind,type:t[0].type})}(e.items),p.value=e)},setFiles:setFiles,isNwDirectory:y,inputElem:i}}}w({__name:"App",setup(e){const t=getStateInstance({recursive:!0,debug:!0});return globalThis.state=t,(e,r)=>(n(),v(s($),{state:s(t)},{selected:S((()=>[h(s(x),{state:s(t)},null,8,["state"])])),_:1},8,["state"]))}}).mount("#app");
//# sourceMappingURL=index.js.map
