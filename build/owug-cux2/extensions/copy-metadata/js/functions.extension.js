/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1259
   File UUID: 28164a4c-6067-45ee-981e-e049b4a17aa9
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

                    /* ----- ----- ----- ----- ----- ----- ----- ----- */

                }
            );

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

            $("#idCopyToClipboard")
                .on(
                    "click",
                    function () {
                        rqlConnectorObj.syncSessionValues(
                            function (responseData) {
                                console.log(responseData);
                                $("#idOutput").text(JSON.stringify(responseData));
                            }
                        );
                    }
                );

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

        }
    );
