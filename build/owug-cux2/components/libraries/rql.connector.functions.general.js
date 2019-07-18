/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1259
   File UUID: 8fdcda28-6154-4740-a47d-3ae51a974b40
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Sending E-Mail
 * RQL documentation 16.0.3
 * 
 * You can send e-mail to one or more users.
 * Note: Since this process is executed asynchronously, the results are not immediately visible.
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1259
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {object}
 */
function sendEMail(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<ADMINISTRATION action='sendmail' from='${requestParam.From}' to='${requestParam.To}' subject='${requestParam.Subject}' message='${requestParam.Message}' plaintext='${+requestParam.Plaintext}'/>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingAdministration = $(rqlResponse).find("ADMINISTRATION");
                let responseData = {
                    From: $(processingAdministration).attr("from"),
                    To: $(processingAdministration).attr("to"),
                    Subject: $(processingAdministration).attr("subject"),
                    RedDotServerGuid: $(processingAdministration).attr("reddotserverguid"),
                    ThreadGuid: $(processingAdministration).attr("threadguid")
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



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * 
 * 
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1259
 * 
 * @param {object} rqlConnectorObj
 * @param {function} callbackFunc
 * 
 * @returns {object}
 */
function sendHeartbeat(rqlConnectorObj, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    var timestamp = Date.now();
    let rqlRequestTemplate = `<REFRESH/>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingIoData = $(rqlResponse).text();
                let responseData = {
                    ASPdotNET: false,
                    ClassicASP: false,
                    RQL: false,
                    Timestamp: timestamp
                }
                if (processingIoData === "ok") {
                    responseData.RQL = {
                        readyState: 4,
                        status: 200,
                        statusText: processingIoData.toUpperCase(),
                        responseRQL: rqlResponse,
                        responseText: processingIoData
                    }
                    responseData.ClassicASP = $.getJSON(`${rqlConnectorObj.uri.sessionKeepAliveClassicASP}?timestamp=${timestamp}`);
                    responseData.ASPdotNET = $.ajax({
                        async: true,
                        url: `${rqlConnectorObj.uri.sessionKeepAliveASPdotNET}?timestamp=${timestamp}`
                    });
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



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * 
 * 
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1259
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {boolean}
 */
function startHeartbeat(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    rqlConnectorObj.sessionKeepAliveTimer = setInterval(keepSessionAlive, requestParam.Interval);
    thisFunction.DebugMode && console.info(`Start heartbeat interval, sending every ${requestParam.Interval}ms.`);

    function keepSessionAlive() {
        sendHeartbeat(
            rqlConnectorObj,
            function (responseData) {
                thisFunction.DebugMode && console.info(`Send heartbeat to server successful. (${responseData.Timestamp})`);
            }
        );
    }
    let responseData = true;
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
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * 
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1259
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam currently not in use
 * @param {function} callbackFunc
 * 
 * @returns {boolean}
 */
function stopHeartbeat(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    clearInterval(rqlConnectorObj.sessionKeepAliveTimer);
    thisFunction.DebugMode && console.info(`Stop heartbeat interval.`);
    let responseData = true;
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
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Test RQL for check Error Handling
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1259
 * 
 * @param {object} rqlConnectorObj
 */
function testErrorHandling(rqlConnectorObj) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<TESTRQL><ERROR action='handling' guid='00000000-0000-0000-0000-000000000000' /></TESTRQL>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingError = rqlResponse;
                console.error(processingError);
            }
        );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */
