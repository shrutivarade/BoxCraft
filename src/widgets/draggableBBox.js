import { Widget } from "../widget.js";

export class DraggableBBox extends Widget {
  
  constructor(element, callback) {
    super(element);
    this.callback = callback;
    
    this.isDrawing = false;
    this.startX = 0;
    this.startY = 0;
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    
    super.init();

    this.overlayCanvas.style.cursor = 'crosshair'; // Set the cursor to crosshair
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.overlayCanvas.addEventListener('mousedown', this.mouseDown.bind(this));
    this.overlayCanvas.addEventListener('mousemove', this.mouseMove.bind(this));
    this.overlayCanvas.addEventListener('mouseup', this.mouseUp.bind(this));
    this.overlayCanvas.addEventListener('mouseout', this.mouseOut.bind(this));
  }

  mouseDown(e) {

    var rect = e.currentTarget.getBoundingClientRect()

    this.isDrawing = true;

    this.x1 = e.clientX * window.devicePixelRatio - rect.left * window.devicePixelRatio;
    this.y1 = e.clientY * window.devicePixelRatio - rect.top * window.devicePixelRatio;

    this.startX = e.offsetX;
    this.startY = e.offsetY;

    console.log("Mouse down at:", this.x1, this.y1);
  }

  mouseMove(e) {
    if (!this.isDrawing) return;
    this.ctx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height); // Clear canvas
    let width = e.offsetX - this.startX;
    let height = e.offsetY - this.startY;
    console.log("Mouse Move at:", this.x1, this.y1);
    this.ctx.strokeRect(this.startX , this.startY, width, height);

  }

  mouseUp(e) {
    this.isDrawing = false;

    var rect = e.currentTarget.getBoundingClientRect()

    this.x2 = e.clientX * window.devicePixelRatio - rect.left * window.devicePixelRatio;
    this.y2 = e.clientY * window.devicePixelRatio - rect.top * window.devicePixelRatio;

    console.log("Mouse up at: ", this.x2, this.y2);
    this.storeCoordinates();
  }

  mouseOut() {
    if (this.isDrawing) {
      // Store coordinates also when the mouse accidentally leaves the canvas

      var rect = e.currentTarget.getBoundingClientRect()

      this.x2 = e.clientX * window.devicePixelRatio - rect.left * window.devicePixelRatio;
      this.y2 = e.clientY * window.devicePixelRatio - rect.top * window.devicePixelRatio;
      
      console.log("Mouse out at: ", this.x2, this.y2);

      this.storeCoordinates();
    }
    this.isDrawing = false;
  }

  storeCoordinates() {
    let topleft = { x: this.x1, y: this.y1 };
    let bottomright = { x: this.x2, y: this.y2 };
    this.callback(topleft, bottomright); // Invoke the callback with the coordinates
  }
}

// Usage:
// Assuming `callback` is a function that handles the top-left and bottom-right coordinates
// And `element` is the canvas element to which the bounding box should be applied
// let element = document.getElementById('canvas');
// let bbox = new BBox(element, callback);
// bbox.init();
