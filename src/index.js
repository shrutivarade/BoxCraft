import { BoxCraft } from "./boxCraft.js";
import { ResizableBBox } from "./resizableBBox.js";
import { DraggableBBox } from "./draggableBBox.js";


const canvasElement = document.getElementById('boxCanvas');
const ctx = canvasElement.getContext('2d');
canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;
const image = new Image();
image.src = 'src/images/minions.jpg';

image.onload = function() {
    ctx.drawImage(image, 0, 0, window.innerWidth, window.innerHeight);
};

// register global namespace with a new BoxCraft instance
window.BoxCraft = new BoxCraft(canvasElement);
window.console.log('BoxCraft VERSION 0.1-alpha');



function hideLastCanvas() {
  // Assuming boxCraftInstance is an instance of BoxCraft
  window.BoxCraft.hideLastCanvas();
}

// Setup a button or key event listener
document.getElementById('deletebtn').addEventListener('click', hideLastCanvas);

document.addEventListener('keypress', function(event) {
  console.log(`Key pressed: ${event.key}`);

  // Example: Hide the last canvas when 'h' key is pressed
  if (event.key === 'h') {
      window.BoxCraft.hideLastCanvas();
  }
});




document.getElementById('createResizableBox').addEventListener('click', () => {
  let resizableBox = new ResizableBBox(canvasElement, (topleft, bottomright) => {
    console.log('Resizable Box coordinates:', topleft, bottomright);
  });
  // resizableBox.init();
});

document.getElementById('createBoundingBox').addEventListener('click', () => {
  let draggableBBox = new DraggableBBox(canvasElement, (topleft, bottomright) => {
    console.log('Bounding Box coordinates:', topleft, bottomright);
  });
  // bbox.init();
});


