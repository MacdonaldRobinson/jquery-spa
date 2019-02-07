# jquery-ajax-loader
- Makes it easy to fetch html via a url and inject it into an element.
- Automaticly takes over anchor click events and makes anchor clicks load data via AJAX
- The "ajaxLoadUrl" function has a third param which is a callback function, which you can use to override the default load behaviour and animation

    ```html 
    ajaxLoadUrl(href, targetElement, function (el, bodyHtml) {
      $(el).html(bodyHtml);
    });    
    ```

- Easy to create Vue or React like websites and page transitions.
- Since data is simply loaded using AJAX you are inherently using SSR ( Server Side Rendering )
- Uses the HTML5 History API internally so you can use the browsers back and forward buttons to navigate


```html

  <!-- Requried Includes -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"></script>

  <script src="js/jquery-ajax-loader.js"></script>

  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>

  <div id="DynamicContent"></div>

  <script>

    $(document).ready(function () {

      if (window.location.hash != "") {
        var url = window.location.hash.replace("#", "");
        ajaxLoadUrl(url, "#DynamicContent");
      }
      else {
        ajaxLoadUrl("about.html", "#DynamicContent");
      }
    });

  </script>



```
