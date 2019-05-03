/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release {build-release}
   File UUID: a09da92e-dfb4-42d1-9355-14e8c97d38ee
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Determining Asynchronous Process Categories
 * RQL documentation 16.0.3
 * 
 * Asynchronous processes can be started and stopped, activated and deactivated, cancelled and deleted.
 * You can choose the server which is to execute the next process.
 * You can also determine whether details for the process can be retrieved.
 * With this RQL query you can retrieve information about which kind of actions are permitted for which kind of asynchronous processes.
 * 
 * @author Thomas Pollinger 
 * @version {build-release}
 * 
 * @param {object} rqlConnectorObj
 * @param {function} callbackFunc
 * 
 * @returns {array}
 */
function getAsyncProcessCategories(rqlConnectorObj, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<ADMINISTRATION><ASYNCQUEUE action='loadcategories'/></ADMINISTRATION>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingJobType = $(rqlResponse).find("JOBTYPE");
                let responseData = [];
                processingJobType
                    .each(
                        function () {
                            let elementData = {
                                Name: $(this).attr("value"),
                                Type: $(this).attr("type"),
                                Actionflag: $(this).attr("actionflag")
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
 * Determining Asynchronous Process List 
 * RQL documentation 16.0.3
 * 
 * Contains a list of jobs which are either waiting to be executed, or are being executed by the process server.
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
function getAsyncProcessList(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = ``;
    if (requestParam.Project) {
        rqlRequestTemplate = `<ADMINISTRATION><ASYNCQUEUE action='list' project='${requestParam.Project}' /></ADMINISTRATION>`;
    } else {
        rqlRequestTemplate = `<ADMINISTRATION><ASYNCQUEUE action='list' /></ADMINISTRATION>`;
    }
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingProcessList1AsyncQueue = $(rqlResponse).find("PROCESSLIST1>ASYNCQUEUE");
                let processingProcessList2AsyncQueue = $(rqlResponse).find("PROCESSLIST2>ASYNCQUEUE");
                let responseData = {
                    Active: [],
                    Waiting: []
                }
                processingProcessList1AsyncQueue /* Jobs Active */
                    .each(
                        function () {
                            let elementData = {
                                Name: $(this).attr("name"),
                                Guid: $(this).attr("guid"),
                                JobGuid: $(this).attr("jobguid"),
                                Category: $(this).attr("category"),
                                Status: parseInt($(this).attr("status"), 10),
                                Active: Boolean(parseInt($(this).attr("active"), 10)),
                                Automatic: Boolean(parseInt($(this).attr("automatic"), 10)),
                                ProjectGuid: $(this).attr("project"),
                                ProjectName: $(this).attr("projectname"),
                                Priority: parseInt($(this).attr("priority"), 10),
                                NextAction: parseInt($(this).attr("nextaction"), 10),
                                Now: Boolean(parseInt($(this).attr("now", 10))),
                                EditorialServerGuid: $(this).attr("editorialserver"),
                                EditorialServerName: $(this).attr("editorialservername"),
                                ServerGuid: $(this).attr("server"),
                                ServerName: $(this).attr("servername"),
                                LastExecute: parseFloat(($(this).attr("lastexecute")).replace(",", ".")),
                                NextExecute: parseFloat(($(this).attr("nextexecute")).replace(",", "."))
                            }
                            responseData.Active.push(elementData);
                        }
                    );
                processingProcessList2AsyncQueue /* Jobs Waiting */
                    .each(
                        function () {
                            let elementData = {
                                Name: $(this).attr("name"),
                                Guid: $(this).attr("guid"),
                                JobGuid: $(this).attr("jobguid"),
                                Category: $(this).attr("category"),
                                Status: parseInt($(this).attr("status"), 10),
                                Active: Boolean(parseInt($(this).attr("active"), 10)),
                                Automatic: Boolean(parseInt($(this).attr("automatic"), 10)),
                                ProjectGuid: $(this).attr("project"),
                                ProjectName: $(this).attr("projectname"),
                                Priority: parseInt($(this).attr("priority"), 10),
                                NextAction: parseInt($(this).attr("nextaction"), 10),
                                Now: Boolean(parseInt($(this).attr("now"), 10)),
                                EditorialServerGuid: $(this).attr("editorialserver"),
                                EditorialServerName: $(this).attr("editorialservername"),
                                ServerGuid: $(this).attr("server"),
                                ServerName: $(this).attr("servername"),
                                LastExecute: parseFloat(($(this).attr("lastexecute")).replace(",", ".")),
                                NextExecute: parseFloat(($(this).attr("nextexecute")).replace(",", "."))
                            }
                            responseData.Waiting.push(elementData);
                        }
                    );
                responseData.Active
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
                responseData.Waiting
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