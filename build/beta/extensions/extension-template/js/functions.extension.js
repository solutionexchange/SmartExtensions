/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1250
   File UUID: 7e7e3c32-2806-42b2-a178-e5a2daf4e015
   ----- ----- ----- ----- ----- ----- ----- ----- */

$(document)
    .ready(
        function () {

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

            // Init RQL-Connector
            var rqlConnectorObj = {};
            var rqlValues = {};
            createRqlConnector({
                    DebugMode: true
                },
                function (returnConnectorObj) {

                    rqlConnectorObj = returnConnectorObj;
                    setExtensionDialogLanguage(rqlConnectorObj);
                    setContentAbout(rqlConnectorObj);

                    rqlValues = new converter(rqlConnectorObj);
                    console.log(rqlValues.convertFrom.favorites());

                    $("#switchTooltip").prop("checked", true);

                    /* ----- ----- ----- ----- ----- ----- ----- ----- */

                }
            );

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

            $("#switchTooltip")
                .on(
                    "click",
                    function () {
                        if ($(this).prop("checked")) {
                            $('[data-toggle="tooltip"]').tooltip('enable');
                            initTooltip();
                        } else {
                            $('[data-toggle="tooltip"]').tooltip('disable');
                            disposeTooltip();
                        }
                    }
                );

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

            $("#switchDebug")
                .on(
                    "click",
                    function () {
                        if ($(this).prop("checked")) {
                            $("body").attr("_lang-core", $("body").attr("lang-core")).removeAttr("lang-core");
                            $("body").attr("_lang-extension", $("body").attr("lang-extension")).removeAttr("lang-extension");
                            $("#switchTooltip").prop("disabled", true);
                        } else {
                            $("body").attr("lang-core", $("body").attr("_lang-core")).removeAttr("_lang-core");
                            $("body").attr("lang-extension", $("body").attr("_lang-extension")).removeAttr("_lang-extension");
                            $("#switchTooltip").prop("disabled", false);
                        }
                    }
                );

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

        }
    );
