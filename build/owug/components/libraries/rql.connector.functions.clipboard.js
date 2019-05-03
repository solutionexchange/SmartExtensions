/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1207
   File UUID: 54dcf4d1-d00d-4e28-965f-3616b9c67a20
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Determining Clipboard Data
 * RQL documentation 16.0.3
 * 
 * You can display data that a specific user has saved in Clipboard for a selected project.
 * Note: The project data saved in Clipboard in Management Server is saved in a special Clipboard format. This decoded HTML format must be encoded for further processsing.
 * Starting with version 10.0 of Management Server, the Clipboard data can also be retrieved as a structured RQL response. See attribute foraspx for further details.
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1207
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {object}
 */
function getClipboardData(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = ``;
    switch (rqlConnectorObj.info.session.LastActiveModule) {
        case "servermanager":
            rqlRequestTemplate = `<ADMINISTRATION><USER guid='${requestParam.UserGuid}'><CLIPBOARDDATA action='load' foraspx='1' /></USER></ADMINISTRATION>`;
            break;
        default:
            rqlRequestTemplate = `<ADMINISTRATION><USER guid='${requestParam.UserGuid}'><CLIPBOARDDATA action='load' foraspx='1' languagevariantid='${requestParam.LanguageVariantId}' projectguid='${requestParam.ProjectGuid}' /></USER></ADMINISTRATION>`;
    }
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingClipboardData = $(rqlResponse).find("CLIPBOARDDATA");
                let processingData = $(rqlResponse).find("DATA");
                let responseData = {};
                switch (rqlConnectorObj.info.session.LastActiveModule) {
                    case "servermanager":
                        responseData = {
                            Guid: $(processingClipboardData).attr("guid"),
                            UserGuid: $(processingClipboardData).attr("userguid"),
                            LastActionModule: rqlConnectorObj.info.session.LastActiveModule,
                            Content: []
                        }
                        break;
                    default:
                        responseData = {
                            Guid: $(processingClipboardData).attr("guid"),
                            UserGuid: $(processingClipboardData).attr("userguid"),
                            ProjectGuid: $(processingClipboardData).attr("projectguid"),
                            LastActionModule: rqlConnectorObj.info.session.LastActiveModule,
                            Content: []
                        }
                }
                processingData
                    .each(
                        function () {
                            let elementData = {
                                Guid: $(this).attr("guid"),
                                Type: $(this).attr("type")
                            }
                            responseData.Content.push(elementData);
                        }
                    );
                responseData.Content
                    .sort(
                        function (a, b) {
                            let valueA = a.Type.toLowerCase(),
                                valueB = b.Type.toLowerCase();
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
 * Add Clipboard Entry
 * RQL documentation 16.0.3
 * 
 * You can add Clipboard entry.
 * The format for adding Clipboard entries is equivalent to the RQL response that is returned when querying for CLIPBOARDDATA (action="load") with foraspx="1".
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1207
 *
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {boolean}
 */
function addClipboardEntry(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = ``;
    switch (rqlConnectorObj.info.session.LastActiveModule) {
        case "servermanager":
            rqlRequestTemplate = `<ADMINISTRATION><USER guid='${requestParam.UserGuid}'><CLIPBOARDDATA action='add'><DATA guid='${requestParam.Guid}' type='${requestParam.Type}' /></CLIPBOARDDATA></USER></ADMINISTRATION>`;
            break;
        default:
            rqlRequestTemplate = `<ADMINISTRATION><USER guid='${requestParam.UserGuid}'><CLIPBOARDDATA action='add' projectguid='${requestParam.ProjectGuid}'><DATA guid='${requestParam.Guid}' type='${requestParam.Type}' /></CLIPBOARDDATA></USER></ADMINISTRATION>`;
    }
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    let rqlRequestSession = {};
    if (requestParam.LoginGuid && requestParam.SessionKey) {
        rqlRequestSession = {
            LoginGuid: requestParam.LoginGuid,
            SessionKey: requestParam.SessionKey,
            DialogLanguageId: requestParam.DialogLanguageId
        }
    }
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingIoData = $(rqlResponse).text();
                let responseData = false;
                if (processingIoData === "ok") {
                    responseData = true;
                }
                if (callbackFunc) {
                    thisFunction.DebugMode && console.info(`Received response from SOAP/RQL Connector Object.`);
                    thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                    thisFunction.DebugMode && console.log(responseData);
                    thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                    callbackFunc(responseData);
                } else {
                    thisFunction.DebugMode && console.warn(`No callback function defined at ${thisFunction.Name}().\nResponse:`);
                    thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                    thisFunction.DebugMode && console.log(responseData);
                    thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                    return (responseData);
                }
            },
            rqlRequestSession
        );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Adding Clipboard Entries
 * RQL documentation 16.0.3
 * 
 * You can add Clipboard entries.
 * The format for adding Clipboard entries is equivalent to the RQL response that is returned when querying for CLIPBOARDDATA (action="load") with foraspx="1".
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1207
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {boolean}
 */
function addClipboardEntries(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestData = ``;
    requestParam.Items
        .forEach(
            elementData => {
                rqlRequestData += `<DATA guid='${elementData.Guid}' type='${elementData.Type}' />`;
            }
        );
    let rqlRequestTemplate = ``;
    switch (rqlConnectorObj.info.session.LastActiveModule) {
        case "servermanager":
            rqlRequestTemplate = `<ADMINISTRATION><USER guid='${requestParam.UserGuid}'><CLIPBOARDDATA action='add'>${rqlRequestData}</CLIPBOARDDATA></USER></ADMINISTRATION>`;
            break;
        default:
            rqlRequestTemplate = `<ADMINISTRATION><USER guid='${requestParam.UserGuid}'><CLIPBOARDDATA action='add' projectguid='${requestParam.ProjectGuid}'>${rqlRequestData}</CLIPBOARDDATA></USER></ADMINISTRATION>`;
    }
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    let rqlRequestSession = {};
    if (requestParam.LoginGuid && requestParam.SessionKey) {
        rqlRequestSession = {
            LoginGuid: requestParam.LoginGuid,
            SessionKey: requestParam.SessionKey,
            DialogLanguageId: requestParam.DialogLanguageId
        }
    }
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingIoData = $(rqlResponse).text();
                let responseData = false;
                if (processingIoData === "ok") {
                    responseData = true;
                }
                if (callbackFunc) {
                    thisFunction.DebugMode && console.info(`Received response from SOAP/RQL Connector Object.`);
                    thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                    thisFunction.DebugMode && console.log(responseData);
                    thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                    callbackFunc(responseData);
                } else {
                    thisFunction.DebugMode && console.warn(`No callback function defined at ${thisFunction.Name}().\nResponse:`);
                    thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                    thisFunction.DebugMode && console.log(responseData);
                    thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                    return (responseData);
                }
            },
            rqlRequestSession
        );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Removing Clipboard Entry
 * RQL documentation 16.0.3
 * 
 * You can remove the entry of the clipboard.
 * The query format for removing clipboard entries is equivalent to the RQL response that is returned after a CLIPBOARDDATA query (action="load") with foraspx="1" has been executed.
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1207
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {boolean}
 */
function removeClipboardEntry(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = ``;
    switch (rqlConnectorObj.info.session.LastActiveModule) {
        case "servermanager":
            rqlRequestTemplate = `<ADMINISTRATION><USER guid='${requestParam.UserGuid}'><CLIPBOARDDATA action='remove' ><DATA guid='${requestParam.Guid}' type='${requestParam.Type}' /></CLIPBOARDDATA></USER></ADMINISTRATION>`;
            break;
        default:
            rqlRequestTemplate = `<ADMINISTRATION><USER guid='${requestParam.UserGuid}'><CLIPBOARDDATA action='remove' projectguid='${requestParam.ProjectGuid}'><DATA guid='${requestParam.Guid}' type='${requestParam.Type}' /></CLIPBOARDDATA></USER></ADMINISTRATION>`;
    }
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingIoData = $(rqlResponse).text();
                let responseData = false;
                if (processingIoData === "ok") {
                    responseData = true;
                }
                if (callbackFunc) {
                    thisFunction.DebugMode && console.info(`Received response from SOAP/RQL Connector Object.`);
                    thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                    thisFunction.DebugMode && console.log(responseData);
                    thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                    callbackFunc(responseData);
                } else {
                    thisFunction.DebugMode && console.warn(`No callback function defined at ${thisFunction.Name}().\nResponse:`);
                    thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                    thisFunction.DebugMode && console.log(responseData);
                    thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                    return (responseData);
                }
            }
        );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Removing Clipboard Entries
 * RQL documentation 16.0.3
 * 
 * You can remove the entries of the clipboard.
 * The query format for removing clipboard entries is equivalent to the RQL response that is returned after a CLIPBOARDDATA query (action="load") with foraspx="1" has been executed.
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1207
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {boolean}
 */
function removeClipboardEntries(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestData = ``;
    requestParam.Items
        .forEach(
            elementData => {
                rqlRequestData += `<DATA guid='${elementData.Guid}' type='${elementData.Type}' />`;
            }
        );
    let rqlRequestTemplate = ``;
    switch (rqlConnectorObj.info.session.LastActiveModule) {
        case "servermanager":
            rqlRequestTemplate = `<ADMINISTRATION><USER guid='${requestParam.UserGuid}'><CLIPBOARDDATA action='remove' >${rqlRequestData}</CLIPBOARDDATA></USER></ADMINISTRATION>`;
            break;
        default:
            rqlRequestTemplate = `<ADMINISTRATION><USER guid='${requestParam.UserGuid}'><CLIPBOARDDATA action='remove' projectguid='${requestParam.ProjectGuid}'>${rqlRequestData}</CLIPBOARDDATA></USER></ADMINISTRATION>`;
    }
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingIoData = $(rqlResponse).text();
                let responseData = false;
                if (processingIoData === "ok") {
                    responseData = true;
                }
                if (callbackFunc) {
                    thisFunction.DebugMode && console.info(`Received response from SOAP/RQL Connector Object.`);
                    thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                    thisFunction.DebugMode && console.log(responseData);
                    thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                    callbackFunc(responseData);
                } else {
                    thisFunction.DebugMode && console.warn(`No callback function defined at ${thisFunction.Name}().\nResponse:`);
                    thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                    thisFunction.DebugMode && console.log(responseData);
                    thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                    return (responseData);
                }
            }
        );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */
