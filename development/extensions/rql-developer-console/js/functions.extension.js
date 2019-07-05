/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release {build-release}
   File UUID: b2a0769e-6bee-4fff-ad20-f998ddab0990
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
                }
            );

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

            var request = ace.edit("request");
            request.setTheme("ace/theme/cobalt");
            request.getSession().setMode("ace/mode/xml");
            request.getSession().setUseWrapMode(true);
            request.getSession().setUseSoftTabs(true);
            request.setShowInvisibles(true);

            var response = ace.edit("response");
            response.setTheme("ace/theme/cobalt");
            response.getSession().setMode("ace/mode/xml");
            response.getSession().setUseWrapMode(true);
            response.getSession().setUseSoftTabs(true);
            response.setShowInvisibles(true);
            response.setReadOnly(true);

            requestXml = '<IODATA loginguid="[!guid_login!]" sessionkey="[!key!]">\n\r</IODATA>';
            responseXml = '<IODATA></IODATA>';
            request.setValue(formatXml(requestXml));
            response.setValue(formatXml(responseXml));
            request.navigateTo(1, 0);
            response.navigateFileEnd();
            request.focus();

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

            $("#reloadAll")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#modalProcessing")
                            .modal("show")
                            .ready(
                                function () {
                                    response.setValue("");
                                    thisButton = this;
                                    $("#reloadAll > .fa-sync").toggleClass("fa-spin text-danger");
                                    $(thisButton).prop("disabled", true);
                                    let rqlRequestRaw = request.getValue()
                                        .replace("[!guid_login!]", rqlConnectorObj.info.session.LoginGuid)
                                        .replace("[!key!]", rqlConnectorObj.info.session.SessionKey)
                                        .replace("[!guid_user!]", rqlConnectorObj.info.session.UserGuid)
                                        .replace("[!guid_project!]", rqlConnectorObj.info.session.ProjectGuid);
                                    let rqlRequestBody = $.parseXML(rqlRequestRaw);
                                    rqlConnectorObj
                                        .sendRqlRaw(
                                            (new XMLSerializer()).serializeToString(rqlRequestBody),
                                            false,
                                            function (rqlResponse) {
                                                let responseData = rqlResponse;
                                                console.info(`Received response from SOAP/RQL Connector Object.`);
                                                console.log(`Type: ${typeof responseData}`);
                                                console.log(responseData);
                                                console.log(`<= fn\n\n\n`);
                                                if (rqlConnectorObj.responseError === false) {
                                                    if (responseData != null) {
                                                        response.setValue(formatXml(new XMLSerializer().serializeToString(responseData).replace(/[\n\r]/g, ``)));
                                                    } else {
                                                        response.setValue(`Object => null`);
                                                    }
                                                } else {
                                                    response.setValue(responseData);
                                                }
                                                response.navigateFileEnd();
                                                request.focus();
                                                $("#reloadAll > .fa-sync").toggleClass("fa-spin text-danger");
                                                $(thisButton).prop("disabled", false);
                                                $("#modalProcessing").modal("hide");
                                            }
                                        );
                                }
                            );
                    }
                );

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

            $("#resetAll")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        thisButton = this;
                        $(thisButton).prop("disabled", true);
                        requestXml = '<IODATA loginguid="[!guid_login!]" sessionkey="[!key!]">\n\r</IODATA>';
                        responseXml = '<IODATA></IODATA>';
                        request.setValue(formatXml(requestXml));
                        response.setValue(formatXml(responseXml));
                        request.navigateTo(1, 0);
                        response.navigateFileEnd();
                        request.focus();
                        $(thisButton).prop("disabled", false);
                    }
                );

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

        }
    );

/* ----- ----- ----- ----- ----- ----- ----- ----- */

function formatXml(xml) {
    const PADDING = ' '.repeat(2); // set desired indent size here
    const reg = /(>)(<)(\/*)/g;
    let pad = 0;
    xml = xml.toString().replace(reg, '$1\r\n$2$3');
    return xml.split('\r\n').map((node, index) => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/) && pad > 0) {
            pad -= 1;
        } else if (node.match(/^<\w([^>]*[^\/])?>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }
        pad += indent;
        return PADDING.repeat(pad - indent) + node;
    }).join('\r\n');
}