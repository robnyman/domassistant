// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.domassistant.com/documentation, version 2.7.1.1
var DOMAssistant=function(){var A=function(){};var D=/*@cc_on!@*/false;var C=[];var B={accesskey:"accessKey","class":"className",colspan:"colSpan","for":"htmlFor",maxlength:"maxLength",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",valign:"vAlign",cellspacing:"cellSpacing",cellpadding:"cellPadding"};var E=function(I,H){for(var G=0,F=H.length;G<F;G++){I.push(H[G]);}return I;};if(D){E=function(I,H){if(H.slice){return I.concat(H);}for(var G=0,F=H.length;G<F;G++){I[I.length]=H[G];}return I;};}return{isIE:D,camel:B,allMethods:[],publicMethods:["cssSelect","elmsByClass","elmsByAttribute","elmsByTag"],initCore:function(){this.applyMethod.call(window,"$",this.$);this.applyMethod.call(window,"$$",this.$$);window.DOMAssistant=this;if(D){A=Array;}A.prototype=[];A.prototype.each=function(H){for(var G=0,F=this.length;G<F;G++){H.call(this[G]);}return this;};A.prototype.first=function(){return(typeof this[0]!=="undefined")?DOMAssistant.addMethodsToElm(this[0]):null;};A.prototype.end=function(){return this.previousSet;};this.attach(this);},addMethods:function(F,G){if(typeof this.allMethods[F]==="undefined"){this.allMethods[F]=G;this.addHTMLArrayPrototype(F,G);}},addMethodsToElm:function(G){for(var F in this.allMethods){if(typeof this.allMethods[F]!=="undefined"){this.applyMethod.call(G,F,this.allMethods[F]);}}return G;},applyMethod:function(G,F){if(typeof this[G]!=="function"){this[G]=F;}},attach:function(H){var F=H.publicMethods;if(typeof F==="undefined"){for(var J in H){if(J!=="init"&&typeof H[J]!=="undefined"){this.addMethods(J,H[J]);}}}else{if(F.constructor===Array){for(var G=0,I;(I=F[G]);G++){this.addMethods(I,H[I]);}}}if(typeof H.init==="function"){H.init();}},addHTMLArrayPrototype:function(F,G){A.prototype[F]=function(){var J=new A();J.previousSet=this;var K;for(var I=0,H=this.length;I<H;I++){K=G.apply(this[I],arguments);if(typeof K!=="undefined"&&K!==null&&K.constructor===Array){J=E(J,K);}else{J.push(K);}}return J;};},$:function(){var H=new A();if(document.getElementById){var F=arguments[0];if(typeof F==="string"){F=F.replace(/^[^#]*(#)/,"$1");if(/^#[\w\u00C0-\uFFFF\-\_]+$/.test(F)){var G=DOMAssistant.$$(F.substr(1),false);if(G){H.push(G);}}else{H=DOMAssistant.cssSelection.call(document,F);}}else{if((typeof F==="object")||(typeof F==="function"&&typeof F.nodeName!=="undefined")){H=(arguments.length===1)?DOMAssistant.$$(F):E(H,arguments);}}}return H;},$$:function(K,H){var J=((typeof K==="object")||(typeof K==="function"&&typeof K.nodeName!=="undefined"))?K:document.getElementById(K);var I=H||true;if(typeof K==="string"&&J&&J.id!==K){J=null;for(var F=0,G;(G=document.all[F]);F++){if(G.id===K){J=G;break;}}}if(J&&I){DOMAssistant.addMethodsToElm(J);}return J;},cssSelection:function(H){var J=function(R){var S,Q=2,N=-1,M=-1;var P=/^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n([\+\-]\d+)?)|(\-(([1-9]\d*)?)n\+(\d+)))$/;var O=P.exec(R);if(!O){return null;}else{if(O[2]){S=(O[2]==="odd")?1:2;M=(S===1)?1:0;}else{if(O[3]){S=parseInt(O[3],10);Q=0;N=S;}else{if(O[4]){Q=O[6]?parseInt(O[6],10):1;S=O[7]?parseInt(O[7],10):0;while(S<1){S+=Q;}M=(S>Q)?(S-Q)%Q:((S===Q)?0:S);}else{if(O[8]){Q=O[10]?parseInt(O[10],10):1;S=N=parseInt(O[11],10);while(S>Q){S-=Q;}M=(N>Q)?(N-Q)%Q:((N===Q)?0:N);}}}}}return{start:S,add:Q,max:N,modVal:M};};if(document.evaluate){var I={xhtml:"http://www.w3.org/1999/xhtml"};var K=(document.documentElement.namespaceURI===I.xhtml)?"xhtml:":"";var G=function L(M){return I[M]||null;};DOMAssistant.cssSelection=function(g){var V=g.replace(/\s*(,)\s*/g,"$1").split(",");var T=new A();var n,N,p,d,R,S,W;var M=/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=([\w\u00C0-\uFFFF\s\-\_\.]+|"[^"]*"|'[^']*'))?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_\.]+|"[^"]*"|'[^']*'|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+)|(:\w+[\w\-]*))\))?)*)?(>|\+|~)?/;var o=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");function f(i,r,k,j){j=j.replace(/^["'](.*)["']$/,"$1");switch(k){case"^":return"starts-with(@"+r+', "'+j+'")';case"$":return"substring(@"+r+", (string-length(@"+r+") - "+(j.length-1)+"), "+j.length+') = "'+j+'"';case"*":return'contains(concat(" ", @'+r+', " "), "'+j+'")';case"|":return"(@"+r+'="'+j+'" or starts-with(@'+r+', "'+j+'-"))';case"~":return'contains(concat(" ", @'+r+', " "), " '+j+' ")';default:return"@"+r+(j?'="'+j+'"':"");}}function m(j,r,k){j=(/\-child$/.test(r))?"*":j;var s="",u=r.split("-");switch(u[0]){case"first":s="not(preceding-sibling::"+j+")";break;case"last":s="not(following-sibling::"+j+")";break;case"only":s="not(preceding-sibling::"+j+" or following-sibling::"+j+")";break;case"nth":if(!/^n$/.test(k)){var i=((u[1]==="last")?"(count(following-sibling::":"(count(preceding-sibling::")+j+") + 1)";W=J(k);if(W){if(W.start===W.max){s=i+" = "+W.start;}else{s=i+" mod "+W.add+" = "+W.modVal+((W.start>1)?" and "+i+" >= "+W.start:"")+((W.max>0)?" and "+i+" <= "+W.max:"");}}}break;case"empty":s="count(child::*) = 0 and string-length(text()) = 0";break;case"contains":s='contains(., "'+k.replace(/^["'](.*)["']$/,"$1")+'")';break;case"enabled":s="not(@disabled)";break;case"disabled":s="@disabled";break;case"checked":s='@checked="checked"';break;case"target":var v=document.location.hash.slice(1);s='@name="'+v+'" or @id="'+v+'"';break;case"not":if(/^(:\w+[\w\-]*)$/.test(k)){s="not("+m(j,k.slice(1))+")";}else{k=k.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/,"[id=$1]");var t=k.replace(/^(\w+)/,"self::$1");t=t.replace(/^\.([\w\u00C0-\uFFFF\-_]+)/g,'contains(concat(" ", @class, " "), " $1 ")');t=t.replace(/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/g,f);s="not("+t+")";}break;default:s="@"+r+'="'+k+'"';break;}return s;}for(var h=0;(n=V[h]);h++){if(h>0){N=false;for(var X=0,Y=h;X<Y;X++){if(V[h]===V[X]){N=true;break;}}if(N){continue;}}p=n.match(o);d=".";for(var e=0,l=p.length;e<l;e++){R=M.exec(p[e]);S={tag:K+((!R[1]||R[3]==="*")?"*":R[1]),id:(R[3]!=="*")?R[2]:null,allClasses:R[4],allAttr:R[6],allPseudos:R[11],tagRelation:R[23]};if(S.tagRelation){switch(S.tagRelation){case">":d+="/child::";break;case"+":d+="/following-sibling::*[1]/self::";break;case"~":d+="/following-sibling::";break;}}else{d+=(e>0&&/(>|\+|~)/.test(p[e-1]))?S.tag:("/descendant::"+S.tag);}if(S.id){d+='[@id = "'+S.id.replace(/^#/,"")+'"]';}if(S.allClasses){d+=S.allClasses.replace(/\.([\w\u00C0-\uFFFF\-_]+)/g,'[contains(concat(" ", @class, " "), " $1 ")]');}if(S.allAttr){d+=S.allAttr.replace(/(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+|"[^"]*"|'[^']*')?/g,f);}if(S.allPseudos){var U=/:(\w[\w\-]*)(\(([^\)]+)\))?/;S.allPseudos=S.allPseudos.match(/(:\w+[\w\-]*)(\([^\)]+\))?/g);for(var c=0,P=S.allPseudos.length;c<P;c++){var Q=S.allPseudos[c].match(U);var q=Q[1]?Q[1].toLowerCase():null;var O=Q[3]?Q[3]:null;var Z=m(S.tag,q,O);if(Z.length){d+="["+Z+"]";}}}}var b=document.evaluate(d,this,G,0,null),a;while((a=b.iterateNext())){T.push(a);}}return T;};}else{DOMAssistant.cssSelection=function(M){var Ao=M.replace(/\s*(,)\s*/g,"$1").split(",");var Ag=new A();var AW=[],Am=[];var Ax,X,AE,T,g,Aa,O,Aw,AF,Ah,AG,N,AK,R,c,AX,Ar,AU,P,An;var Al=/^(>|\+|~)$/;var Z=/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=([\w\u00C0-\uFFFF\s\-\_\.]+|"[^"]*"|'[^']*'))?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|"[^"]*"|'[^']*'|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+)|(:\w+[\w\-]*))\))?)*)?/;var y;try{y=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");}catch(AM){y=/[^\s]+/g;}function Au(e){e=e||AW;for(var b=0,a=e.length;b<a;b++){e[b].added=null;}}function S(){for(var b=0,a=Ax.length;b<a;b++){Ax[b].childElms=null;}}function AS(e,a){for(var k=0,n;(n=e[k]);k++){var m=false;for(var b=0,l;(l=a[b]);b++){if(l===n){m=true;break;}}if(m){e.splice(k--,1);}}return e;}function U(b,a){return D?b[B[a.toLowerCase()]||a]:b.getAttribute(a,2);}function h(a,b){a=a?a.replace(/^["'](.*)["']$/,"$1").replace(/\./g,"\\."):null;switch(b){case"^":return"^"+a;case"$":return a+"$";case"*":return a;case"|":return"(^"+a+"(\\-\\w+)*$)";case"~":return"\\b"+a+"\\b";default:return a?"^"+a+"$":null;}}function Ap(a,b){a=a||"*";b=b||document;if(b===document||b.lastModified){if(!C[a]){C[a]=D?((a==="*")?document.all:document.all.tags(a)):document.getElementsByTagName(a);}return C[a];}return D?((a==="*")?b.all:b.all.tags(a)):b.getElementsByTagName(a);}function AY(A0,BO,e){Ax=[];var Ay=BO.split("-"),A3=[],BN;var Az=(BN=/\-of\-type$/.test(BO))?"nodeName":"nodeType";function BP(j){var i=BN?j.nodeName:1;while((j=j.previousSibling)&&j[Az]!==i){}return j;}function A2(j){var i=BN?j.nodeName:1;while((j=j.nextSibling)&&j[Az]!==i){}return j;}switch(Ay[0]){case"first":for(var BJ=0;(R=A0[BJ]);BJ++){if(!BP(R)){A3[A3.length]=R;}}break;case"last":for(var BI=0;(R=A0[BI]);BI++){if(!A2(R)){A3[A3.length]=R;}}break;case"only":for(var BH=0,A4;(R=A0[BH]);BH++){c=R.parentNode;if(c!==A4){if(!BP(R)&&!A2(R)){A3[A3.length]=R;}A4=c;}}break;case"nth":if(/^n$/.test(e)){A3=A0;}else{var BM=(Ay[1]==="last")?["lastChild","previousSibling"]:["firstChild","nextSibling"];An=J(e);if(An){for(var BG=0;(R=A0[BG]);BG++){c=R.parentNode;if(!c.childElms){Ar=An.start;AU=0;P=c[BM[0]];while(P&&(An.max<0||Ar<=An.max)){if(BN){if(P.nodeName===R.nodeName){if(++AU===Ar){A3[A3.length]=P;Ar+=An.add;}}}else{if(P.nodeType===1){if(++AU===Ar){if(P.nodeName===R.nodeName){A3[A3.length]=P;}Ar+=An.add;}}}P=P[BM[1]];}c.childElms=true;Ax[Ax.length]=c;}}S();}}break;case"empty":for(var BF=0;(R=A0[BF]);BF++){if(!R.childNodes.length){A3[A3.length]=R;}}break;case"enabled":for(var BD=0;(R=A0[BD]);BD++){if(!R.disabled){A3[A3.length]=R;}}break;case"disabled":for(var BC=0;(R=A0[BC]);BC++){if(R.disabled){A3[A3.length]=R;}}break;case"checked":for(var BB=0;(R=A0[BB]);BB++){if(R.checked){A3[A3.length]=R;}}break;case"contains":e=e.replace(/^["'](.*)["']$/,"$1");for(var BA=0;(R=A0[BA]);BA++){if(!R.added){if(R.innerText.indexOf(e)!==-1){R.added=true;A3[A3.length]=R;}}}break;case"target":var b=document.location.hash.slice(1);if(b){for(var A9=0;(R=A0[A9]);A9++){if(U(R,"name")===b||U(R,"id")===b){A3[A3.length]=R;break;}}}break;case"not":if(/^(:\w+[\w\-]*)$/.test(e)){A3=AS(A0,AY(A0,e.slice(1)));}else{e=e.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/,"[id=$1]");var A8=/^(\w+)/.exec(e);var A1=/^\.([\w\u00C0-\uFFFF\-_]+)/.exec(e);var A6=/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/.exec(e);var a=new RegExp("(^|\\s)"+(A8?A8[1]:A1?A1[1]:"")+"(\\s|$)","i");if(A6){var BL=h(A6[3],A6[2]);a=new RegExp(BL,"i");}for(var A7=0,BK;(BK=A0[A7]);A7++){AX=null;if(A8&&!a.test(BK.nodeName)){AX=BK;}else{if(A1&&!a.test(BK.className)){AX=BK;}else{if(A6){var BE=U(BK,A6[1]);if(!BE||!a.test(BE)){AX=BK;}}}}if(AX&&!AX.added){AX.added=true;A3[A3.length]=AX;}}}break;default:for(var A5=0;(R=A0[A5]);A5++){if(U(R,BO)===e){A3[A3.length]=R;}}break;}return A3;}for(var AP=0;(X=Ao[AP]);AP++){if(AP>0){AE=false;for(var AO=0,AQ=AP;AO<AQ;AO++){if(Ao[AP]===Ao[AO]){AE=true;break;}}if(AE){continue;}}T=X.match(y);AW=[this];for(var AL=0,V;(V=T[AL]);AL++){Am=[];if(AL>0&&Al.test(V)){g=Al.exec(V);if(g){Aa=/^\w+/.exec(T[AL+1]);if(Aa){Aa=Aa[0];O=new RegExp("(^|\\s)"+Aa+"(\\s|$)","i");}for(var AJ=0,f;(f=AW[AJ]);AJ++){switch(g[0]){case">":var Ai=Ap(Aa,f);for(var AI=0,Ad;(Ad=Ai[AI]);AI++){if(Ad.parentNode===f){Am[Am.length]=Ad;}}break;case"+":while((f=f.nextSibling)&&f.nodeType!==1){}if(f){if(!Aa||O.test(f.nodeName)){Am[Am.length]=f;}}break;case"~":while((f=f.nextSibling)&&!f.added){if(!Aa||O.test(f.nodeName)){f.added=true;Am[Am.length]=f;}}break;}}AW=Am;Au();V=T[++AL];if(/^\w+$/.test(V)){continue;}AW.skipTag=true;}}var AZ=Z.exec(V);var Ak={tag:(!AZ[1]||AZ[3]==="*")?"*":AZ[1],id:(AZ[3]!=="*")?AZ[2]:null,allClasses:AZ[4],allAttr:AZ[6],allPseudos:AZ[11]};if(Ak.id){var AR=document.getElementById(Ak.id.replace(/#/,""));if(AR){Am=[AR];}AW=Am;}else{if(Ak.tag&&!AW.skipTag){if(AL===0&&!Am.length&&AW.length===1){AW=Am=E([],Ap(Ak.tag,AW[0]));}else{for(var AH=0,As=AW.length,Ae,Ab;AH<As;AH++){Ae=Ap(Ak.tag,AW[AH]);for(var AD=0;(Ab=Ae[AD]);AD++){if(!Ab.added){Ab.added=true;Am[Am.length]=Ab;}}}AW=Am;Au();}}}if(!Am.length){break;}AW.skipTag=false;if(Ak.allClasses){Ak.allClasses=Ak.allClasses.replace(/^\./,"").split(".");Aw=[];for(var AC=0,AT=Ak.allClasses.length;AC<AT;AC++){Aw[Aw.length]=new RegExp("(^|\\s)"+Ak.allClasses[AC]+"(\\s|$)");}AF=[];for(var AB=0,Ac;(AK=AW[AB]);AB++){Ac=AK.className;if(Ac&&!AK.added){AX=false;for(var AA=0,W=Aw.length;AA<W;AA++){AX=Aw[AA].test(Ac);if(!AX){break;}}if(AX){AK.added=true;AF[AF.length]=AK;}}}Au();AW=Am=AF;}if(Ak.allAttr){Ak.allAttr=Ak.allAttr.match(/\[[^\]]+\]/g);Ah=[];N=/(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+|"[^"]*"|'[^']*')?/;for(var z=0,Q=Ak.allAttr.length,x,At;z<Q;z++){x=N.exec(Ak.allAttr[z]);At=h(x[3],(x[2]||null));Ah[Ah.length]=[(At?new RegExp(At):null),x[1]];}AG=[];for(var w=0,AN;(AK=Am[w]);w++){for(var v=0,Aj=Ah.length,Af;v<Aj;v++){AX=false;Af=Ah[v][0];AN=U(AK,Ah[v][1]);if(typeof AN==="string"&&AN.length){if(!Af||typeof Af==="undefined"||(Af&&Af.test(AN))){AX=true;}}if(!AX){break;}}if(AX){AG[AG.length]=AK;}}AW=Am=AG;}if(Ak.allPseudos){var Y=/:(\w[\w\-]*)(\(([^\)]+)\))?/;Ak.allPseudos=Ak.allPseudos.match(/(:\w+[\w\-]*)(\([^\)]+\))?/g);for(var u=0,AV=Ak.allPseudos.length;u<AV;u++){var Av=Ak.allPseudos[u].match(Y);var d=Av[1]?Av[1].toLowerCase():null;var Aq=Av[3]?Av[3]:null;Am=AY(Am,d,Aq);Au(Am);}AW=Am;}}Ag=E(Ag,AW);}return Ag;};}if(document.querySelectorAll){var F=DOMAssistant.cssSelection;DOMAssistant.cssSelection=function(M){try{var O=new A();return E(O,this.querySelectorAll(M));}catch(N){return F.call(this,M);}};}return DOMAssistant.cssSelection.call(this,H);},cssSelect:function(F){return DOMAssistant.cssSelection.call(this,F);},elmsByClass:function(H,F){var G=(F||"")+"."+H;return DOMAssistant.cssSelection.call(this,G);},elmsByAttribute:function(G,H,F,J){var I=(F||"")+"["+G+((H&&H!=="*")?((J||"")+"="+H+"]"):"]");return DOMAssistant.cssSelection.call(this,I);},elmsByTag:function(F){return DOMAssistant.cssSelection.call(this,F);}};}();DOMAssistant.initCore();DOMAssistant.AJAX=function(){var E=null;var A=0;var C=-1;var D="";var B=function(G,J,I,F){var H=null;if(/POST/i.test(J)){G=G.split("?");H=G[1];G=G[0];}return{url:G,method:J,callback:I,params:H,headers:{},responseType:"text",addToContent:F||false};};return{publicMethods:["ajax","get","post","load","replaceWithAJAXContent"],initRequest:function(){var G=null;if(typeof XMLHttpRequest!=="undefined"){G=new XMLHttpRequest();DOMAssistant.AJAX.initRequest=function(){return new XMLHttpRequest();};}else{if(typeof window.ActiveXObject!=="undefined"){var F=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(var H=0;H<F.length;H++){try{G=new window.ActiveXObject(F[H]);DOMAssistant.AJAX.initRequest=function(){return new window.ActiveXObject(F[H]);};break;}catch(I){G=null;}}}}return G;},ajax:function(F){if(!F.noParse&&F.url&&/\?/.test(F.url)&&F.method&&/POST/i.test(F.method)){var G=F.url.split("?");F.url=G[0];F.params=G[1]+((G[1].length>0&&F.params)?("&"+F.params):"");}return DOMAssistant.AJAX.makeCall.call(this,F);},get:function(H,I,G){var F=B(H,"GET",I,G);return DOMAssistant.AJAX.makeCall.call(this,F);},post:function(G,H){var F=B(G,"POST",H);return DOMAssistant.AJAX.makeCall.call(this,F);},load:function(G,F){DOMAssistant.AJAX.get.call(this,G,DOMAssistant.AJAX.replaceWithAJAXContent,F);},makeCall:function(F){var G=DOMAssistant.AJAX.initRequest();if(G){E=G;var H=function(Q){var K=F.url;var I=F.method||"GET";var R=F.callback;var M=F.params;var L=F.headers;var P=F.responseType||"text";var N=F.addToContent;G.open(I,K,true);G.setRequestHeader("AJAX","true");G.setRequestHeader("X-Requested-With","XMLHttpRequest");if(I==="POST"){var J=M?M.length:0;G.setRequestHeader("Content-type","application/x-www-form-urlencoded");G.setRequestHeader("Content-length",J);if(G.overrideMimeType){G.setRequestHeader("Connection","close");}}for(var O in L){if(typeof O==="string"){G.setRequestHeader(O,L[O]);}}if(typeof R==="function"){G.onreadystatechange=function(){if(G.readyState===4){var S=(/xml/i.test(P))?G.responseXML:G.responseText;R.call(Q,S,N);A=4;C=G.status;D=G.statusText;E=null;G=null;}};}G.send(M);}(this);}return this;},replaceWithAJAXContent:function(J,N){if(N){this.innerHTML+=J;}else{var F=this.all||this.getElementsByTagName("*");for(var H=0,L,K;(L=F[H]);H++){K=L.attributes;if(K){for(var G=0,I=K.length,M;G<I;G++){M=K[G].nodeName.toLowerCase();if(typeof L[M]==="function"){L[M]=null;}}}}this.innerHTML=J;}},getReadyState:function(){return(E&&typeof E.readyState!=="undefined")?E.readyState:A;},getStatus:function(){return C;},getStatusText:function(){return D;}};}();DOMAssistant.attach(DOMAssistant.AJAX);DOMAssistant.CSS=function(){return{addClass:function(B){var A=this.className;if(!new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i").test(A)){this.className=A+(A.length?" ":"")+B;}return this;},removeClass:function(B){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(C){var D="";if(new RegExp("^\\s+.*\\s+$").test(C)){D=C.replace(/(\s+).+/,"$1");}return D;}).replace(/^\s+|\s+$/g,"");return this;},replaceClass:function(B,C){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(D,G,F){var E=G+C+F;if(new RegExp("^\\s+.*\\s+$").test(D)){E=D.replace(/(\s+).+/,"$1");}return E;}).replace(/^\s+|\s+$/g,"");return this;},hasClass:function(A){return new RegExp(("(^|\\s)"+A+"(\\s|$)"),"i").test(this.className);},setStyle:function(C,D){if(typeof this.style.cssText!=="undefined"){var A=this.style.cssText;if(typeof C==="object"){for(var B in C){if(typeof B==="string"){A+=";"+B+":"+C[B];}}}else{A+=";"+C+":"+D;}this.style.cssText=A;}return this;},getStyle:function(B){var A="";if(document.defaultView&&document.defaultView.getComputedStyle){A=document.defaultView.getComputedStyle(this,"").getPropertyValue(B);}else{if(this.currentStyle){A=B.replace(/\-(\w)/g,function(C,D){return D.toUpperCase();});A=this.currentStyle[A];}}return A;}};}();DOMAssistant.attach(DOMAssistant.CSS);DOMAssistant.Content=function(){return{prev:function(){var A=this;while((A=A.previousSibling)&&A.nodeType!==1){}return DOMAssistant.$(A);},next:function(){var A=this;while((A=A.nextSibling)&&A.nodeType!==1){}return DOMAssistant.$(A);},create:function(C,B,A,D){var E=DOMAssistant.$(document.createElement(C));if(B){E=E.setAttributes(B);}if(typeof D!=="undefined"){E.addContent(D);}if(A){DOMAssistant.Content.addContent.call(this,E);}return E;},setAttributes:function(A){if(DOMAssistant.isIE){var B=function(F,D,E){var C=D.toLowerCase();switch(C){case"name":case"type":return document.createElement(F.outerHTML.replace(new RegExp(C+"=[a-zA-Z]+")," ").replace(">"," "+C+"="+E+">"));case"style":F.style.cssText=E;return F;default:F[DOMAssistant.camel[C]||D]=E;return F;}};DOMAssistant.Content.setAttributes=function(C){var G=this;var F=this.parentNode;for(var E in C){if(typeof C[E]==="string"||typeof C[E]==="number"){var D=B(G,E,C[E]);if(F&&/(name|type)/i.test(E)){if(G.innerHTML){D.innerHTML=G.innerHTML;}F.replaceChild(D,G);}G=D;}}return DOMAssistant.$(G);};}else{DOMAssistant.Content.setAttributes=function(C){for(var D in C){if(/class/i.test(D)){this.className=C[D];}else{this.setAttribute(D,C[D]);}}return this;};}return DOMAssistant.Content.setAttributes.call(this,A);},addContent:function(A){if(typeof A==="string"||typeof A==="number"){this.innerHTML+=A;}else{if((typeof A==="object")||(typeof A==="function"&&typeof A.nodeName!=="undefined")){this.appendChild(A);}}return this;},replaceContent:function(B){var G=this.all||this.getElementsByTagName("*");for(var F=0,H,A;(H=G[F]);F++){A=H.attributes;if(A){for(var D=0,E=A.length,C;D<E;D++){C=A[D].nodeName.toLowerCase();if(typeof H[C]==="function"){H[C]=null;}}}}while(this.hasChildNodes()){this.removeChild(this.firstChild);}DOMAssistant.$(this).addContent(B);return this;},remove:function(){this.parentNode.removeChild(this);return null;}};}();DOMAssistant.attach(DOMAssistant.Content);DOMAssistant.Events=function(){var A=1;return{publicMethods:["addEvent","removeEvent","preventDefault","cancelBubble"],init:function(){window.addEvent=this.addEvent;window.removeEvent=this.removeEvent;DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble;},addEvent:function(C,E){var B=(/^DOM/.test(C));if(B){if(this.addEventListener){this.addEventListener(C,E,false);}}else{if(!this.uniqueHandlerId){this.uniqueHandlerId=A++;}var F=false;if(E.attachedElements&&E.attachedElements[C+this.uniqueHandlerId]){F=true;}if(!F){if(!this.events){this.events={};}if(!this.events[C]){this.events[C]=[];var D=this["on"+C];if(D){this.events[C].push(D);}}this.events[C].push(E);this["on"+C]=DOMAssistant.Events.handleEvent;if(typeof this.window==="object"){this.window["on"+C]=DOMAssistant.Events.handleEvent;}if(!E.attachedElements){E.attachedElements={};}E.attachedElements[C+this.uniqueHandlerId]=true;}}return this;},handleEvent:function(B){var F=B||event;var G=F.target||F.srcElement||document;while(G.nodeType!==1&&G.parentNode){G=G.parentNode;}F.eventTarget=G;var C=this.events[F.type].slice(0);var E=C.length-1;if(E!==-1){for(var D=0;D<E;D++){C[D].call(this,F);}return C[D].call(this,F);}},removeEvent:function(B,E){if(this.events){var C=this.events[B];for(var D=0;D<C.length;D++){if(C[D]===E){delete C[D];C.splice(D,1);}}E.attachedElements[B+this.uniqueHandlerId]=null;}return this;},preventDefault:function(B){if(B&&B.preventDefault){DOMAssistant.Events.preventDefault=function(C){C.preventDefault();};}else{DOMAssistant.Events.preventDefault=function(C){event.returnValue=false;};}return DOMAssistant.Events.preventDefault(B);},cancelBubble:function(B){if(B&&B.stopPropagation){DOMAssistant.Events.cancelBubble=function(C){C.stopPropagation();};}else{DOMAssistant.Events.cancelBubble=function(C){event.cancelBubble=true;};}return DOMAssistant.Events.cancelBubble(B);}};}();DOMAssistant.attach(DOMAssistant.Events);DOMAssistant.DOMLoad=function(){var DOMLoaded=false;var DOMLoadTimer=null;var functionsToCall=[];var addedStrings={};var errorHandling=null;var execFunctions=function(){for(var i=0,il=functionsToCall.length;i<il;i++){try{functionsToCall[i]();}catch(e){if(errorHandling&&typeof errorHandling==="function"){errorHandling(e);}}}functionsToCall=[];};var DOMHasLoaded=function(){if(DOMLoaded){return ;}DOMLoaded=true;execFunctions();};
/*@cc_on
	@if (@_win32 || @_win64)
		if (document.getElementById) {
			document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");
			document.getElementById("ieScriptLoad").onreadystatechange = function() {
				if (this.readyState === "complete") {
					DOMHasLoaded();
				}
			};
		}
	@end @*/
if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMHasLoaded,false);}if(/KHTML|WebKit|iCab/i.test(navigator.userAgent)){DOMLoadTimer=setInterval(function(){if(/loaded|complete/i.test(document.readyState)){DOMHasLoaded();clearInterval(DOMLoadTimer);}},10);}window.onload=DOMHasLoaded;return{DOMReady:function(){for(var i=0,il=arguments.length,funcRef;i<il;i++){funcRef=arguments[i];if(!funcRef.DOMReady&&!addedStrings[funcRef]){if(typeof funcRef==="string"){addedStrings[funcRef]=true;funcRef=new Function(funcRef);}funcRef.DOMReady=true;functionsToCall.push(funcRef);}}if(DOMLoaded){execFunctions();}},setErrorHandling:function(funcRef){errorHandling=funcRef;}};}();DOMAssistant.DOMReady=DOMAssistant.DOMLoad.DOMReady;