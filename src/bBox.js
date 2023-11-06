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
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
    this.element.style.border = "1px solid yellow";
    this.element.style.position = 'absolute';
    this.element.style.top = '0';
    this.element.style.left = '0';
    this.element.style.zIndex = '1000';  // High value to ensure it's on top

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
