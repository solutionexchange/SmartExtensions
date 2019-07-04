/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1250
   File UUID: 4b2ef734-b796-407d-98e9-b5e5ed312cae
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 * Determining Application Server Data
 * RQL documentation 16.0.3
 * 
 * You can display important data of the application server. You have to know the server GUID.
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1250
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {string}
 */
function getServerVersion(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<ADMINISTRATION><EDITORIALSERVER action='load' guid='${requestParam.EditorialServerGuid}' mainlicense='0' /></ADMINISTRATION>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingEditorialServer = $(rqlResponse).find("EDITORIALSERVER");
                let responseData = $(processingEditorialServer).attr("version");
                rqlConnectorObj.info.version = $(processingEditorialServer).attr("version").split(" - ");
                rqlConnectorObj.info.version[1]
                    .split(".")
                    .forEach(
                        elementData => {
                            rqlConnectorObj.info.version.push(parseInt(elementData, 10));
                        }
                    );
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
 * Determining Drives
 * RQL documentation 16.0.3
 * 
 * You can display all the hard drives of the application server. Floppy disk drives are not displayed.
 *
 * @author Thomas Pollinger 
 * @version 16.0.0.1250
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {array}
 */
function getServerDrives(rqlConnectorObj, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<PROJECT><SYSTEM><DRIVES action='getdrives'/></SYSTEM></PROJECT>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingDrive = $(rqlResponse).find("DRIVE");
                let responseData = [];
                processingDrive
                    .each(
                        function () {
                            let elementData = {
                                Drive: encodeURIComponent(`${$(this).attr("name")}:\\`),
                                Name: encodeURIComponent($(this).attr("name"))
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
 * Listing All Directories
 * RQL documentation 16.0.3
 * 
 * You can list the subdirectories of a directory on the application server.
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1250
 * 
 * @param {object} rqlConnectorObj
 * @param {object} requestParam
 * @param {function} callbackFunc
 * 
 * @returns {array}
 */
function getServerDirectories(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<PROJECT><SYSTEM><DRIVE name='${decodeURIComponent(requestParam.Drive)}'><DIRECTORY action='list' name='${decodeURIComponent(requestParam.Drive)}${decodeURIComponent(requestParam.LiteralPath)}' /></DRIVE></SYSTEM></PROJECT>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingDrive = $(rqlResponse).find("DRIVE");
                let processingDirectories = $(rqlResponse).find("DIRECTORIES");
                let processingFolder = $(rqlResponse).find("FOLDER");
                let responseData = [];
                processingFolder
                    .each(
                        function () {
                            let elementData = {
                                Drive: encodeURIComponent($(processingDrive).attr("name")),
                                Directory: encodeURIComponent($(processingDirectories).attr("name")),
                                Name: encodeURIComponent($(this).attr("name")),
                                LiteralPath: encodeURIComponent($(this).attr("path"))
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
 * Create New Directories
 * RQL documentation 16.0.3
 * 
 * You can create new subdirectories of a directory on the application server.
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
function newServerDirectory(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<PROJECT><SYSTEM><DRIVE name='${decodeURIComponent(requestParam.Drive)}'><DIRECTORY action='createdir' name='${decodeURIComponent(requestParam.LiteralPath)}' newdir='${decodeURIComponent(requestParam.Name)}' /></DRIVE></SYSTEM></PROJECT>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingDrive = $(rqlResponse).find("DRIVE");
                let processingDirectory = $(rqlResponse).find("DIRECTORY");
                let responseData = {
                    Drive: encodeURIComponent($(processingDrive).attr("name")),
                    LiteralPath: encodeURIComponent($(processingDirectory).attr("name")),
                    Name: encodeURIComponent($(processingDirectory).attr("newdir"))
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
 * Determining File Contents
 * RQL documentation 16.0.3
 * 
 * You can use this RQL query to display the content of an XML or text file.
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
function getServerFileContent(rqlConnectorObj, requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = ``;
    if (requestParam.Path) {
        rqlRequestTemplate = `<ADMINISTRATION><FILE action='load' format='${requestParam.Format}' filename='${decodeURIComponent(requestParam.Path)}' /></ADMINISTRATION>`;
    } else {
        rqlRequestTemplate = `<ADMINISTRATION><FILE action='load' format='${requestParam.Format}' filename='${decodeURIComponent(requestParam.Drive)}${decodeURIComponent(requestParam.LiteralPath)}${decodeURIComponent(requestParam.Filename)}' /></ADMINISTRATION>`;
    }
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            (requestParam.Format === 1 ? true : false),
            function (rqlResponse) {
                let responseData = [];
                if (requestParam.Format === 0) {
                    let processingFile = $(rqlResponse).find("FILE");
                    let elementData = {};
                    if (requestParam.Path) {
                        elementData = {
                            Path: encodeURIComponent($(processingFile).attr("filename")),
                            Content: $(processingFile).html()
                        }
                    } else {
                        elementData = {
                            Drive: encodeURIComponent(requestParam.Drive),
                            LiteralPath: encodeURIComponent($(processingFile).attr("filename")),
                            Content: $(processingFile).html()
                        }
                    }
                    responseData = elementData;
                }
                if (requestParam.Format === 1) {
                    let processingFile = rqlResponse;
                    let elementData = {};
                    if (requestParam.Path) {
                        elementData = {
                            Path: `${requestParam.Drive}${requestParam.Path}${requestParam.Filename}`,
                            Content: processingFile
                        }
                    } else {
                        elementData = {
                            Drive: requestParam.Drive,
                            LiteralPath: `${requestParam.Drive}${requestParam.LiteralPath}${requestParam.Filename}`,
                            Content: processingFile
                        }
                    }
                    responseData = elementData;
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
 * List Charsets
 * RQL documentation 16.0.3
 * 
 * Determin the list of charset available on this machine.
 * 
 * @author Thomas Pollinger 
 * @version 16.0.0.1250
 * 
 * @param {object} rqlConnectorObj
 * @param {function} callbackFunc
 * 
 * @returns {array}
 */
function getServerCharsets(rqlConnectorObj, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    let rqlRequestTemplate = `<ADMINISTRATION><CHARSETS action='list' /></ADMINISTRATION>`;
    let rqlRequestBody = $.parseXML(rqlRequestTemplate);
    rqlConnectorObj
        .sendRql(
            (new XMLSerializer()).serializeToString(rqlRequestBody),
            false,
            function (rqlResponse) {
                let processingCharset = $(rqlResponse).find("CHARSET");
                let responseData = [];
                processingCharset
                    .each(
                        function () {
                            let elementData = {
                                Name: $(this).attr("name"),
                                Label: $(this).attr("label"),
                                Codepage: parseInt($(this).attr("codepage"), 10)
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
