/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1207
   File UUID: f976c388-8089-420f-93a7-a079c2c25850
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Determining Content Class Data
 * RQL documentation 16.0.3
 * 
 * You can display the data of a content class if you know its GUID.
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
function getContentClassInformationSimple(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<PROJECT><TEMPLATE action='load' guid='${requestParam.Guid}'/></PROJECT>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingElt = $(rqlResponse).find("TEMPLATE");
                let responseData = {
                    Name: $(processingElt).attr("name"),
                    Description: $(processingElt).attr("description"),
                    Guid: requestParam.Guid,
                    FolderGuid: $(processingElt).attr("folderguid"),
                    ApproveRequired: Boolean(parseInt($(processingElt).attr("approverequired"), 10)),
                    IsMasterPage: Boolean(parseInt($(processingElt).attr("ismasterpage"), 10))
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
