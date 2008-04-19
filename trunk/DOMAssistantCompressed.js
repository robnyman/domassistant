// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.domassistant.com/documentation, version 2.7.1
var DOMAssistant=function(){var A=function(){};var D=/*@cc_on!@*/false;var C=[];var B={accesskey:"accessKey","class":"className",colspan:"colSpan","for":"htmlFor",maxlength:"maxLength",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",valign:"vAlign"};var E=function(I,H){for(var G=0,F=H.length;G<F;G++){I.push(H[G]);}return I;};if(D){E=function(I,H){if(H.slice){return I.concat(H);}for(var G=0,F=H.length;G<F;G++){I[I.length]=H[G];}return I;};}return{isIE:D,camel:B,allMethods:[],publicMethods:["cssSelect","elmsByClass","elmsByAttribute","elmsByTag"],initCore:function(){this.applyMethod.call(window,"$",this.$);this.applyMethod.call(window,"$$",this.$$);window.DOMAssistant=this;if(D){A=Array;}A.prototype=[];A.prototype.each=function(H){for(var G=0,F=this.length;G<F;G++){H.call(this[G]);}return this;};A.prototype.first=function(){return(typeof this[0]!=="undefined")?DOMAssistant.addMethodsToElm(this[0]):null;};A.prototype.end=function(){return this.previousSet;};this.attach(this);},addMethods:function(F,G){if(typeof this.allMethods[F]==="undefined"){this.allMethods[F]=G;this.addHTMLArrayPrototype(F,G);}},addMethodsToElm:function(G){for(var F in this.allMethods){if(typeof this.allMethods[F]!=="undefined"){this.applyMethod.call(G,F,this.allMethods[F]);}}return G;},applyMethod:function(G,F){if(typeof this[G]!=="function"){this[G]=F;}},attach:function(H){var F=H.publicMethods;if(typeof F==="undefined"){for(var J in H){if(J!=="init"&&typeof H[J]!=="undefined"){this.addMethods(J,H[J]);}}}else{if(F.constructor===Array){for(var G=0,I;(I=F[G]);G++){this.addMethods(I,H[I]);}}}if(typeof H.init==="function"){H.init();}},addHTMLArrayPrototype:function(F,G){A.prototype[F]=function(){var J=new A();J.previousSet=this;var K;for(var I=0,H=this.length;I<H;I++){K=G.apply(this[I],arguments);if(typeof K!=="undefined"&&K!==null&&K.constructor===Array){J=E(J,K);}else{J.push(K);}}return J;};},$:function(){var H=new A();if(document.getElementById){var F=arguments[0];if(typeof F==="string"){F=F.replace(/^[^#]*(#)/,"$1");if(/^#[\w\u00C0-\uFFFF\-\_]+$/.test(F)){var G=DOMAssistant.$$(F.substr(1),false);if(G){H.push(G);}}else{H=DOMAssistant.cssSelection.call(document,F);}}else{if(typeof F==="object"){H=(arguments.length===1)?DOMAssistant.$$(F):E(H,arguments);}}}return H;},$$:function(K,H){var J=(typeof K==="object")?K:document.getElementById(K);var I=H||true;if(typeof K==="string"&&J&&J.id!==K){J=null;for(var F=0,G;(G=document.all[F]);F++){if(G.id===K){J=G;break;}}}if(J&&I){DOMAssistant.addMethodsToElm(J);}return J;},cssSelection:function(H){var J=function(R){var S,Q=2,N=-1,M=-1;var P=/^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n([\+\-]\d+)?)|(\-(([1-9]\d*)?)n\+(\d+)))$/;var O=P.exec(R);if(!O){return null;}else{if(O[2]){S=(O[2]==="odd")?1:2;M=(S===1)?1:0;}else{if(O[3]){S=parseInt(O[3],10);Q=0;N=S;}else{if(O[4]){Q=O[6]?parseInt(O[6],10):1;S=O[7]?parseInt(O[7],10):0;while(S<1){S+=Q;}M=(S>Q)?(S-Q)%Q:((S===Q)?0:S);}else{if(O[8]){Q=O[10]?parseInt(O[10],10):1;S=N=parseInt(O[11],10);while(S>Q){S-=Q;}M=(N>Q)?(N-Q)%Q:((N===Q)?0:N);}}}}}return{start:S,add:Q,max:N,modVal:M};};if(document.evaluate){var I={xhtml:"http://www.w3.org/1999/xhtml"};var K=(document.documentElement.namespaceURI===I.xhtml)?"xhtml:":"";var G=function L(M){return I[M]||null;};DOMAssistant.cssSelection=function(g){var V=g.replace(/\s*(,)\s*/g,"$1").split(",");var T=new A();var n,N,p,d,R,S,W;var M=/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+)|(:\w+[\w\-]*))\))?)*)?(>|\+|~)?/;var o=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");function f(i,r,k,j){switch(k){case"^":return"starts-with(@"+r+", '"+j+"')";case"$":return"substring(@"+r+", (string-length(@"+r+") - "+(j.length-1)+"), "+j.length+") = '"+j+"'";case"*":return"contains(concat(' ', @"+r+", ' '), '"+j+"')";case"|":return"(@"+r+"='"+j+"' or starts-with(@"+r+", '"+j+"-'))";case"~":return"contains(concat(' ', @"+r+", ' '), ' "+j+" ')";default:return"@"+r+(j?"='"+j+"'":"");}}function m(j,r,k){j=(/\-child$/.test(r))?"*":j;var s="",u=r.split("-");switch(u[0]){case"first":s="not(preceding-sibling::"+j+")";break;case"last":s="not(following-sibling::"+j+")";break;case"only":s="not(preceding-sibling::"+j+" or following-sibling::"+j+")";break;case"nth":if(!/^n$/.test(k)){var i=((u[1]==="last")?"(count(following-sibling::":"(count(preceding-sibling::")+j+") + 1)";W=J(k);if(W){if(W.start===W.max){s=i+" = "+W.start;}else{s=i+" mod "+W.add+" = "+W.modVal+((W.start>1)?" and "+i+" >= "+W.start:"")+((W.max>0)?" and "+i+" <= "+W.max:"");}}}break;case"empty":s="count(child::*) = 0 and string-length(text()) = 0";break;case"contains":s="contains(., '"+k+"')";break;case"enabled":s="not(@disabled)";break;case"disabled":s="@disabled";break;case"checked":s="@checked='checked'";break;case"target":var v=document.location.hash.slice(1);s="@name='"+v+"' or @id='"+v+"'";break;case"not":if(/^(:\w+[\w\-]*)$/.test(k)){s="not("+m(j,k.slice(1))+")";}else{k=k.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/,"[id=$1]");var t=k.replace(/^(\w+)/,"self::$1");t=t.replace(/^\.([\w\u00C0-\uFFFF\-_]+)/g,"contains(concat(' ', @class, ' '), ' $1 ')");t=t.replace(/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/g,f);s="not("+t+")";}break;default:s="@"+r+"='"+k+"'";break;}return s;}for(var h=0;(n=V[h]);h++){if(h>0){N=false;for(var X=0,Y=h;X<Y;X++){if(V[h]===V[X]){N=true;break;}}if(N){continue;}}p=n.match(o);d=".";for(var e=0,l=p.length;e<l;e++){R=M.exec(p[e]);S={tag:K+((!R[1]||R[3]==="*")?"*":R[1]),id:(R[3]!=="*")?R[2]:null,allClasses:R[4],allAttr:R[6],allPseudos:R[10],tagRelation:R[22]};if(S.tagRelation){switch(S.tagRelation){case">":d+="/child::";break;case"+":d+="/following-sibling::*[1]/self::";break;case"~":d+="/following-sibling::";break;}}else{d+=(e>0&&/(>|\+|~)/.test(p[e-1]))?S.tag:("/descendant::"+S.tag);}if(S.id){d+="[@id = '"+S.id.replace(/^#/,"")+"']";}if(S.allClasses){d+=S.allClasses.replace(/\.([\w\u00C0-\uFFFF\-_]+)/g,"[contains(concat(' ', @class, ' '), ' $1 ')]");}if(S.allAttr){d+=S.allAttr.replace(/(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?/g,f);}if(S.allPseudos){var U=/:(\w[\w\-]*)(\(([^\)]+)\))?/;S.allPseudos=S.allPseudos.match(/(:\w+[\w\-]*)(\([^\)]+\))?/g);for(var c=0,P=S.allPseudos.length;c<P;c++){var Q=S.allPseudos[c].match(U);var q=Q[1]?Q[1].toLowerCase():null;var O=Q[3]?Q[3]:null;var Z=m(S.tag,q,O);if(Z.length){d+="["+Z+"]";}}}}var b=document.evaluate(d,this,G,0,null),a;while((a=b.iterateNext())){T.push(a);}}return T;};}else{DOMAssistant.cssSelection=function(M){var Ap=M.replace(/\s*(,)\s*/g,"$1").split(",");var Ah=new A();var AX=[],An=[];var Ay,Y,AF,U,h,Ab,O,Ax,AG,Ai,AH,N,AL,S,d,AY,As,AV,P,Ao;var Am=/^(>|\+|~)$/;var c=/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+)|(:\w+[\w\-]*))\))?)*)?/;var z;try{z=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");}catch(AN){z=/[^\s]+/g;}function Av(e){e=e||AX;for(var b=0,a=e.length;b<a;b++){e[b].added=null;}}function T(){for(var b=0,a=Ay.length;b<a;b++){Ay[b].childElms=null;}}function AT(e,a){for(var k=0,n;(n=e[k]);k++){var m=false;for(var b=0,l;(l=a[b]);b++){if(l===n){m=true;break;}}if(m){e.splice(k--,1);}}return e;}function V(b,a){return D?b[B[a.toLowerCase()]||a]:b.getAttribute(a,2);}function u(a,b){switch(b){case"^":return"^"+a;case"$":return a+"$";case"*":return a;case"|":return"(^"+a+"(\\-\\w+)*$)";case"~":return"\\b"+a+"\\b";default:return a?"^"+a+"$":null;}}function Aq(a,b){a=a||"*";b=b||document;if(b===document||b.lastModified){if(!C[a]){C[a]=D?((a==="*")?document.all:document.all.tags(a)):document.getElementsByTagName(a);}return C[a];}return D?((a==="*")?b.all:b.all.tags(a)):b.getElementsByTagName(a);}function AZ(A1,BQ,e){Ay=[];var Az=BQ.split("-"),A4=[],BP;var A0=(BP=/\-of\-type$/.test(BQ))?"nodeName":"nodeType";function BR(j){var i=BP?j.nodeName:1;while((j=j.previousSibling)&&j[A0]!==i){}return j;}function A3(j){var i=BP?j.nodeName:1;while((j=j.nextSibling)&&j[A0]!==i){}return j;}switch(Az[0]){case"first":for(var BL=0;(S=A1[BL]);BL++){if(!BR(S)){A4[A4.length]=S;}}break;case"last":for(var BK=0;(S=A1[BK]);BK++){if(!A3(S)){A4[A4.length]=S;}}break;case"only":for(var BI=0,A5;(S=A1[BI]);BI++){d=S.parentNode;if(d!==A5){if(!BR(S)&&!A3(S)){A4[A4.length]=S;}A5=d;}}break;case"nth":if(/^n$/.test(e)){A4=A1;}else{var BO=(Az[1]==="last")?["lastChild","previousSibling"]:["firstChild","nextSibling"];Ao=J(e);if(Ao){for(var BH=0;(S=A1[BH]);BH++){d=S.parentNode;if(!d.childElms){As=Ao.start;AV=0;P=d[BO[0]];while(P&&(Ao.max<0||As<=Ao.max)){if(BP){if(P.nodeName===S.nodeName){if(++AV===As){A4[A4.length]=P;As+=Ao.add;}}}else{if(P.nodeType===1){if(++AV===As){if(P.nodeName===S.nodeName){A4[A4.length]=P;}As+=Ao.add;}}}P=P[BO[1]];}d.childElms=true;Ay[Ay.length]=d;}}T();}}break;case"empty":for(var BG=0;(S=A1[BG]);BG++){if(!S.childNodes.length){A4[A4.length]=S;}}break;case"enabled":for(var BE=0;(S=A1[BE]);BE++){if(!S.disabled){A4[A4.length]=S;}}break;case"disabled":for(var BD=0;(S=A1[BD]);BD++){if(S.disabled){A4[A4.length]=S;}}break;case"checked":for(var BC=0;(S=A1[BC]);BC++){if(S.checked){A4[A4.length]=S;}}break;case"contains":for(var BB=0;(S=A1[BB]);BB++){if(!S.added){if(S.innerText.indexOf(e)!==-1){S.added=true;A4[A4.length]=S;}}}break;case"target":var b=document.location.hash.slice(1);if(b){for(var BA=0;(S=A1[BA]);BA++){if(V(S,"name")===b||V(S,"id")===b){A4[A4.length]=S;break;}}}break;case"not":if(/^(:\w+[\w\-]*)$/.test(e)){A4=AT(A1,AZ(A1,e.slice(1)));}else{e=e.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/,"[id=$1]");var A9=/^(\w+)/.exec(e);var A2=/^\.([\w\u00C0-\uFFFF\-_]+)/.exec(e);var A7=/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/.exec(e);var a=new RegExp("(^|\\s)"+(A9?A9[1]:A2?A2[1]:"")+"(\\s|$)","i");if(A7){var BJ=A7[3]?A7[3].replace(/\./g,"\\."):null;var BN=u(BJ,A7[2]);a=new RegExp(BN,"i");}for(var A8=0,BM;(BM=A1[A8]);A8++){AY=null;if(A9&&!a.test(BM.nodeName)){AY=BM;}else{if(A2&&!a.test(BM.className)){AY=BM;}else{if(A7){var BF=V(BM,A7[1]);if(!BF||!a.test(BF)){AY=BM;}}}}if(AY&&!AY.added){AY.added=true;A4[A4.length]=AY;}}}break;default:for(var A6=0;(S=A1[A6]);A6++){if(V(S,BQ)===e){A4[A4.length]=S;}}break;}return A4;}for(var AQ=0;(Y=Ap[AQ]);AQ++){if(AQ>0){AF=false;for(var AP=0,AR=AQ;AP<AR;AP++){if(Ap[AQ]===Ap[AP]){AF=true;break;}}if(AF){continue;}}U=Y.match(z);AX=[this];for(var AM=0,W;(W=U[AM]);AM++){An=[];if(AM>0&&Am.test(W)){h=Am.exec(W);if(h){Ab=/^\w+/.exec(U[AM+1]);if(Ab){Ab=Ab[0];O=new RegExp("(^|\\s)"+Ab+"(\\s|$)","i");}for(var AK=0,g;(g=AX[AK]);AK++){switch(h[0]){case">":var Aj=Aq(Ab,g);for(var AJ=0,Ae;(Ae=Aj[AJ]);AJ++){if(Ae.parentNode===g){An[An.length]=Ae;}}break;case"+":while((g=g.nextSibling)&&g.nodeType!==1){}if(g){if(!Ab||O.test(g.nodeName)){An[An.length]=g;}}break;case"~":while((g=g.nextSibling)&&!g.added){if(!Ab||O.test(g.nodeName)){g.added=true;An[An.length]=g;}}break;}}AX=An;Av();W=U[++AM];if(/^\w+$/.test(W)){continue;}AX.skipTag=true;}}var Aa=c.exec(W);var Al={tag:(!Aa[1]||Aa[3]==="*")?"*":Aa[1],id:(Aa[3]!=="*")?Aa[2]:null,allClasses:Aa[4],allAttr:Aa[6],allPseudos:Aa[10]};if(Al.id){var AS=document.getElementById(Al.id.replace(/#/,""));if(AS){An=[AS];}AX=An;}else{if(Al.tag&&!AX.skipTag){if(AM===0&&!An.length&&AX.length===1){AX=An=E([],Aq(Al.tag,AX[0]));}else{for(var AI=0,At=AX.length,Af,Ac;AI<At;AI++){Af=Aq(Al.tag,AX[AI]);for(var AE=0;(Ac=Af[AE]);AE++){if(!Ac.added){Ac.added=true;An[An.length]=Ac;}}}AX=An;Av();}}}if(!An.length){break;}AX.skipTag=false;if(Al.allClasses){Al.allClasses=Al.allClasses.replace(/^\./,"").split(".");Ax=[];for(var AD=0,AU=Al.allClasses.length;AD<AU;AD++){Ax[Ax.length]=new RegExp("(^|\\s)"+Al.allClasses[AD]+"(\\s|$)");}AG=[];for(var AC=0,Ad;(AL=AX[AC]);AC++){Ad=AL.className;if(Ad&&!AL.added){AY=false;for(var AB=0,X=Ax.length;AB<X;AB++){AY=Ax[AB].test(Ad);if(!AY){break;}}if(AY){AL.added=true;AG[AG.length]=AL;}}}Av();AX=An=AG;}if(Al.allAttr){Al.allAttr=Al.allAttr.match(/\[[^\]]+\]/g);Ai=[];N=/(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?/;for(var AA=0,R=Al.allAttr.length,y,Q,Au;AA<R;AA++){y=N.exec(Al.allAttr[AA]);Q=y[3]?y[3].replace(/\./g,"\\."):null;Au=u(Q,(y[2]||null));Ai[Ai.length]=[(Au?new RegExp(Au):null),y[1]];}AH=[];for(var x=0,AO;(AL=An[x]);x++){for(var w=0,Ak=Ai.length,Ag;w<Ak;w++){AY=false;Ag=Ai[w][0];AO=V(AL,Ai[w][1]);if(typeof AO==="string"&&AO.length){if(!Ag||typeof Ag==="undefined"||(Ag&&Ag.test(AO))){AY=true;}}if(!AY){break;}}if(AY){AH[AH.length]=AL;}}AX=An=AH;}if(Al.allPseudos){var Z=/:(\w[\w\-]*)(\(([^\)]+)\))?/;Al.allPseudos=Al.allPseudos.match(/(:\w+[\w\-]*)(\([^\)]+\))?/g);for(var v=0,AW=Al.allPseudos.length;v<AW;v++){var Aw=Al.allPseudos[v].match(Z);var f=Aw[1]?Aw[1].toLowerCase():null;var Ar=Aw[3]?Aw[3]:null;An=AZ(An,f,Ar);Av(An);}AX=An;}}Ah=E(Ah,AX);}return Ah;};}if(document.querySelectorAll){var F=DOMAssistant.cssSelection;DOMAssistant.cssSelection=function(M){try{var O=new A();return E(O,this.querySelectorAll(M));}catch(N){return F.call(this,M);}};}return DOMAssistant.cssSelection.call(this,H);},cssSelect:function(F){return DOMAssistant.cssSelection.call(this,F);},elmsByClass:function(H,F){var G=(F||"")+"."+H;return DOMAssistant.cssSelection.call(this,G);},elmsByAttribute:function(G,H,F,J){var I=(F||"")+"["+G+((H&&H!=="*")?((J||"")+"="+H+"]"):"]");return DOMAssistant.cssSelection.call(this,I);},elmsByTag:function(F){return DOMAssistant.cssSelection.call(this,F);}};}();DOMAssistant.initCore();DOMAssistant.AJAX=function(){var E=null;var A=0;var C=-1;var D="";var B=function(G,J,I,F){var H=null;if(/POST/i.test(J)){G=G.split("?");H=G[1];G=G[0];}return{url:G,method:J,callback:I,params:H,headers:{},responseType:"text",addToContent:F||false};};return{publicMethods:["ajax","get","post","load","replaceWithAJAXContent"],initRequest:function(){var G=null;if(typeof XMLHttpRequest!=="undefined"){G=new XMLHttpRequest();DOMAssistant.AJAX.initRequest=function(){return new XMLHttpRequest();};}else{if(typeof window.ActiveXObject!=="undefined"){var F=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(var H=0;H<F.length;H++){try{G=new window.ActiveXObject(F[H]);DOMAssistant.AJAX.initRequest=function(){return new window.ActiveXObject(F[H]);};break;}catch(I){G=null;}}}}return G;},ajax:function(F){if(F.url&&/\?/.test(F.url)&&F.method&&/POST/i.test(F.method)){var G=F.url.split("?");F.url=G[0];F.params=G[1]+((G[1].length>0&&F.params)?("&"+F.params):"");}return DOMAssistant.AJAX.makeCall.call(this,F);},get:function(H,I,G){var F=B(H,"GET",I,G);return DOMAssistant.AJAX.makeCall.call(this,F);},post:function(G,H){var F=B(G,"POST",H);return DOMAssistant.AJAX.makeCall.call(this,F);},load:function(G,F){DOMAssistant.AJAX.get.call(this,G,DOMAssistant.AJAX.replaceWithAJAXContent,F);},makeCall:function(F){var G=DOMAssistant.AJAX.initRequest();if(G){E=G;var H=function(Q){var K=F.url;var I=F.method||"GET";var R=F.callback;var M=F.params;var L=F.headers;var P=F.responseType||"text";var N=F.addToContent;G.open(I,K,true);G.setRequestHeader("AJAX","true");G.setRequestHeader("X-Requested-With","XMLHttpRequest");if(I==="POST"){var J=M?M.length:0;G.setRequestHeader("Content-type","application/x-www-form-urlencoded");G.setRequestHeader("Content-length",J);if(G.overrideMimeType){G.setRequestHeader("Connection","close");}}for(var O in L){if(typeof O==="string"){G.setRequestHeader(O,L[O]);}}if(typeof R==="function"){G.onreadystatechange=function(){if(G.readyState===4){var S=(/xml/i.test(P))?G.responseXML:G.responseText;R.call(Q,S,N);A=4;C=G.status;D=G.statusText;E=null;G=null;}};}G.send(M);}(this);}return this;},replaceWithAJAXContent:function(K,L){if(L){this.innerHTML+=K;}else{var J=this.elmsByTag("*");for(var I=0,M,F;(M=J[I]);I++){F=M.attributes;if(F){for(var G=0,H=F.length;G<H;G++){if(typeof M[F[G].name]==="function"){M[F[G].name]=null;}}}}this.innerHTML=K;}},getReadyState:function(){return(E&&typeof E.readyState!=="undefined")?E.readyState:A;},getStatus:function(){return C;},getStatusText:function(){return D;}};}();DOMAssistant.attach(DOMAssistant.AJAX);DOMAssistant.CSS=function(){return{addClass:function(B){var A=this.className;if(!new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i").test(A)){this.className=A+(A.length?" ":"")+B;}return this;},removeClass:function(B){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(C){var D="";if(new RegExp("^\\s+.*\\s+$").test(C)){D=C.replace(/(\s+).+/,"$1");}return D;}).replace(/^\s+|\s+$/g,"");return this;},replaceClass:function(B,C){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(D,G,F){var E=G+C+F;if(new RegExp("^\\s+.*\\s+$").test(D)){E=D.replace(/(\s+).+/,"$1");}return E;}).replace(/^\s+|\s+$/g,"");return this;},hasClass:function(A){return new RegExp(("(^|\\s)"+A+"(\\s|$)"),"i").test(this.className);},setStyle:function(C,D){if(typeof this.style.cssText!=="undefined"){var A=this.style.cssText;if(typeof C==="object"){for(var B in C){if(typeof B==="string"){A+=";"+B+":"+C[B];}}}else{A+=";"+C+":"+D;}this.style.cssText=A;}return this;},getStyle:function(B){var A="";if(document.defaultView&&document.defaultView.getComputedStyle){A=document.defaultView.getComputedStyle(this,"").getPropertyValue(B);}else{if(this.currentStyle){A=B.replace(/\-(\w)/g,function(C,D){return D.toUpperCase();});A=this.currentStyle[A];}}return A;}};}();DOMAssistant.attach(DOMAssistant.CSS);DOMAssistant.Content=function(){return{prev:function(){var A=this;while((A=A.previousSibling)&&A.nodeType!==1){}return DOMAssistant.$(A);},next:function(){var A=this;while((A=A.nextSibling)&&A.nodeType!==1){}return DOMAssistant.$(A);},create:function(C,B,A,D){var E=DOMAssistant.$(document.createElement(C));if(B){E=E.setAttributes(B);}if(typeof D!=="undefined"){E.addContent(D);}if(A){DOMAssistant.Content.addContent.call(this,E);}return E;},setAttributes:function(A){if(DOMAssistant.isIE){var B=function(F,D,E){var C=D.toLowerCase();switch(C){case"name":case"type":return document.createElement(F.outerHTML.replace(new RegExp(C+"=[a-zA-Z]+")," ").replace(">"," "+C+"="+E+">"));case"style":F.style.cssText=E;return F;default:F[DOMAssistant.camel[C]||D]=E;return F;}};DOMAssistant.Content.setAttributes=function(C){var G=this;var F=this.parentNode;for(var E in C){if(typeof C[E]==="string"){var D=B(G,E,C[E]);if(F&&/(name|type)/i.test(E)){if(G.innerHTML){D.innerHTML=G.innerHTML;}F.replaceChild(D,G);}G=D;}}return DOMAssistant.$(G);};}else{DOMAssistant.Content.setAttributes=function(C){for(var D in C){if(/class/i.test(D)){this.className=C[D];}else{this.setAttribute(D,C[D]);}}return this;};}return DOMAssistant.Content.setAttributes.call(this,A);},addContent:function(A){if(typeof A==="string"||typeof A==="number"){this.innerHTML+=A;}else{if(typeof A==="object"&&A){this.appendChild(A);}}return this;},replaceContent:function(B){for(var E=(this.childNodes.length-1),F,A;E>=0;E--){F=this.childNodes[E];A=F.attributes;if(A){for(var C=0,D=A.length;C<D;C++){if(typeof F[A[C].name]==="function"){F[A[C].name]=null;}}}F.parentNode.removeChild(F);}DOMAssistant.$(this).addContent(B);return this;},remove:function(){this.parentNode.removeChild(this);return null;}};}();DOMAssistant.attach(DOMAssistant.Content);DOMAssistant.Events=function(){var A=1;return{publicMethods:["addEvent","removeEvent","preventDefault","cancelBubble"],init:function(){window.addEvent=this.addEvent;window.removeEvent=this.removeEvent;DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble;},addEvent:function(C,E){var B=(/^DOM/.test(C));if(B){if(this.addEventListener){this.addEventListener(C,E,false);}}else{if(!this.uniqueHandlerId){this.uniqueHandlerId=A++;}var F=false;if(E.attachedElements&&E.attachedElements[C+this.uniqueHandlerId]){F=true;}if(!F){if(!this.events){this.events={};}if(!this.events[C]){this.events[C]=[];var D=this["on"+C];if(D){this.events[C].push(D);}}this.events[C].push(E);this["on"+C]=DOMAssistant.Events.handleEvent;if(typeof this.window==="object"){this.window["on"+C]=DOMAssistant.Events.handleEvent;}if(!E.attachedElements){E.attachedElements={};}E.attachedElements[C+this.uniqueHandlerId]=true;}}return this;},handleEvent:function(B){var H=B||event;var I=H.target||H.srcElement||document;while(I.nodeType!==1&&I.parentNode){I=I.parentNode;}H.eventTarget=I;var F=H.type;var C=this.events[F];var G=C.length;var E;for(var D=0;D<G;D++){E=C[D].call(this,H);if(D===(G-1)){return E;}}},removeEvent:function(B,E){if(this.events){var C=this.events[B];for(var D=0;D<C.length;D++){if(C[D]===E){delete C[D];C.splice(D,1);}}E.attachedElements[B+this.uniqueHandlerId]=null;}return this;},preventDefault:function(B){if(B&&B.preventDefault){DOMAssistant.Events.preventDefault=function(C){C.preventDefault();};}else{DOMAssistant.Events.preventDefault=function(C){event.returnValue=false;};}return DOMAssistant.Events.preventDefault(B);},cancelBubble:function(B){if(B&&B.stopPropagation){DOMAssistant.Events.cancelBubble=function(C){C.stopPropagation();};}else{DOMAssistant.Events.cancelBubble=function(C){event.cancelBubble=true;};}return DOMAssistant.Events.cancelBubble(B);}};}();DOMAssistant.attach(DOMAssistant.Events);DOMAssistant.DOMLoad=function(){var DOMLoaded=false;var DOMLoadTimer=null;var functionsToCall=[];var addedStrings={};var errorHandling=null;var execFunctions=function(){for(var i=0,il=functionsToCall.length;i<il;i++){try{functionsToCall[i]();}catch(e){if(errorHandling&&typeof errorHandling==="function"){errorHandling(e);}}}functionsToCall=[];};var DOMHasLoaded=function(){if(DOMLoaded){return ;}DOMLoaded=true;execFunctions();};
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