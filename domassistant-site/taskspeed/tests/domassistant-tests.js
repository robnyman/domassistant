// TaskSpeed, the DOMAssistant way
window.tests = {

    "make": function(){ 
		for (var i=0, body=$$(document.body); i<250; i++) {
			body.create('ul', { id: 'setid'+i, 'class':'fromcode' }, true, '<li>one</li><li>two</li><li>three</li>');
		}
		return $('ul.fromcode').length;
    },

    "indexof" : function(){
		for (var i=0, idx=-1, elm=$$('setid150'); i<20; i++) {
			idx = $('ul').indexOf(elm);
		}
		return idx;
    },

    "bind" : function(){
		var fn = function(){};
		return $('ul > li').addEvent('click', fn).length;
    },

    "attr" : function(){
		return $('ul').map( function() { return this.id; } ).length;
    },

    "bindattr" : function(){
        var fn = function(){};
        return $('ul > li').addEvent('mouseover', fn).setAttributes({'rel':'touched'}).removeEvent('mouseover', fn).length;
    },

    "table": function(){
		for (var i=0, body=$$(document.body); i<40; i++) {
			body.addContent('<table class="madetable"><tr><td></td><td>first</td></tr></table>');
		}
		return $('tr td').length;
    },

    "addanchor" : function(){
		return $(".fromcode > li").addContent("<a href='http://example.com'>link</a>").length;
    },

    "append": function(){
		for(var i=0, body=$$(document.body); i<500; i++){
			body.create('div', {'rel':'foo2'}, true);
		}
		return $('div[rel^=foo2]').length;
    },

    "addclass-odd" : function(){
		return $('div').addClass('added').filter( function(elm, idx) { return (idx % 2 === 1); }).addClass('odd').length;
    },

    "style" : function(){
		return $('.added').setStyle({'background-color':'#ededed','color':'#fff'}).length;
    },

    "removeclass" : function(){
		return $('.added').removeClass('added').length;
    },

    "sethtml": function(){
		return $('div').replaceContent('<p>new content</p>').length;
    },

    "insertbefore" : function(){
		var p = $$(document).create('p', null, false, 'A Link');
		return $('.fromcode a').each( function() {
			this.parentNode.insertBefore(p.cloneNode(true), this);
		}).length;
    },

    "insertafter" : function(){
 		var p = $$(document).create('p', null, false, 'After Link');
		return $('.fromcode a').each( function() {
			this.parentNode.appendChild(p.cloneNode(true));
		}).length;
    },

    "destroy": function(){
		var result = $('.fromcode'), len = result.length;
		result.remove();
		return len;
    },

    "finale": function(){
		document.body.innerHTML = '';
		return $('body *').length;
    }

};