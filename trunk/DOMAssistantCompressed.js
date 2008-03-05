// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant, version 2.6.1
var DOMAssistant=function(){var A=function(){};var B=/*@cc_on!@*/false;return{allMethods:[],publicMethods:["cssSelect","elmsByClass","elmsByAttribute","elmsByTag"],initCore:function(){this.applyMethod.call(window,"$",this.$);this.applyMethod.call(window,"$$",this.$$);window.DOMAssistant=this;if(B){A=Array;}A.prototype=[];A.prototype.each=function(E){for(var D=0,C=this.length;D<C;D++){E.call(this[D]);}return this;};A.prototype.end=function(){return this.previousSet;};this.attach(this);},addMethods:function(C,D){if(typeof this.allMethods[C]==="undefined"){this.allMethods[C]=D;this.addHTMLArrayPrototype(C,D);}},addMethodsToElm:function(D){for(var C in this.allMethods){if(typeof this.allMethods[C]!=="undefined"){this.applyMethod.call(D,C,this.allMethods[C]);}}},applyMethod:function(D,C){if(typeof this[D]!=="function"){this[D]=C;}},attach:function(G){var C=G.publicMethods;if(typeof C==="undefined"){var E;for(var I in G){if(I!=="init"&&typeof G[I]!=="undefined"){this.addMethods(I,G[I]);}}}else{if(C.constructor===Array){for(var F=0,D=C.length,H;F<D;F++){H=C[F];this.addMethods(H,G[H]);}}}if(typeof G.init==="function"){G.init();}},createHTMLArray:function(){return new A();},addHTMLArrayPrototype:function(C,D){A.prototype[C]=function(){var I=new A();I.previousSet=this;var J;for(var H=0,E=this.length;H<E;H++){J=D.apply(this[H],arguments);if(typeof J!=="undefined"&&J!==null&&J.constructor===Array){for(var F=0,G=J.length;F<G;F++){I.push(J[F]);}}else{I.push(J);}}return I;};},$:function(){var G=new A();if(document.getElementById){var C=arguments[0];if(typeof C==="string"){C=C.replace(/^[^#]*(#)/,"$1");if(/^#[\w\u0128-\uFFFF\-\_]+$/.test(C)){var F=DOMAssistant.$$(C.substr(1),false);if(F){G.push(F);}}else{G=DOMAssistant.cssSelection(C);}}else{if(typeof C==="object"){if(arguments.length===1){G=DOMAssistant.$$(C);}else{for(var D=0,E=arguments.length;D<E;D++){G.push(arguments[D]);}}}}}return G;},$$:function(I,F){var H=(typeof I==="object")?I:document.getElementById(I);var G=F||true;if(typeof I==="string"&&H&&H.id!==I){H=null;for(var D=0,C=document.all.length,E;D<C;D++){E=document.all[D];if(E.id===I){H=E;break;}}}if(H&&G){DOMAssistant.addMethodsToElm(H);}return H;},cssSelection:function(C){if(document.querySelectorAll){DOMAssistant.cssSelection=DOMAssistant.nativeQuery;}else{if(document.evaluate){DOMAssistant.cssSelection=function(W){var M=W.replace(/\s*(,)\s*/g,"$1").split(",");var K=new A();var Z,G,d,U,I,J,N,a;var E=/^(\w+)?(#[\w\u0128-\uFFFF\-\_]+|(\*))?((\.[\w\u0128-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*)?=?[\w\u0128-\uFFFF\-\_]+\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d+n?((\+|\-)\d+)?|\w+|((\w*\.[\w\-_]+)*)?|(\[#?\w+(\^|\$|\*)?=?[\w\-\_]+\]+))\))?)*)?(>|\+|~)?/;for(var X=0,O=M.length;X<O;X++){Z=M[X];if(X>0){G=false;for(var P=0,R=X;P<R;P++){if(M[X]===M[P]){G=true;break;}}if(G){continue;}}d=Z.split(" ");U=".";for(var V=0,Y=d.length;V<Y;V++){I=E.exec(d[V]);J={tag:(!I[1]||I[3]==="*")?"*":I[1],id:(I[3]!=="*")?I[2]:null,allClasses:I[4],allAttr:I[6],pseudoClass:I[11],pseudoValue:I[13],tagRelation:I[20]};if(J.tagRelation){switch(J.tagRelation){case">":U+="/child::";break;case"+":U+="/following-sibling::*[1]/self::";break;case"~":U+="/following-sibling::";break;}}else{U+=(V>0&&/(>|\+|~)/.test(d[V-1]))?J.tag:("/descendant::"+J.tag);}if(J.id){U+="[@id = '"+J.id.replace(/^#/,"")+"']";}if(J.allClasses){U+=J.allClasses.replace(/\.([\w\u0128-\uFFFF\-_]+)/g,"[contains(concat(' ', @class, ' '), ' $1 ')]");}if(J.allAttr){U+=J.allAttr.replace(/(\w+)(\^|\$|\*)?=?([\w\u0128-\uFFFF\-_]+)?/g,function(e,j,i,h,g){var f=e;switch(i){case"^":f="starts-with(@"+j+", '"+h+"')";break;case"$":f="substring(@"+j+", (string-length(@"+j+") - "+(h.length-1)+"), 6) = '"+h+"'";break;case"*":f="contains(concat(' ', @"+j+", ' '), '"+h+"')";break;default:f="@"+j+((h)?"='"+h+"'":"");}return f;});}if(J.pseudoClass){var H=J.pseudoValue;switch(J.pseudoClass.replace(/^:/,"")){case"first-child":U+="[count(preceding-sibling::*) = 0]";break;case"first-of-type":U+="[count(preceding-sibling::"+J.tag+") = 0]";break;case"last-child":U+="[count(following-sibling::*) = 0]";break;case"last-of-type":U+="[count(following-sibling::"+J.tag+") = 0]";break;case"only-child":U+="[count(preceding-sibling::*) = 0 and count(following-sibling::*) = 0]";break;case"only-of-type":U+="[count(preceding-sibling::"+J.tag+") = 0 and count(following-sibling::"+J.tag+") = 0]";break;case"nth-of-type":U+="["+H+"]";break;case"empty":U+="[count(child::*) = 0 and string-length(text()) = 0]";break;case"contains":U+="[contains(., '"+H+"')]";break;case"enabled":U+="[not(@disabled)]";break;case"disabled":U+="[@disabled]";break;case"checked":U+="[@checked='checked']";break;case"nth-child":var D="[";if(/^\d+$/.test(H)){D+="position() = "+H;}else{if(/^n$/.test(H)){D="";}else{if(/^odd$/.test(H)){H="2n+1";}else{if(/^even$/.test(H)){H="2n+0";}}var c=/^(\d+)n((\+|\-)(\d+))?$/.exec(H);var L=parseInt(c[1],10);var b=0;if(c[3]&&c[4]){b=parseInt((c[3]+c[4]),10);if(b<0){b=L+b;}}D+="(count(./preceding-sibling::*) + 1)";if(L<b){var Q=((b-L)%2===0)?0:1;D+=" mod "+L+" = "+Q+" and position() > "+b;}else{if(b===L){D+=" mod "+L+" = 0";}else{D+=" mod "+L+" = "+b;}}}}if(!/^n$/.test(H)){D+="]";}U+=D;break;case"not":H=H.replace(/^\[#([\w\-\_]+)\]$/,"[id=$1]");var F=H.replace(/^(\w+)/,"self::$1");F=F.replace(/\.([\w\-_]+)/g,"contains(concat(' ', @class, ' '), ' $1 ')");F=F.replace(/\[(\w+)(\^|\$|\*)?=?([\w\-_]+)?\]/g,function(e,j,i,h,g){var f=e;switch(i){case"^":f="starts-with(@"+j+", '"+h+"')";break;case"$":f="substring(@"+j+", (string-length(@"+j+") - "+(h.length-1)+"), 6) = '"+h+"'";break;case"*":f="contains(concat(' ', @"+j+", ' '), '"+h+"')";break;default:f="@"+j+((h)?"='"+h+"'":"");}return f;});U+="[not("+F+")]";break;}}}var T=document.evaluate(U,document,null,0,null);var S=T.iterateNext();while(S){K.push(S);S=T.iterateNext();}}return K;};}else{DOMAssistant.cssSelection=function(D){return DOMAssistant.cssSelect.call(document,D);};}}return DOMAssistant.cssSelection.call(this,C);},nativeQuery:function(F){var G=new A();var E=document.querySelectorAll(F);for(var D=0,C=E.length;D<C;D++){G.push(E[D]);}return G;},cssSelect:function(C){if(document.querySelectorAll){DOMAssistant.cssSelect=DOMAssistant.nativeQuery;}else{DOMAssistant.cssSelect=function(g){var Av=g.replace(/\s*(,)\s*/g,"$1").split(",");var Ao=new A();var BZ=new A();var Ay=new A();var As,AC,Be,BT,AY,B2,AI,c,A0,Ad,Bp,Bi,Bk,AP,AQ,AK,Z,Bs,AW,d,Bn,AM;var Ac=/^(>|\+|~)$/;var W=/^(\w+)?(#[\w\u0128-\uFFFF\-\_]+|(\*))?((\.[\w\u0128-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*)?=?[\w\u0128-\uFFFF\-\_]+\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d*n?((\+|\-)\d+)?|\w+|((\w*\.[\w\-_]+)*)?|(\[#?\w+(\^|\$|\*)?=?[\w\-\_]+\]+))\))?)*)?/;var Bb;function Aw(){for(var b=0,a=BZ.length;b<a;b++){BZ[b].added=false;}}function Ap(){for(var b=0,a=As.length;b<a;b++){As[b].childElms=null;}}function AT(b,a){if(B){switch(a){case"id":return b.id;case"for":return b.htmlFor;case"class":return b.className;}}return b.getAttribute(a,2);}for(var BQ=0,Bo=Av.length;BQ<Bo;BQ++){AC=Av[BQ];if(BQ>0){Be=false;for(var BP=0,BS=BQ;BP<BS;BP++){if(Av[BQ]===Av[BP]){Be=true;break;}}if(Be){continue;}}BT=AC.split(" ");BZ=[];BZ.push(this);for(var BM=0,h=BT.length;BM<h;BM++){var V=BT[BM];Ay=[];if(BM>0&&Ac.test(V)){AY=Ac.exec(V);if(AY){AI=BT[BM+1];B2=/^\w+/.exec(AI);if(B2){c=new RegExp("(^|\\s)"+B2+"(\\s|$)","i");A0=AY[0];if(A0===">"){for(var BL=0,X=BZ.length,AB;BL<X;BL++){AB=BZ[BL].childNodes;for(var BK=0,M=AB.length;BK<M;BK++){if(c.test(AB[BK].nodeName)){Ay.push(AB[BK]);}}}}else{if(A0==="+"){for(var BJ=0,B1=BZ.length;BJ<B1;BJ++){Bp=BZ[BJ].nextSibling;while(Bp&&Bp.nodeType!==1){Bp=Bp.nextSibling;}if(Bp){if(c.test(Bp.nodeName)){Ay.push(Bp);}}}}else{if(A0==="~"){for(var BI=0,Bu=BZ.length;BI<Bu;BI++){Bp=BZ[BI];while(Bp){Bp=Bp.nextSibling;if(Bp){if(!Bp.added&&c.test(Bp.nodeName)){Bp.added=true;Ay.push(Bp);}}}}}}}}}BZ=Ay;Aw();if(/^\w+$/.test(AI)){BM=BM+1;}else{BZ.skipTag=true;}}else{var A5=W.exec(V);var AD={tag:(!A5[1]||A5[3]==="*")?"*":A5[1],id:(A5[3]!=="*")?A5[2]:null,allClasses:A5[4],allAttr:A5[6],pseudoClass:A5[11],pseudoValue:A5[13],tagRelation:A5[20]};if(AD.id){var Bh=document.getElementById(AD.id.replace(/#/,""));if(Bh){Ay.push(Bh);}BZ=Ay;}else{if(AD.tag&&!BZ.skipTag){var Bx;for(var BH=0,Ba=BZ.length;BH<Ba;BH++){Bx=BZ[BH].getElementsByTagName(AD.tag);for(var BG=0,BO=Bx.length;BG<BO;BG++){if(!Bx[BG].added){Bx[BG].added=true;Ay.push(Bx[BG]);}}}BZ=Ay;Aw();}}BZ.skipTag=false;if(AD.allClasses){AD.allClasses=AD.allClasses.replace(/^\./,"").split(".");var Ab=[];for(var Aq=0,T=AD.allClasses.length,E,AA;Aq<T;Aq++){Ab.push(new RegExp("(^|\\s)"+AD.allClasses[Aq]+"(\\s|$)"));}var Bg=[];for(var BF=0,A2=BZ.length,Am;BF<A2;BF++){Bk=BZ[BF];if(!Bk.added){AK=false;Am=Bk.className;for(var BE=0,Ar=Ab.length;BE<Ar;BE++){AK=Ab[BE].test(Am);if(!AK){break;}}}if(AK){Bk.added=true;Bg.push(Bk);}}Aw();Ay=Bg;BZ=Ay;}if(AD.allAttr){AD.allAttr=AD.allAttr.replace(/(\])(\[)/,"$1 $2").split(" ");var e=[];var Bm=/(\w+)(\^|\$|\*)?=?([\w\u0128-\uFFFF\-_]+)?/;for(var AV=0,R=AD.allAttr.length,BR,Az,Bl,BU,Bd,An;AV<R;AV++){BR=Bm.exec(AD.allAttr[AV]);Bl=BR[3]||null;BU=(Bl)?("^"+Bl+"$"):null;An=BR[2]||null;if(typeof An==="string"){switch(An){case"^":BU=("^"+Bl);break;case"$":BU=(Bl+"$");break;case"*":BU=(Bl);break;}}e.push([((BU)?new RegExp(BU):null),BR[1]]);}var AH=[];for(var BD=0,Ah=Ay.length,AU;BD<Ah;BD++){Bk=Ay[BD];if(!Bk.added){for(var BC=0,AX=e.length,Ai;BC<AX;BC++){AK=false;Ai=e[BC][0];AU=AT(Bk,e[BC][1]);if(typeof AU==="string"&&AU.length>0){if(!Ai||typeof Ai==="undefined"||(Ai&&Ai.test(AU))){AK=true;}}if(!AK){break;}}if(AK){Bk.added=true;AH.push(Bk);}}}Aw();Ay=AH;BZ=Ay;}if(AD.pseudoClass){var L=AD.pseudoClass;var At=AD.pseudoValue;var Aa=Ay;Ay=[];As=[];if(/^:not$/.test(L)){At=At.replace(/^\[#([\w\-\_]+)\]$/,"[id=$1]");var AJ=/^(\w+)/.exec(At);var G=/\.([\w\-_]+)/.exec(At);var BV=/\[(\w+)(\^|\$|\*)?=?([\w\-_]+)?\]/.exec(At);var Af=new RegExp("(^|\\s)"+((AJ)?AJ[1]:(G)?G[1]:"")+"(\\s|$)","i");if(BV){var B0=BV[3];var BY="^"+BV[3]+"$";var Bc=BV[2];if(typeof Bc==="string"){switch(Bc){case"^":BY=("^"+B0);break;case"$":BY=(B0+"$");break;case"*":BY=(B0);break;}}Af=new RegExp(BY,"i");}for(var BB=0,AN=Aa.length,I;BB<AN;BB++){I=Aa[BB];AK=null;if(AJ&&!Af.test(I.nodeName)){AK=I;}else{if(G&&!Af.test(I.className)){AK=I;}else{if(BV){if(!AT(I,BV[1])||!Af.test(AT(I,BV[1]))){AK=I;}}}}if(AK&&!AK.added){AK.added=true;Ay.push(AK);}}Aw();BZ=Ay;}else{if(/first-child/.test(L)){for(var BA=0,AE=Aa.length;BA<AE;BA++){AP=Aa[BA];AQ=AP.parentNode;Z=AQ.firstChild;while(Z.nodeType!==1&&Z.nextSibling){Z=Z.nextSibling;}if(Z===AP){Ay.push(AP);}}BZ=Ay;}else{if(/last-child/.test(L)){for(var A9=0,f=Aa.length;A9<f;A9++){AP=Aa[A9];AQ=AP.parentNode;Bs=AQ.lastChild;while(Bs.nodeType!==1&&Bs.previousSibling){Bs=Bs.previousSibling;}if(Bs===AP){Ay.push(AP);}}BZ=Ay;}else{if(/only-child/.test(L)){for(var A8=0,P=Aa.length;A8<P;A8++){AP=Aa[A8];AQ=AP.parentNode;Z=AQ.firstChild;while(Z.nodeType!==1&&Z.nextSibling){Z=Z.nextSibling;}Bs=AQ.lastChild;while(Bs.nodeType!==1&&Bs.previousSibling){Bs=Bs.previousSibling;}if(Z===AP&&Bs===AP){Ay.push(AP);}}BZ=Ay;}else{if(/nth-child/.test(L)){if(/^\d+$/.test(At)){var Ag=parseInt(At,10);for(var A7=0,D=Aa.length,Ae;A7<D;A7++){Ae=0;AP=Aa[A7];AQ=AP.parentNode;d=AQ.firstChild;if(d.nodeType===1){Ae=Ae+1;}while(Ae<Ag&&d.nextSibling){d=d.nextSibling;if(d.nodeType===1){Ae=Ae+1;}}if(Ae===Ag&&d&&!d.added&&(d.nodeName===AP.nodeName)){d.added=true;Ay.push(AP);}}Aw();}else{if(/^n$/.test(At)){for(var A6=0,By=Aa.length;A6<By;A6++){Ay.push(Aa[A6]);}}else{var Aj=/^(odd|even)|(\d+)n((\+|\-)(\d+))?$/.exec(At);var Br=parseInt(Aj[2],10);var AL=(Aj[1]==="even")?1:0;var Ak=2;if(Br>0){Ak=Br;var AG=(Aj[4])?parseInt((Aj[4]+Aj[5]),10):0;AL=AG-1;}for(var A4=0,Bj=Aa.length;A4<Bj;A4++){AP=Aa[A4];AQ=AP.parentNode;if(!AQ.childElms){Bn=AQ.childNodes;AM=[];var Au=AQ.firstChild;if(Au.nodeType===1){AM.push(Au);}while(Au&&Au.nextSibling){Au=Au.nextSibling;if(Au.nodeType===1){AM.push(Au);}}AQ.childElms=true;As.push(AQ);for(var BW=AL,BN=AM.length;BW<BN;BW=BW+Ak){if(BW<0){continue;}Bk=AM[BW];if(!Bk.added&&Bk.nodeName===AP.nodeName){Bk.added=true;Ay.push(AP);}}}}Aw();Ap();}}BZ=Ay;}else{if(/first-of-type/.test(L)){for(var BX=0,AF=Aa.length;BX<AF;BX++){AP=Aa[BX];AQ=AP.parentNode;AW=AQ.getElementsByTagName(AP.nodeName);Z=AW[0];if(Z===AP){Ay.push(AP);}}BZ=Ay;}else{if(/last-of-type/.test(L)){for(var O=0,Bv=Aa.length,Q;O<Bv;O++){AP=Aa[O];if(!AP.added){AQ=AP.parentNode;AW=AQ.getElementsByTagName(AP.nodeName);Bs=AW[AW.length-1];while(Bs.parentNode!==AQ){Bs=Bs.parentNode;}if(Bs===AP){AP.added=true;Ay.push(AP);}}}Aw();BZ=Ay;}else{if(/only-of-type/.test(L)){for(var A3=0,J=Aa.length;A3<J;A3++){AP=Aa[A3];AQ=AP.parentNode;AW=AQ.getElementsByTagName(AP.nodeName);if(AW.length===1){Ay.push(AP);}}BZ=Ay;}else{if(/nth-of-type/.test(L)){var Y=parseInt(At,10);for(var N=0,Bf=Aa.length;N<Bf;N++){AP=Aa[N];AQ=AP.parentNode;AM=[];AW=AQ.childNodes;if(AW.length>=Y){for(var AZ=0,Ax=AW.length,Bq;AZ<Ax;AZ++){if(AZ===Y){break;}Bq=AW[AZ];if(Bq.nodeName===AP.nodeName){AM.push(Bq);}}Bk=AM[AM.length-1];if(Bk&&Bk===AP){Ay.push(AP);}}}BZ=Ay;}else{if(/empty/.test(L)){for(var Bt=0,Al=Aa.length;Bt<Al;Bt++){AP=Aa[Bt];AQ=AP.parentNode;Bn=AQ.childNodes;if(Bn.length===0){Ay.push(AP);}}BZ=Ay;}else{if(/enabled/.test(L)){for(var Bw=0,K=Aa.length;Bw<K;Bw++){AP=Aa[Bw];if(!AP.disabled){Ay.push(AP);}}BZ=Ay;}else{if(/disabled/.test(L)){for(var Bz=0,AO=Aa.length;Bz<AO;Bz++){AP=Aa[Bz];if(AP.disabled){Ay.push(AP);}}BZ=Ay;}else{if(/checked/.test(L)){for(var H=0,S=Aa.length;H<S;H++){AP=Aa[H];if(AP.checked){Ay.push(AP);}}BZ=Ay;}else{if(/contains/.test(L)){var F=new RegExp("(^|\\s||\\b)"+At+"(\\b|\\s|$)");for(var AR=0,A1=Aa.length;AR<A1;AR++){AP=Aa[AR];if(!AP.added){if(F.test(AP.innerText)){AP.added=true;Ay.push(AP);}}}Aw();BZ=Ay;}}}}}}}}}}}}}}}}}for(var U=0,AS=BZ.length;U<AS;U++){Ao.push(BZ[U]);}}return Ao;};}return DOMAssistant.cssSelect.call(this,C);},elmsByClass:function(D,C){if(document.evaluate){DOMAssistant.elmsByClass=function(J,E){var G=new A();if(this.getElementsByClassName&&!E){var I=this.getElementsByClassName(J);for(var H=0,F=I.length;H<F;H++){G.push(I[H]);}}else{var L=document.evaluate(".//"+((typeof E==="string")?E:"*")+"[contains(concat(' ', @class, ' '), ' "+J+" ')]",this,null,0,null);var K=L.iterateNext();while(K){G.push(K);K=L.iterateNext();}}return G;};}else{DOMAssistant.elmsByClass=function(K,E){var H=new A();var J;if(E&&typeof E==="object"){J=(E.constructor===Array)?E:[E];}else{J=this.getElementsByTagName(E||"*");}var G=new RegExp("(^|\\s)"+K+"(\\s|$)");for(var I=0,L,F=J.length;I<F;I++){L=J[I];if(G.test(L.className)){H.push(L);}}return H;};}return DOMAssistant.elmsByClass.call(this,D,C);},elmsByAttribute:function(D,E,C,F){if(document.evaluate){DOMAssistant.elmsByAttribute=function(H,I,G,K){var J=new A();var M="@"+H+((typeof I==="undefined"||I==="*")?"":" = '"+I+"'");if(typeof K==="string"){switch(K){case"^":M="starts-with(@"+H+", '"+I+"')";break;case"$":M="substring(@"+H+", (string-length(@"+H+") - "+(I.length-1)+"), 6) = '"+I+"'";break;case"*":M="contains(concat(' ', @"+H+", ' '), '"+I+"')";break;}}var N=document.evaluate(".//"+((typeof G==="string")?G:"*")+"["+M+"]",this,null,0,null);var L=N.iterateNext();while(L){J.push(L);L=N.iterateNext();}return J;};}else{DOMAssistant.elmsByAttribute=function(O,N,R,J){var G=new A();if(window.ActiveXObject&&document.all){O=O.replace(/class/,"className");}var H=(typeof N==="undefined")?null:("(^|\\s)"+N+"(\\s|$)");if(typeof J==="string"){switch(J){case"^":H=("^"+N);break;case"$":H=(N+"$");break;case"*":H=(N);break;}}var Q=new RegExp(H);var I;if(R&&typeof R==="object"){I=(R.constructor===Array)?R:[R];}else{I=this.getElementsByTagName(R||"*");}for(var K=0,P=I.length,M,L;K<P;K++){M=I[K];L=M.getAttribute(O,2);if(typeof L==="string"&&L.length>0){if(!Q||typeof Q==="undefined"||(Q&&Q.test(L))){G.push(M);}}}return G;};}return DOMAssistant.elmsByAttribute.call(this,D,E,C,F);},elmsByTag:function(C){if(document.evaluate){DOMAssistant.elmsByTag=function(D){var E=new A();var G=document.evaluate(".//"+((typeof D==="string")?D:"*"),this,null,0,null);var F=G.iterateNext();while(F){E.push(F);F=G.iterateNext();}return E;};}else{DOMAssistant.elmsByTag=function(D){var F=new A();var H=this.getElementsByTagName(D);for(var G=0,E=H.length;G<E;G++){F.push(H[G]);}return F;};}return DOMAssistant.elmsByTag.call(this,C);}};}();DOMAssistant.initCore();DOMAssistant.AJAX=function(){var D=null;var A=0;var B=-1;var C="";return{publicMethods:["get","post","load","replaceWithAJAXContent"],initRequest:function(){var E=null;if(typeof XMLHttpRequest!=="undefined"){E=new XMLHttpRequest();}else{if(typeof window.ActiveXObject!=="undefined"){try{E=new window.ActiveXObject("Msxml2.XMLHTTP.4.0");}catch(H){try{E=new window.ActiveXObject("MSXML2.XMLHTTP");}catch(G){try{E=new window.ActiveXObject("Microsoft.XMLHTTP");}catch(F){E=null;}}}}}return E;},get:function(F,G,E){return DOMAssistant.AJAX.makeCall.call(this,F,G,"GET",E);},post:function(E,F){return DOMAssistant.AJAX.makeCall.call(this,E,F,"POST");},load:function(E,F){DOMAssistant.AJAX.get.call(this,E,DOMAssistant.AJAX.replaceWithAJAXContent,(F||false));},makeCall:function(G,H,J,F){var E=DOMAssistant.AJAX.initRequest();if(E){D=E;var I=function(P){var O=G.split("?");var L=(J==="POST")?O[0]:G;E.open(J,L,true);E.setRequestHeader("AJAX","true");var N=null;if(J==="POST"){var M=O[1];var K=(M)?M.length:0;N=M;E.setRequestHeader("Content-type","application/x-www-form-urlencoded");E.setRequestHeader("Content-length",K);E.setRequestHeader("Connection","close");}if(typeof H==="function"){E.onreadystatechange=function(){if(E.readyState===4){H.call(P,E.responseText,F);A=4;B=E.status;C=E.statusText;D=null;E=null;}};}E.send(N);}(this);}return this;},replaceWithAJAXContent:function(I,M){if(M){this.innerHTML+=I;}else{var E=this.elmsByTag("*");for(var H=0,L=E.length,K,J;H<L;H++){K=E[H];J=K.attributes;if(J){for(var F=0,G=J.length;F<G;F++){if(typeof K[J[F].name]==="function"){K[J[F].name]=null;}}}}this.innerHTML=I;}},getReadyState:function(){return(D&&typeof D.readyState!=="undefined")?D.readyState:A;},getStatus:function(){return B;},getStatusText:function(){return C;}};}();DOMAssistant.attach(DOMAssistant.AJAX);DOMAssistant.CSS=function(){return{addClass:function(B){var A=this.className;if(!new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i").test(A)){this.className=A+((A.length>0)?" ":"")+B;}return this;},removeClass:function(B){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(C){var D="";if(new RegExp("^\\s+.*\\s+$").test(C)){D=C.replace(/(\s+).+/,"$1");}return D;}).replace(/^\s+|\s+$/g,"");return this;},replaceClass:function(B,C){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(D,G,F){var E=G+C+F;if(new RegExp("^\\s+.*\\s+$").test(D)){E=D.replace(/(\s+).+/,"$1");}return E;}).replace(/^\s+|\s+$/g,"");return this;},hasClass:function(A){return new RegExp(("(^|\\s)"+A+"(\\s|$)"),"i").test(this.className);},getStyle:function(B){var A="";if(document.defaultView&&document.defaultView.getComputedStyle){A=document.defaultView.getComputedStyle(this,"").getPropertyValue(B);}else{if(this.currentStyle){A=B.replace(/\-(\w)/g,function(C,D){return D.toUpperCase();});A=this.currentStyle[A];}}return A;}};}();DOMAssistant.attach(DOMAssistant.CSS);DOMAssistant.Content=function(){return{prev:function(){var A=this.previousSibling;while(A&&A.nodeType!==1){A=A.previousSibling;}return DOMAssistant.$(A);},next:function(){var A=this.nextSibling;while(A&&A.nodeType!==1){A=A.nextSibling;}return DOMAssistant.$(A);},create:function(C,B,A,D){var E=DOMAssistant.$(document.createElement(C));if(B){E.setAttributes(B);}if(typeof D!=="undefined"){E.addContent(D);}if(A){DOMAssistant.Content.addContent.call(this,E);}return E;},setAttributes:function(A){for(var B in A){if(/class/i.test(B)){this.className=A[B];}else{this.setAttribute(B,A[B]);}}return this;},addContent:function(A){if(typeof A==="string"){this.innerHTML+=A;}else{this.appendChild(A);}return this;},replaceContent:function(B){for(var E=(this.childNodes.length-1),F,A;E>=0;E--){F=this.childNodes[E];A=F.attributes;if(A){for(var C=0,D=A.length;C<D;C++){if(typeof F[A[C].name]==="function"){F[A[C].name]=null;}}}F.parentNode.removeChild(F);}DOMAssistant.$(this).addContent(B);return this;},remove:function(){this.parentNode.removeChild(this);return null;}};}();DOMAssistant.attach(DOMAssistant.Content);DOMAssistant.Events=function(){var A=1;return{publicMethods:["addEvent","removeEvent","preventDefault","cancelBubble"],init:function(){window.addEvent=this.addEvent;window.removeEvent=this.removeEvent;DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble;},addEvent:function(C,E){var B=(/^DOM/.test(C));if(B){if(this.addEventListener){this.addEventListener(C,E,false);}}else{if(!this.uniqueHandlerId){this.uniqueHandlerId=A++;}var F=false;if(E.attachedElements&&E.attachedElements[this.uniqueHandlerId]){F=true;}if(!F){if(!this.events){this.events={};}if(!this.events[C]){this.events[C]=[];var D=this["on"+C];if(D){this.events[C].push(D);}}this.events[C].push(E);this["on"+C]=DOMAssistant.Events.handleEvent;if(typeof this.window==="object"){this.window["on"+C]=DOMAssistant.Events.handleEvent;}E.attachedElements={};E.attachedElements[this.uniqueHandlerId]=true;}}return this;},handleEvent:function(B){var H=B||event;var I=H.target||H.srcElement||document;while(I.nodeType!==1&&I.parentNode){I=I.parentNode;}H.eventTarget=I;var F=H.type;var C=this.events[F];var G=C.length;var E;for(var D=0;D<G;D++){E=C[D].call(this,H);if(D===(G-1)){return E;}}},removeEvent:function(B,E){var C=this.events[B];for(var D=0;D<C.length;D++){if(C[D]===E){delete C[D];C.splice(D,1);}}E.attachedElements[this.uniqueHandlerId]=null;return this;},preventDefault:function(B){if(B&&B.preventDefault){DOMAssistant.Events.preventDefault=function(C){C.preventDefault();};}else{DOMAssistant.Events.preventDefault=function(C){event.returnValue=false;};}return DOMAssistant.Events.preventDefault(B);},cancelBubble:function(B){if(B&&B.stopPropagation){DOMAssistant.Events.cancelBubble=function(C){C.stopPropagation();};}else{DOMAssistant.Events.cancelBubble=function(C){event.cancelBubble=true;};}return DOMAssistant.Events.cancelBubble(B);}};}();DOMAssistant.attach(DOMAssistant.Events);DOMAssistant.DOMLoad=function(){var DOMLoaded=false;var DOMLoadTimer=null;var functionsToCall=[];var addedStrings={};var errorHandling=null;var execFunctions=function(){for(var i=0,il=functionsToCall.length;i<il;i++){try{functionsToCall[i]();}catch(e){if(errorHandling&&typeof errorHandling==="function"){errorHandling(e);}}}functionsToCall=[];};var DOMHasLoaded=function(){if(DOMLoaded){return ;}DOMLoaded=true;execFunctions();};
/*@cc_on @*/
/*@if (@_win32 || @_win64)
		if (document.getElementById) {
			document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");
		    document.getElementById("ieScriptLoad").onreadystatechange = function() {
		        if (this.readyState === "complete") {
		            DOMHasLoaded();
		        }
		    };
		}
	/*@end @*/
if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMHasLoaded,false);}if(/KHTML|WebKit|iCab/i.test(navigator.userAgent)){DOMLoadTimer=setInterval(function(){if(/loaded|complete/i.test(document.readyState)){DOMHasLoaded();clearInterval(DOMLoadTimer);}},10);}window.onload=DOMHasLoaded;return{DOMReady:function(){for(var i=0,il=arguments.length,funcRef;i<il;i++){funcRef=arguments[i];if(!funcRef.DOMReady&&!addedStrings[funcRef]){if(typeof funcRef==="string"){addedStrings[funcRef]=true;funcRef=new Function(funcRef);}funcRef.DOMReady=true;functionsToCall.push(funcRef);}}if(DOMLoaded){execFunctions();}},setErrorHandling:function(funcRef){errorHandling=funcRef;}};}();DOMAssistant.DOMReady=DOMAssistant.DOMLoad.DOMReady;