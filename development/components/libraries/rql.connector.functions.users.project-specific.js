/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release {build-release}
   File UUID: 3a7fea7f-a0a7-4d68-a2ee-2e3a956fd4ed
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Listing the Users of a Project
 * RQL documentation 16.0.3
 * 
 * You can list all users of a project, ordered by their ID.
 * 
 * @author Thomas Pollinger 
 * @version {build-release}
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {array}
 */
function getUsersOfProject(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<ADMINISTRATION><PROJECT guid='${requestParam.ProjectGuid}'><USERS action='list' /></PROJECT></ADMINISTRATION>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingUser = $(rqlResponse).find("USER");
                let responseData = [];
                processingUser
                    .each(
                        function () {
                            let elementData = {
                                Name: $(this).attr("name"),
                                FullName: $(this).attr("fullname"),
                                EMail: $(this).attr("email"),
                                DialogLanguageId: $(this).attr("dialoglanguageid"),
                                Id: parseInt($(this).attr("id"), 10),
                                Guid: $(this).attr("guid"),
                                LoginDate: parseFloat(($(this).attr("logindate")).replace(",", "."))
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
 * Listing Active Users in a Project
 * RQL documentation 16.0.3
 * 
 * You can display all the users that are currently connected to a project. This is especially useful when you want to block a project, but have to inform the users first.
 * 
 * @author Thomas Pollinger 
 * @version {build-release}
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {array}
 */
function getActiveUsersOfProject(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<ADMINISTRATION><USERS action='connectlist' projectguid='${requestParam.ProjectGuid}' /></ADMINISTRATION>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingUser = $(rqlResponse).find("USER");
                let responseData = [];
                processingUser
                    .each(
                        function () {
                            let elementData = {
                                Name: $(this).attr("name"),
                                FullName: $(this).attr("fullname"),
                                EMail: $(this).attr("email"),
                                DialogLanguageId: $(this).attr("dialoglanguageid"),
                                Id: parseInt($(this).attr("id"), 10),
                                MaxLevel: parseInt($(this).attr("maxlevel"), 10),
                                ProjectLevel: parseInt($(this).attr("projectlevel"), 10),
                                Intern: Boolean(parseInt($(this).attr("intern"), 10)),
                                Guid: $(this).attr("guid"),
                                LoginGuid: $(this).attr("loginguid"),
                                LoginDate: parseFloat(($(this).attr("logindate")).replace(",", ".")),
                                LastActionDate: parseFloat(($(this).attr("lastactiondate")).replace(",", ".")),
                                ModuleId: $(this).attr("moduleid"),
                                ModuleGuid: $(this).attr("moduleguid"),
                                ModuleDescription: $(this).attr("moduledescription")
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