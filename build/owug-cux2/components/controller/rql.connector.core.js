/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1207
   File UUID: 3fbb38e2-b314-4612-9377-db8d2ebc8e8a
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
class rqlConnector {
    /* ----- ----- ----- ----- ----- ----- ----- ----- */
    /**
     * Creates an instance of rqlConnector.
     * 
     * @author Thomas Pollinger 
     * @version 16.0.0.1207
     * 
     * @param {uri} _baseHref
     * @param {string} _connectorMode
     * 
     * @memberof rqlConnector
     */
    constructor(_baseHref, _connectorMode) {
        this.baseHref = {
            ms: (_baseHref ? _baseHref.substring(_baseHref.toLowerCase().indexOf("/plugins"), 0) : `/CMS`),
            root: (_baseHref ? _baseHref : `../..`)
        }
        this.connectorMode = (_connectorMode ? _connectorMode : `extension`);
        this.connectorReady = false;
        this.debugMode = false;
        this.info = {
            package: {
                name: `owug-cux2`,
                extensions: `Package-Extensions.xml`,
                information: `Package-Information.xml`,
                release: `16.0.0.1207`,
                compatibility: `11.2.2.0`,
                uuid: `547a762f-7aa1-466f-9501-99e2089562e7`
            },
            environment: {},
            product: ``,
            session: {},
            version: {}
        }
        this.responseError = false;
        this.sessionKeepAliveTimer = null;
        this.timestamp = Date.now();
        this.uri = {
            connectorProxy: `${this.baseHref.root}/components/controller/rql.connector.proxy.aspx`,
            connectorEnvironment: `${this.baseHref.root}/components/controller/rql.connector.environment.aspx`,
            connectorSession: `${this.baseHref.root}/components/controller/rql.connector.session.asp`,
            sessionKeepAliveClassicASP: `${this.baseHref.root}/components/controller/rql.connector.keepalive.asp`,
            sessionKeepAliveASPdotNET: `${this.baseHref.ms}/WebService/v1/session/current`,
            wsmRestService: `${this.baseHref.ms}/WebService/v2/`,
            wsmWebService: `${this.baseHref.ms}/WebService/RqlWebService.svc`
        }
    }
    /* ----- ----- ----- ----- ----- ----- ----- ----- */


    /* ----- ----- ----- ----- ----- ----- ----- ----- */
    /**
     *
     * 
     * @author Thomas Pollinger 
     * @version 16.0.0.1207
     * 
     * @param {function} callbackFunc
     * 
     * @memberof rqlConnector
     */
    sendInit(callbackFunc) {
        var thisClass = this;
        var timestamp = Date.now();
        thisClass.debugMode && console.info(`Searching for the RESTful WebServices\nLaunch version detection phase 1.`);
        $.ajax({
            async: true,
            url: `${thisClass.uri.wsmRestService}version/`,
            success: function (data) {
                thisClass.debugMode && console.info(`Request the version indicators from the ASP Classic Session Connector.`);
                $.getJSON(
                        `${thisClass.uri.connectorSession}?timestamp=${timestamp}`,
                        function (responseData) {
                            thisClass.info.session = responseData;
                            thisClass.info.product = thisClass.info.session.CmsWindowTitle;
                            thisClass.debugMode && console.info(`Received response from ASP Classic Session Connector.`);
                            thisClass.debugMode && console.log(`${thisClass.infoProduct}`);
                        }
                    )
                    .done(
                        function () {
                            thisClass.connectorReady = true;
                            thisClass.debugMode && console.info(`Major.Version = 16.0.1 or higher, the system seems to be fully usable.`);
                            if (callbackFunc) {
                                callbackFunc(true);
                            }
                        }
                    )
                    .fail(
                        function (jqxhr, textStatus, error) {
                            thisClass.connectorReady = false;
                            var errMessage = `${textStatus}, ${error}`;
                            console.error(`Request of values from the ASP Classic Session Connector has failed.\nResult: ${errMessage}.`);
                        }
                    );
                $.getJSON(
                        `${thisClass.uri.connectorEnvironment}?timestamp=${timestamp}`,
                        function (responseData) {
                            thisClass.info.environment = responseData;
                            thisClass.debugMode && console.info(`Received response from Environment Session Connector.`);
                        }
                    )
                    .done(
                        function () {
                            thisClass.debugMode && console.info(`Sync of values from the Environment Session Connector was successful.\nNew environment values are stored into the SOAP / RQL Connector Object.`);
                        }
                    )
                    .fail(
                        function (jqxhr, textStatus, error) {
                            thisClass.connectorReady = false;
                            var errMessage = `${textStatus}, ${error}`;
                            console.error(`Sync of values from the Environment Session Connector has failed.\nResult: ${errMessage}.`);
                        }
                    );
            },
            error: function () {
                console.warn(`Version seems to be less than 16.0.1 (RESTful service is missing).\nLaunch version detection phase 2.`);
                $.ajax({
                    async: true,
                    url: `${thisClass.uri.wsmWebService}?WSDL`,
                    success: function (data) {
                        thisClass.debugMode && console.info(`Request the version indicators from the ASP Classic Session Connector.`);
                        $.getJSON(
                                `${thisClass.uri.connectorSession}?timestamp=${timestamp}`,
                                function (responseData) {
                                    thisClass.info.session = responseData;
                                    thisClass.info.product = thisClass.info.session.CmsWindowTitle;
                                    thisClass.debugMode && console.info(`Received response from ASP Classic Session Connector.`);
                                    thisClass.debugMode && console.log(`${thisClass.infoProduct}`);
                                }
                            )
                            .done(
                                function () {
                                    thisClass.connectorReady = true;
                                    console.warn(`Major.Version >= 11.0 and <= 16.0, the system will be limited usable.`);
                                    if (callbackFunc) {
                                        callbackFunc(true);
                                    }
                                }
                            )
                            .fail(
                                function (jqxhr, textStatus, error) {
                                    thisClass.connectorReady = false;
                                    var errMessage = `${textStatus}, ${error}`;
                                    console.error(`Sync of values from the ASP Classic Session Connector has failed.\nResult: ${errMessage}.`);
                                }
                            );
                        $.getJSON(
                                `${thisClass.uri.connectorEnvironment}?timestamp=${timestamp}`,
                                function (responseData) {
                                    thisClass.info.environment = responseData;
                                    thisClass.debugMode && console.info(`Received response from Environment Session Connector.`);
                                }
                            )
                            .done(
                                function () {
                                    console.info(`Sync of values from the Environment Session Connector was successful.\nNew environment values are stored into the SOAP / RQL Connector Object.`);
                                }
                            )
                            .fail(
                                function (jqxhr, textStatus, error) {
                                    thisClass.connectorReady = false;
                                    var errMessage = `${textStatus}, ${error}`;
                                    console.error(`Sync of values from the Environment Session Connector has failed.\nResult: ${errMessage}.`);
                                }
                            );
                    },
                    error: function () {
                        console.error(`Major.Version < 11.0, the system is not supported.`);
                        thisClass.connectorReady = false;
                        if (callbackFunc) {
                            callbackFunc(false);
                        }
                    }
                });
            }
        });
    }
    /* ----- ----- ----- ----- ----- ----- ----- ----- */


    /* ----- ----- ----- ----- ----- ----- ----- ----- */
    /**
     * 
     * 
     * @author Thomas Pollinger 
     * @version 16.0.0.1207
     * 
     * @param {string} rqlRequestBody
     * @param {boolean} isText
     * @param {function} callbackFunc
     * @param {object} requestParam
     * 
     * @memberof rqlConnector
     */
    sendRql(rqlRequestBody, isText, callbackFunc, requestParam) {
        var thisClass = this;
        thisClass.debugMode && console.info(`Send request to SOAP/RQL WebService.`);
        thisClass.debugMode && console.log(`Query =>\n\t${rqlRequestBody}\n<= Query`);
        thisClass.sendToConnectorProxy(rqlRequestBody, isText, callbackFunc, requestParam);
    }
    /* ----- ----- ----- ----- ----- ----- ----- ----- */


    /* ----- ----- ----- ----- ----- ----- ----- ----- */
    /**
     * 
     * 
     * @author Thomas Pollinger 
     * @version 16.0.0.1207
     * 
     * @param {string} rqlRequestBody
     * @param {boolean} isText
     * @param {function} callbackFunc
     * @param {object} requestParam
     * 
     * @memberof rqlConnector
     */
    sendToConnectorProxy(rqlRequestBody, isText, callbackFunc, requestParam) {
        var thisClass = this;
        var soapMessageTemplatePre = `<s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'><s:Body><q1:Execute xmlns:q1='http://tempuri.org/RDCMSXMLServer/message/'><sParamA>`;
        var soapMessageTemplatePost = `</sParamA><sErrorA></sErrorA><sResultInfoA></sResultInfoA></q1:Execute></s:Body></s:Envelope>`;
        var soapMessageBody = thisClass.padRQLXML(rqlRequestBody, isText, requestParam);
        var soapMessage = `${soapMessageTemplatePre}<![CDATA[ ${soapMessageBody} ]]>${soapMessageTemplatePost}`;
        var timestamp = Date.now();
        $.post(
            `${thisClass.uri.connectorProxy}?timestamp=${timestamp}`, {
                rqlxml: soapMessage,
                webServiceUri: thisClass.uri.wsmWebService
            },
            function (soapResponse) {
                soapResponse = $.trim(soapResponse);
                var rqlResponseErrorA = $.trim($($.parseXML(soapResponse)).find("sErrorA").text());
                var rqlResponse = $($.parseXML(soapResponse)).find("Result").text();
                rqlResponse = $.trim(rqlResponse);
                if (isText) {
                    var responseData = rqlResponse;
                } else {
                    var responseData = $.parseXML(rqlResponse);
                }
                if (rqlResponseErrorA === "") {
                    thisClass.responseError = false;
                    callbackFunc(responseData);
                } else {
                    console.error(`An error has been returned from SOAP / RQL WebService.\nResult: ${rqlResponseErrorA}`);
                    console.error(soapResponse);
                    console.error(rqlResponse);
                    clearInterval(thisClass.sessionKeepAliveTimer);
                    console.warn(`A possible existing heartbeat or session renewal has now been stopped.`);
                    thisClass.responseError = true;
                    callbackFunc(responseData);
                }
            },
            "text"
        );
    }
    /* ----- ----- ----- ----- ----- ----- ----- ----- */


    /* ----- ----- ----- ----- ----- ----- ----- ----- */
    /**
     * 
     * 
     * @author Thomas Pollinger 
     * @version 16.0.0.1207
     * 
     * @param {function} callbackFunc
     * 
     * @returns {object}
     * 
     * @memberof rqlConnector
     */
    syncSessionValues(callbackFunc) {
        var thisClass = this;
        var timestamp = Date.now();
        $.getJSON(
            `${thisClass.uri.connectorSession}?timestamp = ${timestamp}`
        ).done(
            function (responseData) {
                thisClass.debugMode && console.info(`Sync of values from the ASP Classic Session Connector was successful.\nNew session values are stored into the SOAP / RQL Connector Object.`);
                thisClass.info.session = responseData;
                if (callbackFunc) {
                    thisClass.debugMode && console.info(`Received response from ASP Classic Session Connector.`);
                    thisClass.debugMode && console.log(`Type: ${typeof responseData}`);
                    thisClass.debugMode && console.dir(responseData);
                    thisClass.debugMode && console.log(`<= fn\n\n\n`);
                    callbackFunc(responseData);
                } else {
                    thisClass.debugMode && console.warn(`No callback function defined at ${thisFunction.Name}().\nResponse:`);
                    thisClass.debugMode && console.log(`Type: ${typeof responseData}`);
                    thisClass.debugMode && console.dir(responseData);
                    thisClass.debugMode && console.log(`<= fn\n\n\n`);
                    return (responseData);
                }
            }
        );
    }
    /* ----- ----- ----- ----- ----- ----- ----- ----- */


    /* ----- ----- ----- ----- ----- ----- ----- ----- */
    /**
     * 
     * 
     * @author Thomas Pollinger 
     * @version 16.0.0.1207
     * 
     * @param {function} callbackFunc
     * 
     * @returns {object}
     * 
     * @memberof rqlConnector
     */
    syncEnvironmentValues(callbackFunc) {
        var thisClass = this;
        var timestamp = Date.now();
        $.getJSON(
            `${thisClass.uri.connectorEnvironment}?timestamp = ${timestamp}`
        ).done(
            function (responseData) {
                thisClass.debugMode && console.info(`Sync of values from the Environment Session Connector was successful.\nNew environment values are stored into the SOAP / RQL Connector Object.`);
                thisClass.info.environment = responseData;
                if (callbackFunc) {
                    thisClass.debugMode && console.info(`Received response from Environment Session Connector.`);
                    thisClass.debugMode && console.log(`Type: ${typeof responseData}`);
                    thisClass.debugMode && console.dir(responseData);
                    thisClass.debugMode && console.log(`<= fn\n\n\n`);
                    callbackFunc(responseData);
                } else {
                    thisClass.debugMode && console.warn(`No callback function defined at ${thisFunction.Name}().\nResponse:`);
                    thisClass.debugMode && console.log(`Type: ${typeof responseData}`);
                    thisClass.debugMode && console.dir(responseData);
                    thisClass.debugMode && console.log(`<= fn\n\n\n`);
                    return (responseData);
                }
            }
        );
    }
    /* ----- ----- ----- ----- ----- ----- ----- ----- */


    /* ----- ----- ----- ----- ----- ----- ----- ----- */
    /**
     * Check for valid XML und add session data
     * 
     * @author Thomas Pollinger 
     * @version 16.0.0.1207
     * 
     * @param {string} rqlRequestBody
     * @param {boolean} isText
     * @param {object} requestParam
     * 
     * @returns {string}
     * 
     * @memberof rqlConnector
     */
    padRQLXML(rqlRequestBody, isText, requestParam) {
        var thisClass = this;
        let rqlRequestTemplate = ``;
        if (isText) {
            rqlRequestTemplate = `<IODATA loginguid='${requestParam ? (requestParam.LoginGuid ? requestParam.LoginGuid : thisClass.info.session.LoginGuid) : thisClass.info.session.LoginGuid}' sessionkey='${requestParam ? (requestParam.SessionKey ? requestParam.SessionKey : thisClass.info.session.SessionKey) : thisClass.info.session.SessionKey}' dialoglanguageid='${requestParam ? (requestParam.DialogLanguageId ? requestParam.DialogLanguageId : thisClass.info.session.DialogLanguageId) : thisClass.info.session.DialogLanguageId}' format='1'>${rqlRequestBody}</IODATA>`;
        } else {
            rqlRequestTemplate = `<IODATA loginguid='${requestParam ? (requestParam.LoginGuid ? requestParam.LoginGuid : thisClass.info.session.LoginGuid) : thisClass.info.session.LoginGuid}' sessionkey='${requestParam ? (requestParam.SessionKey ? requestParam.SessionKey : thisClass.info.session.SessionKey) : thisClass.info.session.SessionKey}' dialoglanguageid='${requestParam ? (requestParam.DialogLanguageId ? requestParam.DialogLanguageId : thisClass.info.session.DialogLanguageId) : thisClass.info.session.DialogLanguageId}'>${rqlRequestBody}</IODATA>`;
        }
        var rqlRequest = $.parseXML(rqlRequestTemplate);
        thisClass.debugMode && console.log(`Call template =>\n\t${rqlRequestTemplate}\n<= Call template`);
        thisClass.debugMode && console.log(rqlRequest);
        return (new XMLSerializer()).serializeToString(rqlRequest);
    }
    /* ----- ----- ----- ----- ----- ----- ----- ----- */


}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * 
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1207
 * 
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {object}
 */
function createRqlConnector(requestParam, callbackFunc) {
    var rqlConnectorObj = {};
    let thisFunction = {
        Name: arguments.callee.name,
        BaseHref: requestParam.BaseHref,
        DebugMode: requestParam.DebugMode,
        ConnectorMode: requestParam.ConnectorMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    thisFunction.DebugMode && console.info(`DebugMode: ${thisFunction.DebugMode}`);
    thisFunction.DebugMode && console.info(`BaseHref: ${thisFunction.BaseHref}`);
    thisFunction.DebugMode && console.info(`ConnectorMode: ${thisFunction.ConnectorMode}`);
    setProgress({
        Id: `#progressLoading`,
        Percent: 15,
        Message: `The extension has been fully loaded and the RESTful & SOAP / RQL WebService will be checked now.`,
        DebugMode: thisFunction.DebugMode
    });
    if (Cookies.get(`rql.connector.js-owug-cux2`)) {
        var connectorCookie = JSON.parse(Cookies.get(`rql.connector.js-owug-cux2`));
    } else {
        var connectorCookie = {
            release: `0.0.0.0`
        }
    }
    if (connectorCookie.release == `16.0.0.1207`) {
        rqlConnectorObj = new rqlConnector(thisFunction.BaseHref, thisFunction.ConnectorMode);
        rqlConnectorObj.sendInit(
            function () {
                var responseData = rqlConnectorObj;
                if (thisFunction.DebugMode) {
                    rqlConnectorObj.debugMode = thisFunction.DebugMode
                }
                getServerVersion(
                    rqlConnectorObj, {
                        EditorialServerGuid: rqlConnectorObj.info.session.EditorialServerGuid
                    },
                    function () {
                        console.log(`Quickstart: true\nThis extension and connector release (${rqlConnectorObj.info.package.release}) has already been successfully tested.`);
                        $("#idMainSpinner").hide();
                        $("#idMainDialog").addClass("show");
                        if (callbackFunc) {
                            thisFunction.DebugMode && console.info(`Received response from SOAP/RQL Connector Object.`);
                            thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                            thisFunction.DebugMode && console.dir(responseData);
                            thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                            callbackFunc(responseData);
                        } else {
                            thisFunction.DebugMode && console.warn(`No callback function defined at ${thisFunction.Name}().\nResponse:`);
                            thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                            thisFunction.DebugMode && console.dir(responseData);
                            thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                            return (responseData);
                        }
                    }
                );
            }
        );
    } else {
        $("#modalLoading")
            .modal("show")
            .ready(
                function () {
                    rqlConnectorObj = new rqlConnector(thisFunction.BaseHref, thisFunction.ConnectorMode);
                    setProgress({
                            Id: `#progressLoading`,
                            Percent: 35,
                            Message: `Initialize the SOAP / RQL Connector Object and the ASP Classic Session Connector.`,
                            DebugMode: thisFunction.DebugMode
                        },
                        rqlConnectorObj.sendInit(
                            function () {
                                if (thisFunction.DebugMode) {
                                    rqlConnectorObj.debugMode = thisFunction.DebugMode
                                }
                                setProgress({
                                        Id: `#progressLoading`,
                                        Percent: 50,
                                        Message: `Is the SOAP / RQL Connector Object ready for this environement ? (${rqlConnectorObj.connectorReady})`,
                                        DebugMode: thisFunction.DebugMode
                                    },
                                    function () {
                                        if (rqlConnectorObj.connectorReady) {
                                            setProgress({
                                                    Id: `#progressLoading`,
                                                    Percent: 85,
                                                    Message: `The SOAP / RQL Connector Object try to send the first SOAP / RQL WebService request.`,
                                                    DebugMode: thisFunction.DebugMode
                                                },
                                                function () {
                                                    getServerVersion(
                                                        rqlConnectorObj, {
                                                            EditorialServerGuid: rqlConnectorObj.info.session.EditorialServerGuid
                                                        },
                                                        function (responseData) {
                                                            thisFunction.DebugMode && console.info(`Received response from SOAP / RQL WebService.`);
                                                            thisFunction.DebugMode && console.log(`${responseData} `);
                                                            setProgress({
                                                                    Id: `#progressLoading`,
                                                                    Percent: 100,
                                                                    Message: `The SOAP / RQL Connector object is now tested and ready.`,
                                                                    DebugMode: thisFunction.DebugMode
                                                                },
                                                                function () {
                                                                    Cookies.set(
                                                                        `rql.connector.js-owug-cux2`, {
                                                                            release: rqlConnectorObj.info.package.release
                                                                        }, {
                                                                            expires: 3650
                                                                        }
                                                                    );
                                                                    setTimeout(
                                                                        function () {
                                                                            $("#modalLoading").modal("hide");
                                                                            $("#idMainSpinner").hide();
                                                                            $("#idMainDialog").addClass("show");
                                                                        },
                                                                        500
                                                                    );
                                                                    var responseData = rqlConnectorObj;
                                                                    if (callbackFunc) {
                                                                        thisFunction.DebugMode && console.info(`Received response from SOAP/RQL Connector Object.`);
                                                                        thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                                                                        thisFunction.DebugMode && console.dir(responseData);
                                                                        thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                                                                        callbackFunc(responseData);
                                                                    } else {
                                                                        thisFunction.DebugMode && console.warn(`No callback function defined at ${thisFunction.Name}().\nResponse:`);
                                                                        thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                                                                        thisFunction.DebugMode && console.dir(responseData);
                                                                        thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                                                                        return (responseData);
                                                                    }
                                                                }
                                                            );
                                                        }
                                                    );
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        )
                    );
                }
            );
    }
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */
