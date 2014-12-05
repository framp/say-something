var $ = document.getElementById.bind(document);

(function(){
  var content = $('content');
  var message = $('message');
  var smaller = $('smaller');
  var bigger = $('bigger');
  var url = $('url');
  
  setTextSize('400%');
  
  bigger.addEventListener('click', increaseTextSize.bind(null, 20));
  smaller.addEventListener('click', increaseTextSize.bind(null, -20));
  url.addEventListener('click', setURL);
  
  function setTextMessage(text){
    message.innerHTML = text;
    return false;
  }
  function setTextSize(size){
    content.style.fontSize = size;
    return false;
  }
  function increaseTextSize(increment){
    var fontSize = parseInt(content.style.fontSize);
    setTextSize((fontSize + increment) + '%');
    return false;
  }
  function setHSLColor(type, color){
    if (type==='background')
      return setBackgroundColor('hsl(' + color + ')');
    if (type==='text')
      return setTextColor('hsl(' + color + ')');
    return false;
  }
  function setBackgroundColor(color){
    content.style.background = color;
    return false;
  }
  function setTextColor(color){
    message.style.color = color;
    url.style.color = color;
    for (var button in { bigger: 1, smaller: 1 }){
      var children = $(button).childNodes;
      for (var i in children){
        if (children[i].style)
          children[i].style.background = color;
      }
    }
    return false;
  }
  function setURL(){
    url.href = 'like/#' + btoa(content.style.fontSize + ';' +
                message.style.color + ';' +
                content.style.background + ';' +
                message.innerHTML);
    return false;
  }
  
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
  colorpicker(components, sizes, setHSLColor);
  
  (function initFromHash(){
    if (!location.hash) return;
    var data = atob(location.hash.substr(1)).split(';');
    setTextSize(data.shift() || '400%');
    setTextColor(data.shift() || '#FFF');
    setBackgroundColor(data.shift() || '#4A89DC');
    setTextMessage(data.join(';') || 'SAY SOMETHING');
  })();
})();