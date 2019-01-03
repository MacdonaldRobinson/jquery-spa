# jquery-ajax-loader
- Makes it easy to fetch html via a url and inject it into an element.
- The  "loadData" method is just a default animation, you can use your own way of injecting the data.
- Easy to create Vue or React like page transitions.


```html

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

          event.preventDefault();

          var href = $(this).attr("href");
       
          ajaxLoadUrl(href, "#DynamicContent");
        })
      });
    </script>  


```
