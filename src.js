$(document).ready(Initialize());

function Initialize() {
	$(".js-dependent").removeClass("js-dependent");

	$("body").hover(
			function() {
				if ($(this).attr("data-init"))
					return;
				$.each($("span.email"), function() {
					t = $(this).text();
					$(this).attr("data-init", true);
					e = t.replace(/\s*/g, "").replace(/\(dot\)/g, ".").replace(
							/\(at\)/g, "@");
					$(this).html(
							"<a target='_blank' href='mailto:" + e + "'>" + e
									+ "</a>");
				});
			}, function() {
				// $(this).html($(this).attr("data-raw-email"));
			});
	$(window).scroll(NavBarUpdate);
	$("nav a.scroll").click(
			function() {
				to = $(this).attr("href");
				$('html, body').animate({
					scrollTop : $(to).offset().top - $("header nav").height()
				}, 500);
				window.history.pushState("", "", document.URL.replace(/#.*$/,
						"")
						+ $(this).attr("href"))
				return false;
			});

	$("header nav").attr("data-background-init-pose-y",
			$("#notification-anchor").position().top);

	NavBarUpdate();
	AddFlickrSlideshow();
}

function NavBarUpdate() {
	var b = $(window).scrollTop();
	var d = $("#notification-anchor").offset().top;
	var c = $("header nav");
	var bgPose = c.attr("data-background-init-pose-y") * 1;

	if (b > d) {
		c.css({
			position : "fixed",
			top : "0px",
			"background-position-y" : "-" + (bgPose + b - d) + "px"
		})
	} else {
		c.css({
			position : "initial",
			top : "",
			"background-position-y" : "-" + bgPose + "px"
		})
	}
}

function AddFlickrSlideshow() {
	$(".flick-dependent").removeClass("flick-dependent");
	$(".flickr-embedded")
			.click(
					function() {
						var g = $("#flickr-gallery").parent();
						g.removeClass("hidden");
						if (!g.attr("data-init")) {
							g.attr("data-init", true);
							$("#flickr-gallery")
									.html(
											'<iframe align="center" '
													+ 'src="http://www.flickr.com/slideShow/index.gne?set_id=72157635379377263" '
													+ 'width="'
													+ $(window).width()
													/ 2
													+ '" height="'
													+ $(window).height()
													+ '" frameBorder="0" scrolling="no"></iframe>');
						}
						return false;
					});
	$("#flickr-gallery").parent().click(function() {
		$(this).addClass("hidden");
	});
}