# jquery-ajax-loader
- Makes it easy to fetch html via a url and inject it into an element.
- The  "loadData" method is just a default animation, you can use your own way of injecting the data.
- Easy to create Vue or React like page transitions.


```html

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="js/jquery-ajax-loader.js"></script>  

<a href="about.html" class="ajax" data-ajax-target="#DynamicContent">About</a>
<a href="contact.html" class="ajax" data-ajax-target="#DynamicContent">Contact</a>	

<div id="DynamicContent"></div>

<script>
  
  $(document).ready(function () {

    $("#DynamicContent").ajaxLoadUrl("about.html", function (el, html) {
      el.loadeData(html);
    });

    $(".ajax").ajaxAnchor(function (el, html) {
      el.loadeData(html);			
    });

  });
  
</script>  


```
