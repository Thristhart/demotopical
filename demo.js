var Desktopical = require('../desktopical');

var Desktop = new Desktopical();
var window = Desktop.workspaces[Desktop.visibleWorkspace].createWindow();
document.body.appendChild(Desktop.element);
