var inline = 0,
	inline_add = function() {
		inline++;
	};

SugarTest()
  .before(function() {
    //this.extra = 'extrawadus';
    this.ajaxtimeout = 500;
  })
  .context('')
    .before(function() {
      //this.wadus = 'w';
    })
    .it('Selects id correctly', function() {
      var elm = $$('01abc');
      this.assertEqual('abc_2', elm.innerText || elm.textContent);
      this.assertNull($$('03abc'));
    })
    .it('All methods attached to elements correctly', function() {
      var methods = 'each first end indexOf map filter every some hasChild prev next cssSelect elmsByClass elmsByAttribute elmsByTag ajax get post load addClass removeClass replaceClass hasClass setStyle getStyle create setAttributes addContent replaceContent replace remove triggerEvent addEvent removeEvent relayEvent unrelayEvent preventDefault cancelBubble'.split(' ');
      var elms = $('div');
      for (var i=0; i<methods.length; i++) {
	      this.assertRespondsTo(methods[i], elms);
      }
      var elm = $$('01abc');
      for (var i=8; i<methods.length; i++) {
	      this.assertRespondsTo(methods[i], elm);
      }
    })
    .describe('CSS -')
    .it('Class manipulation', function() {
      var elm = $(document.getElementById('01abc'));
      elm.addClass('klassA');
      this.assertHasClass(elm, 'klassA');
      elm.addClass('klassB klassC klassD');
      this.assertHasClass(elm, 'klassC');
      var elm2 = elm.addClass('klassE');
      this.assertIdentical(elm, elm2);
      elm.removeClass('klassA');
      this.assertNotHasClass(elm, 'klassA');
      this.assert(elm.hasClass('klassB'));
      elm2 = elm.removeClass('klassE');
      this.assertIdentical(elm, elm2);
      elm = $(document.getElementById('test_01').getElementsByTagName('span')[2]);
      this.assertHasClass(elm, 'klassE');
      elm.addClass('klassG');
      this.assertHasClass(elm, 'klassG');
      this.assertEqual('klassE klassF klassG', elm.className);
      elm.replaceClass('klassG', 'klassH');
      this.assertNotHasClass(elm, 'klassG');
      this.assertHasClass(elm, 'klassH');
      this.assertEqual('klassE klassF klassH', elm.className);
      elm.replaceClass('klassF', 'klassI');
      this.assertNotHasClass(elm, 'klassF');
      this.assertHasClass(elm, 'klassI');
      this.assertEqual('klassE klassI klassH', elm.className);
      elm.addClass('klassJ');
      this.assertEqual('klassE klassI klassH klassJ', elm.className);
      elm.removeClass('klassI');
      this.assertEqual('klassE klassH klassJ', elm.className);
      elm.removeClass('klassXXX');
      this.assertEqual('klassE klassH klassJ', elm.className);
      elm.removeClass('klassE');
      this.assertEqual('klassH klassJ', elm.className);
      elm.removeClass('klassJ');
      this.assertEqual('klassH', elm.className);
      elm.addClass('klassK').addClass('klassL').addClass('klassM').addClass('klassN');
      this.assertEqual('klassH klassK klassL klassM klassN', elm.className);
      elm.removeClass('klassL');
      this.assertEqual('klassH klassK klassM klassN', elm.className);
      this.assertNotHasClass(elm, 'klassL');
    })
    .it('Gets and sets style', function() {
      var elm = $(document.getElementById('test_01').getElementsByTagName('span')[3]);
      this.assertIdentical('block', elm.getStyle('display'));
      elm.setStyle('left', '2px');
      this.assertEqual('2px', elm.style.left);
      elm.setStyle('margin-top', '1px');
      this.assertEqual('1px', elm.style.marginTop);
      elm.setStyle({ 'margin-top': '2px', 'left': '-1px' });
      this.assertEqual('-1px', elm.style.left);
      this.assertEqual('2px', elm.style.marginTop);
      this.assertEqual('none', elm.getStyle('float'));
      elm.setStyle('float', 'left');
      this.assertEqual('left', elm.getStyle('float'));
      this.assertEqual(1, elm.getStyle('opacity'));
      elm.setStyle({ opacity: 0.5 });
      this.assertEqual(0.5, elm.getStyle('opacity'));
      elm.setStyle('opacity', 0);
      this.assertEqual(0, elm.getStyle('opacity'));
      elm.setStyle({ opacity: 1 });
      this.assertEqual(1, elm.getStyle('opacity'));
      elm.setStyle({ opacity: 0 });
      this.assertEqual(0, elm.getStyle('opacity'));
      elm.setStyle('font-size', '15px');
      this.assertEqual('15px', elm.getStyle('font-size'));
      elm.setStyle({ 'text-decoration': 'underline', 'font-size': '14px' });
      this.assertEqual('14px', elm.getStyle('font-size'));
      this.assertEqual('underline', elm.getStyle('text-decoration'));
      elm.setStyle({ 'float': 'right', 'border-top-width': '2px', 'opacity': 0.23 });
      this.assertEqual('2px', elm.getStyle('border-top-width'));
      this.assertEqual('right', elm.getStyle('float'));
      this.assertEqual(0.23, elm.getStyle('opacity'));
      elm = $('span.klassM').first();
      this.assertEqual('block', elm.getStyle('display'));
      this.assertEqual('11px', elm.getStyle('font-size'));
      this.assertEqual('1px', elm.getStyle('border-top-width'));
      this.assertEqual('dotted', elm.getStyle('border-left-style'));
      
      this.assertEqual(0, $$('foo').getStyle('opacity'), 'get opacity set via stylesheet');
      $$('foo').setStyle({ opacity: 0.6 });
      this.assertEqual(0.6, $$('foo').getStyle('opacity'), 'get opacity set via setStyle()');

      // Box dimensions - does not work correctly. A 'real' dimensions module is needed.
      /*
      var newDiv = $(document.body).create('div');
      newDiv.setStyle({position:'absolute', display:'block', top:'0px', left: '0px', width: '105px', height: '58px'});
      this.assertEqual('105px', newDiv.getStyle('width'));
      this.assertEqual('58px', newDiv.getStyle('height'));
      */
    })
    .end()
    .describe('Content manipulation -')
      .it('Creates new element', function() {
      	var elm = $(document.getElementById('test_02'));
      	var inner = elm.create('span');
        this.assertEqual(null, elm.firstChild);
        inner.setAttributes({ id: 'test_02_span_01' });
        this.assertEqual('test_02_span_01', inner.id);
      	inner = elm.create('span', { id: 'test_02_span_02' }, true);
        this.assertEqual('SPAN', elm.firstChild.nodeName.toUpperCase());
        this.assertEqual('test_02_span_02', inner.id);
        inner.setStyle('font-size', '11px');
        this.assertEqual('11px', inner.getStyle('font-size'));
        var p = elm.create('p', { id: 'test_02_p_01' }, true, 'testing 123');
        this.assertIdentical(p, inner.nextSibling);
        p.setAttributes({'foo': 'foo'});
        this.assertEqual('foo', p.getAttribute('foo'));
      })
      .it('Creates all possible types of new elements', function() {
	      var XHTML_TAGS = 'a abbr acronym address area b bdo big blockquote br button caption cite code col colgroup dd del dfn div dl dt em fieldset form h1 h2 h3 h4 h5 h6 hr i iframe img input ins kbd label legend li map object ol optgroup option p param pre q samp script select small span strong style sub sup table tbody td textarea tfoot th thead tr tt ul var'.split(' ');
	      var parent = $$('test_04');
	      for (var i=0, iL=XHTML_TAGS.length; i<iL; i++) {
	      	var id = XHTML_TAGS[i] + '_' + i, elm = parent.create(XHTML_TAGS[i], {id: id}, true);
			this.assertEqual(XHTML_TAGS[i], elm.tagName.toLowerCase());
			this.assertEqual(elm, parent.lastChild);
			this.assertEqual(id, elm.id);
			this.assertRespondsTo('cssSelect', elm);
	      }
	  })
      .it('Adds content', function() {
      	var elm = $(document.getElementById('test_02'));
      	elm.addContent('<span id="test_02_span_03">testing span</span><p id="test_02_p_02">testing p</p>')
      	var oldp = $$('test_02_p_01');
        this.assertEqual('foo', oldp.getAttribute('foo'));
        this.assertEqual('test_02_span_03', oldp.nextSibling.id);
        this.assertEqual('testing span', oldp.nextSibling.innerHTML);
        this.assertEqual('test_02_p_02', oldp.nextSibling.nextSibling.id);
        elm.addContent($(document).create('div'));
        this.assertEqual('DIV', elm.lastChild.nodeName.toUpperCase());
        elm.addContent('loose string');
        this.assertEqual('loose string', elm.lastChild.nodeValue);
        elm.addContent(123.45);
        this.assertEqual('123.45', elm.lastChild.nodeValue);
      })
      .it('Replaces content', function() {
      	var elm = $(document.getElementById('test_02_span_03'));
      	this.assertEqual('testing span', elm.innerText || elm.textContent);
      	elm.replaceContent('new string')
      	this.assertEqual('new string', elm.innerText || elm.textContent);
      	elm.replaceContent('')
      	this.assertEqual('', elm.innerHTML);
      	elm.replaceContent($(document).create('span', null, false, 'inner content'))
      	this.assertEqual('inner content', elm.firstChild.innerText || elm.firstChild.textContent);
      	elm.replaceContent(987)
      	this.assertEqual('987', elm.innerText || elm.textContent);
      })
      .it('Replaces current element', function() {
      	var elm = $(document.getElementById('test_02_span_03'));
      	var zzz = elm.replace('<span id="test_02_span_04" align="center">zzz</span>');
      	this.assertNull(document.getElementById('test_02_span_03'));
      	this.assertEqual('987', zzz.innerHTML);
      	elm = $(document.getElementById('test_02_span_04'));
      	var bbb = elm.replace('<span id="test_02_span_05" align="center">bbb</span>', true);
      	this.assertEqual('bbb', bbb.innerText || bbb.textContent);
      	elm = $(document.getElementById('test_02_span_05'));
      	elm.replace($(document).create('p', { id: 'test_02_p_03'}));
      	this.assertNotNull(document.getElementById('test_02_p_03'));
      })
      .it('Removes content', function() {
      	$(document.getElementById('test_02_p_03')).remove();
      	this.assertNull(document.getElementById('test_02_p_03'));
      	$('#test_02 > *').remove();
      	var elm = document.getElementById('test_02');
      	this.assertEqual('loose string123.45', elm.innerText || elm.textContent);
      })
    .end()
    .describe('Attributes manipulation -')
      .it('Sets regular attributes', function() {
      	var a = $('#test_03 a').first();
      	a.setAttributes( { id: 'test_03_a_01', href: 'http://domassistant.com/', title: 'Home of DOMAssistant' } );
        this.assertEqual('test_03_a_01', a.id);
        this.assertEqual('http://domassistant.com/', a.href);
        this.assertEqual('Home of DOMAssistant', a.title);
        var p = $(document).create('p');
        p.setAttributes( { id: 'test_03_p_01', foo: 'bar', xYz: 'withUpperCase' } );
        this.assertEqual('test_03_p_01', p.id);
        this.assertEqual('bar', p.getAttribute('foo'));
        this.assertEqual('withUpperCase', p.getAttribute('xYz'));
        this.assertEqual('withUpperCase', p.getAttribute('xyz'));
      })
      .it('Sets attributes with camelCase', function() {
      	var td = $('#test_03_tr_01 td').first();
      	td.setAttributes( { cellspacing: 3, cellpadding: 3, colspan: 2, rowspan: 2, valign: 'top', 'class': 'klassABC' } );
        this.assertEqual(3, td.getAttribute('cellspacing'));
        this.assertEqual(3, td.getAttribute('cellpadding'));
        this.assertEqual(2, td.getAttribute('colspan'));
        this.assertEqual(2, td.getAttribute('rowspan'));
        this.assertEqual('top', td.getAttribute('valign'));
        this.assertHasClass(td, 'klassABC');
        var input = $('#test_03 input').first();
        this.assert(!input.getAttribute('readonly'));
      	input.setAttributes( { tabindex: 3, maxlength: 10, accesskey: 'k', readonly: 'readonly' } );
        this.assertEqual(3, input.getAttribute('tabindex'));
        this.assertEqual(10, input.getAttribute('maxlength'));
        this.assertEqual('k', input.getAttribute('accesskey'));
        this.assert(input.getAttribute('readonly'));
      })
      .it('Sets attributes with issues', function() {
        var input1 = $('#test_03 input').first();
       	input1 = input1.setAttributes( { type: 'password', name: 'testName' } );
        this.assertEqual('password', input1.getAttribute('type'));
        this.assertEqual('testName', input1.getAttribute('name'));
        var input2 = $('#test_03 input').first().next();
       	input2.setAttributes( { style: 'border-top-width:1px;margin-bottom:2px;' } );
        this.assertEqual('1px', input2.getStyle('border-top-width'));
        this.assertEqual('2px', input2.getStyle('margin-bottom'));
      })
    .end()
    .describe('Traversal -')
      .it('hasChild', function() {
      	var elm = $$('test_06');
      	this.assertEqual(false, elm.hasChild($$('test_06')), 'same element');
      	this.assertEqual(false, elm.hasChild($$('test_05'), 'same level'));
      	this.assertEqual(true, elm.hasChild($$('outer')), 'direct child');
      	this.assertEqual(true, elm.hasChild($$('inner')), 'indirect child');
      	this.assertEqual(false, elm.hasChild($$('testdata')), 'parent');
      	this.assertEqual(true, $$(document).hasChild(elm), 'document is context');
      })
      .it('prev and next', function() {
      	var a = $('#test_03 a').first();
        this.assertIdentical(a, a.next().prev());
        var newElm = $$('test_03').create('p', null, true);
        this.assertIdentical(a, newElm.prev().prev().prev().prev());
        this.assertIdentical(newElm, a.next().next().next().next());
      })
      .it('first', function() {
      	var a = $('#test_03 a').first();
        this.assertIdentical($('#test_03 a')[0], a);
        a = $('#test_03 a.nonexist').first();
        this.assertNull(a);
      })
      .it('With comment and text nodes', function() {
        var p = $('#traversal p');
        this.assertIdentical(3, p.length);
        this.assertNull(p.first().prev());
        this.assertNull(p.first().next().next().next());
        this.assertIdentical(p.first(), p.first().next().next().prev().prev());
      })
      .it('Chaining', function() {
        this.assertNotHasClass($$('test_03'), 'klassZ');
      	var elms = $('#test_03').create('p', null, true).end().addClass('klassZ');
        this.assertIdentical(elms[0], elms.first());
        this.assertIdentical($$('test_03'), elms[0]);
        this.assertHasClass($$('test_03'), 'klassZ');
        this.assertNotHasClass($$('test_03'), 'klassY');
      	elms = $('#test_03').create('span', null, true).create('span', null, true).create('span', null, true).end().end().end().addClass('klassY');
        this.assertIdentical($$('test_03'), elms[0]);
        this.assertHasClass($$('test_03'), 'klassY');
        this.assertEqual(1, $('#test_03 span span span').length);
      })
      .it('Loops through each element', function() {
      	$('#test_03 span').each( function() {
      		this.addClass('klassX');
      		this.setStyle('opacity', 0.5);
      	});
      	var elms = $('#test_03 span');
      	for (var i=0, iL=elms.length; i<iL; i++) {
      		this.assertHasClass(elms[i], 'klassX');
      		this.assertEqual(0.5, elms[i].getStyle('opacity'));
      	}
      })
    .end()
    .describe('Ajax -')
      .before(function() {
      	this.ctx = $$('test_05');
      })
      .after(function() {
      	this.ctx.innerHTML = '';
      	delete this.ctx;
      })
      .it('Simple get', function() {
      	this.assertEqual('', this.ctx.innerHTML);
      	this.ctx.get('assets/ajax_text.htm', function(response) {
      		this.innerHTML = response;
      	});
      	this.wait(this.ajaxtimeout, function() {
        	this.assertEqual(4, DOMAssistant.AJAX.getReadyState());
        	this.assertEqual(location.protocol === 'file:'? 0: 200, DOMAssistant.AJAX.getStatus());
        	this.assertIdentical('SPAN', this.ctx.firstChild.firstChild.tagName.toUpperCase());
        	this.assertIdentical(true, /abcdef/.test(this.ctx.innerHTML));
        });
        /*
      	this.ctx.get('assets/nosuchfile.htm', function(response) {
      		//this.innerHTML = response;
      	});
      	this.wait(this.ajaxtimeout, function() {
        	//this.assertEqual(4, DOMAssistant.AJAX.getReadyState());
        	this.assertEqual(location.protocol === 'file:'? 0: 200, DOMAssistant.AJAX.getStatus());
        });
        */
      })
      .it('Simple post', function() {
      	this.ctx.innerHTML = '';
      	this.assertEqual('', this.ctx.innerHTML);
      	this.ctx.post('assets/ajax.php?arg=abc', function(response) {
      		this.innerHTML = response;
      	});
      	this.wait(this.ajaxtimeout, function() {
        	this.assertEqual(4, DOMAssistant.AJAX.getReadyState());
        	this.assertEqual(location.protocol === 'file:'? 0: 200, DOMAssistant.AJAX.getStatus());
        	this.assertIdentical('SPAN', this.ctx.firstChild.tagName.toUpperCase());
        	this.assertIdentical(true, /Hej/.test(this.ctx.innerHTML));
        });
      })
      .it('Simple load', function() {
      	this.ctx.innerHTML = '';
      	this.assertEqual('', this.ctx.innerHTML);
      	this.ctx.load('assets/ajax_text.htm', false);
      	this.wait(this.ajaxtimeout, function() {
        	this.assertEqual(4, DOMAssistant.AJAX.getReadyState());
        	this.assertEqual(location.protocol === 'file:'? 0: 200, DOMAssistant.AJAX.getStatus());
        	this.assertIdentical('SPAN', this.ctx.firstChild.firstChild.tagName.toUpperCase());
        	this.assertIdentical(true, /abcdef/.test(this.ctx.innerHTML));
        	this.assertIdentical(1, this.ctx.cssSelect('div span:contains(abcdef)').length);
	      	this.ctx.load('assets/ajax_text.htm', true);
	      	this.wait(this.ajaxtimeout, function() {
	        	this.assertIdentical(2, this.ctx.cssSelect('div span:contains(abcdef)').length);
		      	this.ctx.load('assets/ajax_text.htm', false);
		      	this.wait(this.ajaxtimeout, function() {
		        	this.assertIdentical(1, this.ctx.cssSelect('div span:contains(abcdef)').length);
		        });
	        });
        });
      })
      .describe('Advanced config -')
		.it('JSON', function() {
			this.ctx.innerHTML = '';
			var cfg = {
				url : 'assets/ajax_json.htm',
				method : 'GET',
				params : 'name=DOMAssistant',
				callback : function(obj) {
					$$('test_05').create('p', null, true, obj.id);
					$$('test_05').create('p', null, true, obj.fruits.apple);
					$$('test_05').create('p', null, true, obj.drivers[1]);
				},
				headers : {
					'Content-type' : 'application/x-www-form-urlencoded'
				},
				responseType : 'json',
				timeout : 2000,
				exception : function(e) {
					alert('Ajax error: ' + (e.message || e.description));
				}
			};
			this.assertEqual('', this.ctx.innerHTML);
			this.ctx.ajax(cfg);
			this.wait(this.ajaxtimeout, function() {
				this.assertEqual(4, DOMAssistant.AJAX.getReadyState());
				this.assertEqual(location.protocol === 'file:'? 0: 200, DOMAssistant.AJAX.getStatus());
				var p = this.ctx.cssSelect('p').first();
				this.assertEqual('k8ddQ3i', p.innerHTML);
				p = p.next();
				this.assertEqual(15, p.innerHTML);
				p = p.next();
				this.assertEqual('Linc', p.innerHTML);
			});
		})
		.it('XML', function() {
			var curr = this;
			var cfg = {
				url : 'assets/ajax_xml.xml',
				callback : function(obj) {
					curr.xml = obj;
				},
				responseType : 'xml'
			};
			this.ctx.ajax(cfg);
			this.wait(this.ajaxtimeout, function() {
				// xml must be served with content-type = 'xml/text' in IE, so we can't test on local files
				if (!(DOMAssistant.isIE && location.protocol === 'file:')) {
					var root = this.xml.getElementsByTagName('chapter')[0];
					this.assertEqual('chapter', root.tagName);
					this.assertEqual('yes', root.getElementsByTagName('javadoc')[0].getAttribute('comments'));
				}
			});
		})
		.it('Timeout with JSON', function() {
			var curr = this;
			var cfg = {
				url : 'assets/selectors.html',	// huge file
				method : 'GET',
				responseType : 'json',
				timeout : 50,
				exception : function(e) {
					curr.timeout = true;
				}
			};
			this.ctx.ajax(cfg);
			this.wait(this.ajaxtimeout, function() {
				this.assertEqual(0, DOMAssistant.AJAX.getReadyState());
				this.assertEqual(408, DOMAssistant.AJAX.getStatus());
				this.assertEqual('Request timeout', DOMAssistant.AJAX.getStatusText());
				this.assert(this.timeout);
			});
		})
		.it('Timeout with TEXT', function() {
			var cfg = {
				url : 'assets/selectors.html',	// huge file
				timeout : 50
			};
			this.ctx.ajax(cfg);
			this.wait(this.ajaxtimeout, function() {
				this.assertEqual(0, DOMAssistant.AJAX.getReadyState());
				this.assertEqual(408, DOMAssistant.AJAX.getStatus());
				this.assertEqual('Request timeout', DOMAssistant.AJAX.getStatusText());
			});
		})
	  .end()
    .end()
    .describe('Selectors overview -')
      .before(function() {
      	this.ctx = $(document.body).create('blockquote', { id: 'test_99', style: 'display:none;' }, true);
        this.ctx.load('assets/selectors.html');
      })
      .after(function() {
      	//this.ctx.remove();
      })
      .it('With Slickspeed selector suite', function() {
  		this.wait(2000, function() {
	        this.assertEqual(document.body, $('body')[0]);
	        var selectors = { 
	        	'div': 19, 'div p': 51, 'div > p': 45, 'div + p': 9, 'div ~ p': 85,
	        	'div[class^=exa][class$=mple]': 12, 'div p a': 11, 'div, p, a': 307, '.note': 4, 'div.example': 12,
	        	'ul .tocline2': 11, 'div.example, div.note': 12, '#title': 1, 'h1#title': 1, 'div #title': 1,
	        	'ul.toc li.tocline2': 11, 'ul.toc > li.tocline2': 11, 'h1#title + div > p': 0, 'h1[id]:contains(Selectors)': 1, 'a[href][lang][class]': 0,
	        	'div[class]': 19, 'div[class=example]': 12, 'div[class^=exa]': 12, 'div[class$=mple]': 12, 'div[class*=e]': 18,
	        	'div[class|=dialog]': 0, 'div[class!=made_up]': 19, 'div[class~=example]': 12, 'div:not(.example)': 7, 'p:contains("selectors")': 26,
	        	'p:nth-child(even)': 68, 'p:nth-child(2n)': 68, 'p:nth-child(odd)': 69, 'p:nth-child(2n+1)': 69, 'p:nth-child(n)': 137,
	        	'p:only-child': 3, 'p:last-child': 12, 'p:first-child': 22, 'p:nth-last-child(-n+4)': 42, 'p:empty': 0,
	        	'code:only-of-type': 23, 'code:first-of-type': 51, 'code:last-of-type': 51, 'code:nth-of-type(5n-3)': 28, 'code:nth-last-of-type(-3n+7)': 58
	        };
	        for (var selector in selectors) {
	        	var elms = this.ctx.cssSelect(selector);
	        	this.assertEqual(selectors[selector], elms.length, selector);
	        	this.assertRespondsTo('cssSelect', elms);
	        }
	   	});
      })
      .it('With DOM mutations', function() {
        this.ctx = $$('test_99');
      	var elms = this.ctx.cssSelect('p:only-child');
      	this.assertEqual(3, elms.length);
      	elms.each( function() {
      		$(this.parentNode).create('p', null, true);
      	});
        this.assertEqual(0, this.ctx.cssSelect('p:only-child').length);
  	})
    .it('With legacy helper methods', function() {
        this.ctx = $$('test_99');
      	this.assertEqual(this.ctx.cssSelect('.example').length, this.ctx.elmsByClass('example').length);
      	this.assertEqual(this.ctx.cssSelect('div.example').length, this.ctx.elmsByClass('example', 'div').length);
      	this.assertEqual(this.ctx.cssSelect('[class]').length, this.ctx.elmsByAttribute('class').length);
      	this.assertEqual(this.ctx.cssSelect('.note').length, this.ctx.elmsByAttribute('class', 'note').length);
      	this.assertEqual(this.ctx.cssSelect('div.note').length, this.ctx.elmsByAttribute('class', 'note', 'div').length);
      	this.assertEqual(this.ctx.cssSelect('div[class]').length, this.ctx.elmsByAttribute('class', '*', 'div').length);
      	this.assertEqual(this.ctx.cssSelect('ul').length, this.ctx.elmsByTag('ul').length);
  	})
    .it('Element ordering', function() {
        var h = $$('elm_order').cssSelect('h1, h2, h3');
      	this.assertEqual('h1a', h[0].id);
      	this.assertEqual('h2a', h[1].id);
      	this.assertEqual('h3a', h[2].id);
      	this.assertEqual('h1b', h[3].id);
      	this.assertEqual('h2b', h[4].id);
      	this.assertEqual('h3b', h[5].id);
  	})
   .end()
    .describe('Selectors -')
      .before(function() {
        this.fn = function() {
        	return this.id;
        }
        this.get = function(selector) {
        	return $$('test_98').cssSelect(selector).map(this.fn);
        };
      })
      .after(function() {
      	//this.ctx.remove();
      })
      .it('element', function() {
		var all = $$('test_98').cssSelect('*'), good = true;
        this.assert(all.length >= 30, 'Select all');
        for (var i=0; i<all.length; i++) {
        	if (all[i].nodeType === 8) {
        		good = false;
        	}
        }
        this.assertEnumEqual(['firstp','ap','sndp','en','sap','first'], this.get('p'), 'Element selector');
        this.assertEnumEqual(['body'], $('body').map(this.fn), 'Element selector');
        this.assertEnumEqual(['html'], $('html').map(this.fn), 'Element selector');
        this.assertEnumEqual(['firstp','ap','sndp','en','sap','first'], this.get('div p'), 'Parent Element');
        this.assert($('#length').length);
        this.assert($('#lengthtest input').length);
      })
    .it('broken', function() {
        this.assertElementMatches([], $('['), 'Broken Selector');
        this.assertElementMatches([], $('('), 'Broken Selector');
        this.assertElementMatches([], $('{'), 'Broken Selector');
        this.assertElementMatches([], $('<'), 'Broken Selector');
        this.assertElementMatches([], $('()'), 'Broken Selector');
        this.assertElementMatches([], $('<>'), 'Broken Selector');
        this.assertElementMatches([], $('{}'), 'Broken Selector');
  	})
    .it('id', function() {
        this.assertEnumEqual(['body'], $('#body').map(this.fn), 'ID Selector');
        this.assertEnumEqual(['body'], $('body#body').map(this.fn), 'ID Selector w/ Element');
        this.assertEnumEqual([], this.get('ul#first'), 'ID Selector w/ Element');
        this.assertEnumEqual(['simon1'], this.get('#firstp #simon1'), 'ID selector with existing ID descendant');
        this.assertEnumEqual([], this.get('#firstp #foobar'), 'ID selector with non-existant descendant');
        this.assertEnumEqual(['台北Táiběi'], this.get('#台北Táiběi'), 'ID selector using UTF8');
        this.assertEnumEqual(['台北Táiběi', '台北'], this.get('#台北Táiběi, #台北'), 'Multiple ID selectors using UTF8');
        this.assertEnumEqual(['台北'], this.get('div #台北'), 'Descendant ID selector using UTF8');
        this.assertEnumEqual(['台北'], this.get('form > #台北'), 'Child ID selector using UTF8');

        this.assertEnumEqual(['radio1'], this.get('#form > #radio1'), 'ID Selector, child ID present');
        this.assertEnumEqual([], this.get('#form #first'), 'ID Selector, not an ancestor ID');
        this.assertEnumEqual([], this.get('#form > #option1a'), 'ID Selector, not a child ID');
        this.assertEnumEqual([], this.get('#form > #option1a'), 'ID Selector, not a child ID');
        this.assertEnumEqual(['sndp', 'en', 'sap'], this.get('#foo > *'), 'All Children of ID');
        
        $($$('test_98').parentNode).addContent('<a name="tName1">tName1 A</a><a name="tName2">tName2 A</a><div id="tName1">tName1 Div</div>');
        this.assertEqual('tName1', $('#tName1')[0].id, 'ID selector with same value for a name attribute');
        this.assertEqual(0, $('#tName2').length, 'ID selector non-existing but name attribute on an A tag');
        //this.assertEnumEqual(['lengthtest'], $('#lengthtest').map(this.fn), 'ID Selector on Form with an input that has a name of \'id\''); 
        this.assertEnumEqual([], this.get('#asdfasdf #foobar'), 'ID selector with non-existant ancestor');
  	})
    .it('class', function() {
        this.assertEnumEqual(['mark', 'simon'], this.get('.blog'), 'Class Selector');
        this.assertEnumEqual(['simon'], this.get('.blog.link'), 'Class Selector');
        this.assertEnumEqual(['mark', 'simon'], this.get('a.blog'), 'Class Selector w/ Element');
        this.assertEnumEqual(['mark', 'simon'], this.get('p .blog'), 'Parent Class Selector');
        
        this.assertEnumEqual(['utf8class1'], this.get('.台北Táiběi'), 'Class Selector using UTF8');
        this.assertEnumEqual(['utf8class1', 'utf8class2'], this.get('.台北'), 'Class Selector using UTF8');
        this.assertEnumEqual(['utf8class1'], this.get('.台北Táiběi.台北'), 'Class Selector using UTF8');
        this.assertEnumEqual(['utf8class1', 'utf8class2'], this.get('.台北Táiběi, .台北'), 'Class Selector using UTF8');
        this.assertEnumEqual(['utf8class1'], this.get('div .台北Táiběi'), 'Descendant class selector using UTF8');
        this.assertEnumEqual(['utf8class1'], this.get('form > .台北Táiběi'), 'Child class selector using UTF8');
  	})
    .it('multiple', function() {
        this.assertEnumEqual(["firstp","ap","mark","sndp","en","sap","simon","first"], this.get('a.blog, p'), 'Comma Support');
        this.assertEnumEqual(["firstp","ap","mark","sndp","en","sap","simon","first"], this.get('a.blog , p'), 'Comma Support');
        this.assertEnumEqual(["firstp","ap","mark","sndp","en","sap","simon","first"], this.get('a.blog ,p'), 'Comma Support');
        this.assertEnumEqual(["firstp","ap","mark","sndp","en","sap","simon","first"], this.get('a.blog,p'), 'Comma Support');
  	})
    .it('child and adjacent', function() {
        this.assertEnumEqual(["simon1","google","groups","mark","yahoo","simon"], this.get('p > a'), 'Child');
        this.assertEnumEqual(["simon1","google","groups","mark","yahoo","simon"], this.get('p> a'), 'Child');
        this.assertEnumEqual(["simon1","google","groups","mark","yahoo","simon"], this.get('p >a'), 'Child');
        this.assertEnumEqual(["simon1","google","groups","mark","yahoo","simon"], this.get('p>a'), 'Child');
        this.assertEnumEqual(["mark","simon"], this.get('p > a.blog'), 'Child w/ Class');
        this.assertEnumEqual(["anchor1","anchor2"], this.get('code > *'), 'All Children');
        this.assertEnumEqual(["anchor1","anchor2"], this.get('p > * > *'), 'All Grandchildren');
        this.assertEnumEqual(["groups"], this.get('a + a'), 'Adjacent');
        this.assertEnumEqual(["groups"], this.get('a +a'), 'Adjacent');
        this.assertEnumEqual(["groups"], this.get('a + a'), 'Adjacent');
        this.assertEnumEqual(["groups"], this.get('a+a'), 'Adjacent');
        this.assertEnumEqual(["ap","en","sap"], this.get('p + p'), 'Adjacent');
        this.assertEnumEqual(["groups","anchor1","anchor2"], this.get('a + a, code > a'), 'Comma, Child, and Adjacent');

        this.assertEnumEqual(["firstp","sndp"], this.get('p:first-child'), 'First Child');
        this.assertEnumEqual(["firstp","sndp"], this.get('p:nth-child(1)'), 'Nth Child');
        this.assertEnumEqual(["sap"], this.get('p:last-child'), 'Last Child');
        this.assertEnumEqual(["simon1","anchor1","mark","yahoo","anchor2","simon"], this.get('a:last-child'), 'Last Child');
        
        this.assertEnumEqual(["text2"], this.get('#main form#form > *:nth-child(2)'), 'Nth-child');
        this.assertEnumEqual(["text2"], this.get('#main form#form > :nth-child(2)'), 'Nth-child');

        this.assertEnumEqual(["option1c"], this.get('#form select:first-of-type option:nth-child(3)'), 'Nth-child');
        this.assertEnumEqual(["option1c"], this.get('#form select:first-of-type option:nth-child(0n+3)'), 'Nth-child');
        this.assertEnumEqual(["option1a", "option1b", "option1c", "option1d"], this.get('#form select:first-of-type option:nth-child(1n+0)'), 'Nth-child');
        this.assertEnumEqual(["option1a", "option1b", "option1c", "option1d"], this.get('#form select:first-of-type option:nth-child(1n)'), 'Nth-child');
        this.assertEnumEqual(["option1a", "option1b", "option1c", "option1d"], this.get('#form select:first-of-type option:nth-child(n)'), 'Nth-child');
        this.assertEnumEqual(["option1b", "option1d"], this.get('#form select:first-of-type option:nth-child(even)'), 'Nth-child');
        this.assertEnumEqual(["option1a", "option1c"], this.get('#form select:first-of-type option:nth-child(odd)'), 'Nth-child');
        this.assertEnumEqual(["option1b", "option1d"], this.get('#form select:first-of-type option:nth-child(2n)'), 'Nth-child');
        this.assertEnumEqual(["option1a", "option1c"], this.get('#form select:first-of-type option:nth-child(2n+1)'), 'Nth-child');
        this.assertEnumEqual(["option1c"], this.get('#form select:first-of-type option:nth-child(3n)'), 'Nth-child');
        this.assertEnumEqual(["option1a", "option1d"], this.get('#form select:first-of-type option:nth-child(3n+1)'), 'Nth-child');
        this.assertEnumEqual(["option1b"], this.get('#form select:first-of-type option:nth-child(3n+2)'), 'Nth-child');
        this.assertEnumEqual(["option1c"], this.get('#form select:first-of-type option:nth-child(3n+3)'), 'Nth-child');
        this.assertEnumEqual(["option1b"], this.get('#form select:first-of-type option:nth-child(3n-1)'), 'Nth-child');
        this.assertEnumEqual(["option1a", "option1d"], this.get('#form select:first-of-type option:nth-child(3n-2)'), 'Nth-child');
        this.assertEnumEqual(["option1c"], this.get('#form select:first-of-type option:nth-child(3n-3)'), 'Nth-child');
        this.assertEnumEqual(["option1c"], this.get('#form select:first-of-type option:nth-child(3n+0)'), 'Nth-child');
        this.assertEnumEqual(["option1a", "option1b", "option1c"], this.get('#form select:first-of-type option:nth-child(-n+3)'), 'Nth-child');
  	})
    .it('attributes', function() {
        this.assertEnumEqual(["google"], this.get('a[title]'), 'Attribute Exists');
        this.assertEnumEqual(["google"], this.get('*[title]'), 'Attribute Exists');
        this.assertEnumEqual(["google"], this.get('[title]'), 'Attribute Exists');

        this.assertEnumEqual(["simon1"], this.get("a[rel='bookmark']"), 'Attribute Equals');
        this.assertEnumEqual(["simon1"], this.get('a[rel="bookmark"]'), 'Attribute Equals');
        this.assertEnumEqual(["simon1"], this.get("a[rel=bookmark]"), 'Attribute Equals');
        
        this.assertEnumEqual(["radio1","radio2","hidden1"], this.get("#form input[type='hidden'],#form input[type='radio']"), 'Multiple Attribute Equals');
        this.assertEnumEqual(["radio1","radio2","hidden1"], this.get("#form input[type=\"hidden\"],#form input[type='radio']"), 'Multiple Attribute Equals');
        this.assertEnumEqual(["radio1","radio2","hidden1"], this.get("#form input[type=hidden],#form input[type=radio]"), 'Multiple Attribute Equals');

        this.assertEnumEqual(["台北"], this.get("span[lang=中文]"), "Attribute selector using UTF8");

        this.assertEnumEqual(["google","yahoo"], this.get("a[href ^= 'http://www']"), "Attribute Begins With");
        this.assertEnumEqual(["mark"], this.get("a[href $= 'org/']"), "Attribute Ends With");
        this.assertEnumEqual(["google","groups"], this.get("a[href *= 'google']"), "Attribute Contains");
        this.assertEnumEqual(["google","groups","anchor1"], this.get("#ap a:not([hreflang='en'])"), "Attribute Is Not Equal");
		
        this.assertEnumEqual(["option1a"], this.get("#select1 option[value='']"), "Empty values");
        this.assertEnumEqual(["option1b","option1c","option1d"], this.get("#select1 option:not([value=\"\"])"), "Empty values");
		
        this.assertEnumEqual(["option1a"], this.get("#select1 option[selected]"), "Select options via [selected]");
        this.assertEnumEqual(["option2d"], this.get("#select2 option[selected]"), "Select options via [selected]");
        this.assertEnumEqual(["option3b", "option3c"], this.get("#select3 option[selected]"), "Select options via [selected]");

        //this.assertEnumEqual(["hidden2"], this.get("input[name='foo[bar]']"), "Grouped Form Elements");
        
        this.assertEnumEqual(["select1", "select2"], this.get("#form select:not([multiple])"), ":not() Existing attribute");
        this.assertEnumEqual(["select2", "select3"], this.get("#form select:not([name=select1])"), ":not() Equals attribute");
        this.assertEnumEqual(["select2", "select3"], this.get("#form select:not([name='select1'])"), ":not() Equals quoted attribute");

        this.assertEnumEqual(["T2"], this.get("#testForm input[readonly]"), "Select inputs via [readonly]");
        this.assertEqual(16, $("#testForm input:not([readonly])").length, "Select inputs via :not([readonly])");
  	})
    .it('pseudos', function() {
        this.assertEnumEqual(["firstp","sndp"], this.get("p:first-child"), "First Child");
        this.assertEnumEqual(["sap"], this.get("p:last-child"), "Last Child");
        this.assertEnumEqual(["simon1","anchor1","yahoo","anchor2"], this.get("a:only-child"), "Only Child");
        this.assertEnumEqual(["firstUL"], this.get("ul:empty"), "Empty");
        this.assertEnumEqual(["text1","radio1","radio2","check1","check2","hidden2","name"], this.get("#form input:enabled"), "Enabled UI Element");
        this.assertEnumEqual(["text2"], this.get("#form input:disabled"), "Disabled UI Element");
        this.assertEnumEqual(["radio2","check1"], this.get("#form input:checked"), "Checked UI Element");
        this.assertEnumEqual(["option1a","option2d","option3b","option3c"], this.get("#form option[selected]"), "Selected Option Element");
        this.assertEnumEqual(["google","groups"], this.get("a:contains('Google')"), "Text Contains");
        this.assertEnumEqual(["groups"], this.get("a:contains('Google Groups')"), "Text Contains");
        this.assertEnumEqual(["foo","fx-queue","fx-tests", "moretests"], this.get("p ~ div"), "Element Preceded By");
        this.assertEnumEqual(["mark"], this.get("a.blog:not(.link)"), "Not");
        this.assertEnumEqual(["option2d", "option3b", "option3c"], this.get("#form option[selected]:not(:contains('Nothing'))"), "Not - multiple");
        this.assertEnumEqual(["option3b", "option3c"], this.get("#form option[id^='option3']:not(:not([selected]))"), "Not - recursive");

        this.assertEnumEqual(["text1", "text2", "radio1", "radio2", "check1", "check2", "hidden1", "hidden2", "name"], this.get("#form input"), "Form element input");
        this.assertEnumEqual(["radio1", "radio2"], this.get("#form input[type=radio]"), "Form element radio");
        this.assertEnumEqual(["check1", "check2"], this.get("#form input[type=checkbox]"), "Form element checkbox");
        this.assertEnumEqual(["text1", "text2", "hidden2", "name"], this.get("#form input[type=text]"), "Form element text");
        this.assertEnumEqual(["radio2"], this.get("#form input[type=radio]:checked"), "Form element radio:checked");
        this.assertEnumEqual(["check1"], this.get("#form input[type=checkbox]:checked"), "Form element checkbox:checked");
        this.assertEnumEqual(["radio2", "check1"], this.get("#form input[type=checkbox]:checked, #form input[type=radio]:checked"), "Form element checkbox:checked, radio:checked");
  	})
   .end()
   .describe('Events -')
    .it('Custom events triggering', function() {
        var elm = $$('test_06'), fired = false, target = null;
        elm.addEvent('somethingHappened', function(evt) {
        	target = evt.target;
        	fired = true;
        });
        elm.triggerEvent('somethingHappened');
      	this.assertEqual(elm, target);
      	this.assert(fired);
        elm.triggerEvent('somethingHappened', $('#test_06 a').first());
      	this.assertEqual($('#test_06 a').first(), target);
      	fired = false;
      	elm.triggerEvent('somethingElseHappened');
      	this.assert(!fired);
      	elm.removeEvent('somethingHappened');
      	elm.triggerEvent('somethingHappened');
      	this.assert(!fired);
  	})
    .it('Custom events bubbling', function() {
        var span = $$('test_06_span_01'), outer = $$('outer'), fired = false;
        outer.addEvent('somethingHappened', function(evt) {
        	fired = true;
        });
        span.triggerEvent('somethingHappened');
      	this.assert(fired);
      	fired = false;
      	outer.removeEvent('somethingHappened');
      	span.triggerEvent('somethingHappened');
      	this.assert(!fired);
  	})
    .it('Custom events canceling', function() {
        var span = $$('test_06_span_01'), outer = $$('outer'), inner = $$('inner'), fired = false, stopped = false;
        function outerObserver(evt) {
			fired = true;
		}
		function innerObserver(evt) {
			DOMAssistant.cancelBubble(evt);
			stopped = true;
		}
		function innerObserver2(evt) {
			stopped = true;
			return false;
		}
        inner.addEvent('customEvent', innerObserver);
        outer.addEvent('customEvent', outerObserver);
        span.triggerEvent('customEvent');
      	this.assert(stopped, 'event has not stopped at inner');
      	this.assert(!fired), 'event has wrongly triggered on outer';
		
		fired = stopped = false;
        inner.removeEvent('customEvent').addEvent('customEvent', innerObserver2);
        span.triggerEvent('customEvent');
      	this.assert(stopped, 'event has not stopped at inner');
      	this.assert(!fired), 'event has wrongly triggered on outer';
      	
      	fired = stopped = false;
		inner.removeEvent('customEvent');
		span.triggerEvent('customEvent');
		this.assert(!stopped, 'event stopped at inner');
		this.assert(fired, 'event did not trigger on outer');

		outer.removeEvent('customEvent', outerObserver);
  	})
    .it('Events are bound to the observed element', function() {
        var span = $$('test_06_span_01'), outer = $$('outer'), target = null;
        function observer(evt) {
			target = this;
		}
        span.addEvent('customEvent', observer);
        span.triggerEvent('customEvent');
        span.removeEvent('customEvent', observer);
        this.assertEqual(span, target);
        target = null;
        
        outer.addEvent('customEvent', observer);
        span.triggerEvent('customEvent');
        outer.removeEvent('customEvent', observer);
        this.assertEqual(outer, target);
  	})
    .it('Multiple events with the same handler', function() {
        var elms = $('#test_06 a'), count = 0;
        var add = function () {
        	count++;
        };
        elms.addEvent('somethingHappened', add);
        elms.addEvent('somethingElseHappened', add);
        var elm = $('#test_06 a').first();
        elm.triggerEvent('somethingHappened');
      	this.assertEqual(1, count);
        elm.triggerEvent('somethingElseHappened');
      	this.assertEqual(2, count);
      	elms.removeEvent('somethingHappened');
      	elms.removeEvent('somethingElseHappened');
  	})
    .it('Multiple handlers for the same event on the same element', function() {
        var elm = $$('test_06_span_01'), count = 0;
        var add1 = function () {
        	count += 1;
        },
        add2 = function () {
        	count += 2;
        };
        elm.addEvent('click', add1).addEvent('click', add2);
        elm.triggerEvent('click');
      	this.assertEqual(3, count);
      	elm.removeEvent('click', add1);
      	elm.triggerEvent('click');
      	this.assertEqual(5, count);
      	elm.removeEvent('click');
      	elm.triggerEvent('click');
      	this.assertEqual(5, count);
  	})
    .it('Event Delegation', function() {
        var elm = $$('test_06'), count = 0;
        var add = function () {
        	count++;
        };
        elm.relayEvent('click', '.delegation', add);
        
        $$('outer').addClass('delegation').triggerEvent('click');
        this.assertEqual(1, count);
        $('#test_06 li').first().triggerEvent('click');
        this.assertEqual(1, count);
        $$('inner').triggerEvent('click');
        this.assertEqual(2, count);
        $$('test_06_span_01').triggerEvent('click');
        this.assertEqual(3, count);
        elm.triggerEvent('click');
        this.assertEqual(3, count);

        elm.unrelayEvent('click');
        $$('test_06_span_01').triggerEvent('click');
        this.assertEqual(3, count);
        
        count = 0;
        elm.relayEvent('focus', '.delegation', add);
        $$('test_06_span_01').triggerEvent('focus');
		this.assertEqual(1, count);
		elm.unrelayEvent('focus');
        elm.relayEvent('blur', '.delegation', add);
        $$('test_06_span_01').triggerEvent('blur');
		this.assertEqual(2, count);
		elm.unrelayEvent('blur');
		
  	})
    .it('Prevent delegated events from bubbling', function() {
        var a = 0, b = 0;
        var add_a = function () {
        	a++;
        };
        var add_b = function () {
        	b++;
        };
        var add_b_cancelbubble = function (e) {
        	b++;
        	DOMAssistant.cancelBubble(e);
        };
        var add_b_return_false = function (e) {
        	b++;
        	return false;
        };
        $$('outer').relayEvent('click', 'span', add_a);
        $$('inner').relayEvent('click', 'span', add_b);
        
        $$('test_06_span_01').triggerEvent('click');
        this.assertEqual(1, b);
        this.assertEqual(1, a);
        
        $$('inner').unrelayEvent('click').relayEvent('click', 'span', add_b_cancelbubble);
        $$('test_06_span_01').triggerEvent('click');
        this.assertEqual(2, b);
        this.assertEqual(1, a, 'Events should not fire at outer since cancelBubble is called');

        $$('inner').unrelayEvent('click').relayEvent('click', 'span', add_b_return_false);
        $$('test_06_span_01').triggerEvent('click');
        this.assertEqual(3, b);
        this.assertEqual(1, a, 'Events should not fire at outer since handler returns false');

  	})
    .it('Mixing traditional, delegated and inline events', function() {
        var elm = $$('test_06'), relayed = 0, normal = 0;
        var relayed_add = function () {
        	relayed++;
        };
        var normal_add = function () {
        	normal++;
        };
        elm.relayEvent('somethingHappened', '.delegation', relayed_add);
        $$('test_06_span_01').addEvent('somethingHappened', normal_add);
        
        $$('outer').triggerEvent('somethingHappened');
        this.assertEqual(1, relayed);
        this.assertEqual(0, normal);
        
        $$('inner').triggerEvent('somethingHappened');
        this.assertEqual(2, relayed);
        this.assertEqual(0, normal);
        
        $$('test_06_span_01').triggerEvent('somethingHappened');
        this.assertEqual(3, relayed);
        this.assertEqual(1, normal);
		
        elm.unrelayEvent('somethingHappened');
        $$('test_06_span_01').triggerEvent('somethingHappened');
        this.assertEqual(3, relayed);
        this.assertEqual(2, normal);
        
        $$('test_06_span_01').removeEvent('somethingHappened');
        $$('test_06_span_01').triggerEvent('somethingHappened');
        this.assertEqual(3, relayed);
        this.assertEqual(2, normal);
		
		normal = inline = 0;
		var li = $('#test_06 li:nth-of-type(3)');
		li.triggerEvent('click');
		this.assertEqual(0, normal);
		this.assertEqual(1, inline);
		
		li.addEvent('click', normal_add);
		li.triggerEvent('click');
		this.assertEqual(1, normal);
		this.assertEqual(2, inline);

		li.removeEvent('click', normal_add);
		li.triggerEvent('click');
		this.assertEqual(1, normal);
		this.assertEqual(3, inline);

		li.removeEvent('click');
		li.triggerEvent('click');
		this.assertEqual(1, normal);
		this.assertEqual(3, inline);
  	})
    .it('Remove event handlers from within themselves', function() {
        var elm = $$('test_06'), count = 0;
        var add = function () {
        	count++;
        	
        };
        elm.addEvent('customEvent', function() {
        	count++;
        	this.removeEvent('customEvent');
        });
        elm.triggerEvent('customEvent');
        this.assertEqual(1, count);
        elm.triggerEvent('customEvent');
        this.assertEqual(1, count);
        this.assertEqual(0, elm.events['customEvent'].length);
  	})
  	/*
  	// DOMAssistant does not support this feature as of v2.8
    .it('remove events without parameters', function() {
        var elm = $$('test_06_span_01'), count = 0;
        var add = function () {
        	count++;
        };
        elm.addEvent('somethingHappened', add);
        elm.addEvent('somethingElseHappened', add);
        elm.removeEvent();
        elm.triggerEvent('somethingHappened');
      	this.assertEqual(0, count);
        elm.triggerEvent('somethingElseHappened');
      	this.assertEqual(0, count);
  	})
  	*/
   .end()
   .describe('Core methods -')
    .it('indexOf', function() {
        this.assertIdentical(0, $('#test_06 span').indexOf($$('outer')));
        this.assertIdentical(1, $('#test_06 span').indexOf($$('inner')));
        this.assertIdentical(-1, $('#test_06 span').indexOf($$('test_01')));
  	})
    .it('map', function() {
        var arr = $('#test_06 span').map( function() {
        	return this.id;
        });
        this.assertEnumEqual(['outer', 'inner', 'test_06_span_01'], arr);
        arr = $('#test_06 span').map( function(idx) {
        	return idx * 2;
        });
        this.assertEnumEqual([0, 2, 4], arr);
  	})
    .it('filter', function() {
        var arr = $('#test_06 span').filter( function() {
        	return this.id.length <= 6;
        });
        this.assertIdentical(2, arr.length);
        this.assertRespondsTo('map', arr);
        this.assertRespondsTo('cssSelect', arr);
        arr.addClass('cool');
  	})
    .it('some', function() {
        this.assert($('#test_06 span').some( function() {
        	return this.className === 'cool';
        }));
        this.assert(!$('#test_06 span').some( function() {
        	return this.id.length === 0;
        }));
  	})
    .it('every', function() {
        this.assert(!$('#test_06 span').every( function() {
        	return this.className === 'cool';
        }));
        this.assert($('#test_06 span').every( function() {
        	return this.id.length > 0;
        }));
  	})
    .it('Chainability', function() {
        var x = $('#test_06 span').filter( function() {
        	return this.id.length <= 6;
        }).addClass('awesome').each( function() {
        	this.setAttribute('foo', 'bar');
        }).end().end().setStyle('opacity', 0.2);
        this.assertHasClass($$('outer'), 'awesome');
        this.assertHasClass($$('inner'), 'awesome');
        this.assertNotHasClass($$('test_06_span_01'), 'awesome');
        this.assertIdentical('bar', $$('outer').getAttribute('foo'));
        this.assertIdentical('bar', $$('inner').getAttribute('foo'));
        this.assertNullOrUndefined($$('test_06_span_01').getAttribute('foo'));
        var sugar = this;
        $('#test_06 span').each( function() {
        	sugar.assertEqual(0.2, this.getStyle('opacity'));
        });
  	})
  .end()
   /*
   .describe('when nested having a setup function')
      .before(function() {
        this.wadus += 'a';
      })
      .it('runs both setup functions', function() {
        this.assertEqual('wa', this.wadus);
      })
      .describe('with more than a nesting level')
        .before(function() {
          this.wadus += 'd';
        })
        .it('runs setup methods in order', function() {
          this.assertEqual('wad', this.wadus);
        })
      .end()
    .end()
    .describe('that creates a DOM node')
      .before(function() {
        document.body.appendChild(document.createElement('h6'));
      })
      .after(function() {
        var h6 = document.getElementsByTagName('h6')[1];
        h6.parentNode.removeChild(h6);
      })
      .it('yes, really, creates the node added', function() {
        this.assertEqual(2, document.getElementsByTagName('h6').length);
      })
    .end()
    .describe('whose previous context had an after function defined')
      .should('find that the function was invoked', function() {
        this.assertEqual(1, document.getElementsByTagName('h6').length);
      })
      */
  .root()
  .it('DOMAssistant rules', function() {
    this.assert(DOMAssistant);
	$$('testdata').remove();
  })
.run();
