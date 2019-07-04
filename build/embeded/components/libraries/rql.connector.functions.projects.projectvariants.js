/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1250
   File UUID: 491aa011-8f69-4f40-82bc-e2358a4b092d
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Listing Project Variants
 * RQL documentation 16.0.3
 * You can list all existing project variants with name and GUID. Via the checked attribute in the response, you can see which project variant has been defined as the display format.
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1250
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam currently not in use
 * @param {function} callbackFunc
 * 
 * @returns {object}
 */
function getProjectVariantsList(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<PROJECT><PROJECTVARIANTS action='list' /></PROJECT>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingProjectVariants = $(rqlResponse).find("PROJECTVARIANTS");
                let processingProjectVariant = $(rqlResponse).find("PROJECTVARIANT");
                let responseData = {
                    LanguageVariantId: $(processingProjectVariants).attr("languagevariantid"),
                    DialogLanguageId: $(processingProjectVariants).attr("dialoglanguageid"),
                    ProjectVariants: []
                }
                processingProjectVariant
                    .each(
                        function () {
                            let elementData = {
                                Name: $(this).attr("name"),
                                Guid: $(this).attr("guid"),
                                Checked: Boolean(parseInt($(this).attr("checked"), 10)),
                                UserDisplayVariant: Boolean(parseInt($(this).attr("userdisplayvariant"), 10) ? 1 : 0)
                            }
                            responseData.ProjectVariants.push(elementData);
                        }
                    );
                responseData.ProjectVariants
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
