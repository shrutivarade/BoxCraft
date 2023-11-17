export class BoxCraft {
    constructor(element) {
      this.element = element;
      // Common properties for selection tools could be initialized here
    }
  
    init() {
      // Initialization logic common to both selectors could be here
      //   console.log("BoxCraft.init")
      this.element.width = window.innerWidth;
      this.element.height = window.innerHeight;
      this.element.style.border = "2px solid red";
      this.element.style.position = 'absolute';
      // this.element.style.top = '0';
      // this.element.style.left = '0';
      this.element.style.zIndex = '1000';  // High value to ensure it's on top

    }
  
    // Common methods for both selectors could be added here
  }