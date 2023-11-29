import { Widget } from "./widget.js";
import { ResizableBBox } from "./widgets/resizableBBox.js";

export class BoxCraft {

  constructor() {


  }

  createResizableBBox(element, callback) {

    return new ResizableBBox(element, callback);

  }

}
