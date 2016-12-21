function foolpage() {

	"use strict"
	var self = this

	this.cur = 0
	this.lock = 0
	this.len = $('.__section__').length

	this.init = function(settings) {
		self.parse_setting(settings || false)
		self.menu_state_change(true)
		self.init_css()
		self.init_position()
		self.init_scroll()
		self.init_menu_click()
	}

	this.init_scroll = function() {
		$(window).on('mousewheel DOMMouseScroll', function (e) {
		    var direction = (function () {
	
			        var delta = (e.type === 'DOMMouseScroll' ?
			                     e.originalEvent.detail * -40 :
			                     e.originalEvent.wheelDelta);
	
			        return delta > 0 ? 0 : 1;
			    }());

		    if(self.lock === 0) {
		    	self.lock = 1
			    if(direction === 1) {
			       self.down()
			    }
			    if(direction === 0) {
			       self.up()
			    }
		    	setTimeout(function() {
		    		self.lock = 0
		    	}, self.transition_ms)
		    }
		});		
	}

	this.init_css = function() {
		$("<style>")
			.prop("type", "text/css")
			.html("\
			body {\
			    overflow:hidden;\
			    position:relative:\
			    padding:0;\
			    margin:0;\
			}\
			.__section__ {\
				width:100%;\
				height:100vh;\
				transition:left "+self.transition+" "+self.timing_function+";\
				position:absolute;\
				top:0px\
			}")
			.appendTo("head");		
	}

	this.init_position = function() {
		$('.__section__').each(function(k,v) {
			$(this).css({
				left : (100*k)+'%'
			})
		})
	}

	this.up = function() {
		if(self.cur > 0) {
			self.cur--
			self.before()
			self.before_up()
			self.move()
			self.menu_state_change()
			setTimeout(function() {
				self.after()
				self.after_up()
			},self.transition_ms)
		}
	}

	this.down = function() {
		if(self.cur < self.len -1) {
			self.cur++
			self.before()
			self.before_down()
			self.move()
			self.menu_state_change()
			setTimeout(function() {
				self.after()
				self.after_down()
			},self.transition_ms)
		}
	}

	this.move = function() {
		$('.__section__').each(function(k,v) {
			$(this).css({
				left : 100*(k-self.cur)+'%'
			})
		})		
	}

	this.init_menu_click = function() {
		$(document).on('click' , '.__menu__' , function() {
			var n = $(this).data('menu')
			if(n != self.cur && n >= 0 && n < self.len && self.lock == 0) {
				self.lock = 1
				var dir = n < self.cur ? 1 : 0

				self.before()
				dir == 0 ? self.before_down() : self.before_up()
				self.cur = n
				self.move()
				setTimeout(function() {
					self.after()
					dir == 0 ? self.after_down() : self.after_up()
					self.lock = 0
				}, self.transition_ms)

				self.menu_state_change()
			}
		})
	}

	this.menu_state_change = function(init = false) {
		init === false && self.before_menu_change()
		$('.__menu__').each(function() {
			if($(this).data('menu') == self.cur) $(this).addClass(self.active)
			if($(this).data('menu') != self.cur) $(this).removeClass(self.active)
		})

		init === false && self.after_menu_change()
	}

	/*todo*/
	this.refresh = function() {
		self.before_refresh()
		self.len = $('.__section__').length
		self.move()
		self.after_refresh()
	}

	this.parse_setting = function(settings) {
		self.transition =  settings.transition || '.18s' 
		self.transition_ms = parseFloat(self.transition)*1000
		self.timing_function =  settings.timing_function || 'ease-in'
		self.active = settings.active || 'active'
		self.before = settings.before || function(){} 
		self.after = settings.after || function(){}
		self.before_up = settings.before_up || function(){}
		self.before_down = settings.before_down || function(){}
		self.after_up = settings.after_up || function(){}
		self.after_down = settings.after_down || function(){}
		self.before_menu_change = settings.before_menu_change || function(){}
		self.after_menu_change = settings.after_menu_change || function(){}
		self.before_refresh = settings.before_refresh || function(){}
		self.after_refresh = settings.after_refresh || function(){}
	}
}