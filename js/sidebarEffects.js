var container = document.getElementById('st-container');
var content = document.getElementById('st-content');
var menuToggle = document.getElementById('menu-toggle');

var message = document.getElementById('message');

var editFont = document.getElementById('edit-font');
var editColor = document.getElementById('edit-color');

var events = ['touchstart', 'click'];

container.className = 'st-container';
for (var ev in events){
  content.addEventListener(events[ev], function(event){
    container.className = 'st-container';
    event.stopPropagation();
    event.preventDefault();
  });
  menuToggle.addEventListener(events[ev], function(event){
    container.className = 'st-container st-menu-open';
    event.stopPropagation();
    event.preventDefault();
  });
}

function updateColor(color){
  console.log($(this).val());

  var id = $(this).attr('id');
  if (id === 'edit-background-color')
    $('#content').css('background-color', color.toHexString());
  if (id === 'edit-text-color')
    $('#content').css('color', color.toHexString());
}
$('.color-picker').spectrum({
  flat: true,
  showInput: true,
  preferredFormat: "hex",
  change: updateColor,
  move: updateColor
});
$('#edit-text-size').change(function(){
  $('#content').css('font-size', $(this).val() + '%')
});