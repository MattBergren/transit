$(document).ready(function() {
  $('#carousel').slick({
    dots: true,
    arrows: true
  });
});

function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

window.addEventListener('resize', throttle(closeCollapse, 50));

function closeCollapse() {
  var $collapse = $('.collapse'),
      $w = $(window).width();

  if ($w > 991) {
    $collapse.collapse('show');
  } else {
    $collapse.collapse('hide')
  }
}

closeCollapse();
