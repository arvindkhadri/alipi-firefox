var a11ypi = {
    onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("a11ypi-strings");
  },

  onMenuItemCommand: function(e) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                  .getService(Components.interfaces.nsIPromptService);
    promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                this.strings.getString("helloMessage"));
  },

  onToolbarButtonCommand: function(e) {
	alert(e.getAttribute("value"));
    },
    //The following is a important code snippet, DO NOT DELETE.
    // onClick: function() {
    // 	this.prefs = Components.classes["@mozilla.org/preferences-service;1"]
    // 				.getService(Components.interfaces.nsIPrefService)
    // 				.getBranch("extensions.a11ypi.");
    // 	this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
    // 	try{
    // 	    this.sym = this.prefs.getCharPref("stringpref");
    // 	    //alert(this.sym);
    // 	    alert(gBrowser.contentDocument);
    // 	}
    // 	catch(e)
    // 	    {
    // 		alert(e.name);
    // 	    }
    // }
    getURL: function(e) {
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]     //The service branch which handles the "Window".
	.getService(Components.interfaces.nsIWindowMediator);
	var recentWindow = wm.getMostRecentWindow("navigator:browser");
	recentWindow ? recentWindow.content.document.location : null;
	var url = content.window.location;
	content.window.location = "http://localhost/test?url="+url+"&lang="+e.getAttribute("value");
	content.window.reload()
    },
     ajax: function(url) {
    	var xhr = new XMLHttpRequest();
    	xhr.onreadystatechange = function() 
    	{  
    	    if(xhr.readyState == 4)
    		{
		    if(xhr.responseText == "None")
			{
			    a11ypi.clearMenu();
			}
		    else
			{
			    a11ypi.createMenu(JSON.parse(xhr.responseText));
			}
		}
    	}
    	xhr.open("POST","http://localhost/menu",true);
    	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(String(url));
    },
    onMenuPopUp: function(e) {
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]     //The service branch which handles the "Window".
	.getService(Components.interfaces.nsIWindowMediator);
	var recentWindow = wm.getMostRecentWindow("navigator:browser");
	a11ypi.ajax(content.window.location);
	return "True";
    },
    createMenu: function(menu_list) {
	xyz = document.getElementById("menu-button");
	for(var i in menu_list)
	    {
		newel = document.createElement("menuitem");
		newel.setAttribute("label",menu_list[i]);
		newel.setAttribute("value",menu_list[i]);
		newel.setAttribute("oncommand","a11ypi.getURL(event.target);");
		xyz.appendChild(newel);
	    }
    },
    clearMenu: function() {
	xyz = document.getElementById("menu-button");
	for(var i=0;i<(xyz.childNodes.length);i++)
	    {
		xyz.removeChild(xyz.childNodes[i]);
	    }
	xyz.removeChild(xyz.childNodes[0]);                   //A dirty hack for making the drop down work.
    },
};
window.addEventListener("load", function () { a11ypi.onLoad(); }, false);
