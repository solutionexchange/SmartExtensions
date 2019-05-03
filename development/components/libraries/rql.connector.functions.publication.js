/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release {build-release}
   File UUID: 2277ca1f-4dcf-4682-9d48-2966e0f1d701
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Publishing Pages
 * RQL documentation 16.0.3
 * 
 * You can publish a page, individually or together with following pages, in a specified directory. This query can be run immediately or scheduled for later execution.
 * Note: The publication process is asynchronous and may take some time.
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
function startPublishingPages(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<PROJECT guid='${requestParam.ProjectGuid ? requestParam.ProjectGuid : rqlConnectorObj.info.session.ProjectGuid}' sessionkey='${rqlConnectorObj.info.session.SessionKey}'><PAGE guid='[!guid_page!]'><EXPORTJOB action='save' email='' toppriority='0' generatenextpages='0' generaterelativepages='0' reddotserver='' application='' generatedate='0' startgenerationat='0'><LANGUAGEVARIANTS action='checkassigning'></LANGUAGEVARIANTS><PROJECTVARIANTS action='checkassigning'></PROJECTVARIANTS></EXPORTJOB></PAGE></PROJECT>`;
    let rqlRequestTemplateLanguageVariants = `<LANGUAGEVARIANT guid='[!guid_languagevariant!]' checked='1' />`;
    let rqlRequestTemplateProjectVariants = `<PROJECTVARIANT guid='[!guid_projectvariant!]' checked='1' />`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    console.log(rqlRequestTemplate);
    /*rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingExportJob = $(rqlResponse).find("EXPORTJOB");
                let responseData = [];
                processingExportJob
                    .each(
                        function () {
                            let elementData = {
                                Action: $(this).attr("action"),
                                EMail: $(this).attr("email"),
                                JobGuid: $(this).attr("guid"),
                                ProjectGuid: $(this).attr("projectguid"),
                                Priority: $(this).attr("toppriority"),
                                ServerGuid: $(this).attr("reddotserver"),
                                GenerateNextPages: $(this).attr("generatenextpages"),
                                GenerateRelativePages: $(this).attr("generaterelativepages"),
                                GenerateDate: $(this).attr("generatedate"),
                                StartGenerationAt: $(this).attr("startgenerationat")
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
        ); */
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */