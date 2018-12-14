$(document).ready(function() {

  $('nav.navbar').affix({
    offset: {
      top: function() {
        var nav = $('nav.navbar');

        if (!isMobile()) {
          affixNavStyles();
          return (this.top = nav.offset().top - 40)
        } else {
          affixNavStyles('mobile');
          return (this.top = nav.offset().top)
        }
      }
    }
  });

  // Set width & height on affix
  $('nav.navbar').on('affix.bs.affix', function(event) {
    if (isMobile()) {
      affixNavStyles('mobile');
    } else {
      affixNavStyles();
    }
  });

  // Remove styling when static
  $('nav.navbar').on('affixed-top.bs.affix', function(event) {
    removeAffixNavStyles();
  });

  window.addEventListener('resize', throttle(function() {
    var width = $(window).width();

    if (width >= 768) {
      affixNavStyles();
    } else {
      affixNavStyles('mobile');
    }
  }, 50));

  // Functions
  function affixNavStyles(type) {
    removeAffixNavStyles();

    var nav = $('nav.navbar'),
        wrapper = nav.closest('.nav-wrapper'),
        navWidth = nav.outerWidth(),
        wrapperWidth = wrapper.outerWidth(),
        width;

    if (navWidth >= wrapperWidth) {
      width = navWidth;
    } else {
      width = wrapperWidth
    }

    if (type === 'mobile') {
      wrapper.css('height', nav.outerHeight() + 'px');
    } else {
      nav.css('width', width + 'px');
      wrapper.css('min-width', width + 'px');
    }
  }

  function removeAffixNavStyles() {
    var nav = $('nav.navbar');

    nav.removeAttr('style');
    nav.closest('.nav-wrapper').removeAttr('style');
  }

  function isMobile() {
    var width = $(window).width();

    if (width > 767) {
      return false;
    } else {
      return true;
    }
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

});

// Add colors
(function() {
  var colorContainers = $('.color-container-item');

  colorContainers.each(function(index, el) {
    var color = $(this).find('.color-sample').attr('data-color');
    $(this).find('.color-sample').css('background-color', color);
    $(this).find('.color-label').append(color);
  });
})();
