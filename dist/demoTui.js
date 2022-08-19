"use strict";(()=>{var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __commonJS=(cb,mod)=>function(){return mod||(0,cb[__getOwnPropNames(cb)[0]])((mod={exports:{}}).exports,mod),mod.exports};var __copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:!0}):target,mod));var require_main_min=__commonJS({"libs/midi-parser@colxi/main.min.js"(exports,module){(function(){"use strict";let n={debug:!1,parse:function(e,t){if(e instanceof Uint8Array)return n.Uint8(e);if(typeof e=="string")return n.Base64(e);if(e instanceof HTMLElement&&e.type==="file")return n.addListener(e,t);throw new Error("MidiParser.parse() : Invalid input provided")},addListener:function(e,r){if(!File||!FileReader)throw new Error("The File|FileReader APIs are not supported in this browser. Use instead MidiParser.Base64() or MidiParser.Uint8()");if(e===void 0||!(e instanceof HTMLElement)||e.tagName!=="INPUT"||e.type.toLowerCase()!=="file")return console.warn("MidiParser.addListener() : Provided element is not a valid FILE INPUT element"),!1;r=r||function(){},e.addEventListener("change",function(e2){if(!e2.target.files.length)return!1;console.log("MidiParser.addListener() : File detected in INPUT ELEMENT processing data..");let t=new FileReader;t.readAsArrayBuffer(e2.target.files[0]),t.onload=function(e3){r(n.Uint8(new Uint8Array(e3.target.result)))}})},Base64:function(e){let t=function(e2){var t2="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";if(e2=e2.replace(/^.*?base64,/,""),e2=String(e2).replace(/[\t\n\f\r ]+/g,""),!/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/.test(e2))throw new TypeError("Failed to execute _atob() : The string to be decoded is not correctly encoded.");e2+="==".slice(2-(3&e2.length));let r2,a2="",n2,i,d2=0;for(;d2<e2.length;)r2=t2.indexOf(e2.charAt(d2++))<<18|t2.indexOf(e2.charAt(d2++))<<12|(n2=t2.indexOf(e2.charAt(d2++)))<<6|(i=t2.indexOf(e2.charAt(d2++))),a2+=n2===64?String.fromCharCode(r2>>16&255):i===64?String.fromCharCode(r2>>16&255,r2>>8&255):String.fromCharCode(r2>>16&255,r2>>8&255,255&r2);return a2}(e=String(e));var r=t.length;let a=new Uint8Array(new ArrayBuffer(r));for(let e2=0;e2<r;e2++)a[e2]=t.charCodeAt(e2);return n.Uint8(a)},Uint8:function(e){let i={data:null,pointer:0,movePointer:function(e2){return this.pointer+=e2,this.pointer},readInt:function(t2){if((t2=Math.min(t2,this.data.byteLength-this.pointer))<1)return-1;let r=0;if(1<t2)for(let e2=1;e2<=t2-1;e2++)r+=this.data.getUint8(this.pointer)*Math.pow(256,t2-e2),this.pointer++;return r+=this.data.getUint8(this.pointer),this.pointer++,r},readStr:function(t2){let r="";for(let e2=1;e2<=t2;e2++)r+=String.fromCharCode(this.readInt(1));return r},backOne:function(){this.pointer--},readIntVLV:function(){let r=0;if(this.pointer>=this.data.byteLength)return-1;if(this.data.getUint8(this.pointer)<128)r=this.readInt(1);else{let t2=[];for(;128<=this.data.getUint8(this.pointer);)t2.push(this.readInt(1)-128);var e2=this.readInt(1);for(let e3=1;e3<=t2.length;e3++)r+=t2[t2.length-e3]*Math.pow(128,e3);r+=e2}return r}};if(i.data=new DataView(e.buffer,e.byteOffset,e.byteLength),i.readInt(4)!==1297377380)return console.warn("Header validation failed (not MIDI standard or file corrupt.)"),!1;i.readInt(4);let d2={};d2.formatType=i.readInt(2),d2.tracks=i.readInt(2),d2.track=[];var e=i.readInt(1),t=i.readInt(1);128<=e?(d2.timeDivision=[],d2.timeDivision[0]=e-128,d2.timeDivision[1]=t):d2.timeDivision=256*e+t;for(let n2=1;n2<=d2.tracks;n2++){d2.track[n2-1]={event:[]};var s,o2=i.readInt(4);if(o2===-1)break;if(o2!==1297379947)return!1;i.readInt(4);let e2=0,t2=!1,r,a;for(;!t2&&(e2++,d2.track[n2-1].event[e2-1]={},d2.track[n2-1].event[e2-1].deltaTime=i.readIntVLV(),(r=i.readInt(1))!==-1);)if(128<=r?a=r:(r=a,i.movePointer(-1)),r===255){d2.track[n2-1].event[e2-1].type=255,d2.track[n2-1].event[e2-1].metaType=i.readInt(1);var c=i.readIntVLV();switch(d2.track[n2-1].event[e2-1].metaType){case 47:case-1:t2=!0;break;case 1:case 2:case 3:case 4:case 5:case 7:case 6:d2.track[n2-1].event[e2-1].data=i.readStr(c);break;case 33:case 89:case 81:d2.track[n2-1].event[e2-1].data=i.readInt(c);break;case 84:d2.track[n2-1].event[e2-1].data=[],d2.track[n2-1].event[e2-1].data[0]=i.readInt(1),d2.track[n2-1].event[e2-1].data[1]=i.readInt(1),d2.track[n2-1].event[e2-1].data[2]=i.readInt(1),d2.track[n2-1].event[e2-1].data[3]=i.readInt(1),d2.track[n2-1].event[e2-1].data[4]=i.readInt(1);break;case 88:d2.track[n2-1].event[e2-1].data=[],d2.track[n2-1].event[e2-1].data[0]=i.readInt(1),d2.track[n2-1].event[e2-1].data[1]=i.readInt(1),d2.track[n2-1].event[e2-1].data[2]=i.readInt(1),d2.track[n2-1].event[e2-1].data[3]=i.readInt(1);break;default:this.customInterpreter!==null&&(d2.track[n2-1].event[e2-1].data=this.customInterpreter(d2.track[n2-1].event[e2-1].metaType,i,c)),this.customInterpreter!==null&&d2.track[n2-1].event[e2-1].data!==!1||(i.readInt(c),d2.track[n2-1].event[e2-1].data=i.readInt(c),this.debug&&console.info("Unimplemented 0xFF meta event! data block readed as Integer"))}}else switch((r=r.toString(16).split(""))[1]||r.unshift("0"),d2.track[n2-1].event[e2-1].type=parseInt(r[0],16),d2.track[n2-1].event[e2-1].channel=parseInt(r[1],16),d2.track[n2-1].event[e2-1].type){case 15:this.customInterpreter!==null&&(d2.track[n2-1].event[e2-1].data=this.customInterpreter(d2.track[n2-1].event[e2-1].type,i,!1)),this.customInterpreter!==null&&d2.track[n2-1].event[e2-1].data!==!1||(s=i.readIntVLV(),d2.track[n2-1].event[e2-1].data=i.readInt(s),this.debug&&console.info("Unimplemented 0xF exclusive events! data block readed as Integer"));break;case 10:case 11:case 14:case 8:case 9:d2.track[n2-1].event[e2-1].data=[],d2.track[n2-1].event[e2-1].data[0]=i.readInt(1),d2.track[n2-1].event[e2-1].data[1]=i.readInt(1);break;case 12:case 13:d2.track[n2-1].event[e2-1].data=i.readInt(1);break;case-1:t2=!0;break;default:if(this.customInterpreter!==null&&(d2.track[n2-1].event[e2-1].data=this.customInterpreter(d2.track[n2-1].event[e2-1].metaType,i,!1)),this.customInterpreter===null||d2.track[n2-1].event[e2-1].data===!1)return console.log("Unknown EVENT detected... reading cancelled!"),!1}}return d2},customInterpreter:null};if(typeof module<"u")module.exports=n;else{let e=typeof window=="object"&&window.self===window&&window||typeof self=="object"&&self.self===self&&self||typeof global=="object"&&global.global===global&&global;e.MidiParser=n}})()}});DOMTokenList.prototype.on=function(classNme){!this.contains(classNme)&&this.toggle(classNme)};DOMTokenList.prototype.off=function(classNme){this.contains(classNme)&&this.toggle(classNme)};var $e=function(selector,source=document){return source?.querySelector(selector)},$a=function(selector,source=document){return Array.from(source?.querySelectorAll(selector))};var CustomEventSource=class{#eventListeners={};addEventListener(type,callback){this.#eventListeners[type]||(this.#eventListeners[type]=[]),this.#eventListeners[type].unshift(callback)}removeEventListener(type,callback){if(this.#eventListeners[type]){let index=this.#eventListeners[type].indexOf(callback);index>-1&&this.#eventListeners[type].splice(index,1),this.#eventListeners[type].length<1&&delete this.#eventListeners[type]}}dispatchEvent(type){let eventObj=new Event(type),upThis=this;this.#eventListeners[type]?.length>0&&this.#eventListeners[type].forEach(function(e){e?.call(upThis,eventObj)}),this[`on${type}`]&&this[`on${type}`](eventObj)}};var modeIdx=["?","gm","gs","xg","mt32","ns5r","ag10","x5d","05rw"],modeMap={};modeIdx.forEach(function(e,i){modeMap[e]=i});var toZero=function(e,i,a){a[i]=0},OctaviaDevice=class{#mode=0;#chActive=new Array(64);#cc=new Uint8ClampedArray(8192);#prg=new Uint8ClampedArray(64);#velo=new Uint8ClampedArray(8192);#poly=new Uint16Array(512);#pitch=new Int16Array(64);#subMsb=0;#subLsb=0;#runChEvent={8:function(det){let rawNote=det.part*128+det.data[0],polyIdx=this.#poly.indexOf(rawNote);polyIdx>-1&&(this.#poly[polyIdx]=0,this.#velo[rawNote]=0)},9:function(det){this.#chActive[det.part]=!0;let place=0;for(;this.#poly[place]>0;)place++;if(place<512){let rawNote=det.part*128+det.data[0];this.#poly[place]=rawNote,this.#velo[rawNote]=det.data[1]}else console.error("Polyphony exceeded.")},10:function(det){console.warn(det)},11:function(det){console.warn(det)},12:function(det){this.#chActive[det.part]=!0,console.warn(det)},13:function(det){console.warn(det)},14:function(det){console.warn(det)},15:function(det){console.warn(det)},255:function(det){console.warn(det)}};getActive(){return this.#chActive.slice()}getCc(channel){let start=channel*128;return Array.from(this.#cc).slice(start,start+128)}getPitch(){return Array.from(this.#pitch)}getProgram(){return Array.from(this.#prg)}getVel(channel){let notes=new Map,upThis=this;return this.#poly.forEach(function(e){let realCh=e>>7,realNote=e&127;channel==realCh&&upThis.#velo[e]>0&&notes.set(realNote,upThis.#velo[e])}),notes}getMode(){return modeIdx[this.#mode]}init(){this.#mode=0,this.#subMsb=0,this.#subLsb=0,this.#chActive.forEach(toZero),this.#cc.forEach(toZero),this.#prg.forEach(toZero),this.#velo.forEach(toZero),this.#poly.forEach(toZero)}switchMode(mode,forced=!1){let idx=modeIdx.indexOf(mode);if(idx>-1)(this.#mode==0||forced)&&(this.#mode=idx);else throw new Error(`Unknown mode ${mode}`)}runJson(json){this.#runChEvent[json.type].call(this,json)}runRaw(midiArr){}};var import_main_min=__toESM(require_main_min(),1);var TimedEvent=class{#ranged=!1;constructor(ranged,start,end,data2){this.#ranged=ranged,this.start=start,this.end=end,this.data=data2}get duration(){return this.ranged?this.end-this.start:0}get ranged(){return this.#ranged}},RangeEvent=class extends TimedEvent{constructor(start,end,data2){super(!0,start,end,data2)}},PointEvent=class extends TimedEvent{constructor(start,data2){super(!1,start,start,data2)}},TimedEvents=class extends Array{#index=-1;constructor(){super(...arguments)}resetIndex(pointer){this.#index=-1}fresh(){this.sort(function(a,b){return a.start==b.start?0:(+(a.start>b.start)<<1)-1}),this.forEach(function(e,i){e.index=i})}step(time,allowRepeat=!1){let array=[];if(allowRepeat)for(let index=0;index<this.length&&!(this[index].start>time);index++){if(this[index].end<time)continue;array.push(this[index])}else{let rawArray=this.getRange(time-1,time),upThis=this;rawArray.forEach(function(e){e.index>upThis.#index&&(array.push(e),upThis.#index=e.index)})}return array}getRange(start,end){start>end&&([start,end]=[end,start]);let array=[],index=-1,chunk=Math.ceil(Math.sqrt(this.length)),working=!0;for(let c=0;c<this.length;c+=chunk)this[c+chunk]?index<0&&this[c+chunk].start>=start&&(index=c):index=index<0?c:index;for(;working;)this[index].end<end?this[index].start>=start&&array.push(this[index]):working=!1,index++;return array}};var veryBig=0xffffffffffff,rawToPool=function(midiJson){let list=new TimedEvents,upThis=this,timeDiv=midiJson.timeDivision,tempo=120,tempoChanges=new TimedEvents,pointer=0,pointerOffset=0;tempoChanges.push(new RangeEvent(0,veryBig,[120,0])),midiJson.track.forEach(function(e0){pointer=0,e0.event.forEach(function(e1){pointer+=e1.deltaTime,e1.type==255&&e1?.metaType==81&&(tempo=6e7/e1.data,tempoChanges[tempoChanges.length-1]&&tempoChanges.push(new RangeEvent(pointer,0xffffffffffff,[tempo,0])))})}),tempoChanges.fresh(),tempoChanges.forEach(function(e,i,a){i>0&&(a[i-1].end=e.start)});let tTempo=120;tempoChanges.forEach(function(e,i,a){e.end==e.start?a.splice(a.indexOf(e),1):tTempo==e.data[0]&&(a[i-1].end=e.end,a.splice(a.indexOf(e),1)),tTempo=e.data[0]});let cOffset=0,cTempo=120;return tempoChanges.forEach(function(e){let cPointer=e.start,curTime=cPointer/cTempo/timeDiv*60+cOffset;cTempo=e.data[0],cOffset=curTime-cPointer/cTempo/timeDiv*60,e.data[1]=cOffset}),console.debug("All tempo changes: ",tempoChanges),tempo=120,pointer=0,pointerOffset=0,midiJson.track.forEach(function(e0,i0){pointer=0,pointerOffset=0,e0.event.forEach(function(e1,i1){pointer+=e1.deltaTime;let changeData=tempoChanges.step(pointer,!0)[0];changeData&&(tempo=changeData.data[0],pointerOffset=changeData.data[1]);let appendObj={type:e1.type,data:e1.data,track:i0,part:0};e1.type>14?appendObj.meta=e1.metaType:appendObj.part=e1.channel,list.push(new PointEvent(pointer/tempo/timeDiv*60+pointerOffset,appendObj))})}),list.fresh(),list};var noteNames=["C~","C#","D~","Eb","E~","F~","F#","G~","Ab","A~","Bb","B~"],noteRegion="!0123456789";import_main_min.default.customInterpreter=function(type,file,rawMtLen){let u8Data=[],metaLength=rawMtLen==!1?file.readIntVLV():rawMtLen;type==127&&(metaLength=1);for(let c=0;c<metaLength;c++){let byte=file.readInt(1);if(u8Data.push(byte),byte==247)return u8Data;if(byte>127)return console.debug(`Early termination: ${u8Data}`),file.backOne(),file.backOne(),u8Data}return u8Data};var RootDisplay=class extends CustomEventSource{#midiState=new OctaviaDevice;#midiPool;reset(){this.dispatchEvent("reset"),this.#midiPool?.resetIndex(),this.#midiState.init()}async loadFile(blob2){this.#midiPool=rawToPool(import_main_min.default.parse(new Uint8Array(await blob2.arrayBuffer())))}switchMode(modeName,forced=!1){this.#midiState.switchMode(modeName,forced)}getMode(){return this.#midiState.mode}render(time){let events=this.#midiPool.step(time),extraPoly=0,notes=new Set,upThis=this;events.forEach(function(e){let raw=e.data;raw.type==9&&(raw.data[1]>0?notes.add(raw.part*128+raw.data[0]):notes.has(raw.part*128+raw.data[0])&&extraPoly++),e.data.type==8&&notes.has(raw.part*128+raw.data[0])&&extraPoly++,upThis.#midiState.runJson(raw)});let chInUse=this.#midiState.getActive(),chKeyPr=[],chPitch=upThis.#midiState.getPitch(),chContr=[],chProgr=upThis.#midiState.getProgram(),curPoly=0;return chInUse.forEach(function(e,i){e&&(chKeyPr[i]=upThis.#midiState.getVel(i),chContr[i]=upThis.#midiState.getCc(i),curPoly+=chKeyPr[i].size)}),{extraPoly,curPoly,chInUse,chKeyPr,chPitch,chProgr,chContr,mode:this.getMode()}}},TuiDisplay=class extends RootDisplay{constructor(){super()}render(time){let fields=new Array(30),sum=super.render(time);fields[0]=`Poly: ${(sum.curPoly+sum.extraPoly).toString().padStart(3,"0")}/512`,fields[2]="Ch:Prg Note";let line=3;return sum.chInUse.forEach(function(e,i){e&&(fields[line]=`${(i+1).toString().padStart(2,"0")}:${sum.chProgr[i].toString().padStart(3,"0")}`,sum.chKeyPr[i].forEach(function(e2,i2){e2>0&&(fields[line]+=` ${noteNames[i2%12]}${noteRegion[Math.floor(i2/12)]}`)}),line++)}),fields.forEach(function(e,i,a){e.length>100&&(a[i]=e.slice(0,100))}),fields.join(`
`)}};var T=Object.defineProperty,f=(e,t)=>()=>(e&&(t=e(e=0)),t),d=(e,t)=>{for(var i in t)T(e,i,{get:t[i],enumerable:!0})},y={};d(y,{default:()=>E});var E,p=f(()=>{E=async(e=[{}])=>(Array.isArray(e)||(e=[e]),new Promise((t,i)=>{let r=document.createElement("input");r.type="file";let l=[...e.map(s=>s.mimeTypes||[]).join(),e.map(s=>s.extensions||[]).join()].join();r.multiple=e[0].multiple||!1,r.accept=l||"";let n=()=>c(i),a=s=>{typeof c=="function"&&c(),t(s)},c=e[0].legacySetup&&e[0].legacySetup(a,n,r);r.addEventListener("change",()=>{a(r.multiple?Array.from(r.files):r.files[0])}),r.click()}))}),w={};d(w,{default:()=>I});var N,I,h=f(()=>{N=async e=>{let t=await e.getFile();return t.handle=e,t},I=async(e=[{}])=>{Array.isArray(e)||(e=[e]);let t=[];e.forEach((l,n)=>{t[n]={description:l.description||"",accept:{}},l.mimeTypes?l.mimeTypes.map(a=>{t[n].accept[a]=l.extensions||[]}):t[n].accept["*/*"]=l.extensions||[]});let i=await window.showOpenFilePicker({id:e[0].id,startIn:e[0].startIn,types:t,multiple:e[0].multiple||!1,excludeAcceptAllOption:e[0].excludeAcceptAllOption||!1}),r=await Promise.all(i.map(N));return e[0].multiple?r:r[0]}}),o={};d(o,{default:()=>M});var M,A=f(()=>{M=async(e=[{}])=>(Array.isArray(e)||(e=[e]),e[0].recursive=e[0].recursive||!1,new Promise((t,i)=>{let r=document.createElement("input");r.type="file",r.webkitdirectory=!0;let l=()=>a(i),n=c=>{typeof a=="function"&&a(),t(c)},a=e[0].legacySetup&&e[0].legacySetup(n,l,r);r.addEventListener("change",()=>{let c=Array.from(r.files);e[0].recursive?e[0].recursive&&e[0].skipDirectory&&(c=c.filter(s=>s.webkitRelativePath.split("/").every(S=>!e[0].skipDirectory({name:S,kind:"directory"})))):c=c.filter(s=>s.webkitRelativePath.split("/").length===2),n(c)}),r.click()}))}),x={};d(x,{default:()=>B});var v,B,g=f(()=>{v=async(e,t,i=e.name,r)=>{let l=[],n=[];for await(let a of e.values()){let c=`${i}/${a.name}`;a.kind==="file"?n.push(a.getFile().then(s=>(s.directoryHandle=e,s.handle=a,Object.defineProperty(s,"webkitRelativePath",{configurable:!0,enumerable:!0,get:()=>c})))):a.kind==="directory"&&t&&(!r||!r(a))&&l.push(v(a,t,c,r))}return[...(await Promise.all(l)).flat(),...await Promise.all(n)]},B=async(e={})=>{e.recursive=e.recursive||!1;let t=await window.showDirectoryPicker({id:e.id,startIn:e.startIn});return v(t,e.recursive,void 0,e.skipDirectory)}}),k={};d(k,{default:()=>W});async function $(e,t){let i=e.getReader(),r=new ReadableStream({start(n){return a();async function a(){return i.read().then(({done:c,value:s})=>{if(c){n.close();return}return n.enqueue(s),a()})}}}),l=new Response(r);return i.releaseLock(),new Blob([await l.blob()],{type:t})}var W,P=f(()=>{W=async(e,t={})=>{Array.isArray(t)&&(t=t[0]);let i=document.createElement("a"),r=e;"body"in e&&(r=await $(e.body,e.headers.get("content-type"))),i.download=t.fileName||"Untitled",i.href=URL.createObjectURL(r);let l=()=>a(reject),n=()=>{typeof a=="function"&&a()},a=t.legacySetup&&t.legacySetup(n,l,i);return i.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(i.href),30*1e3),n(null)}),i.click(),null}}),j={};d(j,{default:()=>q});var q,L=f(()=>{q=async(e,t=[{}],i=null,r=!1)=>{Array.isArray(t)||(t=[t]),t[0].fileName=t[0].fileName||"Untitled";let l=[];if(t.forEach((c,s)=>{l[s]={description:c.description||"",accept:{}},c.mimeTypes?(s===0&&(e.type?c.mimeTypes.push(e.type):e.headers&&e.headers.get("content-type")&&c.mimeTypes.push(e.headers.get("content-type"))),c.mimeTypes.map(m=>{l[s].accept[m]=c.extensions||[]})):e.type&&(l[s].accept[e.type]=c.extensions||[])}),i)try{await i.getFile()}catch(c){if(i=null,r)throw c}let n=i||await window.showSaveFilePicker({suggestedName:t[0].fileName,id:t[0].id,startIn:t[0].startIn,types:l,excludeAcceptAllOption:t[0].excludeAcceptAllOption||!1}),a=await n.createWritable();return"stream"in e?(await e.stream().pipeTo(a),n):"body"in e?(await e.body.pipeTo(a),n):(await a.write(blob),await a.close(),n)}}),F=(()=>{if(typeof self>"u")return!1;if("top"in self&&self!==top)try{top.location+""}catch{return!1}else if("showOpenFilePicker"in self)return"showOpenFilePicker";return!1})(),u=F,U=u?Promise.resolve().then(()=>(h(),w)):Promise.resolve().then(()=>(p(),y));async function _(...e){return(await U).default(...e)}var D=u?Promise.resolve().then(()=>(g(),x)):Promise.resolve().then(()=>(A(),o));var z=u?Promise.resolve().then(()=>(L(),j)):Promise.resolve().then(()=>(P(),k));var stSwitch=$a("[id^=mode]");stSwitch.to=function(i){stSwitch.forEach(function(e){e.classList.off("active")}),stSwitch[i].classList.on("active")};stSwitch.forEach(function(e,i,a){e.addEventListener("click",function(){tuiVis.switchMode(e.title),stSwitch.to(i)})});self.tuiVis=new TuiDisplay;tuiVis.addEventListener("reset",function(e){});var audioBlob,propsMid=JSON.parse('{"extensions":[".mid",".MID"],"startIn":"music","id":"midiOpener","description":"Open a MIDI file"}'),propsAud=JSON.parse('{"mimeTypes":["audio/*"],"startIn":"music","id":"audioOpener","description":"Open an audio file"}');$e("#openMidi").addEventListener("click",async function(){tuiVis.reset(),tuiVis.loadFile(await _(propsMid))});$e("#openAudio").addEventListener("click",async function(){audioBlob&&URL.revokeObjectURL(audioBlob),audioBlob=await _(propsAud),audioPlayer.src=URL.createObjectURL(audioBlob)});var audioPlayer=$e("#audioPlayer"),textDisplay=$e("pre");audioPlayer.onended=function(){tuiVis.reset()};var renderThread=setInterval(function(){audioPlayer.paused||(textDisplay.innerHTML=tuiVis.render(audioPlayer.currentTime-(self.audioDelay||0)))},40);})();
//# sourceMappingURL=demoTui.js.map