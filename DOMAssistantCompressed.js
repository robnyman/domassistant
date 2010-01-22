// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://domassistant.googlecode.com/, documentation: http://www.domassistant.com/documentation, version 2.8
var DOMAssistant=function(){var i=function(){},d=/*@cc_on!@*/false,h=d&&parseFloat(navigator.appVersion)<6,g,c={},n={},a=true,l=Array.prototype.slice,m={accesskey:"accessKey","class":"className",colspan:"colSpan","for":"htmlFor",maxlength:"maxLength",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",valign:"vAlign",cellspacing:"cellSpacing",cellpadding:"cellPadding"},k={rules:/\s*(,)\s*/g,selector:/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+\s*(\^|\$|\*|\||~)?(=\s*([\w\u00C0-\uFFFF\s\-\_\.]+|"[^"]*"|'[^']*'))?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[:?#?\w\u00C0-\uFFFF\-_\.]+|"[^"]*"|'[^']*'|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.\'\"]+\]+)|(:\w+[\w\-]*\(.+\)))\))?)*)?(>|\+|~)?/,selectorSplit:/(?:\[.*\]|\(.*\)|[^\s\+>~\[\(])+|[\+>~]/g,id:/^#([\w\u00C0-\uFFFF\-\_]+)$/,tag:/^(\w+)/,relation:/^(>|\+|~)$/,pseudo:/^:(\w[\w\-]*)(\((.+)\))?$/,pseudos:/:(\w[\w\-]*)(\((([^(]+)|([^(]+\([^(]+)\))\))?/g,attribs:/\[(\w+)\s*(\^|\$|\*|\||~)?(=)?\s*([^\[\]]*|"[^\"]*"|'[^\']*')?\](?=$|\[|\:|\s)/g,classes:/\.([\w\u00C0-\uFFFF\-_]+)/g,quoted:/^["'](.*)["']$/,nth:/^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n([\+\-]\d+)?)|(\-(([1-9]\d*)?)n\+(\d+)))$/,special:/(:check|:enabl|\bselect)ed\b/},f=function(q,r,o){var p=q.tagName;while((q=q[r+"Sibling"])&&(q.nodeType!==1||(o?q.tagName!==p:q.tagName==="!"))){}return q},b=function(o){return typeof o!=="undefined"},j=function(o){return(j=o[0].compareDocumentPosition?function(p){return p.sort(function(r,q){return 3-(r.compareDocumentPosition(q)&6)})}:d?function(p){return p.sort(function(r,q){return r.sourceIndex-q.sourceIndex})}:function(p){return p.sort(function(t,r){var s=document.createRange(),q=document.createRange();s.setStart(t,0);s.setEnd(t,0);q.setStart(r,0);q.setEnd(r,0);return s.compareBoundaryPoints(Range.START_TO_END,q)})})(o)};var e=function(p,o){p.push.apply(p,l.apply(o));return p};if(d){e=function(q,p){if(p.slice){return q.concat(p)}var o=0,r;while((r=p[o++])){q[q.length]=r}return q}}return{isIE:d,camel:m,def:b,allMethods:[],publicMethods:["prev","next","hasChild","cssSelect","elmsByClass","elmsByAttribute","elmsByTag"],initCore:function(){this.applyMethod.call(window,"$",this.$);this.applyMethod.call(window,"$$",this.$$);window.DOMAssistant=this;if(d){i=Array}i.prototype=[];(function(o){o.each=function(s,r){for(var q=0,p=this.length;q<p;q++){if(s.call(r||this[q],this[q],q,this)===false){break}}return this};o.first=function(){return b(this[0])?DOMAssistant.addMethodsToElm(this[0]):null};o.end=function(){return this.previousSet};o.indexOf=o.indexOf||function(r){for(var q=0,p=this.length;q<p;q++){if(q in this&&this[q]===r){return q}}return -1};o.map=function(t,s){var r=[];for(var q=0,p=this.length;q<p;q++){if(q in this){r[q]=t.call(s||this[q],this[q],q,this)}}return r};o.filter=function(t,s){var r=new i();r.previousSet=this;for(var q=0,p=this.length;q<p;q++){if(q in this&&t.call(s||this[q],this[q],q,this)){r.push(this[q])}}return r};o.every=function(s,r){for(var q=0,p=this.length;q<p;q++){if(q in this&&!s.call(r||this[q],this[q],q,this)){return false}}return true};o.some=function(s,r){for(var q=0,p=this.length;q<p;q++){if(q in this&&s.call(r||this[q],this[q],q,this)){return true}}return false}})(i.prototype);this.attach(this)},addMethods:function(o,p){if(!b(this.allMethods[o])){this.allMethods[o]=p;this.addHTMLArrayPrototype(o,p)}},addMethodsToElm:function(p){for(var o in this.allMethods){if(b(this.allMethods[o])){this.applyMethod.call(p,o,this.allMethods[o])}}return p},applyMethod:function(p,o){if(typeof this[p]!=="function"){this[p]=o}},attach:function(q){var o=q.publicMethods;if(!b(o)){for(var s in q){if(s!=="init"&&b(q[s])){this.addMethods(s,q[s])}}}else{if(o.constructor===Array){for(var p=0,r;(r=o[p]);p++){this.addMethods(r,q[r])}}}if(typeof q.init==="function"){q.init()}},addHTMLArrayPrototype:function(o,p){i.prototype[o]=function(){var s=new i();s.previousSet=this;for(var r=0,q=this.length;r<q;r++){s.push(p.apply(DOMAssistant.$$(this[r]),arguments))}return s}},clearHandlers:function(){var s=this.all||this.getElementsByTagName("*");for(var r=0,t,o;(t=s[r++]);){if(t.uniqueHandlerId&&(o=t.attributes)){for(var p,q=o.length;q--;){p=o[q].nodeName.toLowerCase();if(typeof t[p]==="function"){t[p]=null}}}}},setCache:function(o){a=o},$:function(){var r=arguments[0];if(arguments.length===1&&(typeof r==="object"||(typeof r==="function"&&!!r.nodeName))){return DOMAssistant.$$(r)}var t=!!r?new i():null;for(var p=0,o,s;(o=arguments[p]);p++){if(typeof o==="string"){o=o.replace(/^[^#\(]*(#)/,"$1");if(k.id.test(o)){if((s=DOMAssistant.$$(o.substr(1),false))){t.push(s)}}else{var q=(document.all||document.getElementsByTagName("*")).length;t=(!document.querySelectorAll&&a&&n.rule&&n.rule===o&&n.doc===q)?n.elms:e(t,DOMAssistant.cssSelection.call(document,o));n={rule:o,elms:t,doc:q}}}}return t},$$:function(u,r){var t=(typeof u==="object"||typeof u==="function"&&!!u.nodeName)?u:document.getElementById(u),s=r||true,q=function(w){var v=w.id;return typeof v!=="object"?v:w.attributes.id.nodeValue};if(typeof u==="string"&&t&&q(t)!==u){t=null;for(var o=0,p;(p=document.all[o]);o++){if(q(p)===u){t=p;break}}}if(t&&s&&!t.next){DOMAssistant.addMethodsToElm(t)}return t},prev:function(){return DOMAssistant.$$(f(this,"previous"))},next:function(){return DOMAssistant.$$(f(this,"next"))},hasChild:function(o){return this===document||this!==o&&(this.contains?this.contains(o):!!(this.compareDocumentPosition(o)&16))},getSequence:function(s){var t,r=2,p=-1,o=-1,q=k.nth.exec(s.replace(/^0n\+/,"").replace(/^2n$/,"even").replace(/^2n+1$/,"odd"));if(!q){return null}if(q[2]){t=(q[2]==="odd")?1:2;o=(t===1)?1:0}else{if(q[3]){t=p=parseInt(q[3],10);r=0}else{if(q[4]){r=q[6]?parseInt(q[6],10):1;t=q[7]?parseInt(q[7],10):0;while(t<1){t+=r}o=(t>=r)?(t-r)%r:t}else{if(q[8]){r=q[10]?parseInt(q[10],10):1;t=p=parseInt(q[11],10);while(t>r){t-=r}o=(p>=r)?(p-r)%r:p}}}}return{start:t,add:r,max:p,modVal:o}},cssByDOM:function(p){var aS,G,C,L,at,w,af,z,I,v,ao,aL,x,aG,aq,az=new i(),aP=az.indexOf,an=[],aE=[],aI=p.replace(k.rules,"$1").split(","),aD={};function aO(q){q=q||an;for(var o=q.length;o--;){q[o].added=null;q[o].removeAttribute("added")}}function B(){for(var o=aS.length;o--;){aS[o].childElms=null}}function ak(r,o){for(var s=0,aT;(aT=r[s]);s++){var u=false;for(var q=0,t;(t=o[q]);q++){if(t===aT){u=true;o.splice(q,1);break}}if(u){r.splice(s--,1)}}return r}function D(q,o){return(d||k.special.test(o))?q[m[o.toLowerCase()]||o]:q.getAttribute(o,2)}function N(o,q){o=o?o.replace(k.quoted,"$1").replace(/(\.|\[|\])/g,"\\$1"):null;return{"^":"^"+o,"$":o+"$","*":o,"|":"^"+o+"(\\-\\w+)*$","~":"\\b"+o+"\\b"}[q]||(o!==null?"^"+o+"$":o)}function Q(o,q){return h?(o==="*"?q.all:q.all.tags(o)):q.getElementsByTagName(o)}function aJ(o,q){o=o||"*";q=q||document;return(q===document||q.lastModified)?c[o]||(c[o]=Q(o,document)):Q(o,q)}function ap(aT,ba,s){aS=[];var t=ba.split("-"),aW=[],a1=0,a9=/\-of\-type$/.test(ba),a0,aV={first:function(bb){return !f(bb,"previous",a9)},last:function(bb){return !f(bb,"next",a9)},empty:function(bb){return !bb.firstChild},enabled:function(bb){return !bb.disabled&&bb.type!=="hidden"},disabled:function(bb){return bb.disabled},checked:function(bb){return bb.checked},contains:function(bb){return(bb.innerText||bb.textContent||"").indexOf(s.replace(k.quoted,"$1"))>-1},other:function(bb){return D(bb,ba)===s}};function r(bb){while((z=aT[a1++])){if(aV[bb](z)){aW[aW.length]=z}}return aW}var a6=t[0]||null;if(a6&&aV[a6]){return r(a6)}switch(a6){case"only":var aX,u;while((z=aT[a1++])){I=z.parentNode;var a2=z.nodeName;if(I!==aX||a2!==u){if(aV.first(z)&&aV.last(z)){aW[aW.length]=z}aX=I;u=a2}}break;case"nth":if(s==="n"){aW=aT}else{var a8=(t[1]==="last")?["lastChild","previousSibling"]:["firstChild","nextSibling"];aG=DOMAssistant.getSequence(s);if(aG){while((z=aT[a1++])){I=z.parentNode;I.childElms=I.childElms||{};var a2=z.nodeName;if(!I.childElms[a2]){var a5=0;aL=aG.start;x=I[a8[0]];while(x&&(aG.max<0||aL<=aG.max)){var a7=x.nodeName;if((a9&&a7===a2)||(!a9&&x.nodeType===1&&a7!=="!")){if(++a5===aL){if(a7===a2){aW[aW.length]=x}aL+=aG.add}}x=x[a8[1]]}if(aq){g++}I.childElms[a2]=true;aS[aS.length]=I}}B()}}break;case"target":var q=document.location.hash.slice(1);if(q){while((z=aT[a1++])){if(D(z,"name")===q||D(z,"id")===q){aW[aW.length]=z;break}}}break;case"not":if((a0=k.pseudo.exec(s))){aW=ak(aT,ap(aT,a0[1]?a0[1].toLowerCase():null,a0[3]||null))}else{for(var a3 in k){if(k[a3].lastIndex){k[a3].lastIndex=0}}s=s.replace(k.id,"[id=$1]");var aZ=k.tag.exec(s);var aU=k.classes.exec(s);var aY=k.attribs.exec(s);var o=new RegExp(aY?N(aY[4],aY[2]):"(^|\\s)"+(aZ?aZ[1]:aU?aU[1]:"")+"(\\s|$)","i");while((v=aT[a1++])){ao=null;if(aZ&&!o.test(v.nodeName)||aU&&!o.test(v.className)){ao=v}else{if(aY){var a4=D(v,aY[1]);if(!b(a4)||a4===false||typeof a4==="string"&&!o.test(a4)){ao=v}}}if(ao&&!ao.added){ao.added=true;aW[aW.length]=ao}}}break;default:return r("other")}return aW}function X(t,q){var o=0,r=t,u;while((u=q[o++])){if(!r.length||r.indexOf(u)<0){t.push(u)}}return t}function U(){return this.tagName!=="!"}g=-1;for(var ai=0,aH=[];(G=aI[ai]);ai++){if(!(C=G.match(k.selectorSplit))||ai&&aP.call(aI.slice(0,ai),G)>-1){continue}an=[this];for(var ag=0,E;(E=C[ag]);ag++){aE=[];if(k.relation.test(E)){if((L=k.relation.exec(E))){var al=null,aQ=C[ag+1];if((at=k.tag.exec(aQ))){at=at[1];w=new RegExp("(^|\\s)"+at+"(\\s|$)","i")}else{if(k.id.test(aQ)){al=DOMAssistant.$(aQ)||null}}for(var ae=0,K;(K=an[ae]);ae++){switch(L[0]){case">":var aB=al||aJ(at,K);for(var ac=0,aw;(aw=aB[ac]);ac++){if(aw.parentNode===K){aE[aE.length]=aw}}break;case"+":if((K=f(K,"next"))){if((al&&al[0]===K)||(!al&&(!at||w.test(K.nodeName)))){aE[aE.length]=K}}break;case"~":while((K=K.nextSibling)&&!K.added){if((al&&al[0]===K)||(!al&&(!at||w.test(K.nodeName)))){K.added=true;aE[aE.length]=K}}break}}an=aE;aO();E=C[++ag];if(/^\w+$/.test(E)||k.id.test(E)){continue}an.skipTag=true}}var ar=k.selector.exec(E);aD={tag:(!ar[1]||ar[3]==="*")?"*":ar[1],id:(ar[3]!=="*")?ar[2]:null,allClasses:ar[4],allAttr:ar[6],allPseudos:ar[11]};aq=(aD.tag==="*");if(aD.id){var M=0,aj=document.getElementById(aD.id.slice(1));if(aj){while(an[M]&&!DOMAssistant.hasChild.call(an[M],aj)){M++}aE=(M<an.length&&(aq||aD.tag===aj.tagName.toLowerCase()))?[aj]:[]}an=aE}else{if(aD.tag&&!an.skipTag){if(ag===0&&!aE.length&&an.length===1){an=aE=e([],aJ(aD.tag,an[0]))}else{for(var ab=0,aM=an.length,ax,au;ab<aM;ab++){ax=aJ(aD.tag,an[ab]);for(var Y=0;(au=ax[Y]);Y++){if(!au.added){au.added=true;aE[aE.length]=au}}}an=aE;aO()}}}if(!aE.length){break}an.skipTag=false;if(aD.allClasses){var W=0,Z=[],H=aD.allClasses.split(".").slice(1);while((af=an[W++])){var ad=true,av=af.className;if(av&&av.length){av=av.split(" ");for(var V=H.length;V--;){if(av.indexOf(H[V])<0){ad=false;break}}if(ad){Z[Z.length]=af}}}an=aE=Z}if(aD.allAttr){var R=0,aA=[],aa=[],aF=aD.allAttr.match(k.attribs);for(var T=0,y=aF.length,S,aN;T<y;T++){k.attribs.lastIndex=0;S=k.attribs.exec(aF[T]);aN=N(S[4],S[2]||null);aA[T]=[(aN?new RegExp(aN):null),S[1]]}while((af=aE[R++])){for(var P=0,aC=aA.length;P<aC;P++){var A=true,ay=aA[P][0],ah=D(af,aA[P][1]);if(!ay&&ah===true){continue}if((!ay&&(!ah||typeof ah!=="string"||!ah.length))||(!!ay&&!ay.test(ah))){A=false;break}}if(A){aa[aa.length]=af}}an=aE=aa}if(aD.allPseudos){var F=aD.allPseudos.match(k.pseudos);for(var O=0,am=F.length;O<am;O++){k.pseudos.lastIndex=0;var aR=k.pseudos.exec(F[O]);var J=aR[1]?aR[1].toLowerCase():null;var aK=aR[3]||null;aE=ap(aE,J,aK);aO(aE)}an=aE}}az=((aH.length&&(aq||aP.call(aH,aD.tag)>=0||aP.call(aH,"*")>=0))?X:e)(az,an);aH.push(aD.tag);if(d&&/\*$/.test(G)){az=az.filter(U)}}return((az.length>1&&aI.length>1)||g>0)?j(az):az},cssByXpath:function(p){var q={xhtml:"http://www.w3.org/1999/xhtml"},r=(document.documentElement.namespaceURI===q.xhtml)?"xhtml:":"",o=function s(t){return q[t]||null};DOMAssistant.cssByXpath=function(K){var O,Q,G,w,x,B,y=new i(),z=K.replace(k.rules,"$1").split(",");function J(T){var U=T?"[":"",S=T?"]":"";return function(V,Z,Y,X,W){W=(W||"").replace(k.quoted,"$1");return U+({"^":"starts-with(@"+Z+', "'+W+'")',"$":"substring(@"+Z+", (string-length(@"+Z+") - "+(W.length-1)+"), "+W.length+') = "'+W+'"',"*":'contains(concat(" ", @'+Z+', " "), "'+W+'")',"|":"@"+Z+'="'+W+'" or starts-with(@'+Z+', "'+W+'-")',"~":'contains(concat(" ", @'+Z+', " "), " '+W+' ")'}[Y]||("@"+Z+(X?'="'+W+'"':"")))+S}}function M(T,V,U){T=/\-child$/.test(V)?"*":T;var X=V.split("-"),S=((X[1]==="last")?"(count(following-sibling::":"(count(preceding-sibling::")+T+") + 1)",W,Y;switch(X[0]){case"nth":return(U!=="n"&&(B=DOMAssistant.getSequence(U)))?((B.start===B.max)?S+" = "+B.start:S+" mod "+B.add+" = "+B.modVal+((B.start>1)?" and "+S+" >= "+B.start:"")+((B.max>0)?" and "+S+" <= "+B.max:"")):"";case"not":return"not("+((W=k.pseudo.exec(U))?M(T,W[1]?W[1].toLowerCase():null,W[3]||null):U.replace(k.id,"[id=$1]").replace(k.tag,"self::$1").replace(k.classes,'contains(concat(" ", @class, " "), " $1 ")').replace(k.attribs,J()))+")";case"first":return"not(preceding-sibling::"+T+")";case"last":return"not(following-sibling::"+T+")";case"only":return"not(preceding-sibling::"+T+" or following-sibling::"+T+")";case"empty":return"count(child::*) = 0 and string-length(text()) = 0";case"contains":return'contains(., "'+U.replace(k.quoted,"$1")+'")';case"enabled":return'not(@disabled) and not(@type="hidden")';case"disabled":return"@disabled";case"target":return'@name="'+(Y=document.location.hash.slice(1))+'" or @id="'+Y+'"';default:return"@"+V+'="'+U+'"'}}for(var L=0;(O=z[L]);L++){if(!(Q=O.match(k.selectorSplit))||L&&y.indexOf.call(z.slice(0,L),O)>-1){continue}G=G?G+" | .":".";for(var I=0,N=Q.length;I<N;I++){w=k.selector.exec(Q[I]);x={tag:r+((!w[1]||w[3]==="*")?"*":w[1]),id:(w[3]!=="*")?w[2]:null,allClasses:w[4],allAttr:w[6],allPseudos:w[11],tagRelation:w[23]};G+=(x.tagRelation?({">":"/","+":"/following-sibling::*[1]/self::","~":"/following-sibling::"}[x.tagRelation]||""):((I>0&&k.relation.test(Q[I-1]))?x.tag:("//"+x.tag)))+(x.id||"").replace(k.id,'[@id = "$1"]')+(x.allClasses||"").replace(k.classes,'[contains(concat(" ", @class, " "), " $1 ")]')+(x.allAttr||"").replace(k.attribs,J(true));if(x.allPseudos){var A=x.allPseudos.match(k.pseudos);for(var H=0,u=A.length;H<u;H++){k.pseudos.lastIndex=0;var v=k.pseudos.exec(A[H]),R=v[1]?v[1].toLowerCase():null,t=v[3]||null,D=M(x.tag,R,t);if(D.length){G+="["+D+"]"}}}}}try{var F=document.evaluate(G,this,o,7,null),E,C=0;while((E=F.snapshotItem(C++))){y.push(E)}}catch(P){}return y};return DOMAssistant.cssByXpath.call(this,p)},cssSelection:function(p){if(!p){return null}var o=k.special.test(p);try{if(document.querySelectorAll&&!o){return e(new i(),this.querySelectorAll(p))}}catch(q){}return((document.evaluate&&!o)?DOMAssistant.cssByXpath:DOMAssistant.cssByDOM).call(this,p)},cssSelect:function(o){return DOMAssistant.cssSelection.call(this,o)},elmsByClass:function(q,o){var p=(o||"")+"."+q;return DOMAssistant.cssSelection.call(this,p)},elmsByAttribute:function(p,q,o,s){var r=(o||"")+"["+p+((q&&q!=="*")?((s||"")+"="+q+"]"):"]");return DOMAssistant.cssSelection.call(this,r)},elmsByTag:function(o){return DOMAssistant.cssSelection.call(this,o)}}}();DOMAssistant.initCore();DOMAssistant.Storage=function(){var c=1,a=[],b="_da"+ +new Date();return{retrieve:function(d){if(!DOMAssistant.def(d)){return this[b]||(this[b]=c++)}if(!this[b]||!a[this[b]]){return}return a[this[b]][d]},store:function(f,g){var e=this[b]||(this[b]=c++);a[e]=a[e]||{};if(typeof f==="object"){for(var d in f){if(typeof d==="string"){a[e][d]=f[d]}}}else{a[e][f]=g}return this},unstore:function(e){var d=this[b]||(this[b]=c++);if(a[d]){if(DOMAssistant.def(e)){delete a[d][e]}else{a[d]=null}}return this}}}();DOMAssistant.attach(DOMAssistant.Storage);DOMAssistant.AJAX=function(){var globalXMLHttp=null,readyState=0,status=-1,statusText="",requestPool=[],createAjaxObj=function(url,method,callback,addToContent){var params=null;if(/POST/i.test(method)){url=url.split("?");params=url[1];url=url[0]}return{url:url,method:method,callback:callback,params:params,headers:{},responseType:"text",addToContent:addToContent||false}};return{publicMethods:["ajax","get","post","load"],initRequest:function(){var XMLHttp=null;if(!!window.XMLHttpRequest&&!DOMAssistant.isIE){XMLHttp=new XMLHttpRequest();DOMAssistant.AJAX.initRequest=function(){return requestPool.length?requestPool.pop():new XMLHttpRequest()}}else{if(!!window.ActiveXObject){var XMLHttpMS=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(var i=0;i<XMLHttpMS.length;i++){try{XMLHttp=new window.ActiveXObject(XMLHttpMS[i]);DOMAssistant.AJAX.initRequest=function(){return requestPool.length?requestPool.pop():new window.ActiveXObject(XMLHttpMS[i])};break}catch(e){XMLHttp=null}}}}return XMLHttp},ajax:function(ajaxObj){if(!ajaxObj.noParse&&ajaxObj.url&&/\?/.test(ajaxObj.url)&&ajaxObj.method&&/POST/i.test(ajaxObj.method)){var url=ajaxObj.url.split("?");ajaxObj.url=url[0];ajaxObj.params=url[1]+((url[1].length>0&&ajaxObj.params)?("&"+ajaxObj.params):"")}return DOMAssistant.AJAX.makeCall.call(this,ajaxObj)},get:function(url,callback,addToContent){return DOMAssistant.AJAX.makeCall.call(this,createAjaxObj(url,"GET",callback,addToContent))},post:function(url,callback){return DOMAssistant.AJAX.makeCall.call(this,createAjaxObj(url,"POST",callback))},load:function(url,addToContent){this.get(url,DOMAssistant.AJAX.replaceWithAJAXContent,addToContent)},makeCall:function(ajaxObj){var XMLHttp=DOMAssistant.AJAX.initRequest();if(XMLHttp){globalXMLHttp=XMLHttp;(function(elm){var url=ajaxObj.url,method=ajaxObj.method||"GET",callback=ajaxObj.callback,params=ajaxObj.params,headers=ajaxObj.headers,responseType=ajaxObj.responseType||"text",addToContent=ajaxObj.addToContent,timeout=ajaxObj.timeout||null,ex=ajaxObj.exception,timeoutId=null,done=false;XMLHttp.open(method,url,true);XMLHttp.setRequestHeader("AJAX","true");XMLHttp.setRequestHeader("X-Requested-With","XMLHttpRequest");if(method==="POST"){XMLHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");XMLHttp.setRequestHeader("Content-length",params?params.length:0);if(XMLHttp.overrideMimeType){XMLHttp.setRequestHeader("Connection","close")}}if(responseType==="json"){XMLHttp.setRequestHeader("Accept","application/json, text/javascript, */*")}for(var i in headers){if(typeof i==="string"){XMLHttp.setRequestHeader(i,headers[i])}}if(typeof callback==="function"){XMLHttp.onreadystatechange=function(){try{if(XMLHttp.readyState===4&&!done){window.clearTimeout(timeoutId);done=true;status=XMLHttp.status;statusText=XMLHttp.statusText;readyState=4;if((status||location.protocol!=="file:")&&(status<200||status>=300)){throw new Error(statusText)}var response=/xml/i.test(responseType)?XMLHttp.responseXML:XMLHttp.responseText;if(/json/i.test(responseType)&&!!response){response=(typeof JSON==="object"&&typeof JSON.parse==="function")?JSON.parse(response):eval("("+response+")")}globalXMLHttp=null;XMLHttp.onreadystatechange=function(){};requestPool.push(XMLHttp);callback.call(elm,response,addToContent)}}catch(e){globalXMLHttp=XMLHttp=null;if(typeof ex==="function"){ex.call(elm,e);ex=null}}}}XMLHttp.send(params);if(timeout){timeoutId=window.setTimeout(function(){if(!done){XMLHttp.abort();done=true;if(typeof ex==="function"){readyState=0;status=408;statusText="Request timeout";globalXMLHttp=XMLHttp=null;ex.call(elm,new Error(statusText));ex=null}}},timeout)}})(this)}return this},replaceWithAJAXContent:function(content,add){if(add){this.innerHTML+=content}else{DOMAssistant.clearHandlers.apply(this);this.innerHTML=content}},getReadyState:function(){return(globalXMLHttp&&DOMAssistant.def(globalXMLHttp.readyState))?globalXMLHttp.readyState:readyState},getStatus:function(){return status},getStatusText:function(){return statusText}}}();DOMAssistant.attach(DOMAssistant.AJAX);DOMAssistant.CSS=function(){var a=DOMAssistant.def,b={display:true};return{addClass:function(d){if(!this.hasClass(d)){var c=this.className;this.className=c+(c.length?" ":"")+d}return this},removeClass:function(c){return this.replaceClass(c)},replaceClass:function(d,e){var c=new RegExp(("(^|\\s)"+d+"(\\s|$)"),"i");this.className=this.className.replace(c,function(f,h,g){return e?(h+e+g):" "}).replace(/^\s+|\s+$/g,"");return this},hasClass:function(c){return(" "+this.className+" ").indexOf(" "+c+" ")>-1},setStyle:function(f,g){var e=this.style;if("filters" in this&&(typeof f==="string"?/opacity/i.test(f):a(f.opacity))){e.zoom=1;e.filter=(e.filter||"").replace(/alpha\([^)]*\)/,"")+"alpha(opacity="+(a(f.opacity)?f.opacity:g)*100+")"}if(a(e.cssText)){var c=e.cssText;if(typeof f==="object"){for(var d in f){if(typeof d==="string"){if(b[d]){e[d]=f[d]}c+=";"+d+":"+f[d]}}}else{if(b[f]){e[f]=g}c+=";"+f+":"+g}e.cssText=c}return this},getStyle:function(c){var e="",d;c=c.toLowerCase();if(document.defaultView&&document.defaultView.getComputedStyle){e=document.defaultView.getComputedStyle(this,"").getPropertyValue(c)}else{if(this.currentStyle){if("filters" in this&&c==="opacity"){e=(d=this.style.filter||this.currentStyle.filter)&&d.indexOf("opacity=")>=0?parseFloat(d.match(/opacity=([^)]*)/)[1])/100:1}else{c=c.replace(/^float$/,"styleFloat").replace(/\-(\w)/g,function(f,g){return g.toUpperCase()});e=this.currentStyle[c]}if(e==="auto"&&/^(width|height)$/.test(c)&&this.currentStyle.display!=="none"){e=this["offset"+c.charAt(0).toUpperCase()+c.substr(1)]+"px"}}}return e}}}();DOMAssistant.attach(DOMAssistant.CSS);DOMAssistant.Content=function(){var a=DOMAssistant.$$;return{init:function(){DOMAssistant.setCache(false)},create:function(d,c,b,e){var f=a(document.createElement(d));if(c){f=f.setAttributes(c)}if(DOMAssistant.def(e)){f.addContent(e)}if(b){this.appendChild(f)}return f},setAttributes:function(b){if(DOMAssistant.isIE){var c=function(g,e,f){var d=e.toLowerCase();switch(d){case"name":case"type":return a(document.createElement(g.outerHTML.replace(new RegExp(d+"=[a-zA-Z]+")," ").replace(">"," "+d+"="+f+">")));case"style":g.style.cssText=f;return g;default:g[DOMAssistant.camel[d]||e]=f;return g}};DOMAssistant.Content.setAttributes=function(d){var h=this;var g=this.parentNode;for(var f in d){if(typeof d[f]==="string"||typeof d[f]==="number"){var e=c(h,f,d[f]);if(g&&/(name|type)/i.test(f)){if(h.innerHTML){e.innerHTML=h.innerHTML}g.replaceChild(e,h)}h=e}}return h}}else{DOMAssistant.Content.setAttributes=function(d){for(var e in d){if(/class/i.test(e)){this.className=d[e]}else{this.setAttribute(e,d[e])}}return this}}return DOMAssistant.Content.setAttributes.call(this,b)},addContent:function(f){var d=typeof f;if(d==="string"||d==="number"){if(!this.firstChild){this.innerHTML=f}else{var c=document.createElement("div");c.innerHTML=f;for(var b=c.childNodes.length-1,e=null;b>=0;b--){e=this.insertBefore(c.childNodes[b],e)}}}else{if(d==="object"||(d==="function"&&!!f.nodeName)){this.appendChild(f)}}return this},replaceContent:function(b){if(!!this.firstChild){DOMAssistant.clearHandlers.apply(this);this.innerHTML=""}return this.addContent(b)},replace:function(g,b){var f=typeof g;if(f==="string"||f==="number"){var e=this.parentNode;var d=DOMAssistant.Content.create.call(e,"div",null,false,g);for(var c=d.childNodes.length;c--;){e.insertBefore(d.childNodes[c],this.nextSibling)}g=this.nextSibling;e.removeChild(this)}else{if(f==="object"||(f==="function"&&!!g.nodeName)){this.parentNode.replaceChild(g,this)}}return b?g:this},remove:function(){this.parentNode.removeChild(this);return null}}}();DOMAssistant.attach(DOMAssistant.Content);DOMAssistant.Events=function(){var e,c="_events",d=!!document.addEventListener,b={focus:true,blur:true},a=function(g){return DOMAssistant.isIE?{focus:"activate",blur:"deactivate"}[g]||g:g},f=function(k,h,j){k=k||window.event||{};var i={event:k,type:h||k.type,bubbles:k.bubbles||true,cancelable:k.cancelable||false,target:j||k.target||k.srcElement,relatedTarget:k.relatedTarget||(k.fromElement===k.target?k.toElement:k.fromElement)||null,altKey:k.altKey||false,ctrlKey:k.ctrlKey||false,shiftKey:k.shiftKey||false,button:k.button||null,timeStamp:+new Date(),preventDefault:function(){if(k.preventDefault){k.preventDefault()}this.returnValue=k.returnValue=false},stopPropagation:function(){if(k.stopPropagation){k.stopPropagation()}this.cancelBubble=k.cancelBubble=true}};i.currentTarget=i.target;if(i.target&&3===i.target.nodeType){i.target=i.target.parentNode}if("number"===typeof k.pageX){i.clientX=i.pageX=k.pageX;i.clientY=i.pageY=k.pageY}else{var l=document.documentElement,g=document.body;i.clientX=k.clientX+(l.scrollLeft||g.scrollLeft)-(l.clientLeft||0);i.clientY=k.clientY+(l.scrollTop||g.scrollTop)-(l.clientTop||0)}if("number"===typeof k.which){i.keyCode=k.keyCode;i.charCode=i.which=k.which}else{if(k.keyCode){i.keyCode=i.charCode=k.keyCode}}return i};return{publicMethods:["triggerEvent","addEvent","removeEvent","relayEvent","unrelayEvent","preventDefault","cancelBubble"],init:function(){window.addEvent=this.addEvent;window.removeEvent=this.removeEvent;DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble;e=this.handleEvent},triggerEvent:function(h,o,n){h=a(h);var k=this.retrieve(c),l=n||f(n,h,o||this);l.currentTarget=this;if(k&&k[h]){for(var j=0,g=k[h].length;j<g;j++){if(k[h][j].call(this,l)===false){l.stopPropagation()}}}else{if(typeof this["on"+h]==="function"){this["on"+h].call(this,l)}}var m=DOMAssistant.$$(this.parentNode);if(!l.cancelBubble&&m&&m.nodeType===1){m.triggerEvent(h,o,l)}return this},addEvent:function(g,k,l){if(/^DOM/.test(g)&&d){this.addEventListener(g,k,false)}else{var j=(g=a(g))+this.retrieve();if(!(k.attachedElements&&k.attachedElements[j])){var i=this.retrieve(c)||{};if(!i[g]){i[g]=[];var h=this["on"+g];if(h){i[g].push(h);this["on"+g]=null}}if(!i[g].length){if(d){this.addEventListener(g,e,b[g])}else{this["on"+g]=e}}k.relay=l;i[g].push(k);if(typeof this.window==="object"){this.window["on"+g]=e}k.attachedElements=k.attachedElements||{};k.attachedElements[j]=true;this.store(c,i)}}return this},handleEvent:function(g){var n=f(g),m=a(n.type),h=this.retrieve(c)[m].slice(0),l,k;if((l=h.length)){for(var j=0;j<l;j++){if(typeof h[j]==="function"){k=h[j].call(this,n)}}if(k===false){n.stopPropagation()}return k}},removeEvent:function(g,n,o){var l=(g=a(g))+this.retrieve(),k=this.retrieve(c);if(k&&k[g]){var h=k[g];for(var m,j=h.length;j--;){m=n||h[j];if(h[j]===m&&(!o&&!m.relay||o&&m.relay)){h.splice(j,1);if(m.attachedElements){m.attachedElements[l]=null}}}if(!k[g].length){if(d){this.removeEventListener(g,e,b[g])}else{this["on"+g]=null}}}else{if(this["on"+g]&&!n&&!o){this["on"+g]=null}}return this},relayEvent:function(h,g,i){return this.addEvent(h,function(n){n=f(n);var m=n.target,j=arguments,k=0,o,l=this.cssSelect(g);while((o=l[k++])){if((o===m||DOMAssistant.hasChild.call(o,m))&&!o.disabled){n.currentTarget=o;return i.apply(o,j)}}},true)},unrelayEvent:function(g){return this.removeEvent(g,null,true)},preventDefault:function(g){if(g.preventDefault){g.preventDefault()}g.returnValue=false},cancelBubble:function(g){if(g.stopPropagation){g.stopPropagation()}g.cancelBubble=true}}}();DOMAssistant.attach(DOMAssistant.Events);DOMAssistant.DOMLoad=function(){var g=false,a=null,f=[],b={},c=null,d=function(){for(var j=0,h=f.length;j<h;j++){try{f[j]()}catch(k){if(c&&typeof c==="function"){c(k)}}}f=[]},e=function(){if(g){return}g=true;d()};
/*@cc_on @if(@_win32||@_win64)document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");document.getElementById("ieScriptLoad").onreadystatechange=function(){if(this.readyState==="complete"){e()}}@end@*/
if(document.addEventListener){document.addEventListener("DOMContentLoaded",e,false)}if(/KHTML|WebKit|iCab/i.test(navigator.userAgent)){a=setInterval(function(){if(/loaded|complete/i.test(document.readyState)){e();clearInterval(a)}},10)}window.onload=e;return{DOMReady:function(){for(var j=0,h=arguments.length,k;j<h;j++){k=arguments[j];if(!k.DOMReady&&!b[k]){if(typeof k==="string"){b[k]=true;k=new Function(k)}k.DOMReady=true;f.push(k)}}if(g){d()}},setErrorHandling:function(h){c=h}}}();DOMAssistant.DOMReady=DOMAssistant.DOMLoad.DOMReady;