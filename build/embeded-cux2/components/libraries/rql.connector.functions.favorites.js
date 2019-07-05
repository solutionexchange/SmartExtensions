/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1253
   File UUID: a8fcb92c-d559-4bf9-a700-f213e1c3b654
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Determining Favorites
 * RQL documentation 16.0.3
 * 
 * You can display all the links, pages and content classes that a user has added to his or her favorites.
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1253
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {object}
 */
function getFavorites(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<PROJECT><FAVORITES action='load' userguid='${requestParam.UserGuid}' /></PROJECT>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingFavorite = $(rqlResponse).find("FAVORITE");
                let responseData = {
                    Pages: [],
                    Links: [],
                    ContentClasses: []
                };
                processingFavorite
                    .each(
                        function () {
                            /* >>> Workaround for encoding issue WSM-1493 / Jira issue CMC-712 */
                            var workaroundValue = ($(this).attr("value")).replace(new RegExp("&nbsp;", ""), "");
                            if (workaroundValue.indexOf("&nbsp;") != -1) {
                                workaroundValue = workaroundValue.substring(0, workaroundValue.indexOf("&nbsp;"));
                            }
                            /* <<< Workaround for encoding issue WSM-1493 / Jira issue CMC-712 */
                            let elementData = {
                                Guid: $(this).attr("guid"),
                                ElementGuid: $(this).attr("eltguid"),
                                Type: $(this).attr("type"),
                                ImageTitle: $(this).attr("imagetitle"),
                                UserGuid: $(this).attr("userguid"),
                                Value: workaroundValue
                            }
                            switch (elementData.Type) {
                                case "page":
                                    responseData.Pages.push(elementData);
                                    break;
                                case "link":
                                    responseData.Links.push(elementData);
                                    break;
                                case "app.4015":
                                    responseData.ContentClasses.push(elementData);
                                    break;
                                default:
                                    console.log(`${elementData.Type} is not defined`);
                            }
                        }
                    );
                responseData.Pages
                    .sort(
                        function (a, b) {
                            let valueA = a.Value.toLowerCase(),
                                valueB = b.Value.toLowerCase();
                            if (valueA < valueB) {
                                return -1;
                            }
                            if (valueA > valueB) {
                                return 1;
                            }
                            return 0;
                        }
                    );
                responseData.Links
                    .sort(
                        function (a, b) {
                            let valueA = a.Value.toLowerCase(),
                                valueB = b.Value.toLowerCase();
                            if (valueA < valueB) {
                                return -1;
                            }
                            if (valueA > valueB) {
                                return 1;
                            }
                            return 0;
                        }
                    );
                responseData.ContentClasses
                    .sort(
                        function (a, b) {
                            let valueA = a.Value.toLowerCase(),
                                valueB = b.Value.toLowerCase();
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
 * Saving Favorites
 * RQL documentation 16.0.3
 * 
 * You can add links, pages, and content classes to the favorites. This makes it easer to find pages in the tree of the user interface.
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1253
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {array}
 */
function addFavoriteEntries(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestData = ``;
    requestParam.Items
        .forEach(
            elementData => {
                rqlRequestData += `<FAVORITE eltguid='${elementData.ElementGuid}' userguid='${requestParam.UserGuid}' type='${elementData.Type}' value='${elementData.Name}' imagetitle='${elementData.ImageTitle}'/>`;
            }
        );
    let rqlRequestTemplate = `<PROJECT><FAVORITES action="save">${rqlRequestData}</FAVORITES></PROJECT>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingFavorite = $(rqlResponse).find("FAVORITE");
                let responseData = {
                    Pages: [],
                    Links: [],
                    ContentClasses: []
                }
                processingFavorite
                    .each(
                        function () {
                            let elementData = {
                                Guid: $(this).attr("guid"),
                                ElementGuid: $(this).attr("eltguid"),
                                Type: $(this).attr("type"),
                                ImageTitle: $(this).attr("imagetitle"),
                                UserGuid: $(this).attr("userguid"),
                                Value: ($(this).attr("value")).replace(new RegExp("&nbsp;", "g"), "")
                            }
                            switch (elementData.Type) {
                                case "page":
                                    responseData.Pages.push(elementData);
                                    break;
                                case "link":
                                    responseData.Links.push(elementData);
                                    break;
                                case "app.4015":
                                    responseData.ContentClasses.push(elementData);
                                    break;
                                default:
                                    console.log(`${elementData.Type} is not defined`);
                            }
                        }
                    );
                responseData.Pages
                    .sort(
                        function (a, b) {
                            let valueA = a.Value.toLowerCase(),
                                valueB = b.Value.toLowerCase();
                            if (valueA < valueB) {
                                return -1;
                            }
                            if (valueA > valueB) {
                                return 1;
                            }
                            return 0;
                        }
                    );
                responseData.Links
                    .sort(
                        function (a, b) {
                            let valueA = a.Value.toLowerCase(),
                                valueB = b.Value.toLowerCase();
                            if (valueA < valueB) {
                                return -1;
                            }
                            if (valueA > valueB) {
                                return 1;
                            }
                            return 0;
                        }
                    );
                responseData.ContentClasses
                    .sort(
                        function (a, b) {
                            let valueA = a.Value.toLowerCase(),
                                valueB = b.Value.toLowerCase();
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
                    thisFunction.DebugMode && console.table(responseData);
                    thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                    callbackFunc(responseData);
                } else {
                    thisFunction.DebugMode && console.warn(`No callback function defined at ${thisFunction.Name}().\nResponse:`);
                    thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                    thisFunction.DebugMode && console.table(responseData);
                    thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                    return (responseData);
                }
            }
        );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Deleting Favorites
 * RQL documentation 16.0.3
 * 
 * When you have added elements to the favorites, you can remove them from the list again.
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1253
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {array}
 */
function removeFavoriteEntries(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestData = ``;
    requestParam.Items
        .forEach(
            elementData => {
                rqlRequestData += `<FAVORITE guid='${elementData.Guid}' userguid='${requestParam.UserGuid}' />`;
            }
        );
    let rqlRequestTemplate = `<PROJECT><FAVORITES action="delete">${rqlRequestData}</FAVORITES></PROJECT>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingFavorite = $(rqlResponse).find("FAVORITE");
                let responseData = [];
                processingFavorite
                    .each(
                        function () {
                            let elementData = {
                                Guid: $(this).attr("guid"),
                                UserGuid: $(this).attr("userguid")
                            }
                            responseData.push(elementData);
                        }
                    );
                if (callbackFunc) {
                    thisFunction.DebugMode && console.info(`Received response from SOAP/RQL Connector Object.`);
                    thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                    thisFunction.DebugMode && console.table(responseData);
                    thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                    callbackFunc(responseData);
                } else {
                    thisFunction.DebugMode && console.warn(`No callback function defined at ${thisFunction.Name}().\nResponse:`);
                    thisFunction.DebugMode && console.log(`Type: ${typeof responseData}`);
                    thisFunction.DebugMode && console.table(responseData);
                    thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
                    return (responseData);
                }
            }
        );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */
