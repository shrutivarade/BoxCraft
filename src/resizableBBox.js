import { BoxCraft } from "./boxCraft.js";

export class ResizableBBox extends BoxCraft {

  constructor(element, callback) {
      super(element);
      this.callback = callback;
      
      this.rect = {};
      this.handleRadius = 7;
      this.dragTL = this.dragBL = this.dragTR = this.dragBR = false;
      this.dragWholeRect = false;
      this.initRect();
      this.drawRectInCanvas();
      this.attachResizeListeners();
    }
  
    // init() {

    //   super.init();
    //   // this.canvas = this.element;
    //   // this.initCanvas();
    //   this.initRect();
    //   this.drawRectInCanvas();
    //   this.attachResizeListeners();
    // }
  
    // initCanvas() {
    //   // // Assuming `image` is globally available or passed to the constructor
    //   // this.canvas.height = image.height;
    //   // this.canvas.width = image.width;
    //   // this.canvas.style.top = image.offsetTop + "px";
    //   // this.canvas.style.left = image.offsetLeft + "px";

    //   // Assuming `element` is globally available or passed to the constructor
    //   // this.canvas.height = this.element.height;
    //   // this.canvas.width = this.element.width;
    //   // this.canvas.style.top = this.element.offsetTop + "px";
    //   // this.canvas.style.left = this.element.offsetLeft + "px";
    // }
  
    initRect() {
      this.rect.height = 200;
      this.rect.width = 200;
      this.rect.left = (window.innerWidth - this.rect.width) / 2;
      this.rect.top = (window.innerHeight - this.rect.height) / 2;
    }
  
    drawRectInCanvas() {
      var ctx = this.overlayCanvas.getContext("2d");
      ctx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.strokeStyle = "#000000";
      ctx.rect(this.rect.left, this.rect.top, this.rect.width, this.rect.height);
      ctx.fill();
      ctx.stroke();
      // this.drawHandles();
    }
  
    // drawHandles() {
    //   this.drawCircle(this.rect.left, this.rect.top, this.handleRadius);
    //   this.drawCircle(this.rect.left + this.rect.width, this.rect.top, this.handleRadius);
    //   this.drawCircle(this.rect.left + this.rect.width, this.rect.top + this.rect.height, this.handleRadius);
    //   this.drawCircle(this.rect.left, this.rect.top + this.rect.height, this.handleRadius);
    // }
  
    // drawCircle(x, y, radius) {
    //   var ctx = this.overlayCanvas.getContext("2d");
    //   ctx.fillStyle = "#000000";
    //   ctx.beginPath();
    //   ctx.arc(x, y, radius, 0, 2 * Math.PI);
      // ctx.fill();
    // }
  
    attachResizeListeners() {
      this.overlayCanvas.addEventListener('mousedown', this.mouseDown.bind(this), false);
      this.overlayCanvas.addEventListener('mouseup', this.mouseUp.bind(this), false);
      this.overlayCanvas.addEventListener('mousemove', this.mouseMove.bind(this), false);
    }
  
    mouseDown(e) {
      // ... implementation of mouseDown
      let pos = this.getMousePos(e);
      let mouseX = pos.x;
      let mouseY = pos.y;

      // 0. inside movable rectangle
      if (this.checkInRect(mouseX, mouseY, this.rect)){
          this.dragWholeRect=true;
          this.startX = mouseX;
          this.startY = mouseY;
      }
      // 1. top left
      else if (this.checkCloseEnough(mouseX, this.rect.left) && this.checkCloseEnough(mouseY, this.rect.top)) {
        this.dragTL = true;
      }
      // 2. top right
      else if (this.checkCloseEnough(mouseX, this.rect.left + this.rect.width) && this.checkCloseEnough(mouseY, this.rect.top)) {
        this.dragTR = true;
      }
      // 3. bottom left
      else if (this.checkCloseEnough(mouseX, this.rect.left) && this.checkCloseEnough(mouseY, this.rect.top + this.rect.height)) {
        this.dragBL = true;
      }
      // 4. bottom right
      else if (this.checkCloseEnough(mouseX, this.rect.left + this.rect.width) && this.checkCloseEnough(mouseY, this.rect.top + this.rect.height)) {
        this.dragBR = true;
      }
      // (5.) none of them
      else {
          // handle not resizing
      }
      this.drawRectInCanvas();

    }

    // Add the rest of the helper functions like getMousePos, checkInRect, checkCloseEnough here.
    getMousePos(evt) {
      let clx = evt.clientX;
      let cly = evt.clientY;
      let boundingRect = this.element.getBoundingClientRect();
      return {
        x: clx - boundingRect.left,
        y: cly - boundingRect.top
      };
    }
  
    checkInRect(x, y, r) {
      return (x > r.left && x < (r.width + r.left)) && (y > r.top && y < (r.top + r.height));
    }
  
    checkCloseEnough(p1, p2) {
      return Math.abs(p1 - p2) < this.handleRadius;
    }
  
    mouseMove(e) {
      let pos = this.getMousePos(e);
      let mouseX = pos.x;
      let mouseY = pos.y;

      // Update the cursor style based on mouse position
      this.updateCursorStyle(mouseX, mouseY);
    
      if (this.dragWholeRect) {
        e.preventDefault();
        e.stopPropagation();
        let dx = mouseX - this.startX;
        let dy = mouseY - this.startY;
        if ((this.rect.left + dx) > 0 && (this.rect.left + dx + this.rect.width) < this.overlayCanvas.width) {
          this.rect.left += dx;
        }
        if ((this.rect.top + dy) > 0 && (this.rect.top + dy + this.rect.height) < this.overlayCanvas.height) {
          this.rect.top += dy;
        }
        this.startX = mouseX;
        this.startY = mouseY;
      } else if (this.dragTL) {
        e.preventDefault();
        e.stopPropagation();
        let newSide = (Math.abs(this.rect.left + this.rect.width - mouseX) + Math.abs(this.rect.height + this.rect.top - mouseY)) / 2;
        if (newSide > 150) {
          this.rect.left = this.rect.left + this.rect.width - newSide;
          this.rect.top = this.rect.height + this.rect.top - newSide;
          this.rect.width = this.rect.height = newSide;
        }
      } else if (this.dragTR) {
        e.preventDefault();
        e.stopPropagation();
        let newSide = (Math.abs(mouseX - this.rect.left) + Math.abs(this.rect.height + this.rect.top - mouseY)) / 2;
        if (newSide > 150) {
          this.rect.top = this.rect.height + this.rect.top - newSide;
          this.rect.width = this.rect.height = newSide;
        }
      } else if (this.dragBL) {
        e.preventDefault();
        e.stopPropagation();
        let newSide = (Math.abs(this.rect.left + this.rect.width - mouseX) + Math.abs(this.rect.top - mouseY)) / 2;
        if (newSide > 150) {
          this.rect.left = this.rect.left + this.rect.width - newSide;
          this.rect.width = this.rect.height = newSide;
        }
      } else if (this.dragBR) {
        e.preventDefault();
        e.stopPropagation();
        let newSide = (Math.abs(mouseX - this.rect.left) + Math.abs(mouseY - this.rect.top)) / 2;
        if (newSide > 150) {
          this.rect.width = this.rect.height = newSide;
        }
      }
      this.drawRectInCanvas();
    }

    updateCursorStyle(mouseX, mouseY) {
      if (this.checkCloseEnough(mouseX, this.rect.left) && this.checkCloseEnough(mouseY, this.rect.top)) {
          this.overlayCanvas.style.cursor = 'nwse-resize'; // Top left corner
      } else if (this.checkCloseEnough(mouseX, this.rect.left + this.rect.width) && this.checkCloseEnough(mouseY, this.rect.top)) {
          this.overlayCanvas.style.cursor = 'nesw-resize'; // Top right corner
      } else if (this.checkCloseEnough(mouseX, this.rect.left) && this.checkCloseEnough(mouseY, this.rect.top + this.rect.height)) {
          this.overlayCanvas.style.cursor = 'nesw-resize'; // Bottom left corner
      } else if (this.checkCloseEnough(mouseX, this.rect.left + this.rect.width) && this.checkCloseEnough(mouseY, this.rect.top + this.rect.height)) {
          this.overlayCanvas.style.cursor = 'nwse-resize'; // Bottom right corner
      } else {
          this.overlayCanvas.style.cursor = 'default'; // Default cursor elsewhere
      }
  }
    
  
    mouseUp(e) {
      this.dragTL = this.dragTR = this.dragBL = this.dragBR = false;
      this.dragWholeRect = false;
      this.storeCoordinates();
    }
  
    storeCoordinates() {
      // ... implementation of storeCoordinates
      let topleft = { x: this.rect.left, y: this.rect.top };
      let bottomright = { x: this.rect.left + this.rect.width, y: this.rect.top + this.rect.height };

      // console.log("Top Left:", topleft, "Bottom Right:", bottomright);
      this.callback(topleft, bottomright); // Invoke the callback with the coordinates
  
    }
  }
  
  // Usage:
// Assuming `callback` is a function that handles the top-left and bottom-right coordinates
// And `element` is the canvas element to which the bounding box should be applied
//   let element = document.getElementById('canvas');
//   let resizableBox = new ResizableBBox(element);
//   resizableBox.init();
  