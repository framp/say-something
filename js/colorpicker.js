function colorpicker(components, sizes, cb){
  
  var d = document.getElementById.bind(document);
  
  function formats(type){
    return {
      hue: 'hsl(#,' + components[type]['sat'] + '%,' + components[type]['lig'] + '%)',
      sat: 'hsl(' + components[type]['hue'] + ',#%,' + components[type]['lig'] + '%)',
      lig: 'hsl(' + components[type]['hue'] + ',' + components[type]['sat'] + '%,#%)'
    };
  }

  var ranges = {
    hue: 360,
    sat: 100,
    lig: 100
  };

  function arcColor(canvas, range, format){
    if (typeof canvas == 'string')
      canvas = d(canvas);
    var ctx = canvas.getContext('2d');

    for(var x=0; x<canvas.width; x++){
      for(var y=0; y<canvas.height; y++){
        var angle = Math.atan2(y-canvas.height,x)/Math.PI*720+360;
        var value = angle/360*range;
        ctx.fillStyle = format.replace('#', value);
        ctx.fillRect(x, y, 1, 1);
      }
    }
    return canvas;
  }
  function drawColorPicker(type){
    for (var component in components[type]){
      var id = type + '-color-picker-' + component;
      arcColor(id, ranges[component], formats(type)[component]);
    }
    var hsl = [ 
      components[type].hue,
      components[type].sat + '%',
      components[type].lig + '%'
    ];
    d(type + '-current-color').style.background = 'hsl(' + hsl + ')';
    
    if (cb)
      cb(type, hsl);
  }

  function setupEvents(type){
    var id = type + '-color-picker-input';
    var input = d(id);
    
    var options = {
      type: type,
      mousedown: false
    };
    var optionsAlways = {
      type: type,
      mousedown: true
    }
    var emit = handleComponents.bind(input, options, drawColorPicker);
    var emitAlways = handleComponents.bind(input, optionsAlways, drawColorPicker);
    var track = startEmitting.bind(null, options)
    var stopTrack = stopEmitting.bind(null, options)
    
    input.addEventListener('click', emitAlways, false);
    input.addEventListener('mousedown', track, false);
    input.addEventListener('mousemove', emit, false);
    input.addEventListener('mouseup', stopTrack, false);
    window.addEventListener('mouseout', stopTrack, false);
  }
  function handleComponents(options, cb, e){
    if (!options.mousedown)
      return;
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    if (options.type==='text')
      x = this.clientWidth - x;
    var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y-this.clientHeight, 2));
    var angle = Math.atan2(y-this.clientHeight,x)/Math.PI*720+360;
    
    for (var component in sizes){
      if (dist>=sizes[component][0] && dist<=sizes[component][1]){
        var value = angle/360*ranges[component];
        components[options.type][component] = value;
        if (cb)
          cb(options.type, component, value);
        return;
      }
    }
  }
  function startEmitting(options){
    options.mousedown = true;
  }
  function stopEmitting(options){
    options.mousedown = false;
  }

  for (var type in components){
    drawColorPicker(type);
    setupEvents(type);
  }

}