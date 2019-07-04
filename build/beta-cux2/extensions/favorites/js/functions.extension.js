/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1250
   File UUID: 03e99174-1dd7-4b18-b2c3-e2d7a472fbc0
   ----- ----- ----- ----- ----- ----- ----- ----- */

$(document)
    .ready(
        function () {

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

            // Init RQL-Connector
            var rqlConnectorObj = {};
            var ws = {};
            createRqlConnector({
                    //DebugMode: true
                },
                function (returnConnectorObj) {

                    rqlConnectorObj = returnConnectorObj;
                    ws = new opentext(rqlConnectorObj);
                    setExtensionDialogLanguage(rqlConnectorObj);
                    checkActiveModule(rqlConnectorObj);
                    checkTemplateEditor(rqlConnectorObj);
                    setContentAbout(rqlConnectorObj);
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */

                    $("#badgesPages, #badgesLinks, #badgesContentClasses, .no-data").hide();
                    $("#tabContent > .active").toggleClass("show");

                    /* ----- ----- ----- ----- ----- ----- ----- ----- */

                    loadFavorites(rqlConnectorObj);

                    /* ----- ----- ----- ----- ----- ----- ----- ----- */

                    $("#tab")
                        .scrollingTabs({
                            bootstrapVersion: 4,
                            widthMultiplier: 1.0,
                            scrollToTabEdge: true,
                            disableScrollArrowsOnFullyScrolled: true,
                            cssClassLeftArrow: "fas fa-caret-left tabs-arrow",
                            cssClassRightArrow: "fas fa-caret-right tabs-arrow"
                        });

                    $("#tab")
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
                    ".forSelection",
                    function () {
                        hideTooltip();
                        $(this).parent().toggleClass("table-success selected");
                        if ($(".item.selected").length != 0) {
                            $("#deleteSelection, #resetSelection").prop("disabled", false);
                        } else {
                            $("#deleteSelection, #resetSelection").prop("disabled", true);
                        }
                        $("#badgesPages > .badge-success").text($(".item.Page.selected").length);
                        $("#badgesLinks > .badge-success").text($(".item.Link.selected").length);
                        $("#badgesContentClasses > .badge-success").text($(".item.ContentClass.selected").length);
                    }
                );

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

            $("body")
                .on(
                    "click",
                    ".showInTree",
                    function () {
                        var thisGuid = $(this).parent().attr("data-elementguid");
                        var thisType = $(this).parent().attr("data-type");
                        addClipboardEntry(
                            rqlConnectorObj, {
                                UserGuid: rqlConnectorObj.info.session.UserGuid,
                                ProjectGuid: rqlConnectorObj.info.session.ProjectGuid,
                                Guid: thisGuid,
                                Type: thisType
                            },
                            function () {
                                ws.ms.ui.clipboard.reload();
                                ws.ms.ui.goto.treesegment(thisGuid, thisType);
                                window.close();
                            }
                        );
                    }
                );

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

            $("#selectAll")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        var context = $("#tabContent").find("div.tab-pane.active").attr("id");
                        $("#" + context + " .item").addClass("table-success selected");
                        if ($(".item.selected").length != 0) {
                            $("#deleteSelection, #resetSelection").prop("disabled", false);
                        } else {
                            $("#deleteSelection, #resetSelection").prop("disabled", true);
                        }
                        $("#badgesPages > .badge-success").text($(".item.Page.selected").length);
                        $("#badgesLinks > .badge-success").text($(".item.Link.selected").length);
                        $("#badgesContentClasses > .badge-success").text($(".item.ContentClass.selected").length);
                        $("#tab").scrollingTabs("refresh", {
                            forceActiveTab: true
                        });
                    }
                );

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

            $("#resetSelection")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#tabContent .selected").toggleClass("table-success selected");
                        $("#deleteSelection, #resetSelection").prop("disabled", true);
                        $("#badgesPages > .badge-success").text($(".item.Page.selected").length);
                        $("#badgesLinks > .badge-success").text($(".item.Link.selected").length);
                        $("#badgesContentClasses > .badge-success").text($(".item.ContentClass.selected").length);
                    }
                );

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

            $("#reloadAll")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#tab .nav-link").toggleClass("disabled");
                        $("#reloadAll > .fa-sync").toggleClass("fa-spin text-danger");
                        $("#resetSelection").trigger("click");
                        $(this).prop("disabled", true);
                        $(".list").html("");
                        $("#tabContent > .active").hide().toggleClass("show").ready(function () {
                            $("#tabContent .no-data").hide();
                            $("#notify > .loading").show();
                            setTimeout(function () {
                                loadFavorites(rqlConnectorObj);
                            }, 250);
                        });
                    }
                );

            /* ----- ----- ----- ----- ----- ----- ----- ----- */

            $("#deleteSelection")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $("#modalProcessing")
                            .modal("show")
                            .ready(
                                function () {
                                    var arrayItems = [];
                                    $(".item.selected")
                                        .each(
                                            function () {
                                                var item = {
                                                    Guid: $(this).attr("data-guid")
                                                }
                                                arrayItems.push(item);
                                                $(this).toggleClass("table-success selected");
                                            }
                                        );
                                    removeFavoriteEntries(
                                        rqlConnectorObj, {
                                            UserGuid: rqlConnectorObj.info.session.UserGuid,
                                            Items: arrayItems
                                        },
                                        function () {
                                            setTimeout(
                                                function () {
                                                    $("#modalProcessing").modal("hide");
                                                    $("#resetSelection, #reloadAll").trigger("click");
                                                }, 250
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

function checkActiveModule(rqlConnectorObj) {
    if (rqlConnectorObj.info.session.LastActiveModule == "smartedit") {
        $("#tabContentClasses, #tabLinks").hide();
    }
}

/* ----- ----- ----- ----- ----- ----- ----- ----- */

function checkTemplateEditor(rqlConnectorObj) {
    if (rqlConnectorObj.info.session.TemplateEditorRight === "0") {
        $("#tabContentClasses").hide();
    }
}

/* ----- ----- ----- ----- ----- ----- ----- ----- */

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
                                var source = $("#template-item").html();
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
                                    $("#table" + key + " > .list").append(html);
                                    $("#badges" + key).show();
                                    $("#badges" + key + " > .badge-secondary").text($(".item." + valueClass).length);
                                    $("#tabContent" + key + " .no-data").hide();
                                }
                            }
                        );
                } else {
                    $("#badges" + key).hide();
                    $("#tabContent" + key + " .no-data").show();
                }
                $("#notify > .loading").hide();
                $("#reloadAll> .fa-sync").toggleClass("fa-spin text-danger");
                $("#reloadAll").prop("disabled", false);
            });
            $("#tab").scrollingTabs("refresh", {
                forceActiveTab: true
            });
            $("#tabContent > .active").show().toggleClass("show");
            $("#tab .nav-link").toggleClass("disabled");
            initTooltip();
        }
    );
}

/* ----- ----- ----- ----- ----- ----- ----- ----- */
