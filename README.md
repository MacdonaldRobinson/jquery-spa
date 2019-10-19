# jquery-spa
- Automaticly takes over anchor click events and makes anchor clicks load data via AJAX
- Easy to create Vue or React like websites and page transitions.
- Since data is simply loaded using AJAX you are inherently using SSR ( Server Side Rendering )
- If the request is made directly to a URL it will be loaded via Server Side Rendering, making it SEO friendly
- Uses the HTML5 History API internally so you can use the browsers back and forward buttons to navigate
- Automaticly sends "pageview" events to google analytics when you navigate between different pages of your site
- Makes it easy to fetch html via a url and inject it into an element, use the built in function "ajaxLoadUrl" as seen below

## Demo Site ##
- **URL:**: http://flexdotnetcms.somee.com
- **Username:** test_dev
- **Password:** test_password

```javascript
// Directly update the selector with the contents returned after the page is loaded via AJAX
ajaxLoadUrl(url, "#DynamiContent"); 

OR

ajaxLoadUrl(href, "", function (el, html) { 
	// Callback method after the URL was loaded via AJAX
	console.log("Loaded Url: " + href);
});
```

**All you need to do is include the library on every page and just surround the content that needs to be updated between pages with the "targetElement" by default it is an element with the id "DynamicContent"**

*Please see the example below, showing you the available options*

```html

<!-- Required: Required Includes -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

<!-- Optional -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"></script>

<!-- Required: Load the library -->
<script src="js/jquery-spa.js"></script>

<!-- You dont need to even put the init script in as this is applied by default on load -->
<script>
var ajaxOptions = {
	targetElement: "#DynamicContent", // Selectors representing elements that need to be replaced with updated content after ajax loads the data
	omitElementSelector:".not-ajax", // This tells the script to not hijack click events on elements that match this selector
	preloadLinks: false,
	onLoad: function () { 
		// Instead of executing your pages code in document.ready directly, create an init function and then call it from document.ready
		// Call the same function here, this ensures that scripts that execute in document.ready are re-executed
	},
	block: function () {		
		// This function is used to show a preloader during the ajax process and before the elements are replaced with updated content
		$.blockUI({ message: "Loading ..." });
		console.log("Ran block")
	},
	unBlock: function () {
	
		// This function is used to hide the preloader after the element is replaced with new content
		$.unblockUI();
		console.log("Ran unblockUI")
	
	},      
	animateOut: function(el) {
	
		// This function is used to animate the element OUT before it is replaced with new content
		$(el).fadeOut();
		console.log("Ran animateOut");
	
	},
	animateIn: function (el) {
	
		// This function is used to animate the element IN after it is replaced with new content
		$(el).fadeIn();
		console.log("Ran animateIn");
	
	}
}

initAjaxOptions(ajaxOptions);
</script>

<a href="about.html">About</a>
<a href="contact.html">Contact</a>

<div id="DynamicContent">
	This is home page
</div>

```
