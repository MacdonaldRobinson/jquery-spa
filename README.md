# jquery-ajax-loader
- Makes it easy to fetch html via a url and inject it into an element.
- The  "loadData" method is just a default animation, you can use your own way of injecting the data.
- Easy to create Vue or React like page transitions.
- Since data is simply loaded using AJAX you are inherently using SSR ( Server Side Rendering )


```html

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

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
    
        $(document).on("click", "a", function (event) {
          var href = $(this).attr("href");			
    
              
          if (href.indexOf("javascript") == -1) {
    
            event.preventDefault();
    
            ajaxLoadUrl(href, "#DynamicContent");
          }
        })
      });
    </script>



```
