import { BoxCraft } from "./boxCraft.js";
import { ResizableBBox } from "./resizableBBox.js";
import { BBox } from "./bBox.js";

window.console.log('BoxCraft VERSION 0.1-alpha');

// register global namespace with a new BoxCraft instance
window.BoxCraft = new BoxCraft();

const canvasElement = document.getElementById('boxCanvas');

document.getElementById('createResizableBox').addEventListener('click', () => {
  let resizableBox = new ResizableBBox(canvasElement, (topleft, bottomright) => {
    console.log('Resizable Box coordinates:', topleft, bottomright);
  });
  resizableBox.init();
});

document.getElementById('createBoundingBox').addEventListener('click', () => {
  let bbox = new BBox(canvasElement, (topleft, bottomright) => {
    console.log('Bounding Box coordinates:', topleft, bottomright);
  });
  bbox.init();
});
