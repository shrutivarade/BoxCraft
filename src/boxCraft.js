// export class BoxCraft {
//     constructor(element) {
//       this.element = element;
//       // Common properties for selection tools could be initialized here
//     }
  
//     init() {
//       // Initialization logic common to both selectors could be here
//       //   console.log("BoxCraft.init")

//       // this.element.width = window.innerWidth;
//       // this.element.height = window.innerHeight;
//       // this.element.style.border = "2px solid red";
//       // this.element.style.position = 'absolute';

//       // this.element.style.top = '0';
//       // this.element.style.left = '0';

//       this.element.style.zIndex = '1000';  // High value to ensure it's on top

//     }
  
//     // Common methods for both selectors could be added here
//   }



export class BoxCraft {
  constructor(element) {
    this.element = element; // The base image element
    // Common properties for selection tools could be initialized here
    // Create a new canvas element
    this.overlayCanvas = document.createElement('canvas');
  }

  init() {

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
  }

  // Common methods for both selectors could be added here
}
