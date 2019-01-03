var cachedItems = {};

function loadeData(selector, html) {

	$(selector).each(function (index, el) {
		$(el).toggle("slide", {direction: "right"}, 700, function () {
			$(el).html(html);
			$(el).toggle("slide", {direction: "right"}, 700);
		});
	});		
}

var lastTargetElement = null;
window.onpopstate = function (event) {
	if (event.state != null) {
		loadeData(lastTargetElement, event.state.html);
	}
};

function updateTitleAndHistory(href, bodyHtml) {
	var doc = $('<output>').append($.parseHTML(bodyHtml, document, true));
	document.title = doc.find("title").text();

	try {
		window.history.pushState({ href: href, html: bodyHtml}, document.title, href);

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

		updateTitleAndHistory(href, bodyHtml);

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

			updateTitleAndHistory(href, bodyHtml);			
					
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