/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release {build-release}
   File UUID: 78deefc1-3912-4b3e-9159-114b73976dc2
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Listing all Plug-Ins
 * RQL documentation 16.0.3
 * 
 * You can display all plug-ins in a list. You can choose to limit the list to all enabled or all disabled plug-ins.
 * You can also display all projects for a plug-in, or all plug-ins for a project.
 * You can also list all plug-in authorizations.
 * 
 * @author Thomas Pollinger 
 * @version {build-release}
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam currently not in use
 * @param {function} callbackFunc
 * 
 * @returns {object}
 */
function getPlugInsList(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    /* rqlRequestTemplate = `<PLUGINS action='list' active='0|1' byproject='0|1' withrights='1' memberguid='[!guid_user!]' type='USR|GRP' />`; */
    let rqlRequestTemplate = `<PLUGINS action='list' />`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingPlugIns = $(rqlResponse).find("PLUGINS");
                let processingPlugIn = $(rqlResponse).find("PLUGIN");
                let responseData = {
                    Sorting: Boolean(parseInt($(processingPlugIns).attr("sortingenabled"), 10)),
                    PlugIns: []
                }
                processingPlugIn
                    .each(
                        function () {
                            let elementData = {
                                Name: $(this).attr("name"),
                                Guid: $(this).attr("guid"),
                                Active: Boolean(parseInt($(this).attr("active"), 10)),
                                Compatibility: $(this).attr("compatibility"),
                                Right: Boolean(parseInt($(this).attr("right"), 10)),
                                Deny: Boolean(parseInt($(this).attr("deny"), 10)),
                            }
                            responseData.PlugIns.push(elementData);
                        }
                    );
                responseData.PlugIns
                    .sort(
                        function (a, b) {
                            let valueA = a.Name.toLowerCase(),
                                valueB = b.Name.toLowerCase();
                            if (valueA < valueB) {
                                return -1;
                            }
                            if (valueA > valueB) {
                                return 1;
                            }
                            return 0;
                        }
                    );
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
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Determining Plug-In All Data
 * RQL documentation 16.0.3
 * 
 * Use this RQL query to determine detailed information about one or several plug-ins.
 * 
 * @author Thomas Pollinger 
 * @version {build-release}
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {object}
 */
function getPlugInDetails(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestData = ``;
    requestParam.Items
        .forEach(
            elementData => {
                rqlRequestData += `<PLUGIN action='load' guid='${elementData.Guid}'/>`;
            }
        );
    let rqlRequestTemplate = `<PLUGINS>${rqlRequestData}</PLUGINS>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingPlugIn = $(rqlResponse).find("PLUGIN");
                let responseData = [];
                processingPlugIn
                    .each(
                        function () {
                            let elementData = {
                                Name: $(this).attr("name"),
                                Guid: $(this).attr("guid"),
                                Active: Boolean(parseInt($(this).attr("active"), 10)),
                                Compatibility: $(this).attr("compatibility"),
                                Uri: $(this).attr("url"),
                                Company: $(this).attr("company"),
                                Contact: $(this).attr("contact"),
                                PhoneNumber: $(this).attr("telefon"),
                                EMail: $(this).attr("email"),
                                Website: $(this).attr("website"),
                                Icon: {
                                    Source: $(this).find("ICON").attr("source"),
                                    Alt: $(this).find("ICON").attr("alt")
                                },
                                Descriptions: [],
                                Targets: [],
                                OpenWindowParameter: {
                                    Features: $(this).find("OPENWINDOWPARAMETER").attr("features"),
                                    KeepOpen: Boolean(parseInt($(this).find("OPENWINDOWPARAMETER").attr("keepopen"), 10))
                                }
                            }
                            $(this).find("DESCRIPTIONS").children()
                                .each(function () {
                                    let processingData = {
                                        name: this.nodeName.toUpperCase(),
                                        value: $(this).attr("name")
                                    }
                                    elementData.Descriptions.push(processingData);
                                });
                            $(this).find("TARGETS").children()
                                .each(function () {
                                    let processingData = $(this).attr("target");
                                    elementData.Targets.push(processingData);
                                });
                            responseData.push(elementData);
                        }
                    );
                responseData
                    .sort(
                        function (a, b) {
                            let valueA = a.Name.toLowerCase(),
                                valueB = b.Name.toLowerCase();
                            if (valueA < valueB) {
                                return -1;
                            }
                            if (valueA > valueB) {
                                return 1;
                            }
                            return 0;
                        }
                    );
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
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Creating Plug-Ins
 * RQL documentation 16.0.3
 * 
 * You need administrative notes to be able to use plug-ins in Management Server.
 * You can use this RQL query to create the administrative note for a plug-in.
 * 
 * @author Thomas Pollinger 
 * @version {build-release}
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {object}
 */
function createPlugIns(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<PLUGINS>${requestParam.Content}</PLUGINS>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingPlugIn = $(rqlResponse).find("PLUGIN");
                let responseData = [];
                processingPlugIn
                    .each(
                        function () {
                            let elementData = {
                                Name: $(this).attr("name"),
                                Guid: $(this).attr("guid"),
                                Active: Boolean(parseInt($(this).attr("active"), 10)),
                            }
                            responseData.push(elementData);
                        }
                    );
                responseData
                    .sort(
                        function (a, b) {
                            let valueA = a.Name.toLowerCase(),
                                valueB = b.Name.toLowerCase();
                            if (valueA < valueB) {
                                return -1;
                            }
                            if (valueA > valueB) {
                                return 1;
                            }
                            return 0;
                        }
                    );
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
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Enable/Disable Plug-Ins
 * !NOT DOCUMENTED!
 * 
 * You need administrative notes to be able to use plug-ins in Management Server.
 * You can use this RQL query to enable or disable a plug-in.
 * 
 * @author Thomas Pollinger 
 * @version {build-release}
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {object}
 */
function switchPlugInsActivation(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestData = ``;
    requestParam
        .forEach(
            elementData => {
                rqlRequestData += `<PLUGIN action='save' guid='${elementData.Guid}' active='${elementData.Active}'/>`;
            }
        );
    let rqlRequestTemplate = `<PLUGINS>${rqlRequestData}</PLUGINS>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingPlugIn = $(rqlResponse).find("PLUGIN");
                let responseData = [];
                processingPlugIn
                    .each(
                        function () {
                            let elementData = {
                                Name: $(this).attr("name"),
                                Guid: $(this).attr("guid"),
                                Active: Boolean(parseInt($(this).attr("active"), 10)),
                            }
                            responseData.push(elementData);
                        }
                    );
                responseData
                    .sort(
                        function (a, b) {
                            let valueA = a.Name.toLowerCase(),
                                valueB = b.Name.toLowerCase();
                            if (valueA < valueB) {
                                return -1;
                            }
                            if (valueA > valueB) {
                                return 1;
                            }
                            return 0;
                        }
                    );
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
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Update settings of Plug-Ins
 * !NOT DOCUMENTED!
 * 
 * You need administrative notes to be able to use plug-ins in Management Server.
 * You can use this RQL query to update the setttings of a plug-in.
 * 
 * @author Thomas Pollinger 
 * @version {build-release}
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {object}
 */
function updatePlugIns(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestData = ``;
    requestParam
        .forEach(
            elementData => {
                rqlRequestData += `<PLUGIN action="save" guid="${elementData.Guid}" active="${elementData.Active}" url="${elementData.Uri}" compatibility="${elementData.Compatibility}"><ICON source="${elementData.Icon.Source}" /></PLUGIN>`;
            }
        );
    let rqlRequestTemplate = `<PLUGINS>${rqlRequestData}</PLUGINS>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingPlugIn = $(rqlResponse).find("PLUGIN");
                let responseData = [];
                processingPlugIn
                    .each(
                        function () {
                            let elementData = {
                                Guid: $(this).attr("guid"),
                                Uri: $(this).attr("url"),
                                Compatibility: $(this).attr("compatibility"),
                                Active: Boolean(parseInt($(this).attr("active"), 10)),
                            }
                            responseData.push(elementData);
                        }
                    );
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
/* ----- ----- ----- ----- ----- ----- ----- ----- */