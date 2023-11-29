export class Widget {

  // Static canvas list shared by all instances
  // static canvasList = [];

  constructor(element, callback) {
    // The base image element
    this.element = element;
    this.callback = callback;
    
  }


  //we need this init to avoid the creation of extra canvas onload
  init(){
    // Common properties for selection tools could be initialized here
    // Create a new canvas element
    this.overlayCanvas = document.createElement('canvas');
    // Set the dimensions of the canvas to match the base image
    this.overlayCanvas.width = this.element.width;
    this.overlayCanvas.height = this.element.height;
    // Style the canvas to overlay the base image
    this.overlayCanvas.style.position = 'absolute';
    this.overlayCanvas.style.left = this.element.offsetLeft + 'px';
    this.overlayCanvas.style.top = this.element.offsetTop + 'px';
    this.overlayCanvas.style.zIndex = '1000';  // High value to ensure it's on top

    this.ctx = this.overlayCanvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);

    // Append the overlay canvas to the same parent element as the base image
    this.element.parentElement.appendChild(this.overlayCanvas);
    // Add this.overlayCanvas to canvasList
    // BoxCraft.canvasList.push(this.overlayCanvas);
  }

  hideLastCanvas() {
    if (BoxCraft.canvasList.length > 0) {
        let lastCanvas = BoxCraft.canvasList.pop();
        // lastCanvas.style.display = 'none'; // Hide the canvas
        lastCanvas.remove(); // to completely remove the element
    }
  }

  hide() {

  }

}
