import { fabric } from 'fabric';

fabric.IText.prototype.updateTextareaPosition = function() {
  if (this.selectionStart === this.selectionEnd) {
    this.hiddenTextarea.style.left = '0px';
    this.hiddenTextarea.style.top = '0px';
  }
};

// Тут подом можно напедалить фильтров аля инстаграм или caman.js
// fabric.Image.filters.Greenify = fabric.util.createClass({
//
//   type: 'greenify',
//
//   applyTo: function(canvasEl) {
//     console.log(canvasEl);
//     var context = canvasEl.getContext('2d'),
//       imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height),
//       data = imageData.data;
//
//     for (var i = 0, len = data.length; i < len; i += 4) {
//       //kill red
//       data[i] = 0;
//       //kill blue
//       data[i + 2] = 0;
//     }
//
//     context.putImageData(imageData, 0, 0);
//   },
//
//   isNeutralState: function() {
//     return false;
//   },
// });

export { fabric };