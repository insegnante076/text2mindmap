// Logic for the general modal UI.
modal = (function() {
	let $tabs;
	let $contents;
	let $close;

	function init() {
		$tabs = $(".modal-tabs > li");
		$contents = $(".tab-content");
		$close = $(".close-modal");

		$close.on("click touchstart", function() {
			$(this).closest(".modal").removeClass("active");
		});

		$tabs.on("click touchstart", function() {
			$contents.removeClass("active");
			$(`#${$(this).data("tab")}`).addClass("active");
			$tabs.removeClass("active");
			$(this).addClass("active");
		});
	}

	return {
		init
	};
}());
