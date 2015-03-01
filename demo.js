var Desktopical = require('../desktopical');


var Desktop = new Desktopical();
Desktop.registerApplication(require('./apps/demoApp'));
Desktop.registerApplication(require('./apps/faceApp.js'));
Desktop.run("demo");
Desktop.run("face");
document.body.appendChild(Desktop.element);
