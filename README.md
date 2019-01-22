# jquery-ajax-loader
- Makes it easy to fetch html via a url and inject it into an element.
- Automaticly takes over anchor click events and makes anchor clicks load data via AJAX
- The "ajaxLoadUrl" function has a third param which is a callback function, which you can use to override the default load behaviour and animation
    ```html 
    ajaxLoadUrl(event.state.href, lastTargetElement, function (el, bodyHtml) {
      event.state.html = bodyHtml;
    });    
- Easy to create Vue or React like page transitions.
- Since data is simply loaded using AJAX you are inherently using SSR ( Server Side Rendering )


```html

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"></script>

  <script src="js/jquery-ajax-loader.js"></script>

  <a href="about.html" class="ajax">About</a>
  <a href="contact.html" class="ajax">Contact</a>

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

    // Below is not required but is good to show a message while waiting for the ajax call to finish
    // Below depends on Jquery Block UI to work
    var timer = null;

    $(document).ajaxStart(function () {
      timer = setTimeout(function () {
        $.blockUI({ message: 'Just a moment...' });
      }, 1000);
    });

    $(document).ajaxStop(function () {
      $.unblockUI();
      if (timer != null) {
        clearTimeout(timer);
      }
    });

  </script>



```
