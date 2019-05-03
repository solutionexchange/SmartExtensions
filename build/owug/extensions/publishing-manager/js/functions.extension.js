/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1207
   File UUID: 988a73fe-8b2c-4dad-8745-466ae50a9783
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
$(document)
    .ready(
        function () {
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            var rqlConnectorObj = {};
            createRqlConnector({
                    DebugMode: true
                },
                function (returnConnectorObj) {
                    rqlConnectorObj = returnConnectorObj;
                    setExtensionDialogLanguage(rqlConnectorObj);
                    setContentAbout(rqlConnectorObj);
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                }
            );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            function helloWorld() {}
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
        }
    );
/* ----- ----- ----- ----- ----- ----- ----- ----- */
