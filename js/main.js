$(function(){

  $(window).scroll(function(){
    var background = $('header[data-type="background"]');
    var yPos = -($(window).scrollTop() / background.data('speed'));
    var coords = '50% '+ yPos + 'px';
    background.css('background-position', coords);

  });
});
