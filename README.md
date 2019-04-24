# jquery-ajax-loader
- Makes it easy to fetch html via a url and inject it into an element
- Automaticly takes over anchor click events and makes anchor clicks load data via AJAX
- Easy to create Vue or React like websites and page transitions.
- Since data is simply loaded using AJAX you are inherently using SSR ( Server Side Rendering )
- If the request is made directly to a URL it will be loaded via Server Side Rendering, making it SEO friendly
- Uses the HTML5 History API internally so you can use the browsers back and forward buttons to navigate
- Automaticly sends "pageview" events to google analytics when you navigate between different pages of your site
- Ability to preload pages using the "preloadLinks" property
- Ability to execute a function after the page is loaded using the "onLoad" property
- Ability to change the default page transition animation using he  "animateIn" property
- Ability to specify a selector that will be used to omit elements from being taken over using the "omitElementSelector" property

**All you need to do is include the library on every page and just surround the content that needs to be updated between pages with the "targetElement" by default it is an element with the id "DynamicContent"**

```html

  <!-- Required Includes -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"></script>
  
  <!-- Load the library -->
  <script src="js/jquery-ajax-loader.js"></script>

  <!-- You dont need to even put the init script in as this is applied by default on load -->
  <script>
    var ajaxOptions = {
      targetElement: "#DynamicContent",
      omitElementSelector:".not-ajax",
      preloadLinks: false,
      onLoad: function () { },
      animateIn: function (selector, html) {
        $(selector).each(function (index, el) {
          //$(el).html(html);

          $(el).toggle("fade", 250, function () {
            $(el).html(html);
            //$(el).css("height", "100%");
            // $("#mainNav").effect("fade");
            $(el).toggle("fade", 400);

            $(el).click();
            //$("body").scrollTop(0);
          });
        });
      }
    }

    initAjaxOptions(ajaxOptions);
  </script>

  <a href="home.html">Home</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>

  <!-- Required -->
  <div id="DynamicContent"></div>

```
