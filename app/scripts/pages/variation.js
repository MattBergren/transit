$(document).ready(function() {
  $('#toggle-variation').click(function(event) {
    event.preventDefault();

    var toggle = $(this).attr('data-variation');
    toggle === 'true' ? toggle = true : toggle = false;

    toggleClick($(this), toggle);
  });

  $('#highlight-variation').click(function(event) {
    event.preventDefault();

    var toggle = $(this).attr('data-variation');
    toggle === 'true' ? toggle = true : toggle = false;

    highlightClick($(this), toggle);
  });
});

function moveTooltips(p, t) {
  p.each(function(index, el) {
    var me = $(this),
        tt = me.find('.tooltipstered');

    if (t) {
      me.prepend(tt);
    } else {
      me.append(tt);
    }

    fadeBg(me, t);
  });
}

function hideVariation(e, t) {
  e.each(function(index, el) {
    var me = $(this),
        s = me.next(),
        p = me.closest('.collapse-wrapper'),
        w = me.parent(),
        b = w.hasClass('variation-highlight');

    if (b) {
      s = w.next();
    }

    if (s.hasClass('variation-orig')) {
      if (b) {
        t ? w.hide() : w.show()
      }

      t ? me.hide() : fadeEl(me, 'in')
      t ? fadeEl(s, 'in') : s.hide()
      t ? fadeBg(s, t) : fadeBg(me, t)
    } else {
      if (b) {
        t ? fadeEl(me, 'out', w) : fadeEl(me, 'in', w)
      } else {
        t ? fadeEl(me, 'out') : fadeEl(me, 'in')
      }
      fadeBg(me, t);
    }

    if (p.length > 0) {
      t ? p.prev().removeClass('pdf-list') : p.prev().addClass('pdf-list')
    }

    function fadeEl(me, d, w) {
      if (d === 'out') {
        me.fadeOut('300', function() {
          if (w !== null && w !== undefined) {
            w.hide()
          }
        })
      } else {
        if (w !== null && w !== undefined) {
          w.show();
        }

        me.fadeIn('300');
      }
    }
  });
}

function fadeBg(me, t) {
  var c = t ? 'rgba(255, 230, 240, ' : c = 'rgba(225, 250, 223, ',
      ec = me.css('background-color' ,'').css('background-color');

  // Remove alpha if exists
  if(ec.indexOf('a') >= 0) {
    ec = ec.replace('a', '').slice(0, 17) + ')';
  }

  TweenLite.fromTo(me, 1, {
    'background-color': c + '1)'
  },{
    'background-color': c + (!t && ec === 'rgb(225, 250, 223)' ? '1)' : '0)'),
    'onComplete': clearStyles,
    'onCompleteParams': [me]
  });

  function clearStyles(o) {
    o.css('background-color', '');
  }
}

function toggleHighlight(e, t) {
  e.each(function(index, el) {
    var me = $(this);

    if (!me.parent().hasClass('variation-highlight')) {
      me.wrap('<div class="variation-highlight"></div>');
    } else {
      me.unwrap();
    }
  });
}

function toggleButton(me, t) {
  if (t) {
    me.attr('data-variation', false);
  } else {
    me.attr('data-variation', true);
  }
}

function toggleClick(me, t) {
  var tooltip = $('[data-tooltip-side]'),
      variationEl = $('.variation-el');

  if (tooltip.length > 0) {
    moveTooltips(tooltip, t);
  }

  if (variationEl.length > 0) {
    hideVariation(variationEl, t);
  }

  toggleButton(me, t);
}

function highlightClick(me, t) {
  var tooltip = $('[data-tooltip-side]'),
      variationEl = $('.variation-el');

  // Check for tooltips
  if (tooltip.length > 0) {
    toggleHighlight(tooltip, t);
  }

  // Check for success message
  if (variationEl.length > 0) {
    toggleHighlight(variationEl, t)
  }

  toggleButton(me, t);
}
