/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1250
   File UUID: 13580c28-326b-4cc6-b294-08f37f2ae7c7
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
class opentext {
    /**
     * Creates an instance of opentext.
     * 
     * @author Thomas Pollinger 
     * @version 16.0.0.1250
     * 
     * @param {object} _rqlConnectorObj
     * 
     * @memberof opentext
     */
    constructor(_rqlConnectorObj) {
        this.rqlConnectorObj = _rqlConnectorObj;
        this.ms = {
            ui: {
                clipboard: {
                    reload: () => {
                        switch (this.rqlConnectorObj.info.session.LastActiveModule) {
                            case "servermanager":
                                top.opener.top.Module.ioTreeIFrame.ioTreeFrames.ioClipboard.RefreshClipboardData();
                                break;
                            case "smarttree":
                                top.opener.top.Module.ioTreeIFrame.ioTreeFrames.ioClipboard.RefreshClipboardData();
                                break;
                            case "smartedit":
                                if (this.rqlConnectorObj.connectorMode == "extension") {
                                    $(top.opener.top.document).find('#RD__Clipboard_reload').click();
                                }
                                break;
                            default:
                                console.log("no LastActiveModule");
                        }
                    }
                },
                goto: {
                    treesegment: (_Guid, _Type, _ParentGuid) => {
                        switch (this.rqlConnectorObj.info.session.LastActiveModule) {
                            case "servermanager":
                                top.opener.top.Module.ioTreeIFrame.ioTreeFrames.ioTree.GotoTreeSegment(_Guid, _Type, _ParentGuid);
                                break;
                            case "smarttree":
                                top.opener.top.Module.ioTreeIFrame.ioTreeFrames.ioTree.GotoTreeSegment(_Guid, _Type, _ParentGuid);
                                break;
                            case "smartedit":
                                return true;
                            default:
                                console.log("no LastActiveModule");
                        }
                    }
                },
                refresh: {
                    treesegment: () => {
                        switch (this.rqlConnectorObj.info.session.LastActiveModule) {
                            case "servermanager":
                                top.opener.top.Module.ioTreeIFrame.ioTreeFrames.ioTree.ReloadTreeSegment();
                                break;
                            case "smarttree":
                                top.opener.top.Module.ioTreeIFrame.ioTreeFrames.ioTree.ReloadTreeSegment();
                                break;
                            case "smartedit":
                                return true;
                            default:
                                console.log("no LastActiveModule");
                        }
                    },
                    editedpage: () => {
                        switch (this.rqlConnectorObj.info.session.LastActiveModule) {
                            case "servermanager":
                                return true;
                            case "smarttree":
                                return true;
                            case "smartedit":
                                if (this.rqlConnectorObj.connectorMode == "extension") {
                                    top.frames.ioMain.opener.ReloadEditedPage();
                                }
                                break;
                            default:
                                console.log("no LastActiveModule");
                        }
                    }
                }
            }
        }
    }
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */
