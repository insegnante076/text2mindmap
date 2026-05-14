// Logic for the top navigation bar (navbar) in the app.
navbar = (function() {
	// Close all open dropdowns from the navbar.
	function closeDropdowns() {
		$(".navbar-dropdown .dropdown-content").hide();
	}

	// Set the state of the visibility icon of a dropdown item,
	// signaling whether something is displayed or not.
	function setVisibilityIcon(buttonId, visibility) {
		$(`#${buttonId} > i`).removeClass("fa-eye fa-eye-slash");
		if (visibility) {
			$(`#${buttonId} > i`).addClass("fa-eye");
		} else {
			$(`#${buttonId} > i`).addClass("fa-eye-slash");
		}
	}

	function init() {
		const idFunctionMap = {
			"file-new": appFunctions.fileNew,
			"file-open": appFunctions.fileOpen,
			"file-save": appFunctions.fileSave,
			"file-rename": appFunctions.fileRename,
			"file-preferences": appFunctions.filePreferences,
		};

		const $links = $(".navbar a");
		$links.on("click touchstart", function(event) {
			if ($(this).attr("href") === "#") {
				event.preventDefault();
			}
			const id = $(this).attr("id");
			if (id in idFunctionMap) {
				idFunctionMap[id]($(this));
				closeDropdowns();
			}
		});

		$(document).on("click", function(event) {
			closeDropdowns();
			const $navbarDropdown = $(event.target).parent(".navbar-dropdown");
			if ($navbarDropdown.length !== 0) {
				$navbarDropdown.find(".dropdown-content").show();
			}
		});
	}

	return {
		init,
		setVisibilityIcon
	}
}());