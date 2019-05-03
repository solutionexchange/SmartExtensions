/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release {build-release}
   File UUID: 6ba06c05-9093-4002-872a-a1fc17f39e99
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
                    checkActiveModule(rqlConnectorObj);
                    checkTemplateEditor(rqlConnectorObj);
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                    $("#badgesClipboardDataPages, #badgesClipboardDataLinks, #badgesClipboardDataContentClasses, #badgesFavoritePages, #badgesFavoriteLinks, #badgesFavoriteContentClasses, .no-data").hide();
                    $("#tabContentFavorites > .active, #tabContentClipboardData > .active").toggleClass("show");
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                    loadFavorites(rqlConnectorObj);
                    loadClipboardData(rqlConnectorObj);
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                    $("#tabFavorites, #tabClipboardData")
                        .scrollingTabs({
                            bootstrapVersion: 4,
                            widthMultiplier: 1.0,
                            scrollToTabEdge: true,
                            disableScrollArrowsOnFullyScrolled: true,
                            cssClassLeftArrow: "fas fa-caret-left tabs-arrow",
                            cssClassRightArrow: "fas fa-caret-right tabs-arrow"
                        });
                    $("#tabFavorites, #tabClipboardData")
                        .on("shown.bs.tab",
                            function () {
                                $(this).scrollingTabs("scrollToActiveTab");
                            }
                        );
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
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
                        if ($(".itemClipboardData.selected").length != 0) {
                            $("#deleteSelection-fromClipboard, #moveSelection-toFavorites, #copySelection-toFavorites, #removeSelection-fromFavorites, #resetSelection-fromClipboard").prop("disabled", false);
                        } else {
                            $("#deleteSelection-fromClipboard, #moveSelection-toFavorites, #copySelection-toFavorites, #removeSelection-fromFavorites, #resetSelection-fromClipboard").prop("disabled", true);
                        }
                        $("#badgesClipboardDataPages > .badge-success").text($(".itemClipboardData.Page.selected").length);
                        $("#badgesClipboardDataLinks > .badge-success").text($(".itemClipboardData.Link.selected").length);
                        $("#badgesClipboardDataContentClasses > .badge-success").text($(".itemClipboardData.ContentClass.selected").length);
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("body")
                .on(
                    "click",
                    ".itemFavorite",
                    function () {
                        hideTooltip();
                        $(this).toggleClass("table-success selected");
                        if ($(".itemFavorite.selected").length != 0) {
                            $("#deleteSelection-fromFavorites, #moveSelection-toClipboard, #copySelection-toClipboard, #removeSelection-fromClipboard, #resetSelection-fromFavorites").prop("disabled", false);
                        } else {
                            $("#deleteSelection-fromFavorites, #moveSelection-toClipboard, #copySelection-toClipboard, #removeSelection-fromClipboard, #resetSelection-fromFavorites").prop("disabled", true);
                        }
                        $("#badgesFavoritePages > .badge-success").text($(".itemFavorite.Page.selected").length);
                        $("#badgesFavoriteLinks > .badge-success").text($(".itemFavorite.Link.selected").length);
                        $("#badgesFavoriteContentClasses > .badge-success").text($(".itemFavorite.ContentClass.selected").length);
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#resetSelection-fromFavorites")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#tabContentFavorites .selected").toggleClass("table-success selected");
                        $("#deleteSelection-fromFavorites, #resetSelection-fromFavorites, #moveSelection-toClipboard, #copySelection-toClipboard, #removeSelection-fromClipboard").prop("disabled", true);
                        $("#badgesFavoritePages > .badge-success").text($(".itemFavorite.Page.selected").length);
                        $("#badgesFavoriteLinks > .badge-success").text($(".itemFavorite.Link.selected").length);
                        $("#badgesFavoriteContentClasses > .badge-success").text($(".itemFavorite.ContentClass.selected").length);
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#resetSelection-fromClipboard")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#tabContentClipboardData .selected").toggleClass("table-success selected");
                        $("#deleteSelection-fromClipboard, #resetSelection-fromClipboard, #moveSelection-toFavorites, #copySelection-toFavorites, #removeSelection-fromFavorites").prop("disabled", true);
                        $("#badgesClipboardDataPages > .badge-success").text($(".itemClipboardData.Page.selected").length);
                        $("#badgesClipboardDataLinks > .badge-success").text($(".itemClipboardData.Links.selected").length);
                        $("#badgesClipboardDataContentClasses > .badge-success").text($(".itemClipboardDataContent.Classes.selected").length);
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#reloadAll-fromFavorites")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#tabFavorites .nav-link").toggleClass("disabled");
                        $("#reloadAll-fromFavorites > .fa-sync").toggleClass("fa-spin text-danger");
                        $("#resetSelection-fromFavorites").trigger("click");
                        $(this).prop("disabled", true);
                        $(".listFavorite").html("");
                        $("#tabContentFavorites > .active").hide().toggleClass("show").ready(function () {
                            $("#tabContentFavorites .no-data").hide();
                            $("#notifyFavorites > .loading").show();
                            setTimeout(function () {
                                loadFavorites(rqlConnectorObj);
                            }, 500);
                        });
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#reloadAll-fromClipboard")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#tabClipboardData .nav-link").toggleClass("disabled");
                        $("#reloadAll-fromClipboard > .fa-sync").toggleClass("fa-spin text-danger");
                        $("#resetSelection-fromClipboard").trigger("click");
                        $(this).prop("disabled", true);
                        $(".listClipboardData").html("");
                        $("#tabContentClipboardData > .active").hide().toggleClass("show").ready(function () {
                            $("#tabContentClipboardData .no-data").hide();
                            $("#notifyClipboardData > .loading").show();
                            loadClipboardData(rqlConnectorObj);
                            ws.ms.ui.clipboard.reload();
                        });
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#selectAll-fromTabFavorites")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        var context = $("#tabContentFavorites").find("div.tab-pane.active").attr("id");
                        $("#" + context + " .itemFavorite").addClass("table-success selected");
                        if ($(".itemFavorite.selected").length != 0) {
                            $("#moveSelection-toClipboard, #copySelection-toClipboard, #deleteSelection-fromFavorites, #removeSelection-fromClipboard, #resetSelection-fromFavorites").prop("disabled", false);
                        } else {
                            $("#moveSelection-toClipboard, #copySelection-toClipboard, #deleteSelection-fromFavorites, #removeSelection-fromClipboard, #resetSelection-fromFavorites").prop("disabled", true);
                        }
                        $("#badgesFavoritePages > .badge-success").text($(".itemFavorite.Page.selected").length);
                        $("#badgesFavoriteLinks > .badge-success").text($(".itemFavorite.Link.selected").length);
                        $("#badgesFavoriteContentClasses > .badge-success").text($(".itemFavorite.ContentClass.selected").length);
                        $("#tabFavorites").scrollingTabs("refresh", {
                            forceActiveTab: true
                        });
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#selectAll-fromTabClipboard")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        var context = $("#tabContentClipboardData").find("div.tab-pane.active").attr("id");
                        $("#" + context + " .itemClipboardData").addClass("table-success selected");
                        if ($(".itemClipboardData.selected").length != 0) {
                            $("#moveSelection-toFavorites, #copySelection-toFavorites, #deleteSelection-fromClipboard, #removeSelection-fromFavorites, #resetSelection-fromClipboard").prop("disabled", false);
                        } else {
                            $("#moveSelection-toFavorites, #copySelection-toFavorites, #deleteSelection-fromClipboard, #removeSelection-fromFavorites, #resetSelection-fromClipboard").prop("disabled", true);
                        }
                        $("#badgesClipboardDataPages > .badge-success").text($(".itemClipboardData.Page.selected").length);
                        $("#badgesClipboardDataLinks > .badge-success").text($(".itemClipboardData.Link.selected").length);
                        $("#badgesClipboardDataContentClasses > .badge-success").text($(".itemClipboardData.ContentClass.selected").length);
                        $("#tabClipboardData").scrollingTabs("refresh", {
                            forceActiveTab: true
                        });
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#copySelection-toClipboard")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#modalProcessing")
                            .modal("show")
                            .ready(
                                function () {
                                    var arrayFavoriteItems = [];
                                    $(".itemFavorite.selected")
                                        .each(
                                            function () {
                                                var itemFavorite = {
                                                    Guid: $(this).attr("data-elementguid"),
                                                    Type: $(this).attr("data-type")
                                                }
                                                arrayFavoriteItems.push(itemFavorite);
                                                $(this).toggleClass("table-success selected");
                                            }
                                        );
                                    arrayFavoriteItems.reverse();
                                    addClipboardEntries(
                                        rqlConnectorObj, {
                                            UserGuid: rqlConnectorObj.info.session.UserGuid,
                                            ProjectGuid: rqlConnectorObj.info.session.ProjectGuid,
                                            Items: arrayFavoriteItems
                                        },
                                        function () {
                                            setTimeout(
                                                function () {
                                                    $("#modalProcessing").modal("hide");
                                                    $("#reloadAll-fromClipboard, #resetSelection-fromFavorites").trigger("click");
                                                    ws.ms.ui.clipboard.reload();
                                                }, 500
                                            );
                                        }
                                    );
                                }
                            );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#removeSelection-fromClipboard")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#modalProcessing")
                            .modal("show")
                            .ready(
                                function () {
                                    var arrayFavoriteItems = [];
                                    $(".itemFavorite.selected")
                                        .each(
                                            function () {
                                                var itemFavorite = {
                                                    Guid: $(this).attr("data-elementguid"),
                                                    Type: $(this).attr("data-type")
                                                }
                                                arrayFavoriteItems.push(itemFavorite);
                                                $(this).toggleClass("table-success selected");
                                            }
                                        );
                                    removeClipboardEntries(
                                        rqlConnectorObj, {
                                            UserGuid: rqlConnectorObj.info.session.UserGuid,
                                            ProjectGuid: rqlConnectorObj.info.session.ProjectGuid,
                                            Items: arrayFavoriteItems
                                        },
                                        function () {
                                            setTimeout(
                                                function () {
                                                    $("#modalProcessing").modal("hide");
                                                    $("#reloadAll-fromClipboard, #resetSelection-fromFavorites").trigger("click");
                                                    ws.ms.ui.clipboard.reload();
                                                }, 500
                                            );
                                        }
                                    );
                                }
                            );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#deleteSelection-fromClipboard")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#modalProcessing")
                            .modal("show")
                            .ready(
                                function () {
                                    var arrayClipboardDataItems = [];
                                    $(".itemClipboardData.selected")
                                        .each(
                                            function () {
                                                var itemClipboardData = {
                                                    Guid: $(this).attr("data-guid"),
                                                    Type: $(this).attr("data-type")
                                                }
                                                arrayClipboardDataItems.push(itemClipboardData);
                                                $(this).toggleClass("table-success selected");
                                            }
                                        );
                                    removeClipboardEntries(
                                        rqlConnectorObj, {
                                            UserGuid: rqlConnectorObj.info.session.UserGuid,
                                            ProjectGuid: rqlConnectorObj.info.session.ProjectGuid,
                                            Items: arrayClipboardDataItems
                                        },
                                        function () {
                                            setTimeout(
                                                function () {
                                                    $("#modalProcessing").modal("hide");
                                                    $("#resetSelection-fromClipboard, #reloadAll-fromClipboard").trigger("click");
                                                    ws.ms.ui.clipboard.reload();
                                                }, 500
                                            );
                                        }
                                    );
                                }
                            );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#copySelection-toFavorites")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#modalProcessing")
                            .modal("show")
                            .ready(
                                function () {
                                    var arrayClipboardDataItems = [];
                                    $(".itemClipboardData.selected")
                                        .each(
                                            function () {
                                                switch ($(this).attr("data-type")) {
                                                    case "page":
                                                        valueImageTitle = "page.gif";
                                                        break;
                                                    case "link":
                                                        valueImageTitle = `TreeType${$(this).attr("data-elttype")}.gif`;
                                                        break;
                                                    case "app.4015":
                                                        if ($(this).attr("data-subtype") == "ContentClassMasterpage") {
                                                            valueImageTitle = "masterpage_group.gif";
                                                        } else {
                                                            valueImageTitle = "contentclass.gif";
                                                        }
                                                        break;
                                                    default:
                                                        valueImageTitle = "";
                                                }
                                                var itemClipboardData = {
                                                    Name: escape($(this).attr("data-headline")),
                                                    ElementGuid: $(this).attr("data-guid"),
                                                    Type: $(this).attr("data-type"),
                                                    ImageTitle: valueImageTitle
                                                }
                                                arrayClipboardDataItems.push(itemClipboardData);
                                                $(this).toggleClass("table-success selected");
                                            }
                                        );
                                    addFavoriteEntries(
                                        rqlConnectorObj, {
                                            UserGuid: rqlConnectorObj.info.session.UserGuid,
                                            ProjectGuid: rqlConnectorObj.info.session.ProjectGuid,
                                            Items: arrayClipboardDataItems
                                        },
                                        function () {
                                            setTimeout(
                                                function () {
                                                    $("#modalProcessing").modal("hide");
                                                    $("#reloadAll-fromFavorites, #resetSelection-fromClipboard").trigger("click");
                                                }, 500
                                            );
                                        }
                                    );
                                }
                            );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#deleteSelection-fromFavorites")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#modalProcessing")
                            .modal("show")
                            .ready(
                                function () {
                                    var arrayFavoriteItems = [];
                                    $(".itemFavorite.selected")
                                        .each(
                                            function () {
                                                var itemFavorite = {
                                                    Guid: $(this).attr("data-guid")
                                                }
                                                arrayFavoriteItems.push(itemFavorite);
                                                $(this).toggleClass("table-success selected");
                                            }
                                        );
                                    removeFavoriteEntries(
                                        rqlConnectorObj, {
                                            UserGuid: rqlConnectorObj.info.session.UserGuid,
                                            Items: arrayFavoriteItems
                                        },
                                        function () {
                                            setTimeout(
                                                function () {
                                                    $("#modalProcessing").modal("hide");
                                                    $("#resetSelection-fromFavorites, #reloadAll-fromFavorites").trigger("click");
                                                }, 500
                                            );
                                        }
                                    );
                                }
                            );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#removeSelection-fromFavorites")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#modalProcessing")
                            .modal("show")
                            .ready(
                                function () {
                                    var arrayClipboardDataItems = [];
                                    $(".itemClipboardData.selected")
                                        .each(
                                            function () {
                                                var itemClipboardData = {
                                                    Guid: $(".listFavorite .itemFavorite[data-elementguid='" + $(this).attr("data-guid") + "']").attr("data-guid"),
                                                    Type: $(this).attr("data-type")
                                                }
                                                arrayClipboardDataItems.push(itemClipboardData);
                                                $(this).toggleClass("table-success selected");
                                            }
                                        );
                                    removeFavoriteEntries(
                                        rqlConnectorObj, {
                                            UserGuid: rqlConnectorObj.info.session.UserGuid,
                                            ProjectGuid: rqlConnectorObj.info.session.ProjectGuid,
                                            Items: arrayClipboardDataItems
                                        },
                                        function () {
                                            setTimeout(
                                                function () {
                                                    $("#modalProcessing").modal("hide");
                                                    $("#reloadAll-fromFavorites, #resetSelection-fromClipboard").trigger("click");
                                                }, 500
                                            );
                                        }
                                    );
                                }
                            );
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#moveSelection-toFavorites")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#modalProcessing")
                            .modal("show")
                            .ready(
                                function () {
                                    var arrayClipboardDataItems = [];
                                    $(".itemClipboardData.selected")
                                        .each(
                                            function () {
                                                switch ($(this).attr("data-type")) {
                                                    case "page":
                                                        valueImageTitle = "page.gif";
                                                        break;
                                                    case "link":
                                                        valueImageTitle = `TreeType${$(this).attr("data-elttype")}.gif`;
                                                        break;
                                                    case "app.4015":
                                                        if ($(this).attr("data-subtype") == "Content Class Masterpage") {
                                                            valueImageTitle = "masterpage_group.gif";
                                                        } else {
                                                            valueImageTitle = "contentclass.gif";
                                                        }
                                                        break;
                                                    default:
                                                        valueImageTitle = "";
                                                }
                                                var itemClipboardData = {
                                                    Name: escape($(this).attr("data-headline")),
                                                    Guid: $(this).attr("data-guid"),
                                                    ElementGuid: $(this).attr("data-guid"),
                                                    Type: $(this).attr("data-type"),
                                                    ImageTitle: valueImageTitle
                                                }
                                                arrayClipboardDataItems.push(itemClipboardData);
                                                $(this).toggleClass("table-success selected");
                                            }
                                        );
                                    addFavoriteEntries(
                                        rqlConnectorObj, {
                                            UserGuid: rqlConnectorObj.info.session.UserGuid,
                                            ProjectGuid: rqlConnectorObj.info.session.ProjectGuid,
                                            Items: arrayClipboardDataItems
                                        },
                                        function () {
                                            removeClipboardEntries(
                                                rqlConnectorObj, {
                                                    UserGuid: rqlConnectorObj.info.session.UserGuid,
                                                    ProjectGuid: rqlConnectorObj.info.session.ProjectGuid,
                                                    Items: arrayClipboardDataItems
                                                },
                                                function () {
                                                    setTimeout(
                                                        function () {
                                                            $("#modalProcessing").modal("hide");
                                                            $("#resetSelection-fromClipboard, #reloadAll-fromClipboard, #reloadAll-fromFavorites").trigger("click");
                                                            ws.ms.ui.clipboard.reload();
                                                        }, 500
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
            $("#moveSelection-toClipboard")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#modalProcessing")
                            .modal("show")
                            .ready(
                                function () {
                                    var arrayClipboardDataItems = [];
                                    var arrayFavoriteItems = [];
                                    $(".itemFavorite.selected")
                                        .each(
                                            function () {
                                                var itemClipboardData = {
                                                    Guid: $(this).attr("data-elementguid"),
                                                    Type: $(this).attr("data-type")
                                                }
                                                var itemFavorite = {
                                                    Guid: $(this).attr("data-guid"),
                                                    Type: $(this).attr("data-type")
                                                }
                                                arrayClipboardDataItems.push(itemClipboardData);
                                                arrayFavoriteItems.push(itemFavorite);
                                                $(this).toggleClass("table-success selected");
                                            }
                                        );
                                    arrayClipboardDataItems.reverse();
                                    addClipboardEntries(
                                        rqlConnectorObj, {
                                            UserGuid: rqlConnectorObj.info.session.UserGuid,
                                            ProjectGuid: rqlConnectorObj.info.session.ProjectGuid,
                                            Items: arrayClipboardDataItems
                                        },
                                        function () {
                                            removeFavoriteEntries(
                                                rqlConnectorObj, {
                                                    UserGuid: rqlConnectorObj.info.session.UserGuid,
                                                    Items: arrayFavoriteItems
                                                },
                                                function () {
                                                    setTimeout(
                                                        function () {
                                                            $("#modalProcessing").modal("hide");
                                                            $("#resetSelection-fromFavorites, #reloadAll-fromFavorites, #reloadAll-fromClipboard").trigger("click");
                                                            ws.ms.ui.clipboard.reload();
                                                        }, 500
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
        }
    );
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} rqlConnectorObj
 */
function checkActiveModule(rqlConnectorObj) {
    if (rqlConnectorObj.info.session.LastActiveModule == "smartedit") {
        $("#tabClipboardDataContentClasses, #tabClipboardDataLinks").hide();
        $("#tabFavoriteContentClasses, #tabFavoriteLinks").hide();
    }
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} rqlConnectorObj
 */
function checkTemplateEditor(rqlConnectorObj) {
    if (rqlConnectorObj.info.session.TemplateEditorRight === "0") {
        $("#tabClipboardDataContentClasses").hide();
        $("#tabFavoriteContentClasses").hide();
    }
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} rqlConnectorObj
 */
function loadFavorites(rqlConnectorObj) {
    hideTooltip();
    getFavorites(
        rqlConnectorObj, {
            UserGuid: rqlConnectorObj.info.session.UserGuid
        },
        function (responseObject) {
            Object.keys(responseObject).forEach(function (key) {
                var valueSubType = "";
                var valueColor = "";
                switch (key) {
                    case "Pages":
                        var valueIcon = "far fa-file";
                        var valueClass = "Page";
                        break;
                    case "Links":
                        var valueIcon = "fas fa-link";
                        var valueClass = "Link";
                        break;
                    case "ContentClasses":
                        var valueIcon = "fas fa-code";
                        var valueClass = "ContentClass";
                        break;
                    default:
                        var valueIcon = "far fa-question-circle";
                        var valueClass = "Unknown";
                }
                if (responseObject[key] != 0) {
                    responseObject[key]
                        .forEach(
                            elementData => {
                                switch (elementData.ImageTitle) {
                                    case "contentclass.gif":
                                        valueSubType = "ContentClass";
                                        valueColor = "warning";
                                        break;
                                    case "masterpage_group.gif":
                                        valueSubType = "ContentClassMasterpage";
                                        valueColor = "info";
                                        break;
                                    case "page.gif":
                                        valueSubType = "PageReleased";
                                        valueColor = "dark";
                                        break;
                                    case "pagekeyword.gif":
                                        valueSubType = "PageKeyword";
                                        valueColor = "dark";
                                        break;
                                    case "pageNew.gif":
                                        valueSubType = "PageNew";
                                        valueColor = "dark";
                                        break;
                                    case "pageChanged.gif":
                                        valueSubType = "PageChanged";
                                        valueColor = "dark";
                                        break;
                                    case "TreeType13.gif":
                                        valueIcon = "fas fa-list";
                                        valueSubType = "List";
                                        valueColor = "info";
                                        break;
                                    case "TreeType-13.gif":
                                        valueIcon = "fas fa-list";
                                        valueSubType = "List";
                                        valueColor = "info";
                                        break;
                                    case "TreeType26.gif":
                                        valueIcon = "fas fa-link";
                                        valueSubType = "Anchor";
                                        valueColor = "dark";
                                        break;
                                    case "TreeType-26.gif":
                                        valueIcon = "fas fa-link";
                                        valueSubType = "Anchor";
                                        valueColor = "dark";
                                        break;
                                    case "TreeType28.gif":
                                        valueIcon = "fas fa-cube";
                                        valueSubType = "Container";
                                        valueColor = "success";
                                        break;
                                    case "TreeType-28.gif":
                                        valueIcon = "fas fa-cube";
                                        valueSubType = "Container";
                                        valueColor = "success";
                                        break;
                                    default:
                                        valueIcon = "far fa-question-circle";
                                        valueSubType = "Unknown";
                                        valueColor = "danger";
                                }
                                var source = $("#template-itemFavorite").html();
                                var template = Handlebars.compile(source);
                                var context = {
                                    Value: unescape(elementData.Value),
                                    Guid: elementData.Guid,
                                    ElementGuid: elementData.ElementGuid,
                                    Type: elementData.Type,
                                    SubType: valueSubType,
                                    Icon: valueIcon,
                                    Color: valueColor,
                                    Class: valueClass
                                }
                                if (context.Value && context.Value != "") {
                                    var html = template(context);
                                    $("#tableFavorite" + key + " > .listFavorite").append(html);
                                    $("#badgesFavorite" + key).show();
                                    $("#badgesFavorite" + key + " > .badge-secondary").text($(".itemFavorite." + valueClass).length);
                                    $("#tabContentFavorite" + key + " .no-data").hide();
                                }
                            }
                        );
                } else {
                    $("#badgesFavorite" + key).hide();
                    $("#tabContentFavorite" + key + " .no-data").show();
                }
                $("#notifyFavorites > .loading").hide();
                $("#reloadAll-fromFavorites > .fa-sync").toggleClass("fa-spin text-danger");
                $("#reloadAll-fromFavorites").prop("disabled", false);
            });
            $("#tabFavorites").scrollingTabs("refresh", {
                forceActiveTab: true
            });
            $("#tabContentFavorites > .active").show().toggleClass("show");
            $("#tabFavorites .nav-link").toggleClass("disabled");
            initTooltip();
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
            var clipboardItemPages = [];
            var clipboardItemLinks = [];
            var clipboardItemContentClasses = [];
            var clipboardItems = {
                Pages: clipboardItemPages,
                Links: clipboardItemLinks,
                ContentClasses: clipboardItemContentClasses
            };
            let promiseObj = responseObject.Content
                .reduce((promiseChain, elementData) => {
                        return promiseChain
                            .then(() => new Promise(
                                (resolveFn) => {
                                    switch (elementData.Type) {
                                        case "page":
                                            getPageInformationSimple(
                                                rqlConnectorObj, {
                                                    Guid: elementData.Guid
                                                },
                                                function (responseObject) {
                                                    switch (responseObject.Status) {
                                                        case 1:
                                                            valueSubType = "PageReleased";
                                                            break;
                                                        case 2:
                                                            valueSubType = "PageWaitingRelease";
                                                            break;
                                                        case 3:
                                                            valueSubType = "PageWaitingCorrection";
                                                            break;
                                                        case 4:
                                                            valueSubType = "PageDraft";
                                                            break;
                                                        case 5:
                                                            valueSubType = "PageNotAvailable";
                                                            break;
                                                        case 6:
                                                            valueSubType = "PageNeverReleased";
                                                            break;
                                                        case 10:
                                                            valueSubType = "PageDeletedRecyle";
                                                            break;
                                                        case 50:
                                                            valueSubType = "PageArchived";
                                                            break;
                                                        case 99:
                                                            valueSubType = "PageRemovedCompletly";
                                                            break;
                                                        default:
                                                            valueSubType = "Unknown";
                                                    }
                                                    var clipboardItem = {
                                                        Headline: responseObject.Headline,
                                                        Guid: elementData.Guid,
                                                        Type: elementData.Type,
                                                        EltType: "",
                                                        SubType: valueSubType,
                                                        LanguageVariantId: rqlConnectorObj.info.session.LanguageVariantId,
                                                        Icon: "far fa-file",
                                                        Class: "Page",
                                                        Color: "dark"
                                                    }
                                                    if (clipboardItem.Headline && clipboardItem.Headline != "") {
                                                        clipboardItemPages.push(clipboardItem);
                                                    }
                                                    resolveFn();
                                                }
                                            );
                                            break;
                                        case "link":
                                            getElementInformationSimple(
                                                rqlConnectorObj, {
                                                    Guid: elementData.Guid
                                                },
                                                function (responseObject) {
                                                    switch (responseObject.EltType) {
                                                        case "13":
                                                            valueIcon = "fas fa-list";
                                                            valueColor = "info";
                                                            valueSubType = "List";
                                                            break;
                                                        case "26":
                                                            valueIcon = "fas fa-link";
                                                            valueColor = "dark";
                                                            valueSubType = "Anchor";
                                                            break;
                                                        case "28":
                                                            valueIcon = "fas fa-cube";
                                                            valueColor = "success";
                                                            valueSubType = "Container";
                                                            break;
                                                        default:
                                                            valueIcon = "far fa-question-circle";
                                                            valueColor = "danger";
                                                            valueSubType = "Unknown";
                                                    }
                                                    var clipboardItem = {
                                                        Headline: (responseObject.Value != "" ? responseObject.Value : responseObject.Name),
                                                        Guid: elementData.Guid,
                                                        Type: elementData.Type,
                                                        EltType: responseObject.EltType,
                                                        SubType: valueSubType,
                                                        LanguageVariantId: rqlConnectorObj.info.session.LanguageVariantId,
                                                        Icon: valueIcon,
                                                        Class: "Link",
                                                        Color: valueColor
                                                    }
                                                    if (clipboardItem.Headline && clipboardItem.Headline != "") {
                                                        clipboardItemLinks.push(clipboardItem);
                                                    }
                                                    resolveFn();
                                                }
                                            );
                                            break;
                                        case "app.4015":
                                            getContentClassInformationSimple(
                                                rqlConnectorObj, {
                                                    Guid: elementData.Guid
                                                },
                                                function (responseObject) {
                                                    var clipboardItem = {
                                                        Headline: responseObject.Name,
                                                        Guid: elementData.Guid,
                                                        Type: elementData.Type,
                                                        EltType: "",
                                                        SubType: (responseObject.IsMasterPage ? "ContentClassMasterpage" : "ContentClass"),
                                                        LanguageVariantId: rqlConnectorObj.info.session.LanguageVariantId,
                                                        Icon: "fas fa-code",
                                                        Class: "ContentClass",
                                                        Color: (responseObject.IsMasterPage ? "info" : "warning")
                                                    }
                                                    if (clipboardItem.Headline && clipboardItem.Headline != "") {
                                                        clipboardItemContentClasses.push(clipboardItem);
                                                    }
                                                    resolveFn();
                                                }
                                            );
                                            break;
                                        default:
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
                        Object.keys(clipboardItems).forEach(function (key) {
                            if (clipboardItems[key] != 0) {
                                clipboardItems[key]
                                    .sort(
                                        function (a, b) {
                                            var headlineA = a.Headline.toLowerCase(),
                                                headlineB = b.Headline.toLowerCase();
                                            if (headlineA < headlineB) {
                                                return -1;
                                            }
                                            if (headlineA > headlineB) {
                                                return 1;
                                            }
                                            return 0;
                                        }
                                    );
                                clipboardItems[key]
                                    .forEach(
                                        elementData => {
                                            var source = $("#template-itemClipboardData").html();
                                            var template = Handlebars.compile(source);
                                            var context = {
                                                Headline: elementData.Headline,
                                                Id: elementData.Id,
                                                Guid: elementData.Guid,
                                                Type: elementData.Type,
                                                EltType: elementData.EltType,
                                                SubType: elementData.SubType,
                                                LanguageVariantId: elementData.LanguageVariantId,
                                                Icon: elementData.Icon,
                                                Color: elementData.Color,
                                                Class: elementData.Class
                                            };
                                            var html = template(context);
                                            $("#tableClipboardData" + key + " > .listClipboardData").append(html);
                                            $("#badgesClipboardData" + key).show();
                                            $("#badgesClipboardData" + key + " > .badge-secondary").text($(".itemClipboardData." + elementData.Class).length);
                                            $("#tabContentClipboardData" + key + " .no-data").hide();
                                        }
                                    );
                            } else {
                                $("#badgesClipboardData" + key).hide();
                                $("#tabContentClipboardData" + key + " .no-data").show();
                            }
                        });
                        $("#notifyClipboardData > .loading").hide();
                        $("#reloadAll-fromClipboard > .fa-sync").toggleClass("fa-spin text-danger");
                        $("#reloadAll-fromClipboard").prop("disabled", false);
                        $("#tabClipboardData").scrollingTabs("refresh", {
                            forceActiveTab: true
                        });
                        $("#tabContentClipboardData > .active").show().toggleClass("show");
                        $("#tabClipboardData .nav-link").toggleClass("disabled");
                        initTooltip();
                    }
                );
        }
    )
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */