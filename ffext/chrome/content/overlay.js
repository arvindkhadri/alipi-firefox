var a11ypi = {
    auth : " ",
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
	content.window.location = "http://janastu.dyndns.org:82/replace?url="+url+"&lang="+e.getAttribute("value");
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
    	xhr.open("POST","http://janastu.dyndns.org:82/menu",true);
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
    postRenarration: function() {
	    var xhr = new XMLHttpRequest();
    	    xhr.onreadystatechange = function() 
    	    {  
    		if(xhr.readyState == 4)
    		{
		    alert(xhr.responseText);
		    // obj = {};
		    // temp.split("\n").map(function(x) { var y = x.split("="); obj[y[0]] = y[1]; });
		    // var e = JSON.stringify(obj);
		    // var t = JSON.parse(e);
		    // auth = t.Auth;
		    // a11ypi.doTheRe();
		}
    	    }
    	    xhr.open("POST","http://janastu.dyndns.org:82/login",true);
    	    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	    var str1 = "<p foruri=" +'"'+document.getElementById("a11ypi-foruri").value +'"'+" rec="+'"'+document.getElementById("a11ypi-lang-rec").value+'"'+" id="+'"'+document.getElementById("replacement_id").value+'"'+">";
	    var str2 = document.getElementById("a11ypi-re-txt").value + "</p>";
	    str1 = str1.concat(str2);
	    var data = 'Email=' + document.getElementById("Username").value +'&Passwd=' + document.getElementById("Password").value +'&title=' +document.getElementById("a11ypi-re-title").value + '&content=' + str1 + '&href=' + document.getElementById("a11ypi-blog-link").value;
	    xhr.send(String(data));
	// else
	// {
	//     var xhr = new XMLHttpRequest();
    	//     xhr.onreadystatechange = function() 
    	//     {  
    	// 	if(xhr.readyState == 4)
    	// 	{
	// 	    alert(xhr.responseText);
	// 	}
	//     }
	//     xhr.open("POST","http://192.168.100.148/test", true);
	//     xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	//      var str1 = "<p fouri=" +'"'+document.getElementById("a11ypi-foruri").value +'"'+" rec="+'"'+document.getElementById("a11ypi-lang-rec").value+'"'+" id="+'"'+document.getElementById("replacement_id").value+'"'+">";
	//     var str2 = document.getElementById("a11ypi-re-txt").value + "</p>";
	//     str1 = str1.concat(str2);
	//     var data = 'title=' +document.getElementById("a11ypi-re-title").value + '&content=' + str1 ;
	//     xhr.send(data);
	// }
    },
    doTheRe: function(){
	alert(auth);
	
    },
    test: function(e){
	if(e.target.value == 'Janastu')
	{
	    document.getElementById('a11ypi-blog-link').readOnly = true;
	    document.getElementById('Username').readOnly= true;
	    document.getElementById('Password').readOnly = true;
	}
	else 
	{
	 document.getElementById('a11ypi-blog-link').readOnly = false;
	    document.getElementById('Username').readOnly= false;
	    document.getElementById('Password').readOnly = false;
	}
    },
};
window.addEventListener("load", function () { a11ypi.onLoad(); }, false);