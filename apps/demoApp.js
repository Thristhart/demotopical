var DemoApp = function(desktop) {
  this.demoWindow = desktop.createWindow(this, {
    x: 50,
    y: 50,
    title: "Demo App!"
  });
  this.demoWindow.body.innerHTML = "<span class='posDisplay'>0, 0</span>";
  this.on("tick", function() {
    var posElement = this.demoWindow.body.querySelector(".posDisplay");
    posElement.textContent = Math.round(this.demoWindow.x) + ", " + Math.round(this.demoWindow.y);
  });
};
DemoApp.shortname = "demo";
DemoApp.fullname = "Demo Application";
DemoApp.description = "Provides a demonstration of basic application functions";

module.exports = DemoApp;
