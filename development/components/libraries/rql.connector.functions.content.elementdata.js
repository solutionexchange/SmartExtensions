/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release {build-release}
   File UUID: df00c97d-3edf-43eb-9149-8b2b54bb259d
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Determining Element Data
 * RQL documentation 16.0.3
 * 
 * You can display the properties of a page element, such as the GUID of the page to which the element belongs.
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
function getElementInformationSimple(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<ELT action='load' guid='${requestParam.Guid}' />`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingElt = $(rqlResponse).find("ELT");
                let responseData = {
                    Name: $(processingElt).attr("name"),
                    Description: $(processingElt).attr("description"),
                    AliasName: $(processingElt).attr("aliasname"),
                    EltName: $(processingElt).attr("eltname"),
                    EltType: $(processingElt).attr("elttype"),
                    Value: $(processingElt).attr("value"),
                    Guid: requestParam.Guid,
                    IsLink: $(processingElt).attr("islink"),
                    TemplateElementIsLink: $(processingElt).attr("templateelementislink"),
                    TemplateElementGuid: $(processingElt).attr("templateelementguid"),
                    Type: $(processingElt).attr("type")
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