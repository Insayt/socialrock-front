import { fabric } from 'fabric';

fabric.IText.prototype.updateTextareaPosition = function() {
  if (this.selectionStart === this.selectionEnd) {
    this.hiddenTextarea.style.left = '0px';
    this.hiddenTextarea.style.top = '0px';
  }
};
export { fabric };