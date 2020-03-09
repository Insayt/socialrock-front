import { fabric } from 'fabric';

fabric.IText.prototype.updateTextareaPosition = function() {
  if (this.selectionStart === this.selectionEnd) {
    this.hiddenTextarea.style.left = '0px';
    this.hiddenTextarea.style.top = '0px';
  }
};

// Тут потом можно напедалить фильтров аля инстаграм или caman.js
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

fabric.Pattern.prototype.toObject = (function(toObject) {
  return function() {
    return fabric.util.object.extend(toObject.call(this), {
      crossOrigin: this.crossOrigin,
      patternTransform: this.patternTransform ? this.patternTransform.concat() : null
    });
  };
})(fabric.Pattern.prototype.toObject);

fabric.Pattern.prototype.initialize = function(options, callback) {
  options || (options = {});

  this.id = fabric.Object.__uid++;
  this.setOptions(options);
  if (!options.source || (options.source && typeof options.source !== 'string')) {
    callback && callback(this);
    return;
  }
  // function string
  if (typeof fabric.util.getFunctionBody(options.source) !== 'undefined') {
    this.source = new Function(fabric.util.getFunctionBody(options.source));
    callback && callback(this);
  } else {
    // img src string
    var _this = this;
    this.source = fabric.util.createImage();
    fabric.util.loadImage(options.source, function(img) {
      _this.source = img;
      callback && callback(_this);
    }, null, this.crossOrigin);
  }
}

export { fabric };