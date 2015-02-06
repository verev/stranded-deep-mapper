/* renderer.js
 *    manage the view. call for image loading and drawing as required by
 *    renderer's state and the island graph
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

 var renderer = (function(){

  var view_pos = {x: -50, y:-50};
  var view_size = {x: 100, y:100};
  var view_padding = 100;
  var view_icons_size = 1/10;

  var image_cache = {};

  var _preloadImage = function(path){
    var img = new Image();
    img.onload = _draw;
    img.src = path;
    image_cache[path] = img;
  }

  var _getImage = function(path){
    if(typeof image_cache[path] === 'undefined'){
      //we didn't load this image so it must be a mistake
      return null;
    }
    return image_cache[path];
  }

  var _draw_island = function(island){
    var x = island.x-view_pos.x;
    var y = island.y-view_pos.y;
    util_canvas.relativeDraw(_getImage(island.icon), x/view_size.x,
                                                     y/view_size.y,
                                                     view_icons_size,
                                                     view_icons_size);
  }

  var _draw = function(){
    util_canvas.clear('#AAAAFF');
    graph.allInside(view_pos.x-view_padding,
                    view_pos.y-view_padding,
                    view_size.x+2*view_padding,
                    view_size.y+2*view_padding,
                    _draw_island);
  }

  var _scroll = function(dx, dy){
    view_pos.x += dx * settings.renderer.scroll_factor;
    view_pos.y += dy * settings.renderer.scroll_factor;
    _draw();
  }

  var _init = function(){
    for(var i=0;i<settings.icons.length;i++){
      _preloadImage(settings.icons[i]);
    }
    window.addEventListener('resize', _draw);
  }

  return {
     init: _init
    ,draw: _draw
    ,scroll: _scroll
  };
})();
