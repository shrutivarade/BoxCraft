import { Widget } from "./widget.js";
import { ResizableBBox } from "./widgets/resizableBBox.js";
import { DraggableBBox } from "./widgets/draggableBBox.js";

export class BoxCraft {

  constructor() {
  }

  createResizableBBox(element, callback) {
    console.log("Resizable BBox")
    return new ResizableBBox(element, callback);

  }

  createDraggableBBox(element, callback) {
    console.log("Draggable BBox")
    return new DraggableBBox(element, callback);

  }

}
