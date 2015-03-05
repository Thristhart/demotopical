var Desktopical = require('../desktopical');


var Desktop = new Desktopical();
Desktop.registerApplication(require('./apps/demoApp'));
Desktop.registerApplication(require('./apps/faceApp.js'));

document.body.appendChild(Desktop.element);

Desktop.run("demo");
Desktop.run("face");
