var FaceApp = function(desktop) {
  this.drawEye = function(eyeX, eyeY, radius) {
    var eyeDy = this.faceWindow.y + eyeY - desktop.workspace().cursorY;
    var eyeDx = this.faceWindow.x + eyeX - desktop.workspace().cursorX;
    var eyeAngle = Math.atan2(eyeDy, eyeDx);

    var eyePupilX = eyeX - Math.cos(eyeAngle) * radius / 2;
    var eyePupilY = eyeY - Math.sin(eyeAngle) * radius / 2;

    this.context.beginPath();
    this.context.arc(eyeX, eyeY, radius, 0, Math.PI * 2);
    this.context.closePath();
    this.context.stroke();
    this.context.beginPath();
    this.context.arc(eyePupilX, eyePupilY, radius / 2, 0, Math.PI * 2);
    this.context.closePath();
    this.context.fill();
  };

  this.desktop = desktop;
  this.faceWindow = desktop.createWindow(this, {
    width: 200,
    height: 200,
    title: ":)",
    resizeOpts: {
      square: true
    }
  });
  this.canvas = document.createElement("canvas");
  this.context = this.canvas.getContext("2d");

  this.canvas.width = 200;
  this.canvas.height = 200;
  
  this.faceWindow.body.appendChild(this.canvas);

  /* called every frame to try for 60 fps via requestAnimationFrame */
  this.on("tick", function() {
    this.faceWindow.setTitle(":)");
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw the smile
    this.context.beginPath();
    if(this.faceWindow.resizing) {
      this.context.arc(this.canvas.width / 2, this.canvas.height / 2 + this.canvas.height / 3,
          this.canvas.width / 4,
          - Math.PI * 7/8, -Math.PI / 8);
    }
    else if(this.faceWindow.dragging) {
      this.context.arc(this.canvas.width / 2, this.canvas.height * 5/8,
          this.canvas.width / 8,
          0, Math.PI * 2);
    }
    else {
      this.context.arc(this.canvas.width / 2, this.canvas.height / 2,
          this.canvas.width / 4,
          Math.PI / 8, Math.PI * 7/8);
    }
    this.context.closePath();
    this.context.stroke();

    // draw the eyes
    var radius = this.canvas.height / 10;
    if(this.faceWindow.resizing) {
      this.faceWindow.setTitle(":(");
    }
    if(this.faceWindow.dragging) {
      this.faceWindow.setTitle(":O");
    }
    this.drawEye(this.canvas.width / 4, this.canvas.height / 4, radius);
    this.drawEye(this.canvas.width * 3/4, this.canvas.height / 4, radius);

  });
  /* interact.js resizemove event */
  this.faceWindow.resizeInteraction.on("resizemove", function(event) {
    this.canvas.width = this.faceWindow.body.clientWidth;
    this.canvas.height = this.faceWindow.body.clientWidth;
  }.bind(this));
};
FaceApp.shortname = "face";
FaceApp.fullname = "Expressive Face";
FaceApp.description = "A face that reacts to user actions";

module.exports = FaceApp;
