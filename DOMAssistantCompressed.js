// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.domassistant.com/documentation, version 2.7.5
var DOMAssistant=function(){var h=function(){},d=/*@cc_on!@*/false,g=d&&parseFloat(navigator.appVersion)<6,c={},l={},a=true,k={accesskey:"accessKey","class":"className",colspan:"colSpan","for":"htmlFor",maxlength:"maxLength",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",valign:"vAlign",cellspacing:"cellSpacing",cellpadding:"cellPadding"},j={rules:/\s*(,)\s*/g,selector:/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+\s*(\^|\$|\*|\||~)?(=\s*([\w\u00C0-\uFFFF\s\-\_\.]+|"[^"]*"|'[^']*'))?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_\.]+|"[^"]*"|'[^']*'|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.\'\"]+\]+)|(:\w+[\w\-]*))\))?)*)?(>|\+|~)?/,id:/^#([\w\u00C0-\uFFFF\-\_]+)$/,tag:/^(\w+)/,relation:/^(>|\+|~)$/,pseudo:/^:(\w[\w\-]*)(\((.+)\))?$/,pseudos:/:(\w[\w\-]*)(\(([^\)]+)\))?/g,attribs:/\[(\w+)\s*(\^|\$|\*|\||~)?=?\s*([\w\u00C0-\uFFFF\s\-_\.]+|"[^"]*"|'[^']*')?\]/g,classes:/\.([\w\u00C0-\uFFFF\-_]+)/g,quoted:/^["'](.*)["']$/,nth:/^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n([\+\-]\d+)?)|(\-(([1-9]\d*)?)n\+(\d+)))$/},f=function(p,o){if(p.indexOf){return p.indexOf(o)>=0}for(var n=0,m=p.length;n<m;n++){if(p[n]===o){return true}}return false},i=function(o,m){var n=o.parentNode;return m===document||n===m||(n!==document&&i(n,m))},b=function(m){return typeof m!=="undefined"};var e=function(n,m){n.push.apply(n,[].slice.apply(m));return n};if(d){e=function(o,n){if(n.slice){return o.concat(n)}var m=0,p;while((p=n[m++])){o[o.length]=p}return o}}return{isIE:d,camel:k,def:b,allMethods:[],publicMethods:["cssSelect","elmsByClass","elmsByAttribute","elmsByTag"],initCore:function(){this.applyMethod.call(window,"$",this.$);this.applyMethod.call(window,"$$",this.$$);window.DOMAssistant=this;if(d){h=Array}h.prototype=[];h.prototype.each=function(o){for(var n=0,m=this.length;n<m;n++){o.call(this[n])}return this};h.prototype.first=function(){return b(this[0])?DOMAssistant.addMethodsToElm(this[0]):null};h.prototype.end=function(){return this.previousSet};this.attach(this)},addMethods:function(m,n){if(!b(this.allMethods[m])){this.allMethods[m]=n;this.addHTMLArrayPrototype(m,n)}},addMethodsToElm:function(n){for(var m in this.allMethods){if(b(this.allMethods[m])){this.applyMethod.call(n,m,this.allMethods[m])}}return n},applyMethod:function(n,m){if(typeof this[n]!=="function"){this[n]=m}},attach:function(o){var m=o.publicMethods;if(!b(m)){for(var q in o){if(q!=="init"&&b(o[q])){this.addMethods(q,o[q])}}}else{if(m.constructor===Array){for(var n=0,p;(p=m[n]);n++){this.addMethods(p,o[p])}}}if(typeof o.init==="function"){o.init()}},addHTMLArrayPrototype:function(m,n){h.prototype[m]=function(){var q=new h();q.previousSet=this;var r;for(var p=0,o=this.length;p<o;p++){r=n.apply(this[p],arguments);if(!!r&&r.constructor===Array){q=e(q,r)}else{q.push(r)}}return q}},clearHandlers:function(){var r=this.all||this.getElementsByTagName("*");for(var q=0,s,m;(s=r[q++]);){if((m=s.attributes)){for(var o=0,p=m.length,n;o<p;o++){n=m[o].nodeName.toLowerCase();if(typeof s[n]==="function"){s[n]=null}}}}},setCache:function(m){a=m},$:function(){var p=arguments[0];if(arguments.length===1&&(typeof p==="object"||(typeof p==="function"&&!!p.nodeName))){return DOMAssistant.$$(p)}var r=new h();for(var n=0,m,q;(m=arguments[n]);n++){if(typeof m==="string"){m=m.replace(/^[^#]*(#)/,"$1");if(j.id.test(m)){if((q=DOMAssistant.$$(m.substr(1),false))){r.push(q)}}else{var o=(document.all||document.getElementsByTagName("*")).length;r=(!document.querySelectorAll&&a&&l.rule&&l.rule===m&&l.doc===o)?l.elms:e(r,DOMAssistant.cssSelection.call(document,m));l={rule:m,elms:r,doc:o}}}}return r},$$:function(r,o){var q=(typeof r==="object"||(typeof r==="function"&&!!r.nodeName))?r:document.getElementById(r);var p=o||true;if(typeof r==="string"&&q&&q.id!==r){q=null;for(var m=0,n;(n=document.all[m]);m++){if(n.id===r){q=n;break}}}if(q&&p){DOMAssistant.addMethodsToElm(q)}return q},getSequence:function(q){var r,p=2,n=-1,m=-1,o=j.nth.exec(q.replace(/^0n\+/,"").replace(/^2n$/,"even").replace(/^2n+1$/,"odd"));if(!o){return null}if(o[2]){r=(o[2]==="odd")?1:2;m=(r===1)?1:0}else{if(o[3]){r=parseInt(o[3],10);p=0;n=r}else{if(o[4]){p=o[6]?parseInt(o[6],10):1;r=o[7]?parseInt(o[7],10):0;while(r<1){r+=p}m=(r>p)?(r-p)%p:((r===p)?0:r)}else{if(o[8]){p=o[10]?parseInt(o[10],10):1;r=n=parseInt(o[11],10);while(r>p){r-=p}m=(n>p)?(n-p)%p:((n===p)?0:n)}}}}return{start:r,add:p,max:n,modVal:m}},cssByDOM:function(p){var aH=p.replace(j.rules,"$1").split(",");var az=new h(),ao=[],aE=[];var T,aQ,G,C,L,at,w,af,z,I,v,ap,aK,x,aG;try{T=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g")}catch(ah){T=/[^\s]+/g}function aN(q){q=q||ao;for(var o=0,m=q.length;o<m;o++){q[o].added=null}}function B(){for(var o=0,m=aQ.length;o<m;o++){aQ[o].childElms=null}}function al(o,m){for(var q=0,t;(t=o[q]);q++){var s=false;for(var n=0,r;(r=m[n]);n++){if(r===t){s=true;m.splice(n,1);break}}if(s){o.splice(q--,1)}}return o}function D(n,m){return d?n[k[m.toLowerCase()]||m]:n.getAttribute(m,2)}function N(m,n){m=m?m.replace(j.quoted,"$1").replace(/\./g,"\\."):null;switch(n){case"^":return"^"+m;case"$":return m+"$";case"*":return m;case"|":return"^"+m+"(\\-\\w+)*$";case"~":return"\\b"+m+"\\b";default:return m?"^"+m+"$":null}}function Q(m,n){return g?((m==="*")?n.all:n.all.tags(m)):n.getElementsByTagName(m)}function aI(m,n){m=m||"*";n=n||document;return(n===document||n.lastModified)?c[m]||(c[m]=Q(m,document)):Q(m,n)}function aq(t,a7,q){aQ=[];var r=a7.split("-"),aT=[],aY=0,a6,aX;var s=(a6=/\-of\-type$/.test(a7))?"nodeName":"nodeType";function a8(ba){var a9=a6?ba.nodeName:1;while((ba=ba.previousSibling)&&ba[s]!==a9){}return ba}function aS(ba){var a9=a6?ba.nodeName:1;while((ba=ba.nextSibling)&&ba[s]!==a9){}return ba}var aR={first:function(a9){return !a8(a9)},last:function(a9){return !aS(a9)},empty:function(a9){return !a9.childNodes.length},enabled:function(a9){return !z.disabled&&z.type!=="hidden"},disabled:function(a9){return z.disabled},checked:function(a9){return z.checked},contains:function(a9){return(z.innerText||z.textContent||"").indexOf(q.replace(j.quoted,"$1"))>-1},other:function(a9){return D(z,a7)===q}};function o(a9){while((z=t[aY++])){if(aR[a9](z)){aT[aT.length]=z}}return aT}var a3=r[0]||null;if(a3&&aR[a3]){return o(a3)}switch(a3){case"only":var aU;while((z=t[aY++])){I=z.parentNode;if(I!==aU){if(!a8(z)&&!aS(z)){aT[aT.length]=z}aU=I}}break;case"nth":if(/^n$/.test(q)){aT=t}else{var a5=(r[1]==="last")?["lastChild","previousSibling"]:["firstChild","nextSibling"];aG=DOMAssistant.getSequence.call(this,q);if(aG){while((z=t[aY++])){I=z.parentNode;if(!I.childElms){var a2=0,aZ=z.nodeName;aK=aG.start;x=I[a5[0]];while(x&&(aG.max<0||aK<=aG.max)){var a4=x.nodeName;if((a6&&a4===aZ)||(!a6&&x.nodeType===1)){if(++a2===aK){if(a4===aZ){aT[aT.length]=x}aK+=aG.add}}x=x[a5[1]]}I.childElms=true;aQ[aQ.length]=I}}B()}}break;case"target":var n=document.location.hash.slice(1);if(n){while((z=t[aY++])){if(D(z,"name")===n||D(z,"id")===n){aT[aT.length]=z;break}}}break;case"not":if((aX=j.pseudo.exec(q))){aT=al(t,aq(t,aX[1]?aX[1].toLowerCase():null,aX[3]||null))}else{for(var a0 in j){if(j[a0].lastIndex){j[a0].lastIndex=0}}q=q.replace(j.id,"[id=$1]");var aW=j.tag.exec(q);var u=j.classes.exec(q);var aV=j.attribs.exec(q);var m=new RegExp(aV?N(aV[3],aV[2]):"(^|\\s)"+(aW?aW[1]:u?u[1]:"")+"(\\s|$)","i");while((v=t[aY++])){ap=null;if(aW&&!m.test(v.nodeName)){ap=v}else{if(u&&!m.test(v.className)){ap=v}else{if(aV){var a1=D(v,aV[1]);if(!a1||!m.test(a1)){ap=v}}}}if(ap&&!ap.added){ap.added=true;aT[aT.length]=ap}}}break;default:return o("other")}return aT}for(var aj=0;(G=aH[aj]);aj++){if(aj&&f(aH.slice(0,aj),G)){continue}ao=[this];C=G.match(T);for(var ag=0,E;(E=C[ag]);ag++){aE=[];if(ag>0&&j.relation.test(E)){if((L=j.relation.exec(E))){var am=null,aO=C[ag+1];if((at=j.tag.exec(aO))){at=at[1];w=new RegExp("(^|\\s)"+at+"(\\s|$)","i")}else{if(j.id.test(aO)){am=DOMAssistant.$(aO)||null}}for(var ae=0,K;(K=ao[ae]);ae++){switch(L[0]){case">":var aB=am||aI(at,K);for(var ac=0,aw;(aw=aB[ac]);ac++){if(aw.parentNode===K){aE[aE.length]=aw}}break;case"+":while((K=K.nextSibling)&&K.nodeType!==1){}if(K){if((am&&am[0]===K)||(!am&&(!at||w.test(K.nodeName)))){aE[aE.length]=K}}break;case"~":while((K=K.nextSibling)&&!K.added){if((am&&am[0]===K)||(!am&&(!at||w.test(K.nodeName)))){K.added=true;aE[aE.length]=K}}break}}ao=aE;aN();E=C[++ag];if(/^\w+$/.test(E)||j.id.test(E)){continue}ao.skipTag=true}}var ar=j.selector.exec(E);var aD={tag:(!ar[1]||ar[3]==="*")?"*":ar[1],id:(ar[3]!=="*")?ar[2]:null,allClasses:ar[4],allAttr:ar[6],allPseudos:ar[11]};if(aD.id){var M=0,ak=document.getElementById(aD.id.replace(/#/,""));if(ak){while(ao[M]&&!i(ak,ao[M])){M++}aE=(M<ao.length)?[ak]:[]}ao=aE}else{if(aD.tag&&!ao.skipTag){if(ag===0&&!aE.length&&ao.length===1){ao=aE=e([],aI(aD.tag,ao[0]))}else{for(var ab=0,aL=ao.length,ax,au;ab<aL;ab++){ax=aI(aD.tag,ao[ab]);for(var Y=0;(au=ax[Y]);Y++){if(!au.added){au.added=true;aE[aE.length]=au}}}ao=aE;aN()}}}if(!aE.length){break}ao.skipTag=false;if(aD.allClasses){var X=0,Z=[],H=aD.allClasses.split(".").slice(1);while((af=ao[X++])){var ad=true,av=af.className;if(av&&av.length){av=av.split(" ");for(var V=0,W=H.length;V<W;V++){if(!f(av,H[V])){ad=false;break}}if(ad){Z[Z.length]=af}}}ao=aE=Z}if(aD.allAttr){var R=0,aA=[],aa=[],aF=aD.allAttr.match(/\[[^\]]+\]/g);for(var U=0,y=aF.length,S,aM;U<y;U++){j.attribs.lastIndex=0;S=j.attribs.exec(aF[U]);aM=N(S[3],S[2]||null);aA[U]=[(aM?new RegExp(aM):null),S[1]]}while((af=aE[R++])){for(var P=0,aC=aA.length;P<aC;P++){var A=true,ay=aA[P][0],ai=D(af,aA[P][1]);if(!ay&&ai===true){continue}if((!ay&&(!ai||typeof ai!=="string"||!ai.length))||(!!ay&&!ay.test(ai))){A=false;break}}if(A){aa[aa.length]=af}}ao=aE=aa}if(aD.allPseudos){var F=aD.allPseudos.match(j.pseudos);for(var O=0,an=F.length;O<an;O++){j.pseudos.lastIndex=0;var aP=j.pseudos.exec(F[O]);var J=aP[1]?aP[1].toLowerCase():null;var aJ=aP[3]||null;aE=aq(aE,J,aJ);aN(aE)}ao=aE}}az=e(az,ao)}return az},cssByXpath:function(n){var o={xhtml:"http://www.w3.org/1999/xhtml"};var p=(document.documentElement.namespaceURI===o.xhtml)?"xhtml:":"";var m=function q(r){return o[r]||null};DOMAssistant.cssByXpath=function(J){if(/:checked/.test(J)){return DOMAssistant.cssByDOM.call(this,J)}var y=J.replace(j.rules,"$1").split(",");var x=new h();var N,P,G,v,w,A;var O=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");function I(R,U,T,S){S=S?S.replace(j.quoted,"$1"):S;switch(T){case"^":return"starts-with(@"+U+', "'+S+'")';case"$":return"substring(@"+U+", (string-length(@"+U+") - "+(S.length-1)+"), "+S.length+') = "'+S+'"';case"*":return'contains(concat(" ", @'+U+', " "), "'+S+'")';case"|":return"(@"+U+'="'+S+'" or starts-with(@'+U+', "'+S+'-"))';case"~":return'contains(concat(" ", @'+U+', " "), " '+S+' ")';default:return"@"+U+(S?'="'+S+'"':"")}}function u(R,U,T,S){return"["+I(R,U,T,S)+"]"}function L(Z,Y,T){Z=/\-child$/.test(Y)?"*":Z;var U="",W=Y.split("-"),V;switch(W[0]){case"nth":if(!/^n$/.test(T)){var S=((W[1]==="last")?"(count(following-sibling::":"(count(preceding-sibling::")+Z+") + 1)";if((A=DOMAssistant.getSequence.call(this,T))){U=(A.start===A.max)?S+" = "+A.start:S+" mod "+A.add+" = "+A.modVal+((A.start>1)?" and "+S+" >= "+A.start:"")+((A.max>0)?" and "+S+" <= "+A.max:"")}}break;case"not":var X=(V=j.pseudo.exec(T))?L(Z,V[1]?V[1].toLowerCase():null,V[3]||null):T.replace(j.id,"[id=$1]").replace(j.tag,"self::$1").replace(j.classes,'contains(concat(" ", @class, " "), " $1 ")').replace(j.attribs,I);U="not("+X+")";break;case"first":return"not(preceding-sibling::"+Z+")";case"last":return"not(following-sibling::"+Z+")";case"only":return"not(preceding-sibling::"+Z+" or following-sibling::"+Z+")";case"empty":return"count(child::*) = 0 and string-length(text()) = 0";case"contains":return'contains(., "'+T.replace(j.quoted,"$1")+'")';case"enabled":return'not(@disabled) and not(@type="hidden")';case"disabled":return"@disabled";case"target":var R=document.location.hash.slice(1);return'@name="'+R+'" or @id="'+R+'"';default:return"@"+Y+'="'+T+'"'}return U}for(var K=0;(N=y[K]);K++){if(K&&f(y.slice(0,K),N)){continue}P=N.match(O);G=".";for(var H=0,M=P.length;H<M;H++){v=j.selector.exec(P[H]);w={tag:p+((!v[1]||v[3]==="*")?"*":v[1]),id:(v[3]!=="*")?v[2]:null,allClasses:v[4],allAttr:v[6],allPseudos:v[11],tagRelation:v[23]};if(w.tagRelation){var B={">":"/child::","+":"/following-sibling::*[1]/self::","~":"/following-sibling::"};G+=B[w.tagRelation]||""}else{G+=(H>0&&j.relation.test(P[H-1]))?w.tag:("/descendant::"+w.tag)}if(w.id){G+='[@id = "'+w.id.replace(/^#/,"")+'"]'}if(w.allClasses){G+=w.allClasses.replace(j.classes,'[contains(concat(" ", @class, " "), " $1 ")]')}if(w.allAttr){G+=w.allAttr.replace(j.attribs,u)}if(w.allPseudos){var z=w.allPseudos.match(j.pseudos);for(var F=0,s=z.length;F<s;F++){j.pseudos.lastIndex=0;var t=j.pseudos.exec(z[F]);var Q=t[1]?t[1].toLowerCase():null;var r=t[3]||null;var C=L(w.tag,Q,r);if(C.length){G+="["+C+"]"}}}}var E=document.evaluate(G,this,m,0,null),D;while((D=E.iterateNext())){x.push(D)}}return x};return DOMAssistant.cssByXpath.call(this,n)},cssSelection:function(n){DOMAssistant.cssSelection=document.evaluate?DOMAssistant.cssByXpath:DOMAssistant.cssByDOM;if(document.querySelectorAll){var m=DOMAssistant.cssSelection;DOMAssistant.cssSelection=function(o){try{var q=new h();return e(q,this.querySelectorAll(o))}catch(p){return m.call(this,o)}}}return DOMAssistant.cssSelection.call(this,n)},cssSelect:function(m){return DOMAssistant.cssSelection.call(this,m)},elmsByClass:function(o,m){var n=(m||"")+"."+o;return DOMAssistant.cssSelection.call(this,n)},elmsByAttribute:function(n,o,m,q){var p=(m||"")+"["+n+((o&&o!=="*")?((q||"")+"="+o+"]"):"]");return DOMAssistant.cssSelection.call(this,p)},elmsByTag:function(m){return DOMAssistant.cssSelection.call(this,m)}}}();DOMAssistant.initCore();DOMAssistant.AJAX=function(){var globalXMLHttp=null;var readyState=0;var status=-1;var statusText="";var requestPool=[];var createAjaxObj=function(url,method,callback,addToContent){var params=null;if(/POST/i.test(method)){url=url.split("?");params=url[1];url=url[0]}return{url:url,method:method,callback:callback,params:params,headers:{},responseType:"text",addToContent:addToContent||false}};var inProgress=function(xhr){return(!!xhr&&xhr.readyState>=1&&xhr.readyState<=3)};return{publicMethods:["ajax","get","post","load"],initRequest:function(){var XMLHttp=null;if(!!window.XMLHttpRequest){XMLHttp=new XMLHttpRequest();DOMAssistant.AJAX.initRequest=function(){return requestPool.length?requestPool.pop():new XMLHttpRequest()}}else{if(!!window.ActiveXObject){var XMLHttpMS=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(var i=0;i<XMLHttpMS.length;i++){try{XMLHttp=new window.ActiveXObject(XMLHttpMS[i]);DOMAssistant.AJAX.initRequest=function(){return requestPool.length?requestPool.pop():new window.ActiveXObject(XMLHttpMS[i])};break}catch(e){XMLHttp=null}}}}return XMLHttp},ajax:function(ajaxObj){if(!ajaxObj.noParse&&ajaxObj.url&&/\?/.test(ajaxObj.url)&&ajaxObj.method&&/POST/i.test(ajaxObj.method)){var url=ajaxObj.url.split("?");ajaxObj.url=url[0];ajaxObj.params=url[1]+((url[1].length>0&&ajaxObj.params)?("&"+ajaxObj.params):"")}return DOMAssistant.AJAX.makeCall.call(this,ajaxObj)},get:function(url,callback,addToContent){var ajaxObj=createAjaxObj(url,"GET",callback,addToContent);return DOMAssistant.AJAX.makeCall.call(this,ajaxObj)},post:function(url,callback){var ajaxObj=createAjaxObj(url,"POST",callback);return DOMAssistant.AJAX.makeCall.call(this,ajaxObj)},load:function(url,addToContent){DOMAssistant.AJAX.get.call(this,url,DOMAssistant.AJAX.replaceWithAJAXContent,addToContent)},makeCall:function(ajaxObj){var XMLHttp=DOMAssistant.AJAX.initRequest();if(XMLHttp){globalXMLHttp=XMLHttp;(function(elm){var url=ajaxObj.url,method=ajaxObj.method||"GET",callback=ajaxObj.callback,params=ajaxObj.params,headers=ajaxObj.headers,responseType=ajaxObj.responseType||"text",addToContent=ajaxObj.addToContent,timeout=ajaxObj.timeout||null,ex=ajaxObj.exception,timeoutId=null;XMLHttp.open(method,url,true);XMLHttp.setRequestHeader("AJAX","true");XMLHttp.setRequestHeader("X-Requested-With","XMLHttpRequest");if(method==="POST"){var contentLength=params?params.length:0;XMLHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");XMLHttp.setRequestHeader("Content-length",contentLength);if(XMLHttp.overrideMimeType){XMLHttp.setRequestHeader("Connection","close")}}if(responseType==="json"){XMLHttp.setRequestHeader("Accept","application/json, text/javascript, */*")}for(var i in headers){if(typeof i==="string"){XMLHttp.setRequestHeader(i,headers[i])}}if(typeof callback==="function"){XMLHttp.onreadystatechange=function(){try{if(XMLHttp.readyState===4){window.clearTimeout(timeoutId);status=XMLHttp.status;statusText=XMLHttp.statusText;readyState=4;if(!status||status!==200){throw new Error(statusText)}var response=/xml/i.test(responseType)?XMLHttp.responseXML:XMLHttp.responseText;if(/json/i.test(responseType)){response=(typeof JSON==="object"&&typeof JSON.parse==="function")?JSON.parse(response):eval("("+response+")")}globalXMLHttp=null;XMLHttp.onreadystatechange=function(){};requestPool.push(XMLHttp);callback.call(elm,response,addToContent)}}catch(e){globalXMLHttp=XMLHttp=null;if(typeof ex==="function"){ex.call(elm,e);ex=null}}}}XMLHttp.send(params);if(timeout){timeoutId=window.setTimeout(function(){if(inProgress(XMLHttp)){XMLHttp.abort();if(typeof ex==="function"){readyState=0;status=408;statusText="Request timeout";globalXMLHttp=XMLHttp=null;ex.call(elm,new Error(statusText));ex=null}}},timeout)}})(this)}return this},replaceWithAJAXContent:function(content,add){if(add){this.innerHTML+=content}else{DOMAssistant.clearHandlers.apply(this);this.innerHTML=content}},getReadyState:function(){return(globalXMLHttp&&DOMAssistant.def(globalXMLHttp.readyState))?globalXMLHttp.readyState:readyState},getStatus:function(){return status},getStatusText:function(){return statusText}}}();DOMAssistant.attach(DOMAssistant.AJAX);DOMAssistant.CSS=function(){var a=DOMAssistant.def;return{addClass:function(c){if(!DOMAssistant.CSS.hasClass.call(this,c)){var b=this.className;this.className=b+(b.length?" ":"")+c}return this},removeClass:function(b){return DOMAssistant.CSS.replaceClass.call(this,b)},replaceClass:function(c,d){var b=new RegExp(("(^|\\s)"+c+"(\\s|$)"),"i");this.className=this.className.replace(b,function(e,h,g){var f=d?(h+d+g):"";if(/^\s+.*\s+$/.test(e)){f=e.replace(/(\s+).+/,"$1")}return f}).replace(/^\s+|\s+$/g,"");return this},hasClass:function(b){return new RegExp(("(^|\\s)"+b+"(\\s|$)"),"i").test(this.className)},setStyle:function(d,e){if("filters" in this&&(typeof d==="string"?/opacity/i.test(d):a(d.opacity))){this.style.filter="alpha(opacity="+(a(d.opacity)?d.opacity:e)*100+")"}if(a(this.style.cssText)){var b=this.style.cssText;if(typeof d==="object"){for(var c in d){if(typeof c==="string"){b+=";"+c+":"+d[c]}}}else{b+=";"+d+":"+e}this.style.cssText=b}return this},getStyle:function(b){var d="";b=b.toLowerCase();if(document.defaultView&&document.defaultView.getComputedStyle){d=document.defaultView.getComputedStyle(this,"").getPropertyValue(b)}else{if(this.currentStyle){if("filters" in this&&/^opacity$/.test(b)){var c=this.filters["DXImageTransform.Microsoft.Alpha"]||this.filters.alpha||{};d=a(c.opacity)?c.opacity/100:1}else{b=b.replace(/^float$/,"styleFloat").replace(/\-(\w)/g,function(e,f){return f.toUpperCase()});d=this.currentStyle[b]}if(d==="auto"&&/^(width|height)$/.test(b)&&this.currentStyle.display!=="none"){d=this["offset"+b.charAt(0).toUpperCase()+b.substr(1)]+"px"}}}return d}}}();DOMAssistant.attach(DOMAssistant.CSS);DOMAssistant.Content=function(){var a=DOMAssistant.$;return{init:function(){DOMAssistant.setCache(false)},prev:function(){var b=this;while((b=b.previousSibling)&&b.nodeType!==1){}return a(b)},next:function(){var b=this;while((b=b.nextSibling)&&b.nodeType!==1){}return a(b)},create:function(d,c,b,e){var f=a(document.createElement(d));if(c){f=f.setAttributes(c)}if(DOMAssistant.def(e)){f.addContent(e)}if(b){DOMAssistant.Content.addContent.call(this,f)}return f},setAttributes:function(b){if(DOMAssistant.isIE){var c=function(g,e,f){var d=e.toLowerCase();switch(d){case"name":case"type":return document.createElement(g.outerHTML.replace(new RegExp(d+"=[a-zA-Z]+")," ").replace(">"," "+d+"="+f+">"));case"style":g.style.cssText=f;return g;default:g[DOMAssistant.camel[d]||e]=f;return g}};DOMAssistant.Content.setAttributes=function(d){var h=this;var g=this.parentNode;for(var f in d){if(typeof d[f]==="string"||typeof d[f]==="number"){var e=c(h,f,d[f]);if(g&&/(name|type)/i.test(f)){if(h.innerHTML){e.innerHTML=h.innerHTML}g.replaceChild(e,h)}h=e}}return a(h)}}else{DOMAssistant.Content.setAttributes=function(d){for(var e in d){if(/class/i.test(e)){this.className=d[e]}else{this.setAttribute(e,d[e])}}return this}}return DOMAssistant.Content.setAttributes.call(this,b)},addContent:function(c){var b=typeof c;if(b==="string"||b==="number"){this.innerHTML+=c}else{if(b==="object"||(b==="function"&&!!c.nodeName)){this.appendChild(c)}}return this},replaceContent:function(b){DOMAssistant.clearHandlers.apply(this);this.innerHTML="";return DOMAssistant.Content.addContent.call(this,b)},replace:function(g,b){var f=typeof g;if(f==="string"||f==="number"){var e=this.parentNode;var d=a(e).create("div",null,false,g);for(var c=d.childNodes.length-1;c>=0;c--){e.insertBefore(d.childNodes[c],this.nextSibling)}g=this.nextSibling;e.removeChild(this)}else{if(f==="object"||(f==="function"&&!!g.nodeName)){this.parentNode.replaceChild(g,this)}}return b?g:this},remove:function(){this.parentNode.removeChild(this);return null}}}();DOMAssistant.attach(DOMAssistant.Content);DOMAssistant.Events=function(){var a=1;return{publicMethods:["triggerEvent","addEvent","removeEvent","preventDefault","cancelBubble"],init:function(){window.addEvent=this.addEvent;window.removeEvent=this.removeEvent;DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble},triggerEvent:function(c,f){if(this.events&&this.events[c]){var e={type:c,target:f||this,currentTarget:this,bubbles:false,cancelable:false,preventDefault:function(){},stopPropagation:function(){},timeStamp:+new Date()};for(var d=0,b=this.events[c].length;d<b;d++){this.events[c][d].call(this,e)}}else{if(typeof this["on"+c]==="function"){this["on"+c].call(this,e)}}return this},addEvent:function(b,d){if(/^DOM/.test(b)){if(this.addEventListener){this.addEventListener(b,d,false)}}else{if(!this.uniqueHandlerId){this.uniqueHandlerId=a++}if(!(d.attachedElements&&d.attachedElements[b+this.uniqueHandlerId])){if(!this.events){this.events={}}if(!this.events[b]){this.events[b]=[];var c=this["on"+b];if(c){this.events[b].push(c)}}this.events[b].push(d);this["on"+b]=DOMAssistant.Events.handleEvent;if(typeof this.window==="object"){this.window["on"+b]=DOMAssistant.Events.handleEvent}if(!d.attachedElements){d.attachedElements={}}d.attachedElements[b+this.uniqueHandlerId]=true}}return this},handleEvent:function(b){var g=b||event;var h=g.target||g.srcElement||document;while(h.nodeType!==1&&h.parentNode){h=h.parentNode}g.eventTarget=h;var c=this.events[g.type].slice(0),f,e;if((f=c.length)){for(var d=0;d<f;d++){if(typeof c[d]==="function"){e=c[d].call(this,g)}}return e}},removeEvent:function(b,f){if(this.events&&this.events[b]){var c=this.events[b];for(var e,d=c.length-1;d>=0;d--){e=f||c[d];if(c[d]===e){delete c[d];c.splice(d,1);if(e.attachedElements){e.attachedElements[b+this.uniqueHandlerId]=null}}}}else{if(this["on"+b]&&!f){this["on"+b]=null}}return this},preventDefault:function(b){if(b&&b.preventDefault){DOMAssistant.Events.preventDefault=function(c){c.preventDefault()}}else{DOMAssistant.Events.preventDefault=function(c){event.returnValue=false}}return DOMAssistant.Events.preventDefault(b)},cancelBubble:function(b){if(b&&b.stopPropagation){DOMAssistant.Events.cancelBubble=function(c){c.stopPropagation()}}else{DOMAssistant.Events.cancelBubble=function(c){event.cancelBubble=true}}return DOMAssistant.Events.cancelBubble(b)}}}();DOMAssistant.attach(DOMAssistant.Events);DOMAssistant.DOMLoad=function(){var DOMLoaded=false;var DOMLoadTimer=null;var functionsToCall=[];var addedStrings={};var errorHandling=null;var execFunctions=function(){for(var i=0,il=functionsToCall.length;i<il;i++){try{functionsToCall[i]()}catch(e){if(errorHandling&&typeof errorHandling==="function"){errorHandling(e)}}}functionsToCall=[]};var DOMHasLoaded=function(){if(DOMLoaded){return}DOMLoaded=true;execFunctions()};
/*@cc_on @if(@_win32||@_win64)if(document.getElementById){document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");document.getElementById("ieScriptLoad").onreadystatechange=function(){if(this.readyState==="complete"){DOMHasLoaded()}}}@end@*/
if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMHasLoaded,false)}if(/KHTML|WebKit|iCab/i.test(navigator.userAgent)){DOMLoadTimer=setInterval(function(){if(/loaded|complete/i.test(document.readyState)){DOMHasLoaded();clearInterval(DOMLoadTimer)}},10)}window.onload=DOMHasLoaded;return{DOMReady:function(){for(var i=0,il=arguments.length,funcRef;i<il;i++){funcRef=arguments[i];if(!funcRef.DOMReady&&!addedStrings[funcRef]){if(typeof funcRef==="string"){addedStrings[funcRef]=true;funcRef=new Function(funcRef)}funcRef.DOMReady=true;functionsToCall.push(funcRef)}}if(DOMLoaded){execFunctions()}},setErrorHandling:function(funcRef){errorHandling=funcRef}}}();DOMAssistant.DOMReady=DOMAssistant.DOMLoad.DOMReady;