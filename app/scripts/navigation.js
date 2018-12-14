$(document).ready(function() {
  $('.menu-icon').click(function(event) {
    event.preventDefault();

    if (!$(this).hasClass('menu-active')) {
      toggleMenu();
      $(this).addClass('menu-active');
    } else {
      toggleMenu();
      $(this).removeClass('menu-active');
    }
  });

  $('.uhc-nav-item-link').click(function(event) {
    var $item = $(this).closest('li[class*=uhc-nav-item]');

    if ($item.hasClass('has-sub-nav')) {
      event.preventDefault();

      if (!$item.hasClass('active')) {
        toggleSubMenu($item);
      } else {
        toggleSubMenu($item);
        $(this).blur();
      }
    }
  });
});

function toggleMenu() {
  // Fade background & lock scrolling
  var $body = $('.uhc-body-wrapper'),
      $lightbox = $body.find('.uhc-body-light-box'),
      $height = $('.header-wrapper').outerHeight(true),
      $scrollbar = getScrollBarWidth(),
      $d;

  if (!$('.menu-icon').hasClass('active')) {
    $d = true;
    $body.addClass('no-scroll');
    $body.css('padding-right', $scrollbar + 'px');
  } else {
    $d = false;

    setTimeout(function () {
      $body.removeClass('no-scroll');
      $body.removeAttr('style');
    }, 300);
  }

  TweenLite.fromTo($lightbox, 0.3,
    {
      display: (($d) ? 'none' : 'block'),
      opacity: (($d) ? '0' : '1')
    },
    {
      display: (($d) ? 'block' : 'none'),
      opacity: (($d) ? '1' : '0')
    }
  );

  // Slide out menu
  var $nav = $('.uhc-nav'),
      $wrapper = $('.nav-wrapper');

  $nav.css('padding-bottom', $height + 'px');

  $wrapper.css('top', $height + 'px');

  TweenLite.fromTo($wrapper, 0.3,
    {
      display: (($d) ? 'none' : 'block'),
      opacity: (($d) ? '0' : '1')
    },
    {
      display: (($d) ? 'block' : 'none'),
      opacity: (($d) ? '1' : '0')
    }
  );

  TweenLite.fromTo ($nav, 0.3,
    {
      transform: (($d) ? 'translateY(-100px)' : 'translateY(0)')
    },
    {
      transform: (($d) ? 'translateY(0)' : 'translateY(-100px)')
    }
  );

  toggleIcon();
}

// Open sub menu
function toggleSubMenu($this) {
  var $active = $('.has-sub-nav.active'),
      $pageWidth = $(window).width();

  if ($this.hasClass('active')) {
    hide($this);
  } else if ($active.length > 0) {
    hide($active);
    show($this);
  } else {
    show($this)
  }

  function show($v) {
    var $sub = $v.find('.sub-nav');

    if ($pageWidth < 992) {
      TweenLite.set($sub, {display: 'block', height: 'auto'});
      TweenLite.from($sub, 0.3, {display: 'none', height: '0'});
      $v.addClass('active');
    } else {
      TweenLite.set($sub, {display: 'block', height: 'auto', opacity: '1'});
      TweenLite.from($sub, 0.3, {display: 'none', height: '0', opacity: '0'});
      $v.addClass('active');
    }
  }

  function hide($v) {
    if ($pageWidth < 992) {
      TweenLite.to($v.find('.sub-nav'), 0.3, {display: 'none', height: '0'});
      $v.removeClass('active');
    } else {
      TweenLite.to($v.find('.sub-nav'), 0.3, {display: 'none', height: '0', opacity: '0'});
      $v.removeClass('active');
    }
  }
}

function clearStyles($type) {
  if ($type === 'mobile') {
    $('.sub-nav').removeAttr('style');
    $('.has-sub-nav').removeClass('active');
  } else {
    $('.menu-icon').removeClass('active');
    $('.uhc-body-wrapper').removeClass('no-scroll').removeAttr('style');
    $('.uhc-body-light-box').removeAttr('style');
    $('.uhcg-nav-header .uhc-nav').removeAttr('style');
    $('.nav-wrapper').removeAttr('style');
    $('.nav-wrapper .uhc-nav').removeAttr('style');
    $('.has-sub-nav').removeClass('active');
  }
}

// Toggle menu icon
function toggleIcon() {
  var $icon = $('.menu-icon'),
      $active,
      $f = $('.menu-line:nth-child(1)'),
      $s = $('.menu-line:nth-child(2)'),
      $t = $('.menu-line:nth-child(3)');

  $icon.hasClass('active') ? $active = true : $active = false;

  TweenLite.to($f, 0.2,
    {
      transform: ((!$active) ? 'translateY(1px) rotate(45deg)' : 'translateY(0) rotate(0)'),
      margin: ((!$active) ? '0' : '')
    }
  );

  TweenLite.to($s, 0.2,
    {
      opacity: ((!$active) ? '0' : '1'),
      margin: ((!$active) ? '0' : ''),
      display: ((!$active) ? 'none' : 'block')
    }
  );

  TweenLite.to($t, 0.2,
    {
      transform: ((!$active) ? 'translateY(-1px) rotate(-45deg)' : 'translateY(0) rotate(0)')
    }
  );

  $icon.toggleClass('active');
}

function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

function getScrollBarWidth () {
  var inner = document.createElement('p');
  inner.style.width = '100%';
  inner.style.height = '200px';

  var outer = document.createElement('div');
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.left = '0px';
  outer.style.visibility = 'hidden';
  outer.style.width = '200px';
  outer.style.height = '150px';
  outer.style.overflow = 'hidden';
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild (outer);

  return (w1 - w2);
};

window.addEventListener('resize', throttle(moveUtilities, 50));

function moveUtilities() {
  var $w = $(window).width(),
      $n = $('.uhc-nav-item--secondary');

  if ($w > 991) {
    $n.each(function(index, el) {
      $(this).appendTo('.uhcg-nav-header .uhc-nav');
    });

    clearStyles();
  } else {
    $n.each(function(index, el) {
      $(this).appendTo('.uhcg-nav .nav-wrapper .uhc-nav');
    });

    clearStyles('mobile');
  }
}

moveUtilities();
