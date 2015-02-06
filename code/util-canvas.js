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

var canvas = document.getElementById("screen");

var util_canvas = (function() {
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

  var _relativeDraw = function(img, x, y, w, h) {
    var scale = canvas.width;
    var rx = x * scale;
    var ry = y * scale;
    var rw = w * scale;
    var rh = h * scale;

    return context.drawImage(img,rx-rw/2,ry-rh/2,rw,rh);
  }

  var _init = function(){
    var fit_canvas_func = _fit_canvas();
    window.addEventListener('resize', fit_canvas_func);
    fit_canvas_func();
  }

  var _clear = function(color){
    context.fillStyle = color;
    context.fillRect(0,0,canvas.width,canvas.height);
  }

  return {
     relativeDraw:_relativeDraw
    ,init:_init
    ,clear:_clear
  };
})();
