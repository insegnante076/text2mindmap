// Logic for importing a Markdown document from the user's local drive.
// A hidden <input type="file"> tag is clicked and the user is prompted to choose the file.
fileImport = (function() {
	function init() {
		if (window.FileReader) {
			$("#file-input").on("change", fileInput);
		}
	}

	function fileInput(event) {
		event.stopPropagation();
		event.preventDefault();
		if (event.target && event.target.files && event.target.files.length > 0) {
			const selectedFile = event.target.files[0];
			const reader = new FileReader();
			const fileName = selectedFile.name;
			reader.onloadend = function(event) {
				handleUpload(event, fileName);
			};
			reader.readAsText(selectedFile);
		}
		$("#file-input").val("");
	}

	function handleUpload(event, fileName) {
		if (event.target.readyState !== 2) {
			return;
		}
		if (event.target.error) {
			alert("There was an error opening the file.");
			return;
		}
		const content = event.target.result;

		documentTitle.setTitle(fileName.replace(/\.txt$/i, ""));
		$("#textArea").val(content);
		mindmap.render();
		unsavedChanges.setHasChanges(false);
		settings.setSetting("documentTitle", documentTitle.getTitle());
		settings.setSetting("documentContent", content);
	}

	function chooseFile() {
		if (!window.FileReader) {
			alert("Your browser doesn't support opening files, consider upgrading to a newer version of your browser.");
			return;
		}
		$("#file-input").click();
	}

	return {
		init,
		chooseFile
	};
}());
