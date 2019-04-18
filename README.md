# jquery-ajax-loader
- Makes it easy to fetch html via a url and inject it into an element.
- Automaticly takes over anchor click events and makes anchor clicks load data via AJAX
- Easy to create Vue or React like websites and page transitions.
- Since data is simply loaded using AJAX you are inherently using SSR ( Server Side Rendering )
- If the request is made directly to a URL it will be loaded via Server Side Rendering, making it SEO friendly
- Uses the HTML5 History API internally so you can use the browsers back and forward buttons to navigate
- Automaticly sends "pageview" events to google analytics when you navigate between different pages of your site
- Ability to preload pages

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
      preloadLinks: true,
      animateIn: function (selector, html) {
        $(selector).each(function (index, el) {
          $(el).toggle("fade", 250, function () {
            $(el).html(html);
            $(el).toggle("fade", 400);
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
