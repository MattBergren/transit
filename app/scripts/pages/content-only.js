$(document).ready(function() {
  $('.collapse-close').click(function(event) {
    event.preventDefault();

    var $collapseID = '#' + $(this).closest('.collapse').attr('id');

    $($collapseID).collapse('hide');

    $('html, body').animate({ scrollTop: $('a[href="' + $collapseID + '"]').offset().top });
  });

  // Back to top button
  var $backToTop = $('a.back-to-top');

  // Lost focus on click
  $backToTop.click(function(event) {
    $(this).blur();
  });

  function scrollPosition() {
    var $scrollPosition = $(window).scrollTop(),
        $triggerOffset = $('#HIPAA').offset().top;

    if ($scrollPosition >= $triggerOffset) {
      $backToTop.addClass('btt-show');
    } else {
      $backToTop.removeClass('btt-show');
    }
  }

  if ($backToTop.length) {
    window.addEventListener('scroll', throttle(scrollPosition, 50));
  }

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  function debounce(func, wait, immediate) {
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  };

  function throttle(fn, wait) {
    var time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    }
  }
});
