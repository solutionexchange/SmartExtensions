/* ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.1259
   File UUID: d04fbfef-f4d0-4b4a6-9153-debd7c5d89f
   ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @class converter
 */
class converter {
    constructor(_rqlConnectorObj) {
        this.rqlConnectorObj = _rqlConnectorObj;
        this.convertFrom = {
            favorites: (_str) => {
                return FavoritesEncode(_str);
            },
            base64: (_str) => {
                return Base64Decode(_str);
            },
            path: (_str) => {
                return PathDecode(_str);
            },
            uuid: (_str) => {
                return true
            },
            guid: (_str) => {
                return true
            }
        }
        this.convertTo = {
            favorites: (_str) => {
                return FavoritesDecode(_str);
            },
            base64: (_str) => {
                return Base64Encode(_str);
            },
            path: (_str) => {
                return PathEncode(_str);
            },
            uuid: (_str) => {
                return true
            },
            guid: (_str) => {
                return true
            }
        }
    }
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} str
 * @param {string} [encoding='utf-8']
 * 
 * @returns
 */
function Base64Encode(str, encoding = 'utf-8') {
    var bytes = new(TextEncoder || TextEncoderLite)(encoding).encode(str);
    return base64js.fromByteArray(bytes);
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} str
 * @param {string} [encoding='utf-8']
 * 
 * @returns
 */
function Base64Decode(str, encoding = 'utf-8') {
    var bytes = base64js.toByteArray(str);
    return new(TextDecoder || TextDecoderLite)(encoding).decode(bytes);
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} str
 */
function PathEncode(str) {}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} str
 */
function PathDecode(str) {}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} rqlConnectorObj
 * @param {*} requestParam
 */
function FavoritesEncode(rqlConnectorObj, requestParam) {
    let thisFunction = {
        Name: arguments.callee.name,
        //DebugMode: rqlConnectorObj.debugMode
    }
    /*
        switch (elementData.ImageTitle) {
            case "contentclass.gif":
                valueSubType = "ContentClass";
                valueColor = "dark";
                break;
            case "masterpage_group.gif":
                valueSubType = "ContentClassMasterpage";
                valueColor = "primary";
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
                valueColor = "primary";
                break;
            case "TreeType-13.gif":
                valueIcon = "fas fa-list";
                valueSubType = "List";
                valueColor = "primary";
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
        */
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */



/* ----- ----- ----- ----- ----- ----- ----- ----- */
/**
 *
 *
 * @param {*} rqlConnectorObj
 * @param {*} requestParam
 */
function FavoritesDecode(rqlConnectorObj, requestParam) {
    let thisFunction = {
        Name: arguments.callee.name,
        DebugMode: rqlConnectorObj.debugMode
    }
}
/* ----- ----- ----- ----- ----- ----- ----- ----- */
