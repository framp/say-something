
function updateData(color){
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