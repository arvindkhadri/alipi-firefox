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
	//a11ypi.getURL();
	alert(e.getAttribute("value"));
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
    getURL: function(e) {
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]     //The service branch which handles the "Window".
	.getService(Components.interfaces.nsIWindowMediator);
	var recentWindow = wm.getMostRecentWindow("navigator:browser");

	// this.prefs = Components.classes["@mozilla.org/preferences-service;1"]      //Used to fetch the preference service
	// .getService(Components.interfaces.nsIPrefService)                          
	// .getBranch("extensions.a11ypi.");                                         //We want only our branch.
    	// this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
	// this.sym = this.prefs.getCharPref("stringpref");
	//Gets the prefernece entered by the user.
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
    	//xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(String(url));
    },
    onMenuPopUp: function(e) {
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]     //The service branch which handles the "Window".
	.getService(Components.interfaces.nsIWindowMediator);
	var recentWindow = wm.getMostRecentWindow("navigator:browser");
	a11ypi.ajax(content.window.location);
	//xyz = document.getElementById("menu-button");
	// newel = document.createElement("menuitem");
	// newtext = document.createTextNode("Hello world");
	// newel.appendChild(newtext);
	// //newel.setAttribute("oncommand","a11ypi.ajax();");
	// newel.setAttribute("oncommand","a11ypi.onToolbarButtonCommand(event);");
	// xyz.appendChild(newel);
	//a11ypi.ajax();
	return "True";
    },
    createMenu: function(menu_list) {
	xyz = document.getElementById("menu-button");
	for(var i in menu_list)
	    {
		newel = document.createElement("menuitem");
		//newtext = document.createTextNode(menu_list[i]);
		//newel.appendChild(newtext);
		newel.setAttribute("label",menu_list[i]);
		newel.setAttribute("value",menu_list[i]);
		newel.setAttribute("oncommand","a11ypi.getURL(event.target);");
		xyz.appendChild(newel);
	    }
    },
    clearMenu: function() {
	xyz = document.getElementsByTagName("menuitem");
	for(var i=0;i<(xyz.childNodes.length + 1);i++)
	    {
		xyz.removeChild(xyz.childNodes[i]);
	    } 
    },
};
window.addEventListener("load", function () { a11ypi.onLoad(); }, false);
