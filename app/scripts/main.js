$(document).ready(function() {
  // Match height
  var matchHeight = $('.match-height'),
      matchHeightInner = $('.match-height-inner'),
      matchHeightRider = $('.match-height-rider'),
      matchHeightDrug = $('.match-height-drug'),
      matchWidth = $('.match-width'),
      matchHeightOnce = $('.match-height-once');

  matchHeight.matchHeight({
    byRow: true,
    property: 'min-height',
    target: null,
    remove: false
  });
  matchHeightInner.matchHeight({
    byRow: true,
    property: 'height',
    target: null,
    remove: false
  });
  matchHeightRider.matchHeight({
    byRow: true,
    property: 'height',
    target: null,
    remove: false
  });
  matchHeightDrug.matchHeight({
    byRow: false,
    property: 'min-height',
    target: null,
    remove: false
  });
  matchHeightOnce.matchHeight({
    byRow: true,
    property: 'min-height',
    target: null,
    remove: false
  });

  matchHeightOnce.matchHeight({ remove: true });

  // Tooltips
  $('.tooltip-large').tooltipster({
    content: $('#tooltip-large'),
    contentCloning: true,
    contentAsHTML: true,
    interactive: true,
    trigger: 'click',
    maxWidth: 250
  });
  $('.tooltip-small').tooltipster({
    content: $('#tooltip-small'),
    contentCloning: true,
    contentAsHTML: true,
    interactive: true,
    trigger: 'click',
    maxWidth: 250
  });
  $('.tooltip-costs').tooltipster({
    content: $('#tooltip-costs'),
    contentCloning: true,
    contentAsHTML: true,
    interactive: true,
    trigger: 'click',
    maxWidth: 250
  });

  // Combo drop down
  $('#tab-select').change(function(event) {
    event.preventDefault();

    var $selectVal = $(this).val();

    switch ($selectVal) {
      case 'tab-1':
        $('a[href="#tab-1"]').tab('show');
        break;
      case 'tab-2':
        $('a[href="#tab-2"]').tab('show');
        break;
    }
  });

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var $tabName = $(e.target).attr('aria-controls');

    $('#tab-select option[value=' + $tabName + ']').prop('selected', true);
  });

  // Custom date range select
  if ($('.date-range').length) {
    $('.date-range').change(function(event) {
      var $val = $(this).val();

      if ($val !== 'custom-search') {
        toggleCustom($(this), false);
      } else {
        toggleCustom($(this), true);
      }
    });
  }

  // Insert  button icons
  var btnIcons = $('.btn[data-button-icon]');

  if (btnIcons.length > 0) {
    var icon, html;

    btnIcons.each(function(index, el) {
      icon = $(this).attr('data-button-icon');
      html = getBtnIcon(icon);

      $(this).prepend(html);
    });

    function getBtnIcon(icon) {
      switch (icon) {
        case 'search':
          return `<svg version="1.1" class="btn-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            	       viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                    <g>
                    	<path fill="#FFFFFF" d="M459.8,428.3L354,322.4c51.1-66.7,46.3-162.8-14.7-223.8c-32.2-32.2-75-49.9-120.5-49.9
                    		S130.5,66.4,98.4,98.6C66.2,130.8,48.5,173.5,48.5,219s17.7,88.3,49.9,120.4c32.2,32.2,74.9,49.9,120.4,49.9
                    		c38.7,0,75.3-12.9,105.3-36.5l105.6,105.6c4.2,4.2,9.6,6.2,15.1,6.2s10.9-2.1,15.1-6.2C468.2,450.1,468.2,436.6,459.8,428.3z
                    		 M309.1,309.3c-24.1,24.1-56.2,37.4-90.3,37.4s-66.2-13.3-90.3-37.4S91.1,253.1,91.1,219c0-34.1,13.3-66.2,37.4-90.3
                    		s56.2-37.4,90.3-37.4s66.2,13.3,90.3,37.4C358.9,178.5,358.9,259.5,309.1,309.3z"/>
                    	<rect fill="none" width="512" height="512"/>
                    </g>
                  </svg>`
        break;
      }
    }
  }

  // Functions
  function toggleCustom($this, $toggle) {
    var $customField = $this.closest('.table-body').find('.custom-search-fields');

    if ($toggle) {
      $customField.removeClass('hidden');
    } else {
      $customField.addClass('hidden');
    }
  }

});

/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT / GPLv2 License.*/(function(a){function m(){d.setAttribute('content',g),h=!0}function n(){d.setAttribute('content',f),h=!1}function o(b){l=b.accelerationIncludingGravity,i=Math.abs(l.x),j=Math.abs(l.y),k=Math.abs(l.z),(!a.orientation||a.orientation===180)&&(i>7||(k>6&&j<8||k<8&&j>6)&&i>5)?h&&n():h||m()}var b=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(b)&&b.indexOf('AppleWebKit')>-1))return;var c=a.document;if(!c.querySelector)return;var d=c.querySelector('meta[name=viewport]'),e=d&&d.getAttribute('content'),f=e+',maximum-scale=1',g=e+',maximum-scale=10',h=!0,i,j,k,l;if(!d)return;a.addEventListener('orientationchange',m,!1),a.addEventListener('devicemotion',o,!1)})(this);

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Add tooltips
(function() {
  var tooltip = $('[data-tooltip]');

  if (tooltip.length > 0) {
    var size,
        mobile = false;

    tooltip.each(function(index, el) {
      var direction = 'right';
      var label = 'Tooltip Icon';
      size = $(this).attr('data-tooltip');

      if ($(this)[0].hasAttribute('data-tooltip-mobile')) {
        mobile = true;
      }

      if ($(this)[0].hasAttribute('data-tooltip-side')) {
        direction = 'right';
      }

      if ($(this)[0].hasAttribute('data-tooltip-label')) {
        label = $(this).attr('data-tooltip-label');
      }

      createTooltip($(this), size, mobile, direction, label);
    });
  }

  function createTooltip(el, size, mobile, direction, label) {
    var html = `
                  <span class="tooltip-${size}` + (mobile ? ' hidden-xs' : '') + `">
                  	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  		 viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve" width="1em" height="1em" class="tooltip-info">
                  	<path fill="#196ECF" d="M256,4C117,4,4,117,4,256C4,395,117,508,256,508S508,395,508,256C508,117,395,4,256,4z M271.6,400H240V206.2
                  		h31.7V400z M255.6,162.2c-11.2,0-21.3-10.4-21.3-22.9c0-12.4,10-22.9,21.7-22.9c12,0,21.7,10.4,21.7,22.9
                  		C277.7,151.8,267.6,162.2,255.6,162.2z"/>
                  	</svg>
                  </span>
              `
    if (direction === 'left') {
      el.prepend(html);
    } else {
      el.append(html);
    }

    el.find('> [class*="tooltip-"]').attr('aria-describedby', 'tooltip-' + size);
    el.find('> [class*="tooltip-"]').attr('role', 'Tooltip');

    if (!label) {
      label = 'Tooltip Icon';
    }

    el.find('> [class*="tooltip-"]').attr('aria-label', label);
  }
}());

function resizeIframeHeight(obj) {
  obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}

// function checkDropdownPosition(element) {
// 	setTimeout(() => {
// 		var w = window.innerHeight;
// 		var el = element.nextElementSibling;
//     var eh = el.offsetHeight;
//     var yOffset = window.scrollY;
//     if (!!document.documentMode) { // for IE
// 			yOffset = window.pageYOffset
//     }
//     var h = ($(el).offset().top - yOffset) + (eh * .99);
//     console.log(w, eh, h);
//     if (h > w) {
//   		console.log('on-top');
//       $(el).addClass('on-top');
//     }
//     else {
//     	console.log('remove on-top');
//       $(el).removeClass('on-top');
//     }
// 	}, 300);
// }
