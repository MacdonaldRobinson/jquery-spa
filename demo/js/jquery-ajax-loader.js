var cachedItems = {};

function loadeData(selector, html) {

	$(selector).each(function (index, el) {
		$(el).toggle("fade", {direction: "right"}, 700, function () {
			$(el).html(html);
			//$(el).css("height", "100%");
			$(el).toggle("fade", {direction: "right"}, 700);
			$("body").scrollTop(0);
		});
	});		
}

var lastTargetElement = null;
window.onpopstate = function (event) {
	if (event.state != null) {		
		loadeData(lastTargetElement, event.state.html);
		updateTitle(event.state.href, event.state.html);
	}
};

function updateTitle(href, bodyHtml) {
	var doc = $('<output>').append($.parseHTML(bodyHtml, document, true));
	document.title = doc.find("title").text();
}

function pushHistory(href, bodyHtml) {
	try {
		window.history.pushState({ href: href, html: bodyHtml }, document.title, href);

	} catch (error) {
		window.title = document.title;
	}
}

function ajaxLoadUrl(href, targetElement, callBackFunction) {
	lastTargetElement = targetElement;

	var el = targetElement;

	if(cachedItems[href] != undefined)
	{
		var bodyHtml = cachedItems[href];

		updateTitle(href, bodyHtml);
		pushHistory(href, bodyHtml);

		if (callBackFunction != undefined && callBackFunction != "" && callBackFunction != null) {
			callBackFunction($(el), bodyHtml);
		}
		else {
			loadeData($(el), bodyHtml);
		}				
	}	
	else
	{						
		$.get(href, function (data) {
			var bodyHtml = data;				

			updateTitle(href, bodyHtml);
			pushHistory(href, bodyHtml);
					
			cachedItems[href] = bodyHtml;				

			if (callBackFunction != undefined && callBackFunction != "" && callBackFunction != null) {
				callBackFunction($(el), bodyHtml);
			}
			else {
				loadeData($(el), bodyHtml);
			}
		});
	}

}