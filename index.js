var Desktopical = require('../desktopical');

var Desktop = new Desktopical();
var window = Desktop.workspaces[0].createWindow();
document.body.appendChild(Desktop.workspaces[0].element);
