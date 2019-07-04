/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1250
   File UUID: c43f809a-af41-41c1-8a85-7df413d93ab1
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
