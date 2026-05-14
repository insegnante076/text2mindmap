// Logic for the document title input field. To properly resize the input field,
// a hidden input field is mirroring the visible's field's text.
documentTitle = (function() {
	const maxWidth = 300;
	const extraWidth = 3;

	let $input;
	let $mirror;
	let oldTitle;

	function init() {
		$input = $(".document-title-input");
		$mirror = $(".document-title-mirror");

		$input.on("focusout", function() {
			setTitle($input.val());
		});

		$input.on("input change load focusout", function() {
			mirrorWidth();
		});

		$input.on("focus", function() {
			if ($input.val() === settings.getDefaultValue("documentTitle")) {
				$input.select();
			}
		});

		$input.on("keydown", function(key) {
			if (key.keyCode === 13) {
				$input.blur();
			} else if (key.keyCode === 27) {
				$input.val(oldTitle);
				$input.blur();
			}
		});
	}

	function getTitle() {
		$input.blur();
		return $input.val();
	}

	function setTitle(title) {
		if (title === null || title === "") {
			title = settings.getDefaultValue("documentTitle");
		}
		$input.val(title);
		oldTitle = title;
		mirrorWidth();
		unsavedChanges.setHasChanges(true);
		settings.setSetting("documentTitle", title);
	}

	function focus() {
		$input.focus();
	}

	function mirrorWidth() {
		$mirror.text($input.val());
		let width = parseInt($mirror.css("width"), 10);
		if (!isNaN(width)) {
			width += extraWidth;
			width = Math.min(maxWidth, width);
			$input.css("width", width + "px");
		}
	}

	return {
		init,
		getTitle,
		setTitle,
		focus
	};
}());
