/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1207
   File UUID: 943880fa-e867-474a-a78b-bd64cac21020
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
$(document)
    .ready(
        function () {
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            var rqlConnectorObj = {};
            var ws = {};
            createRqlConnector({
                    DebugMode: false
                },
                function (returnConnectorObj) {
                    rqlConnectorObj = returnConnectorObj;
                    ws = new opentext(rqlConnectorObj);
                    setExtensionDialogLanguage(rqlConnectorObj);
                    setContentAbout(rqlConnectorObj);
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                    loadExtensions(
                        rqlConnectorObj,
                        function () {
                            if ($("#listExtensionsInstalled tr.item").length === 1) {
                                setTimeout(
                                    function () {
                                        $("#collapseTwo").collapse("toggle");
                                    },
                                    500
                                );
                            }
                            loadCurrentInformation(
                                rqlConnectorObj,
                                function () {
                                    loadPackageExtensions(
                                        rqlConnectorObj,
                                        function () {
                                            updateUi();
                                            initTooltip();
                                            loadPackageInformation(
                                                rqlConnectorObj
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                }
            );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("body")
                .on(
                    "click",
                    ".forSelection",
                    function () {
                        hideTooltip();
                        $(this).parent().toggleClass("table-info selected");
                        if ($(".item.selected").length !== 0) {
                            //$("#deleteSelection, #resetSelection").prop("disabled", false);
                        } else {
                            //$("#deleteSelection, #resetSelection").prop("disabled", true);
                        }
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("body")
                .on(
                    "click",
                    ".showInTree",
                    function () {
                        var thisGuid = $(this).parent().attr("data-guid");
                        var thisType = $(this).parent().attr("data-type");
                        addClipboardEntry(
                            rqlConnectorObj, {
                                UserGuid: rqlConnectorObj.info.session.UserGuid,
                                Guid: thisGuid,
                                Type: thisType
                            },
                            function () {
                                ws.ms.ui.clipboard.reload();
                                ws.ms.ui.goto.treesegment(thisGuid, thisType);
                            }
                        );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("body")
                .on(
                    "click",
                    ".importExtension",
                    function () {
                        hideTooltip();
                        var thisUri = $(this).parents("tr.item").attr("data-uri");
                        $("#modalProcessing")
                            .modal("show")
                            .ready(
                                function () {
                                    importPackageExtension(
                                        rqlConnectorObj, {
                                            Uri: thisUri
                                        },
                                        function (responseObject) {
                                            $("#listExtensionsInstalled > .notify, #listExtensionsAvailable > .notify").show().nextAll().remove();
                                            loadExtensions(
                                                rqlConnectorObj,
                                                function () {
                                                    loadPackageExtensions(
                                                        rqlConnectorObj,
                                                        function () {
                                                            addClipboardEntry(
                                                                rqlConnectorObj, {
                                                                    UserGuid: rqlConnectorObj.info.session.UserGuid,
                                                                    Guid: responseObject[0].Guid,
                                                                    Type: `admin.3420`
                                                                },
                                                                function () {
                                                                    $("#modalProcessing")
                                                                        .modal("hide")
                                                                        .ready(
                                                                            function () {
                                                                                updateUi();
                                                                                initTooltip();
                                                                                ws.ms.ui.clipboard.reload();
                                                                                ws.ms.ui.refresh.treesegment();
                                                                            }
                                                                        );
                                                                }
                                                            );
                                                        }
                                                    );
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("body")
                .on(
                    "click",
                    ".switch>input",
                    function () {
                        var thisElement = this;
                        $("#modalProcessing")
                            .modal("show")
                            .ready(
                                function () {
                                    var thisGuid = $(thisElement).parents("tr.item").attr("data-guid");
                                    var thisActive = $(thisElement).is(":checked");
                                    if (thisActive) {
                                        $(thisElement).attr("checked", true);
                                        $(thisElement).parents("tr.item").attr("data-active", "checked");
                                    } else {
                                        $(thisElement).attr("checked", false);
                                        $(thisElement).parents("tr.item").attr("data-active", "");
                                    }
                                    var requestParam = [];
                                    var elementData = {
                                        Guid: thisGuid,
                                        Active: (thisActive ? 1 : 0)
                                    }
                                    requestParam.push(elementData);
                                    switchPlugInsActivation(
                                        rqlConnectorObj,
                                        requestParam,
                                        function () {
                                            $("#modalProcessing")
                                                .modal("hide")
                                                .ready(
                                                    function () {
                                                        ws.ms.ui.clipboard.reload();
                                                        ws.ms.ui.refresh.treesegment();
                                                    }
                                                );
                                        }
                                    );
                                }
                            );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("body")
                .on(
                    "click",
                    "#updatePackageSettings",
                    function () {
                        $("#modalProcessing")
                            .modal("show")
                            .ready(
                                function () {
                                    var requestParam = [];
                                    $("#listExtensionsInstalled > tr.item").each(
                                        function () {
                                            var itemNewCompatibility = $("#listPackageInstalled .valueCompatibility").text();
                                            var itemNewPackage = $("#listPackageInstalled .valuePackage").text();
                                            var itemNewRelease = $("#listPackageInstalled .valueRelease").text();
                                            var itemNewCreation = $("#listPackageInstalled .valueCreation").text();
                                            var itemUri = $(this).attr("data-uri");
                                            itemUri = (itemUri).substring(0, itemUri.indexOf("?release="));
                                            var itemIconSource = $(this).attr("data-iconsource");
                                            itemIconSource = (itemIconSource).substring(0, itemIconSource.indexOf("?release="));
                                            var elementData = {
                                                Guid: $(this).attr("data-guid"),
                                                Uri: `${itemUri}?release=${itemNewRelease}`,
                                                Active: ($(this).attr("data-active") === "checked" ? 1 : 0),
                                                Compatibility: `{'Compatibility':'${itemNewCompatibility}','Package':'${itemNewPackage}','Release':'${itemNewRelease}','Creation':'${itemNewCreation}'}`,
                                                Icon: {
                                                    Source: `${itemIconSource}?release=${itemNewRelease}`
                                                }
                                            }
                                            requestParam.push(elementData);
                                        }
                                    );
                                    updatePlugIns(
                                        rqlConnectorObj,
                                        requestParam,
                                        function () {
                                            $("#modalProcessing")
                                                .modal("hide")
                                                .ready(
                                                    function () {
                                                        ws.ms.ui.clipboard.reload();
                                                        ws.ms.ui.refresh.treesegment();
                                                        location.href = `${location.pathname}?release=${$("#listPackageInstalled .valueRelease").text()}`;
                                                    }
                                                );
                                        }
                                    );
                                }
                            );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
        }
    );
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} rqlConnectorObj
 * @param {*} callbackFunc
 */
function loadExtensions(rqlConnectorObj, callbackFunc) {
    getPlugInsList(
        rqlConnectorObj, {},
        function (responseObject) {
            var requestItems = [];
            responseObject.PlugIns.forEach(elementData => {
                var itemFavorite = {
                    Guid: elementData.Guid,
                }
                requestItems.push(itemFavorite);
            });
            getPlugInDetails(
                rqlConnectorObj, {
                    Items: requestItems
                },
                function (responseObject) {
                    var counterExtensions
                    var currentUri = (location.pathname).substring((location.pathname).indexOf("/PlugIns/") + 9);
                    responseObject.forEach(elementData => {
                        var packageInformation = (elementData.Compatibility).replace(new RegExp("'", "g"), "\"");
                        if (isJsonString(packageInformation)) {
                            packageInformation = JSON.parse(packageInformation);
                        }
                        var installedUri = elementData.Uri;
                        if (installedUri) {
                            installedUri = (installedUri).substring(0, installedUri.indexOf("?release="));
                        }
                        if (packageInformation.Package === rqlConnectorObj.info.package.name) {
                            if (installedUri === currentUri) {
                                var source = $("#template-item-extension-disabled").html();
                                var packageInstaller = true;
                            } else {
                                var source = $("#template-item-extension-installed").html();
                                var packageInstaller = false;
                            }
                            var template = Handlebars.compile(source);
                            var context = {
                                Guid: elementData.Guid,
                                Name: elementData.Descriptions.find(item => item.name === rqlConnectorObj.info.session.LanguageId).value,
                                ExtensionName: elementData.Name,
                                Release: packageInformation.Release,
                                Uri: elementData.Uri,
                                IconSource: elementData.Icon.Source,
                                Package: (packageInformation.Package === "" ? `undefined` : packageInformation.Package),
                                Active: (elementData.Active ? `checked` : ``),
                                Installer: packageInstaller
                            }
                            var html = template(context);
                            $("#listExtensionsInstalled").append(html);
                        }
                    });
                    if (counterExtensions === 0) {
                        $("#listExtensionsInstalled > .notify .loading").hide();
                        $("#listExtensionsInstalled > .notify .no-data").show();
                    } else {
                        $("#listExtensionsInstalled > .notify").hide();
                    }
                    if (callbackFunc) {
                        callbackFunc();
                    }
                }
            );
        }
    );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} rqlConnectorObj
 * @param {*} callbackFunc
 */
function loadPackageExtensions(rqlConnectorObj, callbackFunc) {
    var packageExtensions = `PlugIns\\${rqlConnectorObj.info.package.name}\\config\\${rqlConnectorObj.info.package.extensions}`;
    var currentUri = (location.pathname).substring((location.pathname).indexOf("/PlugIns/") + 9);
    getServerFileContent(
        rqlConnectorObj, {
            Path: `${rqlConnectorObj.info.session.RDApplicationPath}${encodeURIComponent(packageExtensions)}`,
            Format: 0
        },
        function (responseObject) {
            var processingContent = $.parseXML(responseObject.Content);
            var processingPlugIn = $(processingContent).find("PLUGIN");
            var itemToRemove = ``;
            processingPlugIn
                .each(
                    function () {
                        var resultUri = $(this).attr("url");
                        resultUri = (resultUri).substring(0, resultUri.indexOf("?release="));
                        if (resultUri == currentUri) {
                            itemToRemove = this;
                        }
                    }
                );
            processingPlugIn.splice($.inArray(itemToRemove, processingPlugIn), 1);
            processingPlugIn.each(
                function () {
                    var itemUri = $(this).attr("url");
                    itemUri = (itemUri).substring(0, itemUri.indexOf("?release="));
                    var installedUri = $("[data-uri^='" + itemUri + "']").attr("data-uri");
                    if (installedUri) {
                        installedUri = (installedUri).substring(0, installedUri.indexOf("?release="));
                    }
                    var pluginInformation = ($(this).attr("compatibility")).replace(new RegExp("'", "g"), "\"");
                    if (isJsonString(pluginInformation)) {
                        pluginInformation = JSON.parse(pluginInformation);
                    }
                    if (itemUri != installedUri) {
                        var source = $("#template-item-extension-import").html();
                        var template = Handlebars.compile(source);
                        var context = {
                            Guid: $(this).attr("guid"),
                            Name: $(this).find(rqlConnectorObj.info.session.LanguageId).attr("name"),
                            ExtensionName: $(this).attr("name"),
                            Release: pluginInformation.Release,
                            Uri: $(this).attr("url"),
                            IconSource: $(this).find("ICON").attr("source"),
                            Package: pluginInformation.Package,
                            Active: ($(this).attr("active") ? `checked` : ``),
                        }
                        var html = template(context);
                        $("#listExtensionsAvailable").append(html);
                    }
                }
            );
            if (callbackFunc) {
                callbackFunc();
            }
        }
    );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} rqlConnectorObj
 * @param {*} callbackFunc
 */
function loadCurrentInformation(rqlConnectorObj, callbackFunc) {
    var requestItems = [];
    var itemFavorite = {
        Guid: $("[data-installer='true']").attr("data-guid"),
    }
    requestItems.push(itemFavorite);
    getPlugInDetails(
        rqlConnectorObj, {
            Items: requestItems
        },
        function (responseObject) {
            responseObject.forEach(elementData => {
                var currentInformation = (elementData.Compatibility).replace(new RegExp("'", "g"), "\"");
                if (isJsonString(currentInformation)) {
                    currentInformation = JSON.parse(currentInformation);
                }
                var source = $("#template-item-package-information").html();
                var template = Handlebars.compile(source);
                var context = {
                    Package: currentInformation.Package,
                    Release: currentInformation.Release,
                    Creation: currentInformation.Creation,
                    Compatibility: currentInformation.Compatibility,
                    Color: `primary`
                }
                var html = template(context);
                $("#listPackageConfigured > .notify").hide();
                $("#listPackageConfigured").append(html);
            });
            if (callbackFunc) {
                callbackFunc();
            }
        }
    );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} rqlConnectorObj
 * @param {*} callbackFunc
 */
function loadPackageInformation(rqlConnectorObj, callbackFunc) {
    var packageInformation = `PlugIns\\${rqlConnectorObj.info.package.name}\\config\\${rqlConnectorObj.info.package.information}`;
    getServerFileContent(
        rqlConnectorObj, {
            Path: `${rqlConnectorObj.info.session.RDApplicationPath}${encodeURIComponent(packageInformation)}`,
            Format: 0
        },
        function (responseObject) {
            var processingContent = $.parseXML(responseObject.Content);
            var packageName = $(processingContent).find("NAME").text();
            var packageRelease = $(processingContent).find("RELEASE").text();
            var packageCreation = $(processingContent).find("CREATION").text();
            var packageCompatibility = $(processingContent).find("COMPATIBILITY").text();
            var source = $("#template-item-package-information").html();
            var template = Handlebars.compile(source);
            var context = {
                Package: packageName,
                Release: packageRelease,
                Creation: packageCreation,
                Compatibility: packageCompatibility,
                Color: `primary`
            }
            var html = template(context);
            $("#listPackageInstalled > .notify").hide();
            $("#listPackageInstalled").append(html);
            if ($("#listPackageConfigured .valueRelease").text() != packageRelease) {
                $("#updatePackageSettings").removeClass("cursor-disabled btn-outline-secondary").addClass("btn-danger").attr("disabled", false);
                $("#listPackageInstalled .valueRelease, #listPackageInstalled .valueCreation").removeClass("text-primary").addClass("text-danger");
            } else {
                $("#updatePackageSettings").addClass("cursor-disabled btn-outline-secondary").removeClass("btn-danger").attr("disabled", true);
            }
            if (callbackFunc) {
                callbackFunc();
            }
        }
    );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} rqlConnectorObj
 * @param {*} requestParam
 * @param {*} callbackFunc
 */
function importPackageExtension(rqlConnectorObj, requestParam, callbackFunc) {
    var packageExtensions = `PlugIns\\${rqlConnectorObj.info.package.name}\\config\\${rqlConnectorObj.info.package.extensions}`;
    getServerFileContent(
        rqlConnectorObj, {
            Path: `${rqlConnectorObj.info.session.RDApplicationPath}${encodeURIComponent(packageExtensions)}`,
            Format: 0
        },
        function (responseObject) {
            var processingContent = $.parseXML(responseObject.Content);
            var processingPlugIn = $(processingContent).find("PLUGIN");
            processingPlugIn
                .each(
                    function () {
                        var itemUri = $(this).attr("url");
                        $(this).attr("action", "addnew");
                        if (itemUri == requestParam.Uri) {
                            createPlugIns(
                                rqlConnectorObj, {
                                    Content: (new XMLSerializer()).serializeToString(this)
                                },
                                function (responseObject) {
                                    if (callbackFunc) {
                                        callbackFunc(responseObject);
                                    }
                                }
                            );
                        }
                    }
                );
        }
    );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 */
function updateUi() {
    var extensionsInstalled = $("#listExtensionsInstalled > .item").length;
    var extensionsAvailable = $("#listExtensionsAvailable > .item").length;
    if (extensionsInstalled === 0) {
        $("#listExtensionsInstalled > .notify .loading").hide();
        $("#listExtensionsInstalled > .notify .no-data").show();
    } else {
        $("#listExtensionsInstalled > .notify").hide();
    }
    if (extensionsAvailable === 0) {
        $("#listExtensionsAvailable > .notify .loading").hide();
        $("#listExtensionsAvailable > .notify .no-data").show();
    } else {
        $("#listExtensionsAvailable > .notify").hide();
    }
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */
