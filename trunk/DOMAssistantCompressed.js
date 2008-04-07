// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.domassistant.com/documentation, version 2.7
var DOMAssistant=function(){var A=function(){};var C=/*@cc_on!@*/false;var B=[];var D=function(H,G){for(var F=0,E=G.length;F<E;F++){H.push(G[F]);}return H;};if(C){D=function(H,G){if(G.slice){return H.concat(G);}for(var F=0,E=G.length;F<E;F++){H[H.length]=G[F];}return H;};}return{allMethods:[],publicMethods:["cssSelect","elmsByClass","elmsByAttribute","elmsByTag"],initCore:function(){this.applyMethod.call(window,"$",this.$);this.applyMethod.call(window,"$$",this.$$);window.DOMAssistant=this;if(C){A=Array;}A.prototype=[];A.prototype.each=function(G){for(var F=0,E=this.length;F<E;F++){G.call(this[F]);}return this;};A.prototype.first=function(){return(typeof this[0]!=="undefined")?DOMAssistant.addMethodsToElm(this[0]):null;};A.prototype.end=function(){return this.previousSet;};this.attach(this);},addMethods:function(E,F){if(typeof this.allMethods[E]==="undefined"){this.allMethods[E]=F;this.addHTMLArrayPrototype(E,F);}},addMethodsToElm:function(F){for(var E in this.allMethods){if(typeof this.allMethods[E]!=="undefined"){this.applyMethod.call(F,E,this.allMethods[E]);}}return F;},applyMethod:function(F,E){if(typeof this[F]!=="function"){this[F]=E;}},attach:function(G){var E=G.publicMethods;if(typeof E==="undefined"){for(var I in G){if(I!=="init"&&typeof G[I]!=="undefined"){this.addMethods(I,G[I]);}}}else{if(E.constructor===Array){for(var F=0,H;(H=E[F]);F++){this.addMethods(H,G[H]);}}}if(typeof G.init==="function"){G.init();}},addHTMLArrayPrototype:function(E,F){A.prototype[E]=function(){var I=new A();I.previousSet=this;var J;for(var H=0,G=this.length;H<G;H++){J=F.apply(this[H],arguments);if(typeof J!=="undefined"&&J!==null&&J.constructor===Array){I=D(I,J);}else{I.push(J);}}return I;};},getSequence:function(J){var K,I=2,F=-1,E=-1;var H=/^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n((\+|\-)(\d+))?)|(\-(([1-9]\d*)?)n\+(\d+)))$/;var G=H.exec(J);if(!G){return null;}else{if(G[2]){K=(G[2]==="odd")?1:2;E=(K===1)?1:0;}else{if(G[3]){K=parseInt(G[3],10);I=0;F=K;}else{if(G[4]){I=G[6]?parseInt(G[6],10):1;K=G[7]?parseInt(G[8]+G[9],10):0;while(K<1){K+=I;}E=(K>I)?(K-I)%I:((K===I)?0:K);}else{if(G[10]){I=G[12]?parseInt(G[12],10):1;K=F=parseInt(G[13],10);while(K>I){K-=I;}E=(F>I)?(F-I)%I:((F===I)?0:F);}}}}}return{start:K,add:I,max:F,modVal:E};},$:function(){var G=new A();if(document.getElementById){var E=arguments[0];if(typeof E==="string"){E=E.replace(/^[^#]*(#)/,"$1");if(/^#[\w\u00C0-\uFFFF\-\_]+$/.test(E)){var F=DOMAssistant.$$(E.substr(1),false);if(F){G.push(F);}}else{G=DOMAssistant.cssSelection.call(document,E);}}else{if(typeof E==="object"){G=(arguments.length===1)?DOMAssistant.$$(E):D(G,arguments);}}}return G;},$$:function(J,G){var I=(typeof J==="object")?J:document.getElementById(J);var H=G||true;if(typeof J==="string"&&I&&I.id!==J){I=null;for(var E=0,F;(F=document.all[E]);E++){if(F.id===J){I=F;break;}}}if(I&&H){DOMAssistant.addMethodsToElm(I);}return I;},cssSelection:function(F){if(document.evaluate){DOMAssistant.cssSelection=function(a){var Q=a.replace(/\s*(,)\s*/g,"$1").split(",");var O=new A();var d,I,f,X,M,N,R;var G=/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+))\))?)*)?(>|\+|~)?/;var e=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");function Z(h,k,j,i){switch(j){case"^":return"starts-with(@"+k+", '"+i+"')";case"$":return"substring(@"+k+", (string-length(@"+k+") - "+(i.length-1)+"), "+i.length+") = '"+i+"'";case"*":return"contains(concat(' ', @"+k+", ' '), '"+i+"')";case"|":return"(@"+k+"='"+i+"' or starts-with(@"+k+", '"+i+"-'))";case"~":return"contains(concat(' ', @"+k+", ' '), ' "+i+" ')";default:return"@"+k+(i?"='"+i+"'":"");}}for(var b=0;(d=Q[b]);b++){if(b>0){I=false;for(var S=0,T=b;S<T;S++){if(Q[b]===Q[S]){I=true;break;}}if(I){continue;}}f=d.match(e);X=".";for(var Y=0,c=f.length;Y<c;Y++){M=G.exec(f[Y]);N={tag:(!M[1]||M[3]==="*")?"*":M[1],id:(M[3]!=="*")?M[2]:null,allClasses:M[4],allAttr:M[6],allPseudos:M[10],tagRelation:M[21]};if(N.tagRelation){switch(N.tagRelation){case">":X+="/child::";break;case"+":X+="/following-sibling::*[1]/self::";break;case"~":X+="/following-sibling::";break;}}else{X+=(Y>0&&/(>|\+|~)/.test(f[Y-1]))?N.tag:("/descendant::"+N.tag);}if(N.id){X+="[@id = '"+N.id.replace(/^#/,"")+"']";}if(N.allClasses){X+=N.allClasses.replace(/\.([\w\u00C0-\uFFFF\-_]+)/g,"[contains(concat(' ', @class, ' '), ' $1 ')]");}if(N.allAttr){X+=N.allAttr.replace(/(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?/g,Z);}if(N.allPseudos){var P=/:(\w[\w\-]*)(\(([^\)]+)\))?/;N.allPseudos=N.allPseudos.match(/(:\w+[\w\-]*)(\([^\)]+\))?/g);for(var W=0,K=N.allPseudos.length;W<K;W++){var L=N.allPseudos[W].match(P);var g=L[1]?L[1].toLowerCase():null;var J=L[3]?L[3]:null;switch(g){case"first-child":X+="[not(preceding-sibling::*)]";break;case"first-of-type":X+="[not(preceding-sibling::"+N.tag+")]";break;case"last-child":X+="[not(following-sibling::*)]";break;case"last-of-type":X+="[not(following-sibling::"+N.tag+")]";break;case"only-child":X+="[not(preceding-sibling::* or following-sibling::*)]";break;case"only-of-type":X+="[not(preceding-sibling::"+N.tag+" or following-sibling::"+N.tag+")]";break;case"nth-child":if(!/^n$/.test(J)){R=DOMAssistant.getSequence(J);if(R){if(R.start===R.max){X+="[count(preceding-sibling::*) = "+(R.start-1)+"]";}else{X+="[(count(preceding-sibling::*) + 1) mod "+R.add+" = "+R.modVal+((R.start>1)?" and count(preceding-sibling::*) >= "+(R.start-1):"")+((R.max>0)?" and count(preceding-sibling::*) <= "+(R.max-1):"")+"]";}}}break;case"nth-of-type":if(!/^n$/.test(J)){R=DOMAssistant.getSequence(J);if(R){if(R.start===R.max){X+="["+J+"]";}else{X+="[position() mod "+R.add+" = "+R.modVal+((R.start>1)?" and position() >= "+R.start:"")+((R.max>0)?" and position() <= "+R.max:"")+"]";}}}break;case"empty":X+="[count(child::*) = 0 and string-length(text()) = 0]";break;case"contains":X+="[contains(., '"+J+"')]";break;case"enabled":X+="[not(@disabled)]";break;case"disabled":X+="[@disabled]";break;case"checked":X+="[@checked='checked']";break;case"not":J=J.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/,"[id=$1]");var H=J.replace(/^(\w+)/,"self::$1");H=H.replace(/^\.([\w\u00C0-\uFFFF\-_]+)/g,"contains(concat(' ', @class, ' '), ' $1 ')");H=H.replace(/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/g,Z);X+="[not("+H+")]";break;default:X+="[@"+g+"='"+J+"']";break;}}}}var V=document.evaluate(X,this,null,0,null),U;while((U=V.iterateNext())){O.push(U);}}return O;};}else{DOMAssistant.cssSelection=function(G){var BF=G.replace(/\s*(,)\s*/g,"$1").split(",");var A4=new A();var Aq=[],BD=[];var BR,Y,AT,T,AG,At,J,BQ,AU,A5,AV,I,Aa,P,d,Ar,A3,W,Aw,BK,Ao,K,BE;var BB=/^(>|\+|~)$/;var c=/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+))\))?)*)?/;var AN;try{AN=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");}catch(Ae){AN=/[^\s]+/g;}function BN(e){e=e||Aq;for(var b=0,a=e.length;b<a;b++){e[b].added=null;}}function S(){for(var b=0,a=BR.length;b<a;b++){BR[b].childElms=null;}}function U(b,a){if(C){switch(a){case"id":return b.id;case"for":return b.htmlFor;case"class":return b.className;}}return b.getAttribute(a,2);}function AI(a,b){switch(b){case"^":return"^"+a;case"$":return a+"$";case"*":return a;case"|":return"(^"+a+"(\\-\\w+)*$)";case"~":return"\\b"+a+"\\b";default:return a?"^"+a+"$":null;}}function BH(a,b){a=a||"*";b=b||document;if(b===document||b.lastModified){if(!B[a]){B[a]=C?((a==="*")?document.all:document.all.tags(a)):document.getElementsByTagName(a);}return B[a];}return C?((a==="*")?b.all:b.all.tags(a)):b.getElementsByTagName(a);}for(var Ah=0;(Y=BF[Ah]);Ah++){if(Ah>0){AT=false;for(var Ag=0,Ak=Ah;Ag<Ak;Ag++){if(BF[Ah]===BF[Ag]){AT=true;break;}}if(AT){continue;}}T=Y.match(AN);Aq=[this];for(var Ab=0,V;(V=T[Ab]);Ab++){BD=[];if(Ab>0&&BB.test(V)){AG=BB.exec(V);if(AG){At=/^\w+/.exec(T[Ab+1]);if(At){At=At[0];J=new RegExp("(^|\\s)"+At+"(\\s|$)","i");}for(var AZ=0,AF;(AF=Aq[AZ]);AZ++){switch(AG[0]){case">":var A7=BH(At,AF);for(var AX=0,A0;(A0=A7[AX]);AX++){if(A0.parentNode===AF){BD[BD.length]=A0;}}break;case"+":while((AF=AF.nextSibling)&&AF.nodeType!==1){}if(AF){if(!At||J.test(AF.nodeName)){BD[BD.length]=AF;}}break;case"~":while((AF=AF.nextSibling)&&!AF.added){if(!At||J.test(AF.nodeName)){AF.added=true;BD[BD.length]=AF;}}break;}}Aq=BD;BN();V=T[++Ab];if(/^\w+$/.test(V)){continue;}Aq.skipTag=true;}}var As=c.exec(V);var BA={tag:(!As[1]||As[3]==="*")?"*":As[1],id:(As[3]!=="*")?As[2]:null,allClasses:As[4],allAttr:As[6],allPseudos:As[10]};if(BA.id){var Am=document.getElementById(BA.id.replace(/#/,""));if(Am){BD=[Am];}Aq=BD;}else{if(BA.tag&&!Aq.skipTag){if(Ab===0&&!BD.length&&Aq.length===1){Aq=BD=D([],BH(BA.tag,Aq[0]));}else{for(var AW=0,BL=Aq.length,A1,Ax;AW<BL;AW++){A1=BH(BA.tag,Aq[AW]);for(var AS=0;(Ax=A1[AS]);AS++){if(!Ax.added){Ax.added=true;BD[BD.length]=Ax;}}}Aq=BD;BN();}}}if(!BD.length){break;}Aq.skipTag=false;if(BA.allClasses){BA.allClasses=BA.allClasses.replace(/^\./,"").split(".");BQ=[];for(var AR=0,An=BA.allClasses.length;AR<An;AR++){BQ[BQ.length]=new RegExp("(^|\\s)"+BA.allClasses[AR]+"(\\s|$)");}AU=[];for(var AQ=0,Az;(Aa=Aq[AQ]);AQ++){Az=Aa.className;if(Az&&!Aa.added){Ar=false;for(var AP=0,X=BQ.length;AP<X;AP++){Ar=BQ[AP].test(Az);if(!Ar){break;}}if(Ar){Aa.added=true;AU[AU.length]=Aa;}}}BN();Aq=BD=AU;}if(BA.allAttr){BA.allAttr=BA.allAttr.match(/\[[^\]]+\]/g);A5=[];I=/(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?/;for(var AO=0,O=BA.allAttr.length,AM,L,BM;AO<O;AO++){AM=I.exec(BA.allAttr[AO]);L=AM[3]?AM[3].replace(/\./g,"\\."):null;BM=AI(L,(AM[2]||null));A5[A5.length]=[(BM?new RegExp(BM):null),AM[1]];}AV=[];for(var AL=0,Af;(Aa=BD[AL]);AL++){for(var AK=0,A8=A5.length,A2;AK<A8;AK++){Ar=false;A2=A5[AK][0];Af=U(Aa,A5[AK][1]);if(typeof Af==="string"&&Af.length){if(!A2||typeof A2==="undefined"||(A2&&A2.test(Af))){Ar=true;}}if(!Ar){break;}}if(Ar){AV[AV.length]=Aa;}}Aq=BD=AV;}if(BA.allPseudos){var Z=/:(\w[\w\-]*)(\(([^\)]+)\))?/;BA.allPseudos=BA.allPseudos.match(/(:\w+[\w\-]*)(\([^\)]+\))?/g);for(var AJ=0,Ap=BA.allPseudos.length;AJ<Ap;AJ++){var BP=BA.allPseudos[AJ].match(Z);var f=BP[1]?BP[1].toLowerCase():null;var BI=BP[3]?BP[3]:null;var A6=BD;BD=[];BR=[];if(f==="not"){BI=BI.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/,"[id=$1]");var g=/^(\w+)/.exec(BI);var Al=/^\.([\w\u00C0-\uFFFF\-_]+)/.exec(BI);var Ai=/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/.exec(BI);var BJ=new RegExp("(^|\\s)"+(g?g[1]:Al?Al[1]:"")+"(\\s|$)","i");if(Ai){var BG=Ai[3]?Ai[3].replace(/\./g,"\\."):null;var BC=AI(BG,Ai[2]);BJ=new RegExp(BC,"i");}for(var AH=0,H;(H=A6[AH]);AH++){Ar=null;if(g&&!BJ.test(H.nodeName)){Ar=H;}else{if(Al&&!BJ.test(H.className)){Ar=H;}else{if(Ai){var Aj=U(H,Ai[1]);if(!Aj||!BJ.test(Aj)){Ar=H;}}}}if(Ar&&!Ar.added){Ar.added=true;BD[BD.length]=Ar;}}}else{switch(f){case"first-child":for(var AE=0,Q;(Q=P=A6[AE]);AE++){while((Q=Q.previousSibling)&&Q.nodeType!==1){}if(!Q){BD[BD.length]=P;}}break;case"last-child":for(var AD=0,Ad;(Ad=P=A6[AD]);AD++){while((Ad=Ad.nextSibling)&&Ad.nodeType!==1){}if(!Ad){BD[BD.length]=P;}}break;case"only-child":for(var AC=0,R;(P=A6[AC]);AC++){d=P.parentNode;if(d!==R){A3=d.firstChild;W=d.lastChild;while(A3.nodeType!==1&&(A3=A3.nextSibling)){}while(W.nodeType!==1&&(W=W.previousSibling)){}if(A3===P&&W===P){BD[BD.length]=P;}R=d;}}break;case"nth-child":if(/^n$/.test(BI)){BD=A6;}else{BE=DOMAssistant.getSequence(BI);if(BE){for(var AA=0;(P=A6[AA]);AA++){d=P.parentNode;if(!d.childElms){BK=BE.start;Ao=0;K=d.firstChild;while(K&&(BE.max<0||BK<=BE.max)){if(K.nodeType===1){if(++Ao===BK){if(K.nodeName===P.nodeName){BD[BD.length]=K;}BK+=BE.add;}}K=K.nextSibling;}d.childElms=true;BR[BR.length]=d;}}S();}}break;case"first-of-type":for(var h=0;(P=A6[h]);h++){A3=P.parentNode.getElementsByTagName(P.nodeName)[0];if(A3===P){BD[BD.length]=P;}}break;case"last-of-type":for(var Av=0;(P=A6[Av]);Av++){W=P.parentNode.lastChild;while(W.nodeName!==P.nodeName&&(W=W.previousSibling)){}if(W===P){BD[BD.length]=P;}}break;case"only-of-type":for(var Ac=0,A9;(P=A6[Ac]);Ac++){d=P.parentNode;if(d!==A9){A3=d.getElementsByTagName(P.nodeName)[0];W=d.lastChild;while(W.nodeName!==P.nodeName&&(W=W.previousSibling)){}if(A3===P&&W===P){BD[BD.length]=P;}A9=d;}}break;case"nth-of-type":if(/^n$/.test(BI)){BD=A6;}else{BE=DOMAssistant.getSequence(BI);if(BE){for(var AB=0;(P=A6[AB]);AB++){d=P.parentNode;if(!d.childElms){BK=BE.start;Ao=0;K=d.firstChild;while(K&&(BE.max<0||BK<=BE.max)){if(K.nodeName===P.nodeName){if(++Ao===BK){BD[BD.length]=K;BK+=BE.add;}}K=K.nextSibling;}d.childElms=true;BR[BR.length]=d;}}S();}}break;case"empty":for(var BO=0;(P=A6[BO]);BO++){Aw=P.parentNode.childNodes;if(!Aw.length){BD[BD.length]=P;}}break;case"enabled":for(var Ay=0;(P=A6[Ay]);Ay++){if(!P.disabled){BD[BD.length]=P;}}break;case"disabled":for(var N=0;(P=A6[N]);N++){if(P.disabled){BD[BD.length]=P;}}break;case"checked":for(var AY=0;(P=A6[AY]);AY++){if(P.checked){BD[BD.length]=P;}}break;case"contains":for(var Au=0;(P=A6[Au]);Au++){if(!P.added){if(P.innerText.indexOf(BI)!==-1){P.added=true;BD[BD.length]=P;}}}break;default:for(var M=0;(P=A6[M]);M++){if(P.getAttribute(f,2)===BI){BD[BD.length]=P;}}break;}}BN(BD);}Aq=BD;}}A4=D(A4,Aq);}return A4;};}if(document.querySelectorAll){var E=DOMAssistant.cssSelection;DOMAssistant.cssSelection=function(G){try{var I=new A();return D(I,this.querySelectorAll(G));}catch(H){return E.call(this,G);}};}return DOMAssistant.cssSelection.call(this,F);},cssSelect:function(E){return DOMAssistant.cssSelection.call(this,E);},elmsByClass:function(G,E){var F=(E||"")+"."+G;return DOMAssistant.cssSelection.call(this,F);},elmsByAttribute:function(F,G,E,I){var H=(E||"")+"["+F+((G&&G!=="*")?((I||"")+"="+G+"]"):"]");return DOMAssistant.cssSelection.call(this,H);},elmsByTag:function(E){return DOMAssistant.cssSelection.call(this,E);}};}();DOMAssistant.initCore();DOMAssistant.AJAX=function(){var E=null;var A=0;var C=-1;var D="";var B=function(G,J,I,F){var H=null;if(/POST/i.test(J)){G=G.split("?");H=G[1];G=G[0];}return{url:G,method:J,callback:I,params:H,headers:{},responseType:"text",addToContent:F||false};};return{publicMethods:["ajax","get","post","load","replaceWithAJAXContent"],initRequest:function(){var G=null;if(typeof XMLHttpRequest!=="undefined"){G=new XMLHttpRequest();DOMAssistant.AJAX.initRequest=function(){return new XMLHttpRequest();};}else{if(typeof window.ActiveXObject!=="undefined"){var F=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(var H=0;H<F.length;H++){try{G=new window.ActiveXObject(F[H]);DOMAssistant.AJAX.initRequest=function(){return new window.ActiveXObject(F[H]);};break;}catch(I){G=null;}}}}return G;},ajax:function(F){if(F.url&&/\?/.test(F.url)&&F.method&&/POST/i.test(F.method)){var G=F.url.split("?");F.url=G[0];F.params=G[1]+((G[1].length>0&&F.params)?("&"+F.params):"");}return DOMAssistant.AJAX.makeCall.call(this,F);},get:function(H,I,G){var F=B(H,"GET",I,G);return DOMAssistant.AJAX.makeCall.call(this,F);},post:function(G,H){var F=B(G,"POST",H);return DOMAssistant.AJAX.makeCall.call(this,F);},load:function(G,F){DOMAssistant.AJAX.get.call(this,G,DOMAssistant.AJAX.replaceWithAJAXContent,F);},makeCall:function(F){var G=DOMAssistant.AJAX.initRequest();if(G){E=G;var H=function(Q){var K=F.url;var I=F.method||"GET";var R=F.callback;var M=F.params;var L=F.headers;var P=F.responseType||"text";var N=F.addToContent;G.open(I,K,true);G.setRequestHeader("AJAX","true");G.setRequestHeader("X-Requested-With","XMLHttpRequest");if(I==="POST"){var J=M?M.length:0;G.setRequestHeader("Content-type","application/x-www-form-urlencoded");G.setRequestHeader("Content-length",J);if(G.overrideMimeType){G.setRequestHeader("Connection","close");}}for(var O in L){if(typeof O==="string"){G.setRequestHeader(O,L[O]);}}if(typeof R==="function"){G.onreadystatechange=function(){if(G.readyState===4){var S=(/xml/i.test(P))?G.responseXML:G.responseText;R.call(Q,S,N);A=4;C=G.status;D=G.statusText;E=null;G=null;}};}G.send(M);}(this);}return this;},replaceWithAJAXContent:function(K,L){if(L){this.innerHTML+=K;}else{var J=this.elmsByTag("*");for(var I=0,M,F;(M=J[I]);I++){F=M.attributes;if(F){for(var G=0,H=F.length;G<H;G++){if(typeof M[F[G].name]==="function"){M[F[G].name]=null;}}}}this.innerHTML=K;}},getReadyState:function(){return(E&&typeof E.readyState!=="undefined")?E.readyState:A;},getStatus:function(){return C;},getStatusText:function(){return D;}};}();DOMAssistant.attach(DOMAssistant.AJAX);DOMAssistant.CSS=function(){return{addClass:function(B){var A=this.className;if(!new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i").test(A)){this.className=A+(A.length?" ":"")+B;}return this;},removeClass:function(B){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(C){var D="";if(new RegExp("^\\s+.*\\s+$").test(C)){D=C.replace(/(\s+).+/,"$1");}return D;}).replace(/^\s+|\s+$/g,"");return this;},replaceClass:function(B,C){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(D,G,F){var E=G+C+F;if(new RegExp("^\\s+.*\\s+$").test(D)){E=D.replace(/(\s+).+/,"$1");}return E;}).replace(/^\s+|\s+$/g,"");return this;},hasClass:function(A){return new RegExp(("(^|\\s)"+A+"(\\s|$)"),"i").test(this.className);},setStyle:function(C,D){if(typeof this.style.cssText!=="undefined"){var A=this.style.cssText;if(typeof C==="object"){for(var B in C){if(typeof B==="string"){A+=";"+B+":"+C[B];}}}else{A+=";"+C+":"+D;}this.style.cssText=A;}return this;},getStyle:function(B){var A="";if(document.defaultView&&document.defaultView.getComputedStyle){A=document.defaultView.getComputedStyle(this,"").getPropertyValue(B);}else{if(this.currentStyle){A=B.replace(/\-(\w)/g,function(C,D){return D.toUpperCase();});A=this.currentStyle[A];}}return A;}};}();DOMAssistant.attach(DOMAssistant.CSS);DOMAssistant.Content=function(){return{prev:function(){var A=this;while((A=A.previousSibling)&&A.nodeType!==1){}return DOMAssistant.$(A);},next:function(){var A=this;while((A=A.nextSibling)&&A.nodeType!==1){}return DOMAssistant.$(A);},create:function(C,B,A,D){var E=DOMAssistant.$(document.createElement(C));if(B){E.setAttributes(B);}if(typeof D!=="undefined"){E.addContent(D);}if(A){DOMAssistant.Content.addContent.call(this,E);}return E;},setAttributes:function(A){for(var B in A){if(/class/i.test(B)){this.className=A[B];}else{this.setAttribute(B,A[B]);}}return this;},addContent:function(A){if(typeof A==="string"){this.innerHTML+=A;}else{if(typeof A==="object"&&A){this.appendChild(A);}}return this;},replaceContent:function(B){for(var E=(this.childNodes.length-1),F,A;E>=0;E--){F=this.childNodes[E];A=F.attributes;if(A){for(var C=0,D=A.length;C<D;C++){if(typeof F[A[C].name]==="function"){F[A[C].name]=null;}}}F.parentNode.removeChild(F);}DOMAssistant.$(this).addContent(B);return this;},remove:function(){this.parentNode.removeChild(this);return null;}};}();DOMAssistant.attach(DOMAssistant.Content);DOMAssistant.Events=function(){var A=1;return{publicMethods:["addEvent","removeEvent","preventDefault","cancelBubble"],init:function(){window.addEvent=this.addEvent;window.removeEvent=this.removeEvent;DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble;},addEvent:function(C,E){var B=(/^DOM/.test(C));if(B){if(this.addEventListener){this.addEventListener(C,E,false);}}else{if(!this.uniqueHandlerId){this.uniqueHandlerId=A++;}var F=false;if(E.attachedElements&&E.attachedElements[C+this.uniqueHandlerId]){F=true;}if(!F){if(!this.events){this.events={};}if(!this.events[C]){this.events[C]=[];var D=this["on"+C];if(D){this.events[C].push(D);}}this.events[C].push(E);this["on"+C]=DOMAssistant.Events.handleEvent;if(typeof this.window==="object"){this.window["on"+C]=DOMAssistant.Events.handleEvent;}if(!E.attachedElements){E.attachedElements={};}E.attachedElements[C+this.uniqueHandlerId]=true;}}return this;},handleEvent:function(B){var H=B||event;var I=H.target||H.srcElement||document;while(I.nodeType!==1&&I.parentNode){I=I.parentNode;}H.eventTarget=I;var F=H.type;var C=this.events[F];var G=C.length;var E;for(var D=0;D<G;D++){E=C[D].call(this,H);if(D===(G-1)){return E;}}},removeEvent:function(B,E){if(this.events){var C=this.events[B];for(var D=0;D<C.length;D++){if(C[D]===E){delete C[D];C.splice(D,1);}}E.attachedElements[B+this.uniqueHandlerId]=null;}return this;},preventDefault:function(B){if(B&&B.preventDefault){DOMAssistant.Events.preventDefault=function(C){C.preventDefault();};}else{DOMAssistant.Events.preventDefault=function(C){event.returnValue=false;};}return DOMAssistant.Events.preventDefault(B);},cancelBubble:function(B){if(B&&B.stopPropagation){DOMAssistant.Events.cancelBubble=function(C){C.stopPropagation();};}else{DOMAssistant.Events.cancelBubble=function(C){event.cancelBubble=true;};}return DOMAssistant.Events.cancelBubble(B);}};}();DOMAssistant.attach(DOMAssistant.Events);DOMAssistant.DOMLoad=function(){var DOMLoaded=false;var DOMLoadTimer=null;var functionsToCall=[];var addedStrings={};var errorHandling=null;var execFunctions=function(){for(var i=0,il=functionsToCall.length;i<il;i++){try{functionsToCall[i]();}catch(e){if(errorHandling&&typeof errorHandling==="function"){errorHandling(e);}}}functionsToCall=[];};var DOMHasLoaded=function(){if(DOMLoaded){return ;}DOMLoaded=true;execFunctions();};
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