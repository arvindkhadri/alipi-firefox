$(document).ready(function(){
	var highlight = function(event) {
         	event.preventDefault();
		var currentId = $(this).attr("id");
		currentId = "." + currentId;
		//$(currentId).css("color", "red" );
		$(currentId).each (function () {
			//$(this).css("background-color", "lightgrey" );
			//alert ($(this).attr("id")+" "+$(this).text());
			$(this).css("background-color", "" );
			$(this).css("color", "black");
		});

	};

	var highlight_hover = function() {
		var currentId = $(this).attr("id");
		currentId = "." + currentId;
		$(currentId).css("background-color", "lightyellow" );
		$(currentId).css("font-size", "" );
	};
	var remove_hover = function() {
		var currentId = $(this).attr("id");
		currentId = "." + currentId;
		$(currentId).css("background-color", "" );
		$(currentId).css("font-size", "" );
	};

	
	$("*").dblclick(function(event) {
	    	event.preventDefault();
		var currentId = $(this).attr("id");
		currentId = "." + currentId;
		//$(currentId).css("color", "red" );
		$(currentId).each (function () {
			//$(this).css("background-color", "lightgrey" );
			//alert($(this).attr("id")+" "+$(this).text());
			$(this).css("background-color", "" );
			$(this).css("color", "black");
			
		});
	});

	$("*").hover(highlight_hover, remove_hover);
		
	/*$("img").click(highlight).hover(highlight_hover, remove_hover);*/
	
	/*$("*").click(highlight).hover(highlight_hover, remove_hover);*/
	
}); 


function read_text()
{
var el_id;

var el=document.body.getElementsByTagName("*");
  {
   for(c=0;c<el.length;c++)
    {
     el[c].onclick=function()
	{
        el_id =this.id;
      alert(el_id);
	}
     }
   }
} 




/*
function getValue1()
  {
  var x=document.getElementById("para1");
  alert(x.innerHTML);
}

function getValue2()
  {
  var x=document.getElementById("para2");
  alert(x.innerHTML);
}

function getValue3()
  {
  var x=document.getElementById("para3");
  alert(x.innerHTML);
}
*/

function selectText(div3)
{
if (document.selection)
{
var div = document.body.createTextRange();

div.moveToElementText(document.getElementById("div3"));
div.select();
}
else
{
var div = document.createRange();

div.setStartBefore(document.getElementById("div3"));
div.setEndAfter(document.getElementById("div3")) ;

window.getSelection().addRange(div);
}
}


function selectText1(div1)
{
if (document.selection)
{
var div = document.body.createTextRange();

div.moveToElementText(document.getElementById("div1"));
div.select();
}
else
{
var div = document.createRange();

div.setStartBefore(document.getElementById("div1"));
div.setEndAfter(document.getElementById("div1")) ;

window.getSelection().addRange(div);
}
}


function selectText2(div2)
{
if (document.selection)
{
var div = document.body.createTextRange();

div.moveToElementText(document.getElementById("div2"));
div.select();
}
else
{
var div = document.createRange();

div.setStartBefore(document.getElementById("div2"));
div.setEndAfter(document.getElementById("div2")) ;

window.getSelection().addRange(div);
}
}


function selectText4(div4)
{
if (document.selection)
{
var div = document.body.createTextRange();

div.moveToElementText(document.getElementById("div4"));
div.select();
}
else
{
var div = document.createRange();

div.setStartBefore(document.getElementById("div4"));
div.setEndAfter(document.getElementById("div4")) ;

window.getSelection().addRange(div);
}
}
