// This js file is designed to be included in all pages

$(function() {
  auto_active_menu();
  avatar_hover_effect();
});

function auto_active_menu() {
  var url = window.location.href;
  // Work for relative and absolute hrefs
  $('.menu a').filter(function() {
      return this.href == url;
      }).addClass('active');
}

function avatar_hover_effect() {
  $(".avatar").hover(function(e)
  {
    var _this = e.target;
    var color = getAvatarColor();
    $(_this).css("background-color", color);
  });
}

function getAvatarColor()
{
  return "#bdc3c7";
}
