var content = document.getElementById('content');
var smaller = document.getElementById('smaller');
var bigger = document.getElementById('bigger');

content.style.fontSize = '400%';
bigger.addEventListener('click', function(){
  var fontSize = parseInt(content.style.fontSize);
  content.style.fontSize = (fontSize + 20) + '%';
  return false;
});
smaller.addEventListener('click', function(){
  var fontSize = parseInt(content.style.fontSize);
  content.style.fontSize = (fontSize - 20) + '%';
  return false;
});

function arcColor(canvas, range, format){
  if (typeof canvas == 'string')
    canvas = document.getElementById(canvas);
  var ctx = canvas.getContext('2d');

  for(var x=0; x<canvas.width; x++){
    for(var y=0; y<canvas.height; y++){
      var yc = y-canvas.height;
      var xc = x-0;
      var angle = Math.atan2(yc,xc)/Math.PI*720+360;
      var value = angle/360*range;
      ctx.fillStyle = format.replace('#', value);
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas;
}

function arcEvent(canvas, range, cb){
  if (typeof canvas == 'string')
    canvas = document.getElementById(canvas);
  var options = {
    canvas: canvas,
    range: range,
    mousedown: false
  };
  var optionsValid = {
    canvas: canvas,
    range: range,
    mousedown: true
  }
  canvas.addEventListener('click', emitColorValue.bind(null, optionsValid, cb), false);
  canvas.addEventListener('mousedown', startEmitting.bind(null, options, cb), false);
  canvas.addEventListener('mousemove', emitColorValue.bind(null, options, cb), false);
  canvas.addEventListener('mouseup', stopEmitting.bind(null, options), false);
  window.addEventListener('mouseout', stopEmitting.bind(null, options), false);
  return canvas;
}
function emitColorValue(options, cb, evt){
  var canvas = options.canvas;
  var range = options.range;
  if (!options.mousedown)
    return;
  console.log(canvas.id);

  var rect = canvas.getBoundingClientRect();
  var x = Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*canvas.width);
  var y = Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height);
  
  var yc = y-canvas.height;
  var xc = x-0;
  var angle = Math.atan2(yc,xc)/Math.PI*720+360;
  var value = angle/360*range;
  cb.call(evt, Math.ceil(value));
  return true;
}
function startEmitting(options, cb, evt){
  options.mousedown = true;
  return true;
}
function stopEmitting(options){
  options.mousedown = false;
  return true;
}
function updateComponent(type, component, value){
  components[type][component] = value;
  for (var u in updates[component]){
    var updatedComponent = updates[component][u];
    var id = type + '-color-picker-' + updatedComponent;
    arcColor(id, ranges[updatedComponent], formats(type)[updatedComponent]);
  }
  var hsl = [ 
    components[type].hue,
    components[type].sat + '%',
    components[type].lig + '%'
  ];
  document.getElementById(type + '-current-color').style.background = 'hsl(' + hsl + ')';
  
  var element = boundElements[type];
  document.getElementById(element[0]).style[element[1]] = 'hsl(' + hsl + ')';
}

var components = {
  background: {
    hue: 214,
    sat: 68,
    lig: 58
  },
  text: {
    hue: 0,
    sat: 100,
    lig: 50
  }
};

function formats(type){
  return {
    hue: 'hsl(#,100%,50%)',
    sat: 'hsl(' + components[type]['hue'] + ',#%,50%)',
    lig: 'hsl(' + components[type]['hue'] + ',100%,#%)'
  };
}
var ranges = {
  hue: 360,
  sat: 100,
  lig: 100
};
var updates = {
  hue: ['sat', 'lig'],
  sat: [],
  lig: [],
}
var boundElements = {
  background: ['content', 'background'],
  text: ['message', 'color']
};

for (var type in components){
  for (var component in components[type]){
    var id = type + '-color-picker-' + component;
    arcColor(id, ranges[component], formats(type)[component]);
    arcEvent(id, ranges[component], updateComponent.bind(null, type, component));
  }
}