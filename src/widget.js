export class Widget {

  constructor(element, callback) {

    this.element = element;
    this.callback = callback;
    // Bind the 'resizeCanvas' method to the current context
    this.resizeCanvas = this.resizeCanvas.bind(this);
    
  }


  init(){
   
    // Create a new canvas element
    this.overlayCanvas = document.createElement('canvas');
    // Set the dimensions of the canvas to match the base image
    this.overlayCanvas.width = this.element.clientWidth;
    this.overlayCanvas.height = this.element.clientHeight;


    // Style the canvas to overlay the base image
    this.overlayCanvas.style.position = 'absolute';
    this.overlayCanvas.style.left = this.element.offsetLeft + 'px';
    this.overlayCanvas.style.top = this.element.offsetTop + 'px';
    this.overlayCanvas.style.zIndex = '1000';  // High value to ensure it's on top

    this.ctx = this.overlayCanvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);

    // Append the overlay canvas to the same parent element as the base image
    this.element.parentElement.appendChild(this.overlayCanvas);


    // Add the resize event listener
    window.addEventListener('resize', this.resizeCanvas);

    // Call resizeCanvas initially to set the correct size from the start
    this.resizeCanvas();

  }

  resizeCanvas() {

    
    // Update the canvas dimensions to match the parent element's size
    this.overlayCanvas.width = this.element.clientWidth;
    this.overlayCanvas.height = this.element.clientHeight;

    // Update the style to reflect the new position if necessary
    this.overlayCanvas.style.left = this.element.offsetLeft + 'px';
    this.overlayCanvas.style.top = this.element.offsetTop + 'px';

    // Clear the canvas and call the callback if any drawing is required
    this.ctx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
    if (this.callback) {
      this.callback();
    }
  }

  hide() {
    // Implement the hide functionality if needed
    this.overlayCanvas.style.display = 'none';
  }

  show() {
    // Implement the show functionality if needed
    this.overlayCanvas.style.display = 'block';
  }

  // Make sure to remove the event listener when the widget is no longer needed
  destroy() {
    window.removeEventListener('resize', this.resizeCanvas);
    // Perform any additional cleanup like removing the canvas if necessary
  }

}
