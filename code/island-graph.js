/* island-graph.js
 *    manage internal representation of the map
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
 
 var graph = (function(){

  var structure = [
    {icon:'images/ico-tree.svg', x:0, y:0}
  ];

  var _allInside = function(x, y, w, h, callback){
    for(var i=0;i<structure.length;i++){
      var o = structure[i];
      if(o.x >= x && o.x <= x+w && o.y >= y && o.y <= y+h){
        callback(o);
      }
    }
  }

  var _init = function(){

  }
  return {
    init:_init
    ,allInside:_allInside
  };
})();
