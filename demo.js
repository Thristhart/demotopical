var Desktopical = require('../desktopical');


var Desktop = new Desktopical();
Desktop.registerApplication(require('./apps/demoApp'));
Desktop.registerApplication(require('./apps/faceApp.js'));
Desktop.run("demoapp");
Desktop.run("faceapp");
document.body.appendChild(Desktop.element);
