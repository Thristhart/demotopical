var Desktopical = require('../desktopical');


var Desktop = new Desktopical();
Desktop.registerApplication(require('./apps/demoApp'));
Desktop.run("demoapp");
document.body.appendChild(Desktop.element);
