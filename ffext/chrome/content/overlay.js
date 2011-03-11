var a11ypi = {
    onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("a11ypi-strings");
  },

  onMenuItemCommand: function(e) {
      var ren = document.getElementById("a11ypi-txt");
      ren.value = content.document.getElementById(e.target.value).textContent;
      var foruri = document.getElementById("a11ypi-foruri");
      foruri.value = content.window.location + ':' + e.target.value;
    //   var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
    //                               .getService(Components.interfaces.nsIPromptService);
    // promptService.alert(window, this.strings.getString("helloMessageTitle"),
    //                             this.strings.getString("helloMessage"));
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
    onSidebarinput: function(e){
	alert(e.value);
	var sel = content.window.getSelection().getRangeAt(0).cloneContents();
	// var ht = content.document.createRange();
	// ht.selectNode(getElementsByTagName("body"));
	// var sel = ht.cloneContents();
	var x = content.document.createElement("test");
	x.appendChild(sel);
	alert(x.innerHTML);
	y = x.getElementsByTagName("*");
	for (var i=0;i<y.length;i++)
	{
	    if(y[i].getAttribute("id")!=null)
	    {
		alert(y[i].getAttribute("id"));
	    }
	}
    },
    getURL: function(e) {
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]     //The service branch which handles the "Window".
	.getService(Components.interfaces.nsIWindowMediator);
	var recentWindow = wm.getMostRecentWindow("navigator:browser");
	recentWindow ? recentWindow.content.document.location : null;
	var url = content.window.location;
	content.window.location = "http://muse-amuse.in/test?url="+url+"&lang="+e.getAttribute("value");
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
    	xhr.open("POST","http://muse-amuse.in/menu",true);
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
	var xyz = document.getElementById("menu-button");
	for(var i in menu_list)
	    {
		var newel = document.createElement("menuitem");
		newel.setAttribute("label",menu_list[i]);
		newel.setAttribute("value",menu_list[i]);
		newel.setAttribute("oncommand","a11ypi.getURL(event.target);");
		xyz.appendChild(newel);
	    }
    },
    clearMenu: function() {
	var xyz = document.getElementById("menu-button");
	while(null!= xyz.firstChild)
	{
	    xyz.removeChild(xyz.firstChild);
	}
    },
    replacement: function()
    {
	var xyz = document.getElementById("replacement_id");
	var xy = document.getElementById("replacement_pop");
	xy.addEventListener("command", a11ypi.onMenuItemCommand ,false);  
	var divs = content.document.getElementsByTagName("*");
	for(var i=0;i<divs.length;i++)
	{
	    if(divs[i].getAttribute("id")!=null)
	    {
		xyz.appendItem(divs[i].getAttribute("id"),divs[i].getAttribute("id"));
	     }
	}
    },
 clearReplacement: function() {
     var xy = document.getElementById("replacement_pop");
     xy.removeEventListener("command", a11ypi.onMenuItemCommand,false);
     while(null!= xy.firstChild)
     {
	 xy.removeChild(xy.firstChild);
     }
     var xyz = document.getElementById("replacement_id");
     xyz.setAttribute("label","Select one id"); 
},
};
window.addEventListener("load", function () { a11ypi.onLoad(); }, false);