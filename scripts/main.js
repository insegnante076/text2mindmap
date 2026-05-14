(function() {
    const KEY_BINDINGS = {
        "Ctrl+N": appFunctions.fileNew,
        "Ctrl+O": appFunctions.fileOpen,
        "Ctrl+S": appFunctions.fileSave
    };

    function getFullscreenElement() {
        return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    }

    function updateFullscreenButton($button) {
        if (getFullscreenElement()) {
            $button.attr('title', 'Esci da schermo intero');
            $button.find('i').removeClass('fa-expand').addClass('fa-compress');
        } else {
            $button.attr('title', 'Schermo intero');
            $button.find('i').removeClass('fa-compress').addClass('fa-expand');
        }
    }

    function toggleViewerFullscreen() {
        const viewerPane = document.getElementById('viewer-pane');
        if (getFullscreenElement()) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            if (viewerPane.requestFullscreen) {
                viewerPane.requestFullscreen();
            } else if (viewerPane.webkitRequestFullscreen) {
                viewerPane.webkitRequestFullscreen();
            } else if (viewerPane.msRequestFullscreen) {
                viewerPane.msRequestFullscreen();
            }
        }
    }

    function init() {
        if (/Mobi/.test(navigator.userAgent)) {
            alert("The website doesn't currently work very well in mobile browsers, so it's recommended that you use a computer. Sorry about that!");
        }

        documentTitle.init();
        modal.init();
        navbar.init();
        fileImport.init();
        paneResizer.init();

        documentTitle.setTitle(settings.getSetting("documentTitle"));

        $(window).on("beforeunload", function(event) {
            if (unsavedChanges.getHasChanges()) {
                const message = "You have unsaved changes. Are you sure you want to leave without saving?";
                if (event) {
                    event.returnValue = message;
                }
                return message;
            }
        });

        $(document).on("keydown", shortcuts.handleKeypress);
        shortcuts.addBindings(KEY_BINDINGS);

        $("#modal-settings-save").on("click", function() {
            $(".modal").removeClass("active");
        });

        const $textArea = $("#textArea");
        $textArea.val(settings.getSetting("documentContent"));
        mindmap.render();

        function updateMindMap() {
            const value = $textArea.val();
            unsavedChanges.setHasChanges(value !== settings.getDefaultValue("documentContent"));
            settings.setSetting("documentContent", value);
            mindmap.render();
        }

        $textArea.on("input propertychange", updateMindMap);
        $textArea.on("keydown", function(e) {
            const keyCode = e.keyCode || e.which;
            if (keyCode === 9 || keyCode === 13) {
                updateMindMap();
            }
            unsavedChanges.setHasChanges(true);
        });

        const $fullscreenButton = $('#viewer-fullscreen-button');
        $fullscreenButton.on('click', function(event) {
            event.preventDefault();
            toggleViewerFullscreen();
        });
        $(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
            updateFullscreenButton($fullscreenButton);
        });
        updateFullscreenButton($fullscreenButton);
    }

    $(document).ready(init);
}());