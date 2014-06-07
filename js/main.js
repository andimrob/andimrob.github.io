$(function(){

  $('.carousel').slick({
    dots: true,
    accessibility: true,
    autoplay: true
  });

  $(window).scroll(function(){
    var background = $('header[data-type="background"]');
    var yPos = ($(window).scrollTop() / background.data('speed'));
    var coords = 'center '+ yPos + 'px';
    background.css('background-position', coords);
  });
});
