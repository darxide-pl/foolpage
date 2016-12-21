# foolpage
Plugin for horizontal scrolled fullpages.

REQUIREMENTS:<br>
jquery<br><br>

SIMPLEST CONFIG:<br>
1) load jquery and foolpage.js<br>
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="foolpage.js"></script>
```
2) add class "\__section__" to your sections<br> 
```html
<div class="__section__"></div>
<div class="__section__"></div>
<div class="__section__"></div>
<div class="__section__"></div>
```

3) add class "\__menu__" to your menu items with attribute "data-menu" and set values from 0 to n
```html
<a class="__menu__" data-menu="0" href="javascript:;">first</a>
<a class="__menu__" data-menu="1" href="javascript:;">second</a>
<a class="__menu__" data-menu="2" href="javascript:;">third</a>
<a class="__menu__" data-menu="3" href="javascript:;">fourth</a>
```

4) init plugin with default config
```html 
<script type="text/javascript">
var page = new foolpage;
page.init();
</script>
```

Demo page:<br>
https://darxide-pl.github.io/foolpage/

ADDITIONAL SETTINGS: 
```javascript
<script>
page.init({

  // [string] transition duration, default '.18s' 
	transition : '1s',					
  
  // [string] any timing function available in css, default 'ease-in'
	timing_function : 'ease-in-out', 
  
  // [string] classname for active element in menu, default 'active'
	active : 'active',
  
  // [function] - called before transition
	before : function() {
		console.log('before scroll')
	},
  
  // [function] - called after transition
	after : function() {
		console.log('after scroll')
	},
  
  // [function] - called before scroll up transition
	before_up : function() {
		console.log('before up scroll')
	},
  
  // [function] - called before scroll down transition
	before_down : function() {
		console.log('before down scroll')
	},
  
  // [function] - called after scroll up transition
	after_up : function() {
		console.log('after up scoll')
	},
  
  // [function] - called after down transition
	after_down : function() {
		console.log('after down scroll')
	},
  
  // [function] - called before menu change state
	before_menu_change : function() {
		console.log('before menu change state')
	}, 
  
  // [function] - called after menu change state
	after_menu_change : function() {
		console.log('after menu change state')
	},
  
  // [function] - called before refreshing plugin
	before_refresh : function() {
		console.log('before refresh')
	},
  
  // [function] - called after refresing plugin
	after_refresh : function() {
		console.log('after refresh')
	}
})
</script>
```

DYNAMICALLY APPENDED ELEMENTS:<br>
If you wanna append, or destroy some elements in DOM, you should call .refresh() method after changes in sections/menu items:
```javascript
<script type="text/javascript">
page.refresh()
</script>
```
