/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1259
   File UUID: 4976e5c7-6e58-47d0-a944-2b1b59b1c8bf
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
let valueBuildNumber = "16.0.0.1259";
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
$(document)
    .ready(
        function () {
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            initTooltip();
            initCloseDialog();
            initOpenAbout();
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
        }
    );
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 */
function initCloseDialog() {
    $("#closeDialog")
        .on(
            "click",
            function () {
                window.close();
            }
        );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 */
function initOpenAbout() {
    $("#openAbout")
        .on(
            "click",
            function () {
                $("#modalAbout").modal("show");
            }
        );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 */
function setContentAbout(rqlConnectorObj) {
    let thisFunction = {
        BaseHref: rqlConnectorObj.baseHref.root,
    };
    $("#modalAbout")
        .on(
            "show.bs.modal",
            function () {
                $.ajax({
                        url: `${thisFunction.BaseHref}/other/license.htm?release=${valueBuildNumber}`,
                        dataType: `html`
                    })
                    .done(function (contentAbout) {
                        $("#tabContentAbout").html(contentAbout);
                    });
                $.ajax({
                        url: `${thisFunction.BaseHref}/other/contact.htm?release=${valueBuildNumber}`,
                        dataType: `html`
                    })
                    .done(function (contentAbout) {
                        $("#tabContentContact").html(contentAbout);
                    });
                $.ajax({
                        url: `${thisFunction.BaseHref}/other/libraries.htm?release=${valueBuildNumber}`,
                        dataType: `html`
                    })
                    .done(function (contentAbout) {
                        $("#tabContentLibraries").html(contentAbout);
                    });
            }
        );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 */
function initTooltip() {
    /* https://blog.getbootstrap.com/2019/02/13/bootstrap-4-3-1-and-3-4-1/ */
    /* https://getbootstrap.com/docs/4.3/getting-started/javascript/#sanitizer */
    var myDefaultWhiteList = $.fn.tooltip.Constructor.Default.whiteList;
    myDefaultWhiteList.span = ['data-localized-core', 'data-localized-extension', 'data-localized-embedded'];

    $("[data-toggle='tooltip']")
        .tooltip({
            delay: {
                "show": 500,
                "hide": 100
            },
            html: true
        });
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 */
function hideTooltip() {
    $("[data-toggle='tooltip']").tooltip('hide');
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 */
function disposeTooltip() {
    $("[data-toggle='tooltip']").tooltip('dispose');
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} rqlConnectorObj
 */
function setExtensionDialogLanguage(rqlConnectorObj) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode,
        BaseHref: rqlConnectorObj.baseHref.root,
        ConnectorMode: rqlConnectorObj.connectorMode
    };
    var valueFileExtension = ".min";
    if (thisFunction.DebugMode) {
        var valueFileExtension = "";
    }
    thisFunction.DebugMode && console.log(`\n\n${arguments.callee.name}()\nfn =>`);
    var valueDialogLanguageId = "";
    switch (rqlConnectorObj.info.session.DialogLanguageId) {
        case "CHS":
            /* Chinese */
            valueDialogLanguageId = "zh-CN";
            break;
        case "CSY":
            /* Czech */
            valueDialogLanguageId = "cs-CZ";
            break;
        case "NLD":
            /* Dutch */
            valueDialogLanguageId = "nl-NL";
            break;
        case "ENU":
            /* English */
            valueDialogLanguageId = "en-US";
            break;
        case "FRA":
            /* French */
            valueDialogLanguageId = "fr-FR";
            break;
        case "DEU":
            /* German */
            valueDialogLanguageId = "de-DE";
            break;
        case "ELL":
            /* Greek */
            valueDialogLanguageId = "el-GR";
            break;
        case "HUN":
            /* Hungarian */
            valueDialogLanguageId = "hu-HU";
            break;
        case "ITA":
            /* Italian */
            valueDialogLanguageId = "it-IT";
            break;
        case "JPN":
            /* Japanese */
            valueDialogLanguageId = "ja-JP";
            break;
        case "PLK":
            /* Polish */
            valueDialogLanguageId = "pl-PL";
            break;
        case "PTB":
            /* Portuguese */
            valueDialogLanguageId = "pt-PT";
            break;
        case "RUS":
            /* Russian */
            valueDialogLanguageId = "ru-RU";
            break;
        case "ESP":
            /* Spanish */
            valueDialogLanguageId = "es-ES";
            break;
        case "SVE":
            /* Swedish */
            valueDialogLanguageId = "sv-SE";
            break;
        default:
            /* English */
            valueDialogLanguageId = "en-US";
    }
    thisFunction.DebugMode && console.log(`Try to load localized files for ${valueDialogLanguageId}${valueFileExtension}...`);
    /* Core */
    $.ajax({
            url: `${thisFunction.BaseHref}/global/config/localized.${valueDialogLanguageId}${valueFileExtension}.css?release=${valueBuildNumber}`,
            dataType: `text`
        })
        .done(
            function (dialogLanguageCSS) {
                var style = "<style>" + dialogLanguageCSS + "</style>";
                $("head").append(style);
                $("body").attr("lang-core", valueDialogLanguageId);
                thisFunction.DebugMode && console.log(`Localized core file for ${valueDialogLanguageId}${valueFileExtension} successfully loaded`);
            })
        .fail(
            function () {
                console.warn(`Localized core file for ${valueDialogLanguageId}${valueFileExtension} not availble - Loading fallback for core (en-US)`);
                var valueFallbackDialogLanguageId = "en-US";
                $.ajax({
                        url: `${thisFunction.BaseHref}/global/config/localized.${valueFallbackDialogLanguageId}${valueFileExtension}.css?release=${valueBuildNumber}`,
                        dataType: `text`
                    })
                    .done(
                        function (dialogLanguageCSS) {
                            var style = "<style>" + dialogLanguageCSS + "</style>";
                            $("head").append(style);
                            $("body").attr("lang-core", valueFallbackDialogLanguageId);
                            thisFunction.DebugMode && console.log(`Localized core file for ${valueFallbackDialogLanguageId}${valueFileExtension} successfully loaded`);
                        })
                    .fail(
                        function () {
                            console.warn(`Localized core (fallback) file for ${valueFallbackDialogLanguageId}${valueFileExtension} not availble - Switch to debug mode!`);
                            $("body").attr("lang-core", "debug");
                        }
                    );
            });
    /* Extension */
    if (thisFunction.ConnectorMode == "extension") {
        $.ajax({
                url: `config/localized.${valueDialogLanguageId}${valueFileExtension}.css?release=${valueBuildNumber}`,
                dataType: `text`
            })
            .done(
                function (dialogLanguageCSS) {
                    var style = "<style>" + dialogLanguageCSS + "</style>";
                    $("head").append(style);
                    $("body").attr("lang-extension", valueDialogLanguageId);
                    thisFunction.DebugMode && console.log(`Localized extension file for ${valueDialogLanguageId}${valueFileExtension} successfully loaded`);
                })
            .fail(
                function () {
                    console.warn(`Localized extension file for ${valueDialogLanguageId}${valueFileExtension} not availble - Loading fallback for extension (en-US)`);
                    var valueFallbackDialogLanguageId = "en-US";
                    $.ajax({
                            url: `config/localized.${valueFallbackDialogLanguageId}${valueFileExtension}.css?release=${valueBuildNumber}`,
                            dataType: `text`
                        })
                        .done(
                            function (dialogLanguageCSS) {
                                var style = "<style>" + dialogLanguageCSS + "</style>";
                                $("head").append(style);
                                $("body").attr("lang-extension", valueFallbackDialogLanguageId);
                                thisFunction.DebugMode && console.log(`Localized extension file for ${valueFallbackDialogLanguageId}${valueFileExtension} successfully loaded`);
                            })
                        .fail(
                            function () {
                                console.warn(`Localized extension (fallback) file for ${valueFallbackDialogLanguageId}${valueFileExtension} not availble - Switch to debug mode!`);
                                $("body").attr("lang-extension", "debug");
                            }
                        );
                });
    }
    /* Embedded */
    if (thisFunction.ConnectorMode == "embedded") {
        $.ajax({
                url: `${thisFunction.BaseHref}/embedded/config/localized.${valueDialogLanguageId}${valueFileExtension}.css?release=${valueBuildNumber}`,
                dataType: `text`
            })
            .done(
                function (dialogLanguageCSS) {
                    var style = "<style>" + dialogLanguageCSS + "</style>";
                    $("head").append(style);
                    $("body").attr("lang-embedded", valueDialogLanguageId);
                    thisFunction.DebugMode && console.log(`Localized embedded file for ${valueDialogLanguageId}${valueFileExtension} successfully loaded`);
                })
            .fail(
                function () {
                    console.warn(`Localized embedded file for ${valueDialogLanguageId}${valueFileExtension} not availble - Loading fallback for embedded (en-US)`);
                    var valueFallbackDialogLanguageId = "en-US";
                    $.ajax({
                            url: `${thisFunction.BaseHref}/embedded/config/localized.${valueFallbackDialogLanguageId}${valueFileExtension}.css?release=${valueBuildNumber}`,
                            dataType: `text`
                        })
                        .done(
                            function (dialogLanguageCSS) {
                                var style = "<style>" + dialogLanguageCSS + "</style>";
                                $("head").append(style);
                                $("body").attr("lang-embedded", valueFallbackDialogLanguageId);
                                thisFunction.DebugMode && console.log(`Localized embedded file for ${valueFallbackDialogLanguageId}${valueFileExtension} successfully loaded`);
                            })
                        .fail(
                            function () {
                                console.warn(`Localized embedded (fallback) file for ${valueFallbackDialogLanguageId}${valueFileExtension} not availble - Switch to debug mode!`);
                                $("body").attr("lang-embedded", "debug");
                            }
                        );
                });
    }
    thisFunction.DebugMode && console.log(`<= fn\n\n\n`);
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} str
 * @returns
 */
function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} requestParam
 * @param {*} callbackFunc
 */
function setProgress(requestParam, callbackFunc) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: requestParam.DebugMode
    }
    //thisFunction.DebugMode&& console.log(`\n\nfn => ${arguments.callee.name}()`);
    $("#messageLoadingExtension")
        .text(requestParam.Message)
        .ready(
            function () {
                $(requestParam.Id)
                    .css(
                        "width",
                        `${requestParam.Percent}%`
                    )
                    .attr(
                        "aria-valuenow",
                        requestParam.Percent
                    );
                thisFunction.DebugMode && console.info(requestParam.Message);
                /* Return result as value*/
                var responseValue = true;
                if (callbackFunc) {
                    //thisFunction.DebugMode&& console.info(`Received response from SOAP/RQL Connector Object.`);
                    //thisFunction.DebugMode&& console.log(responseValue);
                    //thisFunction.DebugMode&& console.log(`<= fn`);
                    callbackFunc(responseValue);
                } else {
                    //thisFunction.DebugMode&& console.warn(`No callback function defined at ${thisFunction.Name}().\nResponse: ${responseValue}`);
                }
            }
        );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/* REWORK => DUPLICATED => functions.extension.js => Favorities Manager Extension
function checkActiveModule(rqlConnectorObj) {
    if (rqlConnectorObj.info.session.LastActiveModule == "homepage") {
        $("[aria-label='controlsDialog']").hide();
    }
}
*/
/* ----- ----- ----- ----- ----- ----- ----- ----- */
