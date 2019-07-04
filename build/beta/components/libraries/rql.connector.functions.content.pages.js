/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1250
   File UUID: 2f4cac10-efe5-4883-942e-0381ede3c977
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Determining Page Information (Simple)
 * RQL documentation 16.0.3
 * 
 * You can display the basic information of a page.
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1250
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {object}
 */
function getPageInformationSimple(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<PAGE action='load' guid='${requestParam.Guid}'/>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingPage = $(rqlResponse).find("PAGE");
                let responseData = {
                    Headline: $(processingPage).attr("headline"),
                    Id: $(processingPage).attr("id"),
                    Guid: requestParam.Guid,
                    ParentGuid: $(processingPage).attr("parentguid"),
                    Status: parseInt($(processingPage).attr("status"), 10)
                }
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
