var $ = document.getElementById.bind(document);

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
var boundElements = {
  background: [
    ['content', 'background']
  ],
  text: [
    ['message', 'color']
  ]
};

colorpicker(components, sizes, boundElements);