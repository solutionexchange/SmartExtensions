/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1207
   File UUID: 130e171e-372a-4ab9-9e53-291b9381d8d5
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
                    $("#badgesProjectUsers, #notifyProjectUsers > .no-data").hide();
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                    setTimeout(
                        function () {
                            loadUserlistOfProject(rqlConnectorObj);
                        },
                        1000
                    );
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                    rqlConnectorObj.DebugMode && console.info(Clipboard.isSupported());
                    /* ----- ----- ----- ----- ----- ----- ----- ----- */
                }
            );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            var selectedUsersArray = [];
            $("body")
                .on(
                    "click",
                    ".itemProjectUser",
                    function () {
                        hideTooltip();
                        if ($(this).hasClass("selected")) {
                            selectedUsersArray.splice(selectedUsersArray.indexOf($(this).attr("data-name")), 1);
                        } else {
                            selectedUsersArray.push($(this).attr("data-name"));
                        }
                        $(this).toggleClass("table-warning selected");
                        if ($(".itemProjectUser.selected").length != 0) {
                            $("#copySelection, #resetSelection").prop("disabled", false);
                        } else {
                            $("#copySelection, #resetSelection").prop("disabled", true);
                        }
                        $("#badgesProjectUsers>.badge-warning").text($(".itemProjectUser.selected").length);
                        selectedUsersArray
                            .sort(
                                function (a, b) {
                                    let valueA = a.toLowerCase(),
                                        valueB = b.toLowerCase();
                                    if (valueA < valueB) {
                                        return -1;
                                    }
                                    if (valueA > valueB) {
                                        return 1;
                                    }
                                    return 0;
                                }
                            );
                        var output = ``;
                        selectedUsersArray.forEach(element => {
                            output += `${element}\n`;
                        });
                        $("#copySelection").attr("data-clipboard-text", output);
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
                        loadUserlistOfProject(rqlConnectorObj);
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            $("#resetSelection")
                .on(
                    "click",
                    function () {
                        hideTooltip();
                        $(".itemProjectUser.selected").toggleClass("table-warning selected");
                        selectedUsersArray = [];
                        $("#copySelection, #resetSelection").prop("disabled", true);
                        $("#badgesProjectUsers > .badge-warning").text($(".itemProjectUser.selected").length);
                    }
                );
            /* ----- ----- ----- ----- ----- ----- ----- ----- */
            var clipboardAction = new ClipboardJS('#copySelection');
            clipboardAction.on('success', function (event) {
                event.clearSelection();
                $("#modalProcessing").modal("show");
                setTimeout(
                    function () {
                        hideTooltip();
                        $("#modalProcessing").modal("hide");
                    },
                    500
                );
            });
            clipboardAction.on('error', function (event) {
                console.error('Action:', event.action);
                console.error('Trigger:', event.trigger);
            });
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
function loadUserlistOfProject(rqlConnectorObj) {
    hideTooltip();
    $("#listProjectUsers").html("");
    $("#badgesProjectUsers").hide();
    $("#syncProjectUsers, #notifyProjectUsers > .loading").show();
    getUsersOfProject(
        rqlConnectorObj, {
            ProjectGuid: rqlConnectorObj.info.session.ProjectGuid
        },
        function (responseArray) {
            var currentDate = new Date();
            var optionsDate = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            var hbjsSource = $("#template-itemProjectUser").html();
            var hbjsTemplate = Handlebars.compile(hbjsSource);
            responseArray
                .forEach(
                    elementData => {
                        if (elementData.Guid != rqlConnectorObj.info.session.UserGuid) {
                            var lastLoginDate = new Date(elementData.LoginDate.fromOADate());
                            var currentDate = new Date();
                            $("#listProjectUsers")
                                .append(
                                    hbjsTemplate({
                                        Name: elementData.Name,
                                        FullName: (elementData.FullName != "" ? elementData.FullName : elementData.Name),
                                        Guid: elementData.Guid,
                                        EMail: elementData.EMail,
                                        Id: elementData.Id,
                                        DialogLanguageId: elementData.DialogLanguageId,
                                        LoginDate: (elementData.LoginDate > 0 ? lastLoginDate.toLocaleDateString('de-DE', optionsDate) : 'N/A'),
                                        LoginDateColor: (currentDate.calibrateDays(-365) > lastLoginDate ? 'danger' : 'dark'),
                                        LoginDateClass: (currentDate.calibrateDays(-365) > lastLoginDate ? 'Outside12Months' : 'Within12Months')
                                    })
                                );
                            $("#badgesProjectUsers > .badge-secondary").text($(".itemProjectUser").length);
                            $("#badgesProjectUsers > .badge-danger").text($(".itemProjectUser span.text-danger").length);
                        }
                    }
                );
            if ($(".itemProjectUser").length === 0) {
                $("#notifyProjectUsers > .no-data").show();
            } else {
                $("#badgesProjectUsers").show();
            }
            $("#reloadAll > .fa-sync").toggleClass("fa-spin text-danger");
            $("#notifyProjectUsers > .loading").hide();
            $("#reloadAll").prop("disabled", false);
            initTooltip();
        }
    );
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */
