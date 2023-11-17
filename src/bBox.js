import { BoxCraft } from "./boxCraft.js";

export class BBox extends BoxCraft {
  
  constructor(element, callback) {
    super(element);
    this.callback = callback;
    
    this.ctx = this.element.getContext('2d');
    this.isDrawing = false;
    this.startX = 0;
    this.startY = 0;
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
  }

  init() {
    super.init();
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.element.addEventListener('mousedown', this.mouseDown.bind(this));
    this.element.addEventListener('mousemove', this.mouseMove.bind(this));
    this.element.addEventListener('mouseup', this.mouseUp.bind(this));
    this.element.addEventListener('mouseout', this.mouseOut.bind(this));
  }

  mouseDown(e) {
    this.startX = e.offsetX;
    this.startY = e.offsetY;
    this.isDrawing = true;
    this.x1 = e.clientX;
    this.y1 = e.clientY;
    console.log("Mouse down at: ", this.startX, this.startY);
  }

  mouseMove(e) {
    if (!this.isDrawing) return;
    this.ctx.clearRect(0, 0, this.element.width, this.element.height); // Clear canvas
    let width = e.offsetX - this.startX;
    let height = e.offsetY - this.startY;
    this.ctx.strokeRect(this.startX, this.startY, width, height);
  }

  mouseUp(e) {
    this.isDrawing = false;
    this.x2 = e.clientX;
    this.y2 = e.clientY;
    console.log("Mouse up at: ", this.x2, this.y2);
    this.storeCoordinates();
  }

  mouseOut() {
    if (this.isDrawing) {
      // Store coordinates also when the mouse accidentally leaves the canvas
      this.storeCoordinates();
    }
    this.isDrawing = false;
  }

  storeCoordinates() {
    let topleft = { x: this.x1, y: this.y1 };
    let bottomright = { x: this.x2, y: this.y2 };
    // console.log("Top Left:", topleft, "Bottom Right:", bottomright);
    this.callback(topleft, bottomright); // Invoke the callback with the coordinates
  }
}

// Usage:
// Assuming `callback` is a function that handles the top-left and bottom-right coordinates
// And `element` is the canvas element to which the bounding box should be applied
// let element = document.getElementById('canvas');
// let bbox = new BBox(element, callback);
// bbox.init();
