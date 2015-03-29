var Desktopical = require('desktopical');


var Desktop = new Desktopical({
  menuImage: "./hamburger.svg"
});
Desktop.registerApplication(require('./apps/demoApp'));
Desktop.registerApplication(require('./apps/faceApp.js'));

document.body.appendChild(Desktop.element);
