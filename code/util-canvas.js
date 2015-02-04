/* util-canvas.js
 *    low level canvas management. including auto resize,
 *    image loading and display
 *
 * Copyright 2015. verev.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ve = ve || {};
ve.util_canvas = (function() {
  var canvas = document.getElementById("screen");
  var context = canvas.getContext("2d");
  

  var _fit_canvas = function() {
    var w_pad = 10;
    var h_pad = 10;
    var aspect = 4/3;
    var controls = document.getElementById("control");
    return function() {
      var usable_w = window.innerWidth - controls.offsetWidth - w_pad;
      var usable_h = window.innerHeight - controls.offsetHeight - h_pad;

      if(usable_w < usable_h * aspect) {
        canvas.width = usable_w;
        canvas.height = usable_w / aspect;
      }
      else {
        canvas.width = usable_h * aspect;
        canvas.height = usable_h;
      }
    }
  }

  var relativeDraw = function(img, sx, sy, sw, sh, x, y, w, h) {
    var xscale = canvas.width;
    var yscale = canvas.height;
    var rx = x * xscale;
    var ry = y * yscale;
    var rw = w * xscale;
    var rh = h * yscale;

    return context.drawImage(img, sx,sy,sw,sh,rx,ry,rw,rh);
  }

  var fit_canvas_func = _fit_canvas();
  window.addEventListener('resize', fit_canvas_func);
  fit_canvas_func();

  return {};
})();
