function loadeData(selector, html) {

	$(selector).each(function (index, el) {
		$(el).html(html);
		/*$(el).toggle("fade", { direction: "right" }, 700, function () {
			$(el).html(html);
			//$(el).css("height", "100%");
			$(el).toggle("fade", { direction: "right" }, 700);
			$("body").scrollTop(0);
		});*/
	});
}

$(document).ready(function () {

	window.onpopstate = function (event) {

		if (event.state != null) {
			loadeData(lastTargetElement, event.state.html);
			updateTitle(event.state.href, event.state.html);

			ajaxLoadUrl(event.state.href, lastTargetElement, function (el, bodyHtml) {
				event.state.html = bodyHtml;
			});
		}
	};

	$(document).on("click", "a", function (event) {
		var href = $(this).attr("href");
		var target = $(this).attr("target");

		if ((href != undefined && href != null && href != "" && target != "_blank" && href.toLowerCase().indexOf("@") == -1 && href.toLowerCase().indexOf("javascript") == -1 && $(this).parents(".field").length == 0 && $(this).parents("#AccessCMSPermissionsPanel").length == 0 && href.indexOf("javascript") == -1) || (href.charAt(0) == "/")) {
			var segment = href.replace(window.location.host, "");
			if (segment != "") {
				event.preventDefault();

				ajaxLoadUrl(href, "#DynamicContent");
			}
		}
	});
});

var lastTargetElement = null;

function updateTitle(href, bodyHtml) {
	var doc = $('<output>').append($.parseHTML(bodyHtml, document, true));
	document.title = doc.find("title").text();

	doc.find("meta").each(function (index, el) {

		var name = $(el).attr("name");
		var content = $(el).attr("content");

		$("meta[name='" + name + "']").attr("content", content);

	});

}

function pushHistory(href, bodyHtml) {
	try {
		window.history.pushState({ href: href, html: bodyHtml }, document.title, href);

	} catch (error) {
		window.title = document.title;
	}
}


function _loadData(href, el, bodyHtml, callBackFunction) {
	if (callBackFunction != undefined && callBackFunction != "" && callBackFunction != null) {
		callBackFunction($(el), bodyHtml);
	}
	else {
		updateTitle(href, bodyHtml);
		pushHistory(href, bodyHtml);

		loadeData($(el), bodyHtml);
	}

	window.scrollTo(0, 0);
}

var isLoading = false;
var cache = [];

function ajaxLoadUrl(href, targetElement, callBackFunction) {

	var urlSegment = href.split("?")[0];

	if ((isLoading) || (urlSegment == window.location.pathname || urlSegment == window.location.href || "/" + urlSegment == window.location.pathname))
		return;

	isLoading = true;
	lastTargetElement = targetElement;

	var el = targetElement;

	if (cache[href] != undefined) {
		_loadData(href, el, cache[href], callBackFunction);
	}
	else {
		$.get(href, function (data) {
			var bodyHtml = data;

			_loadData(href, el, bodyHtml, callBackFunction);

			cache[href] = bodyHtml;
		});
	}

	isLoading = false;
}