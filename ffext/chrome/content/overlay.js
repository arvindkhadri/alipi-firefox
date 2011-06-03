var a11ypi = {
    auth : " ",
    loc:" ",
    onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("a11ypi-strings");
	
  },

  onMenuItemCommand: function(e) {
      var ren = document.getElementById("a11ypi-txt");
      ren.value = content.document.getElementById(e.target.value).textContent;
      var foruri = document.getElementById("a11ypi-foruri");
      if(document.getElementById("a11ypi-lang-rec").value == '')
      {
	  alert('Please fill in the language you want to type in first');
      }
      else
      {
	  loc = content.window.location;
	  foruri.value = content.window.location + ':' + e.target.value;
	  document.getElementById("a11ypi-re-txt").value += "<p foruri=" +'"'+ document.getElementById("a11ypi-foruri").value +'"'+" rec="+'"'+document.getElementById("a11ypi-lang-rec").value+'" id="txt_'+document.getElementById('replacement_id').value + (Math.floor( Math.random()*1000)*Math.floor( Math.random()*10000)) +'"></p>';
      }
    //   var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
    //                               .getService(Components.interfaces.nsIPromptService);
    // promptService.alert(window, this.strings.getString("helloMessageTitle"),
    //                             this.strings.getString("helloMessage"));
  },

    onToolbarButtonCommand: function(e) {
      var ren = document.getElementById("a11ypi-img");
      ren.src = content.document.getElementById(e.target.value).src;
      
      // else
      // {
      // 	  var foruri = document.getElementById("a11ypi-img-foruri");
      // 	  foruri.value = '<img src=' + '"' + document.getElementById("a11ypi-img-replace").value + '" foruri="' +content.window.location + ':' + e.target.value +'" rec="'+ document.getElementById("a11ypi-lang-rec").value + '" id="img_' + e.target.value+ (Math.floor( Math.random()*1000)*Math.floor( Math.random()*10000))  + '"/>';
      // }
	
    },
    onImgUrichange:function()
    {
	if (document.getElementById("a11ypi-img-replace").value == '' || document.getElementById("a11ypi-lang-rec").value == '' || document.getElementById('img_id').value == '')
       {
       	  alert('Please fill in the source of image and/or the language of the recommendation and/or choose a image');
       }
	else
	{
	    var foruri = document.getElementById("a11ypi-img-foruri");
	    foruri.value = '<img src=' + '"' + document.getElementById("a11ypi-img-replace").value + '" foruri="' +loc + ':' + document.getElementById('img_id').value +'" rec="'+ document.getElementById("a11ypi-lang-rec").value + '" id="img_' + document.getElementById('img_id').value+ (Math.floor( Math.random()*1000)*Math.floor( Math.random()*10000))  + '"/></img>';
	}
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
	content.window.location = "http://devel.virtual-labs.ac.in/alipi/replace?url="+url+"&lang="+e.getAttribute("value");
	content.window.reload();
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
	 xhr.open("POST","http://devel.virtual-labs.ac.in/alipi/menu",true);
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
	    if(divs[i].getAttribute("id")!=null && divs[i].tagName != 'IMG')
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
     if(document.getElementById('replacement_id').value == '')
	 xyz.setAttribute("label","Select one text block");
     else
	 xyz.setAttribute("label",document.getElementById("replacement_id").value); 
 },
    postRenarration: function() {
	    var xhr = new XMLHttpRequest();
    	    xhr.onreadystatechange = function() 
    	    {  
    		if(xhr.readyState == 4)
    		{
		    alert(xhr.responseText);
		    document.getElementById('re-narrate-button').disabled = false; 
		    // obj = {};
		    // temp.split("\n").map(function(x) { var y = x.split("="); obj[y[0]] = y[1]; });
		    // var e = JSON.stringify(obj);
		    // var t = JSON.parse(e);
		    // auth = t.Auth;
		    // a11ypi.doTheRe();
		}
    	    }
	document.getElementById('re-narrate-button').disabled = true; 
	orgurl= '<a href="' + loc + '">page</a>';
	renlink= '<a href="http://devel.virtual-labs.ac.in/alipi/replace?url='+loc;
	postannotate= '<blockquote>This post is a re-narration of '+ orgurl +' for ' +document.getElementById('a11ypi-lang-rec').value+'.<br>The renarrated page can be seen ' +  renlink;

	xhr.open("POST","http://devel.virtual-labs.ac.in/alipi/login",true);
    	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var data = 'Email=' + document.getElementById("Username").value +'&Passwd=' + document.getElementById("Password").value +'&title=' +document.getElementById("a11ypi-re-title").value + '&content=' + document.getElementById("a11ypi-re-txt").value + postannotate + '&href=' + document.getElementById("a11ypi-blog-link").value +'&lang='+document.getElementById('a11ypi-lang-rec').value+'">here</a></blockquote>';
	xhr.send(String(data));
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
    imgMenu: function()
    {
	var xyz = document.getElementById("img_id");
	var xy = document.getElementById("img_ids");
	xy.addEventListener("command", a11ypi.onToolbarButtonCommand ,false);  
	var divs = content.document.getElementsByTagName("*");
	for(var i=0;i<divs.length;i++)
	{
	    if(divs[i].getAttribute("id")!=null && divs[i].tagName == 'IMG')
	    {
		xyz.appendItem(divs[i].getAttribute("id"),divs[i].getAttribute("id"));
	     }
	}
    },
 clearImgMenu: function() {
     var xy = document.getElementById("img_ids");
     xy.removeEventListener("command", a11ypi.onToolbarButtonCommand,false);
     while(null!= xy.firstChild)
     {
	 xy.removeChild(xy.firstChild);
     }
     var xyz = document.getElementById("img_id");
     if(document.getElementById('img_id').value == '')
	 xyz.setAttribute("label", "Select one image");
     else
	 xyz.setAttribute("label",document.getElementById('img_id').value); 
 },
    filePick:function()
    {
    	// var window = Components.classes["@mozilla.org/appshell/window-mediator;1"]
        //              .getService(Components.interfaces.nsIWindowMediator);
	var nsIFilePicker = Components.interfaces.nsIFilePicker;
	var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
    	fp.init(window, "Select a File", nsIFilePicker.modeOpen);
    	fp.appendFilter("Audio Files","*.ogg");
	fp.appendFilter("Images","*.png; *.jpeg; *.jpg");
	var rv = fp.show();
	if(rv == nsIFilePicker.returnOK)
	{
	    document.getElementById('a11ypi-file').value = fp.file.path;
	    a11ypi.upload(fp);
	}
    },
    upload: function(fp)
    {
	var stream = Components.classes["@mozilla.org/network/file-input-stream;1"]
                       .createInstance(Components.interfaces.nsIFileInputStream);
	stream.init(fp.file, 0x04 | 0x08, 0644, 0x04); // file is an nsIFile instance   

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
		
		alert('Please copy paste this URL into the respective place: http://devel.virtual-labs.ac.in/alipi/wsgi/'+xhr.responseText);
            }
	};
	//var contentType = "multipart/form-data";
	var mimeService = Components.classes["@mozilla.org/mime;1"]
          .getService(Components.interfaces.nsIMIMEService);
	mimeType = mimeService.getTypeFromFile(fp.file);
	xhr.open("POST", "http://devel.virtual-labs.ac.in/alipi/upload", true);
	xhr.setRequestHeader("Content-Type",mimeType);
	xhr.send(stream);
},
    updateaud:function()
    {
	document.getElementById('a11ypi-audio-foruri').value = '<audio controls="controls" src=' +'"' + document.getElementById('a11ypi-audio-url').value +'" foruri=' +'"'+ loc + ':' + document.getElementById('replacement_id').value +'" id="aud_' +document.getElementById('replacement_id').value + (Math.floor( Math.random()*1000)*Math.floor( Math.random()*10000)) +'" rec="' + document.getElementById('a11ypi-lang-rec').value + '"></audio>';
    },
    // testalert:function()
    // {
    // 	if(document.getElementById('server-2').selected)
    // 	    alert("Yes");
    // },

};
window.addEventListener("load", function () { a11ypi.onLoad(); }, false);