var a11ypi = {
    prefs : null,
    sym : "",
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
    // just reuse the function above.  you can change this, obviously!
	a11ypi.getURL();
    },

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
    getURL: function() {
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]     //The service branch which handles the "Window".
	.getService(Components.interfaces.nsIWindowMediator);
	var recentWindow = wm.getMostRecentWindow("navigator:browser");

	this.prefs = Components.classes["@mozilla.org/preferences-service;1"]      //Used to fetch the preference service
	.getService(Components.interfaces.nsIPrefService)                          
	.getBranch("extensions.a11ypi.");                                         //We want only our branch.
    	this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
	this.sym = this.prefs.getCharPref("stringpref");                                  //Gets the prefernece entered by the user.
	recentWindow ? recentWindow.content.document.location : null;
	alert(content.window.location);
	a11ypi.ajax(content.window.location, this.sym);
    },
    ajax: function(loc,pref) {
	// var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
	// .getInterface(Components.interfaces.nsIWebNavigation)
	// .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
	// .rootTreeItem
	// .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
	// .getInterface(Components.interfaces.nsIDOMWindow);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() 
	{
	    if(xhr.readyState == 4)
		{
		    //alert(xhr.responseText);
		    //gBrowser.selectedTab = gBrowser.addTab("");
		    //var doc = gBrowser.contentDocument;
		    //doc.write(xhr.responseText);
		    //doc.close();
		    var url = 'data:text/html,'+escape(xhr.responseText);
		    gBrowser.selectedTab = gBrowser.addTab(url);
		}
	}
	xhr.open("POST","http://localhost/test",true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var data = "url="+loc+'&'+"lang="+pref;
	alert(data);
	xhr.send(data);
    }
};
window.addEventListener("load", function () { a11ypi.onLoad(); }, false);
window.addEventListener("click", function() { a11ypi.onToolbarButtonCommand(event); }, false);