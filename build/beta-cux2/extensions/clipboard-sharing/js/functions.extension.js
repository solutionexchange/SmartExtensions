/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1250
   File UUID: a02a10dc-8aa6-49b7-9a3f-c7946d16762e
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
$(document)
    .ready(
        function () {
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            var rqlConnectorObj = {};
            createRqlConnector({
                    DebugMode: false
                },
                function (returnConnectorObj) {
                    rqlConnectorObj = returnConnectorObj;
                    setExtensionDialogLanguage(rqlConnectorObj);
                    setContentAbout(rqlConnectorObj);
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                    $("#badgesActiveUsers, #badgesClipboardData, #notifyActiveUsers > .no-data, #notifyClipboardData > .no-data").hide();
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                    loadActiveUsersOfProject(rqlConnectorObj);
                    loadClipboardData(rqlConnectorObj);
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                }
            );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("body")
                .on(
                    "click",
                    ".itemActiveUser",
                    function () {
                        hideTooltip();
                        $(this).toggleClass("table-warning selected");
                        if ($(".itemActiveUser.selected").length != 0 && $(".itemClipboardData.selected").length != 0) {
                            $("#shareSelection").prop("disabled", false);
                            $("#resetSelection").prop("disabled", false);
                        } else {
                            $("#shareSelection").prop("disabled", true);
                            if ($(".itemActiveUser.selected").length != 0 || $(".itemClipboardData.selected").length != 0) {
                                $("#resetSelection").prop("disabled", false);
                            } else {
                                $("#resetSelection").prop("disabled", true);
                            }
                        }
                        $("#badgesActiveUsers > .badge-warning").text($(".itemActiveUser.selected").length);
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("body")
                .on(
                    "click",
                    ".itemClipboardData",
                    function () {
                        hideTooltip();
                        $(this).toggleClass("table-success selected");
                        if ($(".itemActiveUser.selected").length != 0 && $(".itemClipboardData.selected").length != 0) {
                            $("#shareSelection").prop("disabled", false);
                            $("#resetSelection").prop("disabled", false);
                        } else {
                            $("#shareSelection").prop("disabled", true);
                            if ($(".itemActiveUser.selected").length != 0 || $(".itemClipboardData.selected").length != 0) {
                                $("#resetSelection").prop("disabled", false);
                            } else {
                                $("#resetSelection").prop("disabled", true);
                            }
                        }
                        $("#badgesClipboardData > .badge-success").text($(".itemClipboardData.selected").length);
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#reloadAll")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#reloadAll > .fa-sync").toggleClass("fa-spin text-danger");
                        $("#resetSelection").trigger("click");
                        $(this).prop("disabled", true);
                        $("#badgesActiveUsers, #badgesClipboardData").hide();
                        $("#listActiveUsers, #listClipboardData").html("");
                        $("#notifyActiveUsers > .no-data, #notifyClipboardData > .no-data").hide();
                        $("#notifyActiveUsers > .loading, #notifyClipboardData > .loading").show();
                        loadActiveUsersOfProject(rqlConnectorObj);
                        loadClipboardData(rqlConnectorObj);
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#resetSelection")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $(".itemActiveUser.selected").toggleClass("table-warning selected");
                        $(".itemClipboardData.selected").toggleClass("table-success selected");
                        $("#shareSelection, #resetSelection").prop("disabled", true);
                        $("#badgesActiveUsers > .badge-warning").text($(".itemActiveUser.selected").length);
                        $("#badgesClipboardData > .badge-success").text($(".itemClipboardData.selected").length);
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#shareSelection")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#modalProcessing")
                            .modal("show")
                            .ready(
                                function () {
                                    var maxUsers = $(".itemActiveUser.selected").length - 1;
                                    var maxItems = $(".itemClipboardData.selected").length - 1;
                                    var arrayClipboardItems = [];
                                    $(".itemClipboardData.selected")
                                        .each(
                                            function (index) {
                                                var itemClipboardData = {
                                                    Guid: $(this).attr("data-guid"),
                                                    Type: $(this).attr("data-type")
                                                }
                                                arrayClipboardItems.push(itemClipboardData);
                                                $(this).toggleClass("table-success selected");
                                            }
                                        );
                                    $(".itemActiveUser.selected")
                                        .each(
                                            function (index) {
                                                var itemActiveUser = this;
                                                addClipboardEntries(
                                                    rqlConnectorObj, {
                                                        LoginGuid: $(itemActiveUser).attr("data-loginguid"),
                                                        SessionKey: $(itemActiveUser).attr("data-sessionkey"),
                                                        DialogLanguageId: $(itemActiveUser).attr("data-dialoglanguageid"),
                                                        UserGuid: $(itemActiveUser).attr("data-guid"),
                                                        ProjectGuid: rqlConnectorObj.info.session.ProjectGuid,
                                                        Items: arrayClipboardItems
                                                    },
                                                    function () {
                                                        $(itemActiveUser).toggleClass("table-warning selected");
                                                        if ($(".itemActiveUser.selected").length === 0) {
                                                            setTimeout(
                                                                function () {
                                                                    $("#modalProcessing")
                                                                        .modal("hide")
                                                                        .ready(
                                                                            function () {
                                                                                $("#shareSelection").prop("disabled", true);
                                                                                $("#resetSelection").prop("disabled", true);
                                                                                $("#badgesActiveUsers > .badge-warning").text($(".itemActiveUser.selected").length);
                                                                                $("#badgesClipboardData > .badge-success").text($(".itemClipboardData.selected").length);
                                                                            }
                                                                        );
                                                                }, 750
                                                            );
                                                        }
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
 */
function loadActiveUsersOfProject(rqlConnectorObj) {
    hideTooltip();
    getActiveUsersOfProject(
        rqlConnectorObj, {
            ProjectGuid: rqlConnectorObj.info.session.ProjectGuid
        },
        function (responseArray) {
            var currentDate = new Date();
            $("#notifyActiveUsers > .loading").hide();
            responseArray = _.uniqBy(responseArray, "Guid");
            responseArray
                .forEach(
                    elementData => {
                        if (elementData.Guid != rqlConnectorObj.info.session.UserGuid) {
                            var lastActionDate = elementData.LastActionDate.fromOADate();
                            var source = $("#template-itemActiveUser").html();
                            var template = Handlebars.compile(source);
                            var context = {
                                FullName: (elementData.FullName != "" ? elementData.FullName : elementData.Name),
                                Status: `${(currentDate - lastActionDate) > 600000 ? ((currentDate - lastActionDate) > 3600000 ? 'muted' : 'warning') : 'success'}`,
                                StatusMessage: `${(currentDate - lastActionDate) > 600000 ? ((currentDate - lastActionDate) > 3600000 ? 'MaybeOffline' : 'MaybeAway') : 'Active'}`,
                                Guid: elementData.Guid,
                                EMail: elementData.EMail,
                                LoginGuid: elementData.LoginGuid,
                                SessionKey: elementData.LoginGuid,
                                DialogLanguageId: elementData.DialogLanguageId
                            };
                            var html = template(context);
                            $("#listActiveUsers").append(html);
                            $("#badgesActiveUsers > .badge-secondary").text($(".itemActiveUser").length);
                        }
                    }
                );
            if ($(".itemActiveUser").length === 0) {
                $("#notifyActiveUsers > .no-data").show();
            } else {
                $("#badgesActiveUsers").show();
                initTooltip();
            }
        }
    )
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} rqlConnectorObj
 */
function loadClipboardData(rqlConnectorObj) {
    hideTooltip();
    getClipboardData(
        rqlConnectorObj, {
            ProjectGuid: rqlConnectorObj.info.session.ProjectGuid,
            UserGuid: rqlConnectorObj.info.session.UserGuid,
            LanguageVariantId: rqlConnectorObj.info.session.LanguageVariantId
        },
        function (responseObject) {
            var clipboardItems = [];
            let promiseObj = responseObject.Content
                .reduce((promiseChain, elementData) => {
                        return promiseChain
                            .then(() => new Promise(
                                (resolveFn) => {
                                    if (elementData.Type == "page") {
                                        getPageInformationSimple(
                                            rqlConnectorObj, {
                                                Guid: elementData.Guid
                                            },
                                            function (responseObject) {
                                                var clipboardItem = {
                                                    Headline: responseObject.Headline,
                                                    Guid: elementData.Guid,
                                                    Type: elementData.Type
                                                }
                                                if (clipboardItem.Headline && clipboardItem.Headline != "") {
                                                    clipboardItems.push(clipboardItem);
                                                }
                                                resolveFn();
                                            }
                                        );
                                    } else {
                                        resolveFn();
                                    }
                                }
                            ));
                    },
                    Promise.resolve()
                );
            promiseObj
                .then(
                    function () {
                        clipboardItems
                            .sort(
                                function (a, b) {
                                    var HeadlineA = a.Headline.toLowerCase(),
                                        HeadlineB = b.Headline.toLowerCase();
                                    if (HeadlineA < HeadlineB) {
                                        return -1;
                                    }
                                    if (HeadlineA > HeadlineB) {
                                        return 1;
                                    }
                                    return 0;
                                }
                            );
                        $("#notifyClipboardData > .loading").hide();
                        if (clipboardItems.length === 0) {
                            $("#notifyClipboardData > .no-data").show();
                        } else {
                            $("#badgesClipboardData").show();
                        }
                        clipboardItems
                            .forEach(
                                elementData => {
                                    var source = $("#template-itemClipboardData").html();
                                    var template = Handlebars.compile(source);
                                    var context = {
                                        Headline: elementData.Headline,
                                        Guid: elementData.Guid
                                    };
                                    var html = template(context);
                                    $("#listClipboardData").append(html);
                                    $("#badgesClipboardData > .badge-secondary").text($(".itemClipboardData").length);
                                }
                            );
                        $("#reloadAll > .fa-sync").toggleClass("fa-spin text-danger");
                        $("#reloadAll").prop("disabled", false);
                        initTooltip();
                    }
                );
        }
    );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */
