/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1253
   File UUID: 6113686f-47af-44d2-a34b-fa24ba2534fc
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
$(document)
    .ready(
        function () {
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            var dateTest = new Date();
            var oadateTest = dateTest.toOADate();
            console.log(`${dateTest.toLocaleString()} (${dateTest})\nOADate Test: ${oadateTest}\nFromOADate: ${(oadateTest.fromOADate()).tz('Europe/Berlin')}`);
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            var rqlConnectorObj = {};
            var ws = {};
            createRqlConnector({
                    DebugMode: true,
                    BaseHref: "/CMS/Plugins/embeded-cux2",
                    ConnectorMode: "embeded"
                },
                function (returnConnectorObj) {
                    rqlConnectorObj = returnConnectorObj;
                    ws = new opentext(rqlConnectorObj);
                    setExtensionDialogLanguage(rqlConnectorObj);
                    setContentAbout(rqlConnectorObj);
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                    $("body").attr("lang", rqlConnectorObj.info.session.DialogLanguageId);
                    $("#reloadAll > .fa-sync").toggleClass("fa-spin text-danger");
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                    $("#switchLocalized").prop("checked", true);
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                    $("#myTab").scrollingTabs({
                        bootstrapVersion: 4,
                        scrollToTabEdge: true,
                        disableScrollArrowsOnFullyScrolled: true,
                        cssClassLeftArrow: "fas fa-caret-left tabs-arrow",
                        cssClassRightArrow: "fas fa-caret-right tabs-arrow"
                    });
                    $("#myTab").on("shown.bs.tab", function () {
                        $(this).scrollingTabs("scrollToActiveTab");
                    })
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                }
            );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#switchTooltip")
                .on(
                    "click",
                    function () {
                        if ($(this).prop("checked")) {
                            $('[data-toggle="tooltip"]').tooltip('enable');
                        } else {
                            $('[data-toggle="tooltip"]').tooltip('disable');
                        }
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#switchDebug")
                .on(
                    "click",
                    function () {
                        if ($(this).prop("checked")) {
                            $("body").attr("_lang-core", $("body").attr("lang-core")).removeAttr("lang-core");
                            $("body").attr("_lang-embeded", $("body").attr("lang-embeded")).removeAttr("lang-embeded");
                            $("#switchLocalized").prop("disabled", true);
                            $("#repairSelection-fromClipboard").prop("disabled", false);
                        } else {
                            $("body").attr("lang-core", $("body").attr("_lang-core")).removeAttr("_lang-core");
                            $("body").attr("lang-embeded", $("body").attr("_lang-embeded")).removeAttr("_lang-embeded");
                            $("#switchLocalized").prop("disabled", false);
                            $("#repairSelection-fromClipboard").prop("disabled", true);
                        }
                        $(".nav-tabs")
                            .scrollingTabs(
                                'refresh', {
                                    forceActiveTab: true
                                }
                            );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#reloadAll")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        thisButton = this;
                        $("#reloadAll > .fa-sync").toggleClass("fa-spin text-danger");
                        $(thisButton).prop("disabled", true);
                        $(".nav-tabs").scrollingTabs('refresh');
                        setTimeout(function () {
                            $("#reloadAll > .fa-sync").toggleClass("fa-spin text-danger");
                            $(thisButton).prop("disabled", false);
                        }, 2000);
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idDateTimePicker")
                .datetimepicker({
                    locale: 'de-de',
                    uiLibrary: 'bootstrap4',
                    format: 'dd. mmmm yyyy H:MM',
                    datepicker: {
                        weekStartDay: 1
                    },
                    footer: false,
                    modal: false
                });
            //$("#idDateTimePicker").timepicker.value = `${(new Date()).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`;
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idDatePicker")
                .datepicker({
                    locale: 'de-de',
                    uiLibrary: 'bootstrap4',
                    format: 'dd. mmmm yyyy',
                    datepicker: {
                        weekStartDay: 1
                    },
                    footer: false,
                    modal: false
                });
            //$("#idDatePicker").timepicker.value = `${(new Date()).toLocaleDateString()}`;
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idTimePicker")
                .timepicker({
                    locale: 'de-de',
                    uiLibrary: 'bootstrap4',
                    format: 'H:MM',
                    mode: '24hr',
                    footer: false,
                    modal: false
                });
            //$("#idTimePicker").timepicker.value = `${(new Date()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`;
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idSendHeartbeat")
                .on(
                    "click",
                    function () {
                        sendHeartbeat(
                            rqlConnectorObj,
                            function (responseObject) {
                                console.info(`The heartbeat has been sended. (${responseObject.Timestamp})`);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idStartHeartbeatInterval")
                .on(
                    "click",
                    function () {
                        startHeartbeat(
                            rqlConnectorObj, {
                                Interval: 5000
                            },
                            function (responseValue) {
                                responseValue && console.info(`The heartbeat has now started.`);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idStopHeartbeatInterval")
                .on(
                    "click",
                    function () {
                        stopHeartbeat(
                            rqlConnectorObj, {},
                            function (responseValue) {
                                responseValue && console.info(`The heartbeat has now been stopped.`);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idEnableDebugMode")
                .on(
                    "click",
                    function () {
                        if (!rqlConnectorObj.debugMode) {
                            rqlConnectorObj.debugMode = true;
                            console.info(`DebugMode is now ON. (${rqlConnectorObj.debugMode})`);
                        }
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idDisableDebugMode")
                .on(
                    "click",
                    function () {
                        if (rqlConnectorObj.debugMode) {
                            rqlConnectorObj.debugMode = false;
                            console.info(`DebugMode is now OFF. (${rqlConnectorObj.debugMode})`);
                        }
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idTestRQLWebService")
                .on(
                    "click",
                    function () {
                        getServerVersion(
                            rqlConnectorObj, {
                                EditorialServerGuid: rqlConnectorObj.info.session.EditorialServerGuid
                            },
                            function (responseValue) {
                                console.info(`${responseValue}`);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idTestRQLErrorHandling")
                .on(
                    "click",
                    function () {
                        testErrorHandling(
                            rqlConnectorObj
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idSyncConnectorSession")
                .on(
                    "click",
                    function () {
                        console.info(`Request the sync for SOAP/RQL Connector Object / Session.`);
                        rqlConnectorObj.syncSessionValues(
                            function () {}
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idSyncConnectorEnvironment")
                .on(
                    "click",
                    function () {
                        console.info(`Request the sync for SOAP/RQL Connector Object / Enviroment.`);
                        rqlConnectorObj.syncEnvironmentValues(
                            function () {}
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idGetRQLSessionObj")
                .on(
                    "click",
                    function () {
                        console.info(`Request for SOAP/RQL Connector Object / Session.`);
                        console.info(`Received response from SOAP/RQL Connector Object.`);
                        console.table(rqlConnectorObj.info.session);
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idGetRQLConnectorObj")
                .on(
                    "click",
                    function () {
                        console.info(`Request for SOAP/RQL Connector Object.`);
                        console.info(`Received response from SOAP/RQL Connector Object.`);
                        console.dir(rqlConnectorObj);
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idSendRQLEMail")
                .on(
                    "click",
                    function () {
                        sendEMail(
                            rqlConnectorObj, {
                                From: `webfactory.cms@vodafone.com`,
                                To: `thomas.pollinger@vodafone.com`,
                                Subject: `Test: E-Mail Notification`,
                                Message: `This is a test message!`,
                                Plaintext: true
                            },
                            function (responseObject) {
                                console.log(`\n${responseObject.To} : ${responseObject.ThreadGuid}`);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idSendRQLEMailExamples")
                .on(
                    "click",
                    function () {
                        sendEMail(
                            rqlConnectorObj, {
                                showExamples: true
                            },
                            function (responseObject) {}
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */

            /*
                <PROJECT guid='[!guid_project!]' sessionkey='[!key!]'>
                    <PAGE guid='[!guid_page!]'>
                        <EXPORTJOB action='save' email='' toppriority='0' generatenextpages='0' generaterelativepages='0' reddotserver='' application='' generatedate='0' startgenerationat='0'>
                            <LANGUAGEVARIANTS action='checkassigning'><LANGUAGEVARIANT guid='[!guid_languagevariant!]' checked='1' /></LANGUAGEVARIANTS>
                            <PROJECTVARIANTS action='checkassigning'><PROJECTVARIANT guid='[!guid_projectvariant!]' checked='1'/></PROJECTVARIANTS>
                        </EXPORTJOB>
                    </PAGE>
                </PROJECT>
            */

            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idStartPublishingPages")
                .on(
                    "click",
                    function () {
                        startPublishingPages(
                            rqlConnectorObj, {
                                Guid: ``,
                                EMail: ``,
                                GenerateNextPages: false,
                                GenerateRelativePages: false,
                                RedDotServer: ``,
                                GenerateDate: ``,
                                StartGenerationAt: ``,
                                LanguageVariants: [{
                                    LanguageVariantGuid: ``,
                                    Checked: true
                                }],
                                ProjectVariants: [{
                                    ProjectVariantGuid: ``,
                                    Checked: true
                                }]
                            },
                            function (responseObject) {}
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idGetProjectVariantsList")
                .on(
                    "click",
                    function () {
                        getProjectVariantsList(
                            rqlConnectorObj, {},
                            function (responseObject) {
                                var consoleOutput = ``;
                                responseObject.ProjectVariants
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Name} - ${elementData.Guid} - ${elementData.Checked} - ${elementData.UserDisplayVariant}`;
                                        }
                                    )
                                console.log(consoleOutput);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idGetUsersOfProject")
                .on(
                    "click",
                    function () {
                        getUsersOfProject(
                            rqlConnectorObj, {
                                ProjectGuid: rqlConnectorObj.info.session.ProjectGuid
                            },
                            function (responseArray) {
                                var consoleOutput = ``;
                                responseArray
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Name} - ${elementData.FullName} - ${elementData.Guid} - ${elementData.LoginDate.fromOADate()} (${elementData.LoginDate}) - ${elementData.EMail}`;
                                        }
                                    )
                                console.log(consoleOutput);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idGetActiveUsersOfProject")
                .on(
                    "click",
                    function () {
                        getActiveUsersOfProject(
                            rqlConnectorObj, {
                                ProjectGuid: rqlConnectorObj.info.session.ProjectGuid
                            },
                            function (responseArray) {
                                var consoleOutput = ``;
                                responseArray
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Name} - ${elementData.FullName} - ${elementData.Guid} - ${elementData.LoginGuid} - ${elementData.LoginDate.fromOADate()} (${elementData.LoginDate}) - ${elementData.EMail}`;
                                        }
                                    )
                                console.log(consoleOutput);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idLoadServerCharsets")
                .on(
                    "click",
                    function () {
                        getServerCharsets(
                            rqlConnectorObj,
                            function (responseArray) {
                                var consoleOutput = ``;
                                responseArray
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Name} - ${elementData.Codepage} - ${elementData.Label}`;
                                        }
                                    );
                                console.log(consoleOutput);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idLoadServerDrives")
                .on(
                    "click",
                    function () {
                        getServerDrives(
                            rqlConnectorObj,
                            function (responseArray) {
                                var consoleOutput = ``;
                                responseArray
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Name} : ${decodeURIComponent(elementData.Drive)}`;
                                        }
                                    );
                                console.log(consoleOutput);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idLoadServerDirectories")
                .on(
                    "click",
                    function () {
                        getServerDirectories(
                            rqlConnectorObj, {
                                Drive: encodeURIComponent(`C:\\`),
                                LiteralPath: encodeURIComponent(`Temp\\`)
                            },
                            function (responseArray) {
                                var consoleOutput = ``;
                                responseArray
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Name} : ${decodeURIComponent(elementData.LiteralPath)}`;
                                        }
                                    );
                                console.log(consoleOutput);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idNewServerDirectory")
                .on(
                    "click",
                    function () {
                        newServerDirectory(
                            rqlConnectorObj, {
                                Drive: encodeURIComponent(`C:\\`),
                                LiteralPath: encodeURIComponent(`Temp\\`),
                                Name: encodeURIComponent(`Test-${Date.now()}`)
                            },
                            function (responseObject) {
                                console.log(`\n${responseObject.Name} : ${decodeURIComponent(responseObject.LiteralPath)}`);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idLoadServerFileContentXML")
                .on(
                    "click",
                    function () {
                        getServerFileContent(
                            rqlConnectorObj, {
                                Drive: encodeURIComponent(`C:\\`),
                                LiteralPath: encodeURIComponent(`OpenText\\WS\\MS\\ASP\\PlugIns\\owug\\config\\`),
                                Filename: encodeURIComponent(`${rqlConnectorObj.info.package.information}`),
                                Format: 0
                            },
                            function (responseObject) {
                                console.log(`\n${decodeURIComponent(responseObject.LiteralPath)}\n${responseObject.Content}`);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idLoadServerFileContentTXT")
                .on(
                    "click",
                    function () {
                        getServerFileContent(
                            rqlConnectorObj, {
                                Drive: encodeURIComponent(`C:\\`),
                                LiteralPath: encodeURIComponent(`OpenText\\WS\\MS\\ASP\\`),
                                Filename: encodeURIComponent(`rdserver.ini`),
                                Format: 1
                            },
                            function (responseObject) {
                                console.log(`\n${decodeURIComponent(responseObject.LiteralPath)}\n${responseObject.Content}`);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idLoadServerFileContentTXTUNC")
                .on(
                    "click",
                    function () {
                        getServerFileContent(
                            rqlConnectorObj, {
                                Drive: encodeURIComponent(`\\\\`),
                                LiteralPath: encodeURIComponent(`WIN-OTWSM-16x\\C$\\OpenText\\WS\\MS\\ASP\\Log\\`),
                                Filename: encodeURIComponent(`wsms.log`),
                                Format: 1
                            },
                            function (responseObject) {
                                console.log(`\n${decodeURIComponent(responseObject.LiteralPath)}\n${responseObject.Content}`);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idGetClipboardData")
                .on(
                    "click",
                    function () {
                        getClipboardData(
                            rqlConnectorObj, {
                                ProjectGuid: rqlConnectorObj.info.session.ProjectGuid,
                                UserGuid: rqlConnectorObj.info.session.UserGuid,
                                LanguageVariantId: rqlConnectorObj.info.session.LanguageVariantId
                            },
                            function (responseObject) {
                                var consoleOutput = ``;
                                responseObject.Content
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Guid} : ${elementData.Type}`;
                                        }
                                    );
                                console.log(consoleOutput);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idAddClipboardEntry")
                .on(
                    "click",
                    function () {
                        addClipboardEntry(
                            rqlConnectorObj, {
                                ProjectGuid: rqlConnectorObj.info.session.ProjectGuid,
                                UserGuid: rqlConnectorObj.info.session.UserGuid,
                                Guid: rqlConnectorObj.info.session.PageGuid,
                                Type: "page"
                            },
                            function (responseValue) {
                                ws.ms.ui.clipboard.reload();
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idRemoveClipboardEntry")
                .on(
                    "click",
                    function () {
                        removeClipboardEntry(
                            rqlConnectorObj, {
                                ProjectGuid: rqlConnectorObj.info.session.ProjectGuid,
                                UserGuid: rqlConnectorObj.info.session.UserGuid,
                                Guid: rqlConnectorObj.info.session.PageGuid,
                                Type: "page"
                            },
                            function (responseValue) {
                                ws.ms.ui.clipboard.reload();
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idGetFavorites")
                .on(
                    "click",
                    function () {
                        getFavorites(
                            rqlConnectorObj, {
                                UserGuid: rqlConnectorObj.info.session.UserGuid
                            },
                            function (responseObject) {
                                var consoleOutput = ``;
                                responseObject.Pages
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Guid} : ${elementData.EltGuid} : ${elementData.Type} : ${elementData.ImageTitle} : ${elementData.UserGuid} : ${elementData.Value}`;
                                        }
                                    );
                                responseObject.Links
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Guid} : ${elementData.EltGuid} : ${elementData.Type} : ${elementData.ImageTitle} : ${elementData.UserGuid} : ${elementData.Value}`;
                                        }
                                    );
                                responseObject.ContentClasses
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Guid} : ${elementData.EltGuid} : ${elementData.Type} : ${elementData.ImageTitle} : ${elementData.UserGuid} : ${elementData.Value}`;
                                        }
                                    );
                                console.log(consoleOutput);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idLoadPlugInsList")
                .on(
                    "click",
                    function () {
                        getPlugInsList(
                            rqlConnectorObj, {},
                            function (responseObject) {
                                var consoleOutput = `\nSorting: ${responseObject.Sorting}`;
                                responseObject.PlugIns
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Name} - ${elementData.Guid} - ${elementData.Active} - ${elementData.Compatibility}`;
                                        }
                                    );
                                console.log(consoleOutput);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idLoadAsyncProcessCategories")
                .on(
                    "click",
                    function () {
                        getAsyncProcessCategories(
                            rqlConnectorObj,
                            function (responseArray) {
                                var consoleOutput = ``;
                                responseArray
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Name} - ${elementData.Type} - ${elementData.Actionflag}`;
                                        }
                                    );
                                console.log(consoleOutput);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idLoadAsyncProcessListAllActive")
                .on(
                    "click",
                    function () {
                        getAsyncProcessList(
                            rqlConnectorObj, {},
                            function (responseObject) {
                                console.info(`Process list for type active:`);
                                var consoleOutput = ``;
                                responseObject.Active
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Name} - ${elementData.Guid} - ${elementData.Active} - ${elementData.Category}\n${elementData.ServerName} - ${elementData.EditorialServerName} - ${elementData.LastExecute.fromOADate()} (${elementData.LastExecute})`;
                                        }
                                    );
                                console.log(consoleOutput);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idLoadAsyncProcessListAllWaiting")
                .on(
                    "click",
                    function () {
                        getAsyncProcessList(
                            rqlConnectorObj, {},
                            function (responseObject) {
                                console.info(`Process list for type waiting:`);
                                var consoleOutput = ``;
                                responseObject.Waiting
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Name} - ${elementData.Guid} - ${elementData.Active} - ${elementData.Category}\n${elementData.ServerName} - ${elementData.EditorialServerName} - ${elementData.LastExecute.fromOADate()} (${elementData.LastExecute})`;
                                        }
                                    );
                                console.log(consoleOutput);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idLoadAsyncProcessListProjectActive")
                .on(
                    "click",
                    function () {
                        getAsyncProcessList(
                            rqlConnectorObj, {
                                Project: rqlConnectorObj.info.session.ProjectGuid
                            },
                            function (responseObject) {
                                console.info(`Process list for type active:`);
                                var consoleOutput = ``;
                                responseObject.Active
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Name} - ${elementData.Guid} - ${elementData.Active} - ${elementData.Category}\n${elementData.ServerName} - ${elementData.EditorialServerName} - ${elementData.LastExecute.fromOADate()} (${elementData.LastExecute})`;
                                        }
                                    );
                                console.log(consoleOutput);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#idLoadAsyncProcessListProjectWaiting")
                .on(
                    "click",
                    function () {
                        getAsyncProcessList(
                            rqlConnectorObj, {
                                Project: rqlConnectorObj.info.session.ProjectGuid
                            },
                            function (responseObject) {
                                console.info(`Process list for type waiting:`);
                                var consoleOutput = ``;
                                responseObject.Waiting
                                    .forEach(
                                        elementData => {
                                            consoleOutput += `\n${elementData.Name} - ${elementData.Guid} - ${elementData.Active} - ${elementData.Category}\n${elementData.ServerName} - ${elementData.EditorialServerName} - ${elementData.LastExecute.fromOADate()} (${elementData.LastExecute})`;
                                        }
                                    );
                                console.log(consoleOutput);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
        }
    );
/* ----- ----- ----- ----- ----- ----- ----- ----- */
