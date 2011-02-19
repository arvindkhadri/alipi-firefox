a11ypi.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ a11ypi.showFirefoxContextMenu(e); }, false);
};

a11ypi.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-a11ypi").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { a11ypi.onFirefoxLoad(); }, false);
