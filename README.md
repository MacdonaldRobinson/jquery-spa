# jquery-ajax-loader
Makes it easy to load html into elements and mimic a Vue or React like page transition



```html

<script src="/Scripts/jquery-ajax-loader.js"></script>

<a href="/nominate/" class="ajax" data-ajax-target="#DynamicContent">Nominate</a>
<a href="/nominate/thank-you/" class="ajax" data-ajax-target="#DynamicContent">Nominate - Thank You</a>	

<div id="DynamicContent"></div>

<script>

	$(document).ready(function () {

		$("#DynamicContent").ajaxLoadUrl("/nominate/", function (el, html) {
			el.loadeData(html);
		});

		$(".ajax").ajaxAnchor(function (el, html) {
			el.loadeData(html);			
		});
	});
</script>


```
