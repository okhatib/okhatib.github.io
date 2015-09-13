//================================================================================================
//================================================================================================
// FUNCTION TO RETURN PAGE TITLE BASED ON URL
function GetPageTitle(url)
{
    var splitTxt = url.substr(url.lastIndexOf('/') + 1);
    if (!isNaN(parseInt(splitTxt))) splitTxt = 'events';
    switch(splitTxt){
        case 'new':
            return 'New Event';
        case 'edit':
            return 'Edit Event';
        case 'events':
        case 'test':
            return 'Event Details';
        case 'register':
            return 'Register';
        case 'login':
            return 'Login';
        case 'recover':
            return 'Recover PW';
        case 'feedback':
            return 'Feedback';
        case 'profile':
            return 'My Profile';
        default:
            return 'Dashboard';
    }
}

//================================================================================================
//================================================================================================
// FUNCTION STRING FORMATTER LIKE IN C#:
// StringFormat('Hi, {0}!', ['Omar']) --> Hi Omar!
function StringFormat(string, arguments){
    if (arguments && arguments.length > 0)
    {
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{'+i+'\\}', 'gi');
            string = string.replace(regexp, arguments[i]);
        }
    }

    return string;
}

//================================================================================================
//================================================================================================
//FUNCTIONS TO STORE/GET/REMOVE FROM LOCALSTORAGE
function StoreIntoLocalStorage(key, value)
{
    if (typeof value == "object") value = JSON.stringify(value);
    localStorage[key] = value;
}

function GetFromLocalStorage(key, returnObject)
{
    if (localStorage[key])
    {
        var data = localStorage[key];
        if (returnObject) return JSON.parse(data);
        return data;
    }
}

function RemoveFromLocalStorage(key)
{
    if (localStorage[key])
    {
        localStorage.removeItem(key)
    }
}

//================================================================================================
//================================================================================================
// FUNCTION TO CHECK IF THE USER IS LOGGED IN BASED ON THE SAVED COOKIE AND REDIRECTS TO THE LOGIN PAGE
function isUserLoggedIn()
{
    var uid = getCookie('uid');

    if (uid == undefined || uid == null || uid.length == 0) return false;

    return true;
}

//================================================================================================
//================================================================================================
// FUNCTION TO A SAVE COOKIE
function setCookie(name, value, exdays) {

    var expires = "";
    if (exdays)
    {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
    }
    document.cookie = name + "=" + value + "; " + expires;
}

// FUNCTION TO GET COOKIE VALUE
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

//================================================================================================
//================================================================================================
// FUNCTIONS TO COPY SELECTED TEXT TO CLIPBOARD WITH CROSS-BROWSER SUPPORT
function CopyToClipboard (txtToCopy) {
    //var input = document.getElementById(copyElemId);
    var textToClipboard = txtToCopy; //input.value;

    var success = true;
    if (window.clipboardData) { // Internet Explorer
        window.clipboardData.setData ("Text", textToClipboard);
    }
    else {
        // create a temporary element for the execCommand method
        var forExecElement = CreateElementForExecCommand (textToClipboard);

        /* Select the contents of the element
                            (the execCommand for 'copy' method works on the selection) */
        SelectContent (forExecElement);

        var supported = true;

        // UniversalXPConnect privilege is required for clipboard access in Firefox
        try {
            if (window.netscape && netscape.security) {
                netscape.security.PrivilegeManager.enablePrivilege ("UniversalXPConnect");
            }

            // Copy the selected content to the clipboard
            // Works in Firefox and in Safari before version 5
            success = document.execCommand ("copy", false, null);
        }
        catch (e) {
            success = false;
        }

        // remove the temporary element
        document.body.removeChild (forExecElement);
    }

    if (success) {
        return ("Text copied! Paste away.");
    }
    else {
        return ("Your browser doesn't allow clipboard access!");
    }
}

function CreateElementForExecCommand (textToClipboard) {
    var forExecElement = document.createElement ("div");
    // place outside the visible area
    forExecElement.style.position = "absolute";
    forExecElement.style.left = "-10000px";
    forExecElement.style.top = "-10000px";
    // write the necessary text into the element and append to the document
    forExecElement.textContent = textToClipboard;
    document.body.appendChild (forExecElement);
    // the contentEditable mode is necessary for the  execCommand method in Firefox
    forExecElement.contentEditable = true;

    return forExecElement;
}

function SelectContent (element) {
    // first create a range
    var rangeToSelect = document.createRange ();
    rangeToSelect.selectNodeContents (element);

    // select the contents
    var selection = window.getSelection ();
    selection.removeAllRanges ();
    selection.addRange (rangeToSelect);
}

//================================================================================================
//================================================================================================
//TODO:
//CHOOSE OR AMMEND THESE 2 FUNCTIONS AND MAKE AN HREF OR WHEN CLICKING ON THE MAP OPENS THE RESPECTIVE MAPPING APPLICATION ON PHONE FOR NAVIGATION
//function OpenInMapsApp(){
//    var ua = navigator.userAgent.toLowerCase(),
//        plat = navigator.platform,
//        protocol = '',
//        a,
//        href;
//
//    $.browser.device = ua.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera/i) ? ua.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera/i)[0] : false;
//
//    if ($.browser.device) {
//        switch($.browser.device) {
//            case 'iphone':
//            case 'ipad':
//            case 'ipod':
//                function iOSversion() {
//                    if (/iP(hone|od|ad)/.test(navigator.platform)) {
//                        // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
//                        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
//                        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
//                    }
//                }
//
//                var ver = iOSversion() || [0];
//
//                if (ver[0] >= 6) {
//                    protocol = 'maps://';
//                }
//                else {
//                    protocol = 'http://maps.google.com/maps';
//                }
//                break;
//
//            case 'android':
//            default:
//                protocol = 'http://maps.google.com/maps';
//                break;
//        }
//
//        a.attr('href', protocol + href)
//    }
//}
//
//function OpenInMapsApp(lat, lng) {
//    // If it's an iPhone..
//    if ((navigator.platform.indexOf("iPhone") !== -1) || (navigator.platform.indexOf("iPod") !== -1)) {
//        function iOSversion() {
//            if (/iP(hone|od|ad)/.test(navigator.platform)) {
//                // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
//                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
//                return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
//            }
//        }
//
//        var ver = iOSversion() || [0];
//
//        if (ver[0] >= 6) {
//            protocol = 'maps://';
//        } else {
//            protocol = 'http://';
//        }
//
//        window.location = protocol + 'maps.apple.com/maps?daddr=' + lat + ',' + lng + '&amp;ll=';
//    }
//    else {
//        window.open('http://maps.google.com?daddr=' + lat + ',' + lng + '&amp;ll=');
//    }
//}
