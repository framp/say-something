var $ = document.getElementById.bind(document);

(function(){
  var content = $('content');
  var smaller = $('smaller');
  var bigger = $('bigger');

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


  var components = {
    background: {
      hue: 214,
      sat: 68,
      lig: 58
    },
    text: {
      hue: 0,
      sat: 0,
      lig: 100
    }
  };
  var sizes = {
    hue: [70,100],
    sat: [100,130],
    lig: [130,160]
  };
  function cb(type, hsl){
    if (type==='background')
      $('content').style['background'] = 'hsl(' + hsl + ')';
    if (type==='text')
      $('message').style['color'] = 'hsl(' + hsl + ')';
    $('url').href = 'like/#' + getUrl();
  };
  
  function getUrl(){
    var content = $('content');
    var message = $('message');
    return btoa(content.style.fontSize + ';' +
                message.style.color + ';' +
                content.style.background + ';' +
                message.innerHTML);
  }
  colorpicker(components, sizes, cb);
})();