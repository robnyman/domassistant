// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.domassistant.com/documentation, version 2.7
var DOMAssistant=function(){var A=function(){};var C=/*@cc_on!@*/false;var B=[];var D=function(H,G){for(var F=0,E=G.length;F<E;F++){H.push(G[F]);}return H;};if(C){D=function(H,G){if(G.slice){return H.concat(G);}for(var F=0,E=G.length;F<E;F++){H[H.length]=G[F];}return H;};}return{allMethods:[],publicMethods:["cssSelect","elmsByClass","elmsByAttribute","elmsByTag"],initCore:function(){this.applyMethod.call(window,"$",this.$);this.applyMethod.call(window,"$$",this.$$);window.DOMAssistant=this;if(C){A=Array;}A.prototype=[];A.prototype.each=function(G){for(var F=0,E=this.length;F<E;F++){G.call(this[F]);}return this;};A.prototype.first=function(){return(typeof this[0]!=="undefined")?DOMAssistant.addMethodsToElm(this[0]):null;};A.prototype.end=function(){return this.previousSet;};this.attach(this);},addMethods:function(E,F){if(typeof this.allMethods[E]==="undefined"){this.allMethods[E]=F;this.addHTMLArrayPrototype(E,F);}},addMethodsToElm:function(F){for(var E in this.allMethods){if(typeof this.allMethods[E]!=="undefined"){this.applyMethod.call(F,E,this.allMethods[E]);}}return F;},applyMethod:function(F,E){if(typeof this[F]!=="function"){this[F]=E;}},attach:function(G){var E=G.publicMethods;if(typeof E==="undefined"){for(var I in G){if(I!=="init"&&typeof G[I]!=="undefined"){this.addMethods(I,G[I]);}}}else{if(E.constructor===Array){for(var F=0,H;(H=E[F]);F++){this.addMethods(H,G[H]);}}}if(typeof G.init==="function"){G.init();}},addHTMLArrayPrototype:function(E,F){A.prototype[E]=function(){var I=new A();I.previousSet=this;var J;for(var H=0,G=this.length;H<G;H++){J=F.apply(this[H],arguments);if(typeof J!=="undefined"&&J!==null&&J.constructor===Array){I=D(I,J);}else{I.push(J);}}return I;};},getSequence:function(J){var K,I=2,F=-1,E=-1;var H=/^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n((\+|\-)(\d+))?)|(\-(([1-9]\d*)?)n\+(\d+)))$/;var G=H.exec(J);if(!G){return null;}else{if(G[2]){K=(G[2]==="odd")?1:2;E=(K===1)?1:0;}else{if(G[3]){K=parseInt(G[3],10);I=0;F=K;}else{if(G[4]){I=G[6]?parseInt(G[6],10):1;K=G[7]?parseInt(G[8]+G[9],10):0;while(K<1){K+=I;}E=(K>I)?(K-I)%I:((K===I)?0:K);}else{if(G[10]){I=G[12]?parseInt(G[12],10):1;K=F=parseInt(G[13],10);while(K>I){K-=I;}E=(F>I)?(F-I)%I:((F===I)?0:F);}}}}}return{start:K,add:I,max:F,modVal:E};},$:function(){var G=new A();if(document.getElementById){var E=arguments[0];if(typeof E==="string"){E=E.replace(/^[^#]*(#)/,"$1");if(/^#[\w\u00C0-\uFFFF\-\_]+$/.test(E)){var F=DOMAssistant.$$(E.substr(1),false);if(F){G.push(F);}}else{G=DOMAssistant.cssSelection.call(document,E);}}else{if(typeof E==="object"){G=(arguments.length===1)?DOMAssistant.$$(E):D(G,arguments);}}}return G;},$$:function(J,G){var I=(typeof J==="object")?J:document.getElementById(J);var H=G||true;if(typeof J==="string"&&I&&I.id!==J){I=null;for(var E=0,F;(F=document.all[E]);E++){if(F.id===J){I=F;break;}}}if(I&&H){DOMAssistant.addMethodsToElm(I);}return I;},cssSelection:function(F){if(document.evaluate){DOMAssistant.cssSelection=function(b){var Q=b.replace(/\s*(,)\s*/g,"$1").split(",");var O=new A();var e,J,g,Y,M,N;var H=/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+))\))?)*)?(>|\+|~)?/;var f=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");function a(i,m,l,k){var j=i;switch(l){case"^":j="starts-with(@"+m+", '"+k+"')";break;case"$":j="substring(@"+m+", (string-length(@"+m+") - "+(k.length-1)+"), "+k.length+") = '"+k+"'";break;case"*":j="contains(concat(' ', @"+m+", ' '), '"+k+"')";break;case"|":j="(@"+m+"='"+k+"' or starts-with(@"+m+", '"+k+"-'))";break;case"~":j="(@"+m+"='"+k+"' or starts-with(@"+m+", '"+k+" ') or substring(@"+m+", (string-length(@"+m+") - "+(k.length-1)+"), "+k.length+") = ' "+k+"' or contains(concat(' ', @"+m+", ' '), ' "+k+" '))";break;default:j="@"+m+(k?"='"+k+"'":"");}return j;}for(var c=0;(e=Q[c]);c++){if(c>0){J=false;for(var T=0,U=c;T<U;T++){if(Q[c]===Q[T]){J=true;break;}}if(J){continue;}}g=e.match(f);Y=".";for(var Z=0,d=g.length;Z<d;Z++){M=H.exec(g[Z]);N={tag:(!M[1]||M[3]==="*")?"*":M[1],id:(M[3]!=="*")?M[2]:null,allClasses:M[4],allAttr:M[6],allPseudos:M[10],tagRelation:M[21]};if(N.tagRelation){switch(N.tagRelation){case">":Y+="/child::";break;case"+":Y+="/following-sibling::*[1]/self::";break;case"~":Y+="/following-sibling::";break;}}else{Y+=(Z>0&&/(>|\+|~)/.test(g[Z-1]))?N.tag:("/descendant::"+N.tag);}if(N.id){Y+="[@id = '"+N.id.replace(/^#/,"")+"']";}if(N.allClasses){Y+=N.allClasses.replace(/\.([\w\u00C0-\uFFFF\-_]+)/g,"[contains(concat(' ', @class, ' '), ' $1 ')]");}if(N.allAttr){Y+=N.allAttr.replace(/(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?/g,a);}if(N.allPseudos){var P=/:(\w[\w\-]*)(\(([^\)]+)\))?/;N.allPseudos=N.allPseudos.match(/(:\w+[\w\-]*)(\([^\)]+\))?/g);for(var S=0,V=N.allPseudos.length;S<V;S++){var L=N.allPseudos[S].match(P);var h=L[1]?L[1].toLowerCase():null;var K=L[3]?L[3]:null;switch(h){case"first-child":Y+="[count(preceding-sibling::*) = 0]";break;case"first-of-type":Y+="[count(preceding-sibling::"+N.tag+") = 0]";break;case"last-child":Y+="[count(following-sibling::*) = 0]";break;case"last-of-type":Y+="[count(following-sibling::"+N.tag+") = 0]";break;case"only-child":Y+="[count(preceding-sibling::*) = 0 and count(following-sibling::*) = 0]";break;case"only-of-type":Y+="[count(preceding-sibling::"+N.tag+") = 0 and count(following-sibling::"+N.tag+") = 0]";break;case"nth-of-type":Y+="["+K+"]";break;case"empty":Y+="[count(child::*) = 0 and string-length(text()) = 0]";break;case"contains":Y+="[contains(., '"+K+"')]";break;case"enabled":Y+="[not(@disabled)]";break;case"disabled":Y+="[@disabled]";break;case"checked":Y+="[@checked='checked']";break;case"nth-child":var G="";if(!/^n$/.test(K)){var R=DOMAssistant.getSequence(K);if(R){G="[";if(R.start===R.max){G+="position() = "+R.start;}else{G+="(count(./preceding-sibling::*) + 1) mod "+R.add+" = "+R.modVal+((R.start>1)?" and position() >= "+R.start:"")+((R.max>0)?" and position() <= "+R.max:"");}G+="]";}}Y+=G;break;case"not":K=K.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/,"[id=$1]");var I=K.replace(/^(\w+)/,"self::$1");I=I.replace(/^\.([\w\u00C0-\uFFFF\-_]+)/g,"contains(concat(' ', @class, ' '), ' $1 ')");I=I.replace(/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/g,a);Y+="[not("+I+")]";break;default:Y+="[@"+h+"='"+K+"']";break;}}}}var X=document.evaluate(Y,this,null,0,null),W;while((W=X.iterateNext())){O.push(W);}}return O;};}else{DOMAssistant.cssSelection=function(G){var BN=G.replace(/\s*(,)\s*/g,"$1").split(",");var A9=new A();var At=[];var BK=[];var Ba,d,AV,W,AH,Ax,BL,J,AT,BZ,AW,BB,AX,I,Ac,R,h,Au,A8,c,Y,A0,An;var BI=/^(>|\+|~)$/;var g=/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+))\))?)*)?/;var AO;try{AO=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");}catch(Ag){AO=/[^\s]+/g;}function BV(e){e=e?e:At;for(var b=0,a=e.length;b<a;b++){e[b].added=false;}}function V(){for(var b=0,a=Ba.length;b<a;b++){Ba[b].childElms=null;}}function X(b,a){if(C){switch(a){case"id":return b.id;case"for":return b.htmlFor;case"class":return b.className;}}return b.getAttribute(a,2);}function AJ(a,e){var b=a?"^"+a+"$":null;if(typeof e==="string"){switch(e){case"^":b="^"+a;break;case"$":b=a+"$";break;case"*":b=a;break;case"|":b="(^"+a+"(\\-\\w+)*$)";break;case"~":b="\\b"+a+"\\b";break;}}return new RegExp(b);}for(var Aj=0;(d=BN[Aj]);Aj++){if(Aj>0){AV=false;for(var Ai=0,Ao=Aj;Ai<Ao;Ai++){if(BN[Aj]===BN[Ai]){AV=true;break;}}if(AV){continue;}}W=d.match(AO);At=[this];for(var Ad=0,Z;(Z=W[Ad]);Ad++){var Al=false;BK=[];if(Ad>0&&BI.test(Z)){AH=BI.exec(Z);if(AH){Al=true;BL=W[Ad+1];Ax=/^\w+/.exec(BL);if(Ax){J=new RegExp("(^|\\s)"+Ax+"(\\s|$)","i");}switch(AH[0]){case">":for(var Ab=0,AG,BG;(AG=At[Ab]);Ab++){BG=AG.getElementsByTagName(Ax||"*");for(var AZ=0,A5;(A5=BG[AZ]);AZ++){if(A5.parentNode===AG){BK[BK.length]=A5;}}}break;case"+":for(var AY=0;(AT=At[AY]);AY++){while((AT=AT.nextSibling)&&AT.nodeType!==1){}if(AT){if(!Ax||J.test(AT.nodeName)){BK[BK.length]=AT;}}}break;case"~":for(var AU=0;(AT=At[AU]);AU++){while((AT=AT.nextSibling)&&!AT.added){if(!Ax||J.test(AT.nodeName)){AT.added=true;BK[BK.length]=AT;}}}break;}At=BK;BV();Z=W[++Ad];if(/^\w+$/.test(Z)){continue;}At.skipTag=true;}}var Aw=g.exec(Z);var BH={tag:(!Aw[1]||Aw[3]==="*")?"*":Aw[1],id:(Aw[3]!=="*")?Aw[2]:null,allClasses:Aw[4],allAttr:Aw[6],allPseudos:Aw[10]};if(BH.id){var Aq=document.getElementById(BH.id.replace(/#/,""));if(Aq){if(Al){for(var BA=0,T=BK.length;BA<T;BA++){if(BK[BA]===Aq){BK=[Aq];break;}}}else{BK=[Aq];}}At=BK;}else{if(BH.tag&&!At.skipTag){if(!BK.length&&At.length===1){if(!B[BH.tag]){B[BH.tag]=(C&&At[0]===document)?((BH.tag==="*")?document.all:document.all.tags(BH.tag)):At[0].getElementsByTagName(BH.tag);}At=BK=D([],B[BH.tag]);}else{for(var AS=0,Ar=At.length,A7,A1;AS<Ar;AS++){A7=At[AS].getElementsByTagName(BH.tag);for(var AR=0;(A1=A7[AR]);AR++){if(!A1.added){A1.added=true;BK[BK.length]=A1;}}}At=BK;BV();}}}if(!BK.length){break;}At.skipTag=false;if(BH.allClasses){BH.allClasses=BH.allClasses.replace(/^\./,"").split(".");BZ=[];for(var O=0,A4=BH.allClasses.length;O<A4;O++){BZ[BZ.length]=new RegExp("(^|\\s)"+BH.allClasses[O]+"(\\s|$)");}AW=[];for(var AQ=0,A3;(Ac=At[AQ]);AQ++){A3=Ac.className;if(A3&&!Ac.added){Au=false;for(var AP=0,Q=BZ.length;AP<Q;AP++){Au=BZ[AP].test(A3);if(!Au){break;}}if(Au){Ac.added=true;AW[AW.length]=Ac;}}}BV();At=BK=AW;}if(BH.allAttr){BH.allAttr=BH.allAttr.match(/\[[^\]]+\]/g);BB=[];I=/(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?/;for(var BD=0,Av=BH.allAttr.length,AN,M,BU;BD<Av;BD++){AN=I.exec(BH.allAttr[BD]);M=AN[3]?AN[3].replace(/\./g,"\\."):null;BU=(M)?AJ(M,(AN[2]||null)):null;BB[BB.length]=[BU,AN[1]];}AX=[];for(var AM=0,Ah;(Ac=BK[AM]);AM++){for(var AL=0,BF=BB.length,A6;AL<BF;AL++){Au=false;A6=BB[AL][0];Ah=X(Ac,BB[AL][1]);if(typeof Ah==="string"&&Ah.length){if(!A6||typeof A6==="undefined"||(A6&&A6.test(Ah))){Au=true;}}if(!Au){break;}}if(Au){AX[AX.length]=Ac;}}At=BK=AX;}if(BH.allPseudos){var f=/:(\w[\w\-]*)(\(([^\)]+)\))?/;BH.allPseudos=BH.allPseudos.match(/(:\w+[\w\-]*)(\([^\)]+\))?/g);for(var AC=0,BY=BH.allPseudos.length;AC<BY;AC++){var BX=BH.allPseudos[AC].match(f);var x=BX[1]?BX[1].toLowerCase():null;var BQ=BX[3]?BX[3]:null;var BE=BK;BK=[];Ba=[];if(x==="not"){BQ=BQ.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/,"[id=$1]");var AA=/^(\w+)/.exec(BQ);var Ap=/^\.([\w\u00C0-\uFFFF\-_]+)/.exec(BQ);var Ak=/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/.exec(BQ);var BR=new RegExp("(^|\\s)"+(AA?AA[1]:Ap?Ap[1]:"")+"(\\s|$)","i");if(Ak){var BP=Ak[3]?Ak[3].replace(/\./g,"\\."):null;var BJ=AJ(BP,Ak[2]);BR=new RegExp(BJ,"i");}for(var AK=0,H;(H=BE[AK]);AK++){Au=null;if(AA&&!BR.test(H.nodeName)){Au=H;}else{if(Ap&&!BR.test(H.className)){Au=H;}else{if(Ak){var Am=X(H,Ak[1]);if(!Am||!BR.test(Am)){Au=H;}}}}if(Au&&!Au.added){Au.added=true;BK[BK.length]=Au;}}}else{switch(x){case"first-child":for(var AI=0,S;(S=R=BE[AI]);AI++){while((S=S.previousSibling)&&S.nodeType!==1){}if(!S){BK[BK.length]=R;}}break;case"last-child":for(var AF=0,Af;(Af=R=BE[AF]);AF++){while((Af=Af.nextSibling)&&Af.nodeType!==1){}if(!Af){BK[BK.length]=R;}}break;case"only-child":for(var AE=0,U;(R=BE[AE]);AE++){h=R.parentNode;if(h!==U){A8=h.firstChild;c=h.lastChild;while(A8.nodeType!==1&&(A8=A8.nextSibling)){}while(c.nodeType!==1&&(c=c.previousSibling)){}if(A8===R&&c===R){BK[BK.length]=R;}U=h;}}break;case"nth-child":if(/^n$/.test(BQ)){BK=D(BK,BE);}else{var BM=DOMAssistant.getSequence(BQ);if(BM){for(var AB=0;(R=BE[AB]);AB++){h=R.parentNode;if(!h.childElms){var BT=BM.start,As=0;var L=h.firstChild;while(L&&(BM.max<0||BT<=BM.max)){if(L.nodeType===1){if(++As===BT){if(L.nodeName===R.nodeName){BK[BK.length]=L;}BT+=BM.add;}}L=L.nextSibling;}h.childElms=true;Ba[Ba.length]=h;}}V();}}break;case"first-of-type":for(var BC=0;(R=BE[BC]);BC++){A8=R.parentNode.getElementsByTagName(R.nodeName)[0];if(A8===R){BK[BK.length]=R;}}break;case"last-of-type":for(var Az=0;(R=BE[Az]);Az++){c=R.parentNode.lastChild;while(c.nodeName!==R.nodeName){c=c.previousSibling;}if(c===R){BK[BK.length]=R;}}break;case"only-of-type":for(var Ae=0;(R=BE[Ae]);Ae++){Y=R.parentNode.getElementsByTagName(R.nodeName);if(Y.length===1){BK[BK.length]=R;}}break;case"nth-of-type":var BO=parseInt(BQ,10);for(var AD=0;(R=BE[AD]);AD++){An=[];Y=R.parentNode.childNodes;if(Y.length>=BO){for(var BS=0,K;(BS!==BO&&(K=Y[BS]));BS++){if(K.nodeName===R.nodeName){An[An.length]=K;}}Ac=An[An.length-1];if(Ac&&Ac===R){BK[BK.length]=R;}}}break;case"empty":for(var BW=0;(R=BE[BW]);BW++){A0=R.parentNode.childNodes;if(!A0.length){BK[BK.length]=R;}}break;case"enabled":for(var A2=0;(R=BE[A2]);A2++){if(!R.disabled){BK[BK.length]=R;}}break;case"disabled":for(var P=0;(R=BE[P]);P++){if(R.disabled){BK[BK.length]=R;}}break;case"checked":for(var Aa=0;(R=BE[Aa]);Aa++){if(R.checked){BK[BK.length]=R;}}break;case"contains":for(var Ay=0;(R=BE[Ay]);Ay++){if(!R.added){if(R.innerText.indexOf(BQ)!==-1){R.added=true;BK[BK.length]=R;}}}break;default:for(var N=0;(R=BE[N]);N++){if(R.getAttribute(x,2)===BQ){BK[BK.length]=R;}}break;}}BV(BK);}At=BK;}}A9=D(A9,At);}return A9;};}if(document.querySelectorAll){var E=DOMAssistant.cssSelection;DOMAssistant.cssSelection=function(G){try{var I=new A();return D(I,this.querySelectorAll(G));}catch(H){return E.call(this,G);}};}return DOMAssistant.cssSelection.call(this,F);},cssSelect:function(E){return DOMAssistant.cssSelection.call(this,E);},elmsByClass:function(G,E){var F=(E?E:"")+"."+G;return DOMAssistant.cssSelection.call(this,F);},elmsByAttribute:function(F,G,E,I){var H=(E?E:"")+"["+F+((G&&G!=="*")?((I?I:"")+"="+G+"]"):"]");return DOMAssistant.cssSelection.call(this,H);},elmsByTag:function(E){return DOMAssistant.cssSelection.call(this,E);}};}();DOMAssistant.initCore();DOMAssistant.AJAX=function(){var E=null;var A=0;var C=-1;var D="";var B=function(G,J,I,F){var H=null;if(/POST/i.test(J)){G=G.split("?");H=G[1];G=G[0];}return{url:G,method:J,callback:I,params:H,headers:{},responseType:"text",addToContent:F||false};};return{publicMethods:["ajax","get","post","load","replaceWithAJAXContent"],initRequest:function(){var G=null;if(typeof XMLHttpRequest!=="undefined"){G=new XMLHttpRequest();DOMAssistant.AJAX.initRequest=function(){return new XMLHttpRequest();};}else{if(typeof window.ActiveXObject!=="undefined"){var F=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(var H=0;H<F.length;H++){try{G=new window.ActiveXObject(F[H]);DOMAssistant.AJAX.initRequest=function(){return new window.ActiveXObject(F[H]);};break;}catch(I){G=null;}}}}return G;},ajax:function(F){if(F.url&&/\?/.test(F.url)&&F.method&&/POST/i.test(F.method)){var G=F.url.split("?");F.url=G[0];F.params=G[1]+((G[1].length>0&&F.params)?("&"+F.params):"");}return DOMAssistant.AJAX.makeCall.call(this,F);},get:function(H,I,G){var F=B(H,"GET",I,G);return DOMAssistant.AJAX.makeCall.call(this,F);},post:function(G,H){var F=B(G,"POST",H);return DOMAssistant.AJAX.makeCall.call(this,F);},load:function(G,F){DOMAssistant.AJAX.get.call(this,G,DOMAssistant.AJAX.replaceWithAJAXContent,F);},makeCall:function(F){var G=DOMAssistant.AJAX.initRequest();if(G){E=G;var H=function(Q){var K=F.url;var I=F.method||"GET";var R=F.callback;var M=F.params;var L=F.headers;var P=F.responseType||"text";var N=F.addToContent;G.open(I,K,true);G.setRequestHeader("AJAX","true");G.setRequestHeader("X-Requested-With","XMLHttpRequest");if(I==="POST"){var J=M?M.length:0;G.setRequestHeader("Content-type","application/x-www-form-urlencoded");G.setRequestHeader("Content-length",J);if(G.overrideMimeType){G.setRequestHeader("Connection","close");}}for(var O in L){if(typeof O==="string"){G.setRequestHeader(O,L[O]);}}if(typeof R==="function"){G.onreadystatechange=function(){if(G.readyState===4){var S=(/xml/i.test(P))?G.responseXML:G.responseText;R.call(Q,S,N);A=4;C=G.status;D=G.statusText;E=null;G=null;}};}G.send(M);}(this);}return this;},replaceWithAJAXContent:function(K,L){if(L){this.innerHTML+=K;}else{var J=this.elmsByTag("*");for(var I=0,M,F;(M=J[I]);I++){F=M.attributes;if(F){for(var G=0,H=F.length;G<H;G++){if(typeof M[F[G].name]==="function"){M[F[G].name]=null;}}}}this.innerHTML=K;}},getReadyState:function(){return(E&&typeof E.readyState!=="undefined")?E.readyState:A;},getStatus:function(){return C;},getStatusText:function(){return D;}};}();DOMAssistant.attach(DOMAssistant.AJAX);DOMAssistant.CSS=function(){return{addClass:function(B){var A=this.className;if(!new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i").test(A)){this.className=A+(A.length?" ":"")+B;}return this;},removeClass:function(B){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(C){var D="";if(new RegExp("^\\s+.*\\s+$").test(C)){D=C.replace(/(\s+).+/,"$1");}return D;}).replace(/^\s+|\s+$/g,"");return this;},replaceClass:function(B,C){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(D,G,F){var E=G+C+F;if(new RegExp("^\\s+.*\\s+$").test(D)){E=D.replace(/(\s+).+/,"$1");}return E;}).replace(/^\s+|\s+$/g,"");return this;},hasClass:function(A){return new RegExp(("(^|\\s)"+A+"(\\s|$)"),"i").test(this.className);},setStyle:function(C,D){if(typeof this.style.cssText!=="undefined"){var A=this.style.cssText;if(typeof C==="object"){for(var B in C){if(typeof B==="string"){A+=";"+B+":"+C[B];}}}else{A+=";"+C+":"+D;}this.style.cssText=A;}return this;},getStyle:function(B){var A="";if(document.defaultView&&document.defaultView.getComputedStyle){A=document.defaultView.getComputedStyle(this,"").getPropertyValue(B);}else{if(this.currentStyle){A=B.replace(/\-(\w)/g,function(C,D){return D.toUpperCase();});A=this.currentStyle[A];}}return A;}};}();DOMAssistant.attach(DOMAssistant.CSS);DOMAssistant.Content=function(){return{prev:function(){var A=this;while((A=A.previousSibling)&&A.nodeType!==1){}return DOMAssistant.$(A);},next:function(){var A=this;while((A=A.nextSibling)&&A.nodeType!==1){}return DOMAssistant.$(A);},create:function(C,B,A,D){var E=DOMAssistant.$(document.createElement(C));if(B){E.setAttributes(B);}if(typeof D!=="undefined"){E.addContent(D);}if(A){DOMAssistant.Content.addContent.call(this,E);}return E;},setAttributes:function(A){for(var B in A){if(/class/i.test(B)){this.className=A[B];}else{this.setAttribute(B,A[B]);}}return this;},addContent:function(A){if(typeof A==="string"){this.innerHTML+=A;}else{if(typeof A==="object"&&A){this.appendChild(A);}}return this;},replaceContent:function(B){for(var E=(this.childNodes.length-1),F,A;E>=0;E--){F=this.childNodes[E];A=F.attributes;if(A){for(var C=0,D=A.length;C<D;C++){if(typeof F[A[C].name]==="function"){F[A[C].name]=null;}}}F.parentNode.removeChild(F);}DOMAssistant.$(this).addContent(B);return this;},remove:function(){this.parentNode.removeChild(this);return null;}};}();DOMAssistant.attach(DOMAssistant.Content);DOMAssistant.Events=function(){var A=1;return{publicMethods:["addEvent","removeEvent","preventDefault","cancelBubble"],init:function(){window.addEvent=this.addEvent;window.removeEvent=this.removeEvent;DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble;},addEvent:function(C,E){var B=(/^DOM/.test(C));if(B){if(this.addEventListener){this.addEventListener(C,E,false);}}else{if(!this.uniqueHandlerId){this.uniqueHandlerId=A++;}var F=false;if(E.attachedElements&&E.attachedElements[C+this.uniqueHandlerId]){F=true;}if(!F){if(!this.events){this.events={};}if(!this.events[C]){this.events[C]=[];var D=this["on"+C];if(D){this.events[C].push(D);}}this.events[C].push(E);this["on"+C]=DOMAssistant.Events.handleEvent;if(typeof this.window==="object"){this.window["on"+C]=DOMAssistant.Events.handleEvent;}if(!E.attachedElements){E.attachedElements={};}E.attachedElements[C+this.uniqueHandlerId]=true;}}return this;},handleEvent:function(B){var H=B||event;var I=H.target||H.srcElement||document;while(I.nodeType!==1&&I.parentNode){I=I.parentNode;}H.eventTarget=I;var F=H.type;var C=this.events[F];var G=C.length;var E;for(var D=0;D<G;D++){E=C[D].call(this,H);if(D===(G-1)){return E;}}},removeEvent:function(B,E){if(this.events){var C=this.events[B];for(var D=0;D<C.length;D++){if(C[D]===E){delete C[D];C.splice(D,1);}}E.attachedElements[B+this.uniqueHandlerId]=null;}return this;},preventDefault:function(B){if(B&&B.preventDefault){DOMAssistant.Events.preventDefault=function(C){C.preventDefault();};}else{DOMAssistant.Events.preventDefault=function(C){event.returnValue=false;};}return DOMAssistant.Events.preventDefault(B);},cancelBubble:function(B){if(B&&B.stopPropagation){DOMAssistant.Events.cancelBubble=function(C){C.stopPropagation();};}else{DOMAssistant.Events.cancelBubble=function(C){event.cancelBubble=true;};}return DOMAssistant.Events.cancelBubble(B);}};}();DOMAssistant.attach(DOMAssistant.Events);DOMAssistant.DOMLoad=function(){var DOMLoaded=false;var DOMLoadTimer=null;var functionsToCall=[];var addedStrings={};var errorHandling=null;var execFunctions=function(){for(var i=0,il=functionsToCall.length;i<il;i++){try{functionsToCall[i]();}catch(e){if(errorHandling&&typeof errorHandling==="function"){errorHandling(e);}}}functionsToCall=[];};var DOMHasLoaded=function(){if(DOMLoaded){return ;}DOMLoaded=true;execFunctions();};
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