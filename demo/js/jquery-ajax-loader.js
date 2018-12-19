
(function ($) {
	
	var cachedItems = {} ;

	$.fn.loadeData = function (html) {

		this.each(function (index, el) {
			$(el).fadeOut("slow", function () {
				$(el).html(html);
				$(el).fadeIn("slow");
			});
		});
		
	}

	$.fn.ajaxLoadUrl = function (href, callBackFunction) {

		this.each(function (index, el) {

			if(cachedItems[href] != undefined)
			{
				console.log("loaded from cache");

				var bodyHtml = cachedItems[href];

				if (callBackFunction != undefined && callBackFunction != "" && callBackFunction != null) {
					callBackFunction($(el), bodyHtml);
				}
				else {
					$(el).loadeData(bodyHtml);
				}				
				
			}	
			else
			{						
				$.get(href, function (data) {
					var bodyHtml = data;

					var doc = $('<output>').append($.parseHTML(data, document, true));

					document.title = doc.find("title").text();
					window.history.pushState({ "html": data, "pageTitle": document.title }, "", href);

					bodyHtml = doc.html();
					
					cachedItems[href] = bodyHtml;

					if (callBackFunction != undefined && callBackFunction != "" && callBackFunction != null) {
						callBackFunction($(el), bodyHtml);
					}
					else {
						$(el).loadeData(bodyHtml);
					}
				});
			}

		});

	}

	$.fn.ajaxAnchor = function (callBackFunction) {

		this.each(function (index, el) {
			var href = $(el).attr("href");

			$(el).attr("href", "javascript:void(0)");
			$(el).attr("data-href", href);
		});

		this.on("click", function () {
			var href = $(this).attr("data-href");
			var elementId = $(this).attr("data-ajax-target");
			var targetElement = $(elementId);
			
			targetElement.ajaxLoadUrl(href, callBackFunction);

			//$.get(href, function (data) {
			//	var bodyHtml = data;

			//	if (loadElement != undefined && loadElement != "" && loadElement != null) {
			//		var doc = $('<output>').append($.parseHTML(data, document, true));

			//		document.title = doc.find("title").text();
			//		window.history.pushState({ "html": data, "pageTitle": document.title }, "", href);

			//		bodyHtml = doc.find(loadElement).html();
			//	}

			//	callBackFunction(targetElement, bodyHtml);
			//});
		})
	};


})(jQuery);