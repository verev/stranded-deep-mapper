/* controller.js
 *    collection of functions to put in html onclick
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



/*
source: http://stackoverflow.com/questions/55677/5932203#5932203
*/
function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;
/*
  end source
*/
var click_data = {time:0, x:0, y:0};
var AAAA = null;

function init(){
  util_canvas.init();
  graph.init();
  renderer.init();

  canvas.addEventListener('mousedown', function(e){
    var coords = canvas.relMouseCoords(e);
    click_data.time = e.timeStamp;
    click_data.x = coords.x;
    click_data.y = coords.y;
  });

  canvas.addEventListener('mouseup', function(e){
    var coords = canvas.relMouseCoords(e);
    var dx = click_data.x - coords.x;
    var dy = click_data.y - coords.y;
    if(e.timeStamp - click_data.time < settings.controller.click_time &&
            dx*dx+dy*dy<settings.controller.click_radius2){
      console.log("click event!");
    }
    click_data.time = 0;
    click_data.x = 0;
    click_data.y = 0;
  });

  canvas.addEventListener('mousemove', function(e){
    var coords = canvas.relMouseCoords(e);
    var dx = click_data.x - coords.x;
    var dy = click_data.y - coords.y;
    if(click_data.time != 0){
      renderer.scroll(dx, dy);
      click_data.x = coords.x;
      click_data.y = coords.y;
    }
  });
  canvas.addEventListener('mouseout', function(e){
    click_data.time = 0;
    click_data.x = 0;
    click_data.y = 0;
  });
};

window.onload = init;
