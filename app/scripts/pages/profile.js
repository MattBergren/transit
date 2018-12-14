$(document).ready(function() {
  matchCardHeights();

  function saveCard($target) {
    var $btn, $cardWrapper, dir;
    $btn = $target;
    $cardWrapper = $btn.closest('.card-animation-wrapper');

    if ($cardWrapper.hasClass('adding')) {
      dir = 'next';
      $cardWrapper.addClass('added');
    } else if ($cardWrapper.hasClass('added')) {
      dir = 'next';
    } else {
      dir = 'prev';
    }

    $cardWrapper.removeClass('editing adding');
    changeSlide(dir, $btn);
  }

  $('.card .cancel-btn').click(function(event) {
    var $btn, $cardWrapper, dir;
    $btn = $(this);
    $cardWrapper = $btn.closest('.card-animation-wrapper');

    event.preventDefault();

    if ($cardWrapper.hasClass('added')) {
      dir = 'next';
    } else {
      dir = 'prev';
    }

    $(this).closest('.card-animation-wrapper').removeClass('editing');
    changeSlide(dir, $btn);
  });

  $('.card .edit-btn').click(function(event) {
    var $btn, $cardWrapper, dir;
    $btn = $(this);
    $cardWrapper = $btn.closest('.card-animation-wrapper');

    event.preventDefault();

    if ($cardWrapper.hasClass('added')) {
      dir = 'prev';
    } else {
      dir = 'next';
    }

    $btn.closest('.card-animation-wrapper').addClass('editing');
    changeSlide(dir, $btn);
  });

  $('.card .add-address-btn').click(function(event) {
    event.preventDefault();
    $(this).closest('.card-animation-wrapper').addClass('editing');
    changeSlide('next', $(this));
  });

  $('#save-prefs-btn').click(function(e) {
    var $parent = $(this).parents('.card');
    e.preventDefault();
    var valid = $('#preferences-form').valid();
    if (valid) {
      $('.prefs-content', $parent).hide();
      $('.prefs-confirm', $parent).show();
    } else {

    }
  });

  $('#save-prefs-btn2').click(function(e) {
    var $parent = $(this).parents('.card');
    e.preventDefault();
    var valid = $('#preferences-form2').valid();
    if (valid) {
      $('.prefs-content', $parent).hide();
      $('.prefs-confirm', $parent).show();
    } else {

    }
  });

  $('.edit-prefs-btn').click(function(e) {
    var $parent = $(this).parents('.card');
    e.preventDefault();
    $('.prefs-content', $parent).show();
    $('.prefs-confirm', $parent).hide();
  });

  $('.on-off-toggle').on('change', function(e) {
    if ($(this).prop('checked') == true) {
      $(this).parents('.card').find('.go-green-thanks').show();
      $(this).parents('.card').find('input[value="Email"]').trigger('click');
    } else {
      $(this).parents('.card').find('.go-green-thanks').hide();
      $(this).parents('.card').find('input[value="Mail"]').trigger('click');
    }
  })

  $('.card').find('.card-slide[aria-hidden=false]').show();
  $('.card').find('.cancel-btn[aria-hidden=true]').hide();
  $('.card').find('.edit-btn[aria-hidden=true]').hide();

  if ($('.card').hasClass('is-opted-in')) {
    $('.prefs-content', '.card').hide();
    $('.prefs-confirm', '.card').show();
  }

  // iFrames
  var urlPath = window.location.pathname;

  if (urlPath.indexOf('iframe') >= 0) {
    var parentWindow = $(parent.window);

    parentWindow.resize(function(event) {
      if ($(this).innerWidth() >= 992) {
        // if ($('.iframe-column').hasClass('col-xs-12')) {
        //   $('.iframe-column').removeAttr('class').addClass('iframe-column').addClass('col-xs-6');
        //
        //   var iframes = $(parent.document).find('iframe');
        //
        //   iframes.each(function(index, obj) {
        //     obj.style.height = obj.contentWindow.document.body.offsetHeight + 'px';
        //   });
        // }
        $('#small').addClass('hidden');
        $('#large').removeClass('hidden');
      } else {
        // if ($('.iframe-column').hasClass('col-xs-6')) {
        //   $('.iframe-column').removeAttr('class').addClass('iframe-column').addClass('col-xs-12');
        // }
        //
        // var iframes = $(parent.document).find('iframe');
        //
        // iframes.each(function(index, obj) {
        //   obj.style.height = obj.contentWindow.document.body.offsetHeight + 'px';
        // });
        $('#large').addClass('hidden');
        $('#small').removeClass('hidden');
      }
    });
  }

  // Add plan
  $('#add-to-plan').click(function(event) {
    event.preventDefault();

    var valid = $('#register-form').valid();

    if (valid) {
      var memberID = $('#multiple-member-id').val();

      if (memberID === '12345') {
        $('.no-plan').addClass('hidden');
        $('.additional-warning').addClass('hidden');
        $('#existingPlanModal').modal('show');
      } else if (memberID === '54321') {
        $('.additional-warning').removeClass('hidden');
        $('.no-plan').addClass('hidden');
        $('#multiple-member-id').closest('.field').addClass('field-has-error');
      } else if (memberID === '11111') {
        $('.additional-warning').addClass('hidden');
        $('.no-plan').removeClass('hidden');
        $('#multiple-member-id').closest('.field').addClass('field-has-error');
      } else if (memberID !== '') {
        $('.additional-warning').addClass('hidden');
        $('.no-plan').addClass('hidden');
        $('#addPlanModal').modal('show');
      }
    }
  });

  $('#address-1-form button').click(function(event) {
    event.preventDefault();

    var valid = $('#address-1-form').valid();

    if (valid) {
      saveCard($(this));
      setTimeout(function() {
        $('#address-2-form').parents('.card-animation-wrapper').removeClass('hidden');
      }, 400);
    } else {

    }
  });

  $('#address-2-form button').click(function(event) {
    event.preventDefault();

    var valid = $('#address-2-form').valid();

    if (valid) {
      saveCard($(this));
    } else {
    }
  });

  // email edit
  $('#email-form button').click(function(event) {
    event.preventDefault();

    var valid = $('#email-form').valid();

    if (valid) {
      saveCard($(this));
    } else {

    }
  });

  $('#phone-form button').click(function(event) {
    event.preventDefault();

    var valid = $('#phone-form').valid();

    if (valid) {
      saveCard($(this));
    } else {

    }
  });

  $('#password-form button').click(function(event) {
    event.preventDefault();

    var valid = $('#password-form').valid();

    if (valid) {
      saveCard($(this));
    } else {
    }
  });

  $.validator.addMethod('password', function(value, element) {
    var tooltip = $(pInstance.content()).children().length;

    return this.optional(element) || tooltip <= 0;
  }, 'Password does not meet requirements.');

  jQuery.validator.addMethod('phoneUS', function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, '');
    return this.optional(element) || phone_number.length > 9 &&
    phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
}, 'Please specify a valid phone number');

  $('#password-form').validate({
    rules: {
      'passwordOld': {password: true, required: true},
      'passwordNew': {password: true, required: true},
      'passwordNewConfirm': {required: true, equalTo: '#passwordNew'},
    },
    highlight: function highlight(element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').addClass('field-has-error');
      } else if ($(element).closest('.field--dob').length > 0) {
        $(element).closest('.field--dob').addClass('field-has-error');
      } else {
        $(element).closest('.field').addClass('field-has-error');
      }

      $(element).closest('form').find('legend').addClass('field-has-error');
    },
    unhighlight: function unhighlight(element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').removeClass('field-has-error');
      } else if ($(element).closest('.field--dob').length > 0) {
        var empty = false;

        $(element).closest('.field--dob').find('select').each(function(index, el) {
          if ($(this).val() === '' || !$(this).val()) {
            empty = true;
          }
        });

        if (!empty) {
          $(element).closest('.field--dob').removeClass('field-has-error');
        }
      } else {
        $(element).closest('.field').removeClass('field-has-error');
        $(element).closest('.field').find('.error').remove();
      }
      $(element).closest('form').find('legend').removeClass('field-has-error');
    },
    errorPlacement: function errorPlacement(error, element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').append(error);
      } else if ($(element).closest('.field--dob').length > 0) {
        element.closest('.field--dob').append(error);
      } else {
        if (element.closest('.field').find('.error').length <= 0) {
          $(element).closest('.field').append(error);
        }
      }
    }
  });

  $('#address-1-form').validate({
    rules: {
      'altStreet': 'required',
      'altCity': 'required',
      'altState': 'required',
      'altZip': 'required',
      'startDateMM': {dob: true, required: true},
      'startDateDD': {dob: true, required: true},
      'startDateYYYY': {dob: true, required: true},
      'endDateMM': {dob: true, required: true},
      'endDateDD': {dob: true, required: true},
      'endDateYYYY': {dob: true, required: true}
    },
    groups: {
      dobGroup1: 'startDateMM startDateDD startDateYYYY',
      dobGroup2: 'endDateMM endDateDD endDateYYYY'
    },
    highlight: function highlight(element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').addClass('field-has-error');
      } else if ($(element).closest('.field--dob').length > 0) {
        $(element).closest('.field--dob').addClass('field-has-error');
      } else {
        $(element).closest('.field').addClass('field-has-error');
      }

      $(element).closest('form').find('legend').addClass('field-has-error');
    },
    unhighlight: function unhighlight(element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').removeClass('field-has-error');
      } else if ($(element).closest('.field--dob').length > 0) {
        var empty = false;

        $(element).closest('.field--dob').find('select').each(function(index, el) {
          if ($(this).val() === '' || !$(this).val()) {
            empty = true;
          }
        });

        if (!empty) {
          $(element).closest('.field--dob').removeClass('field-has-error');
        }
      } else {
        $(element).closest('.field').removeClass('field-has-error');
        $(element).closest('.field').find('.error').remove();
      }
      $(element).closest('form').find('legend').removeClass('field-has-error');
    },
    errorPlacement: function errorPlacement(error, element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').append(error);
      } else if ($(element).closest('.field--dob').length > 0) {
        element.closest('.field--dob').append(error);
      } else {
        if (element.closest('.field').find('.error').length <= 0) {
          $(element).closest('.field').append(error);
        }
      }
    }
  });

  $('#address-2-form').validate({
    rules: {
      'alt2Street': 'required',
      'altCity2': 'required',
      'altState2': 'required',
      'altZip2': 'required',
      'startDateMM2': {dob: true, required: true},
      'startDateDD2': {dob: true, required: true},
      'startDateYYYY2': {dob: true, required: true},
      'endDateMM2': {dob: true, required: true},
      'endDateDD2': {dob: true, required: true},
      'endDateYYYY2': {dob: true, required: true}
    },
    groups: {
      dobGroup1: 'startDateMM2 startDateDD2 startDateYYYY2',
      dobGroup2: 'endDateMM2 endDateDD2 endDateYYYY2'
    },
    highlight: function highlight(element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').addClass('field-has-error');
      } else if ($(element).closest('.field--dob').length > 0) {
        $(element).closest('.field--dob').addClass('field-has-error');
      } else {
        $(element).closest('.field').addClass('field-has-error');
      }

      $(element).closest('form').find('legend').addClass('field-has-error');
    },
    unhighlight: function unhighlight(element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').removeClass('field-has-error');
      } else if ($(element).closest('.field--dob').length > 0) {
        var empty = false;

        $(element).closest('.field--dob').find('select').each(function(index, el) {
          if ($(this).val() === '' || !$(this).val()) {
            empty = true;
          }
        });

        if (!empty) {
          $(element).closest('.field--dob').removeClass('field-has-error');
        }
      } else {
        $(element).closest('.field').removeClass('field-has-error');
        $(element).closest('.field').find('.error').remove();
      }
      $(element).closest('form').find('legend').removeClass('field-has-error');
    },
    errorPlacement: function errorPlacement(error, element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').append(error);
      } else if ($(element).closest('.field--dob').length > 0) {
        element.closest('.field--dob').append(error);
      } else {
        if (element.closest('.field').find('.error').length <= 0) {
          $(element).closest('.field').append(error);
        }
      }
    }
  });


  $.validator.addMethod('dob', function(value, element) {
    var empty = false;
    $(element).closest('.field--dob').find('select').each(function(index, el) {
      if ($(this).val() === '' || !$(this).val()) {
        empty = true;
      }
    });

    if (!empty) {
      return true;
    } else {
      return false;
    }

  }, 'Please complete all date fields.');

  // Validation
  $('#register-form').validate({
    rules: {
      'multiple-member-id': 'required'
    },
    highlight: function(element) {
      $(element).closest('.field').addClass('field-has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.field').removeClass('field-has-error');
    },
    errorPlacement: function(error, element) {
      element.closest('.field').append(error);
    }
  });

  $('#email-form').validate({
    rules: {
      'emailNew': {required: true, email: true},
      'emailNewConfirm': {required: true, equalTo: '#emailNew'}
    },
    highlight: function(element) {
      $(element).closest('.field').addClass('field-has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.field').removeClass('field-has-error');
    },
    errorPlacement: function(error, element) {
      element.closest('.field').append(error);
    }
  });

  $('#phone-form').validate({
    rules: {
      'daytimePhone': {required: true, phoneUS: true},
      'eveningPhone': {required: true, phoneUS: true}
    },
    highlight: function(element) {
      $(element).closest('.field').addClass('field-has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.field').removeClass('field-has-error');
    },
    errorPlacement: function(error, element) {
      element.closest('.field').append(error);
    }
  });

  $('#preferences-form').validate({
    rules: {
      'goPaperless': 'required'
    },
    messages: {
      'goPaperless': '<img src="/images/icon-svgs/important.svg" alt="Error" class="img-text"> You must agree to the terms and conditions'
    },
    highlight: function(element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').addClass('field-has-error');
      } else {
        $(element).closest('.field').addClass('field-has-error');
      }

      $(element).closest('form').find('legend').addClass('field-has-error');
    },
    unhighlight: function(element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').removeClass('field-has-error');
      } else {
        $(element).closest('.field').removeClass('field-has-error');
      }
      $(element).closest('form').find('legend').removeClass('field-has-error');
    },
    errorPlacement: function(error, element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').append(error);
      } else {
        $(element).closest('.field').append(error);
      }
    }
  });

  $('#preferences-form2').validate({
    rules: {
      'goPaperless2': 'required'
    },
    messages: {
      'goPaperless2': '<img src="/images/icon-svgs/important.svg" alt="Error" class="img-text"> You must agree to the terms and conditions'
    },
    highlight: function(element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').addClass('field-has-error');
      } else {
        $(element).closest('.field').addClass('field-has-error');
      }

      $(element).closest('form').find('legend').addClass('field-has-error');
    },
    unhighlight: function(element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').removeClass('field-has-error');
      } else {
        $(element).closest('.field').removeClass('field-has-error');
      }
      $(element).closest('form').find('legend').removeClass('field-has-error');
    },
    errorPlacement: function(error, element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').append(error);
      } else {
        $(element).closest('.field').append(error);
      }
    }
  });

  $('#add-plan-confirm').on('click', function(e) {
    e.preventDefault();
    document.location = '/profile/profile-combo.html';
  });

  // Functions
  function changeSlide($direction, $this) {
    var $thisSlide = $this.closest('.card').find('.card-slide[aria-hidden=false]'),
        $nextSlide = $thisSlide.next(),
        $prevSlide = $thisSlide.prev(),
        $cardHeight = $this.closest('.card-animation-wrapper').outerHeight();

    $thisSlide.hide();
    $thisSlide.attr('aria-hidden', 'true');

    if ($direction === 'next') {
      $nextSlide.show();
      $nextSlide.attr('aria-hidden', 'false');
    } else if ($direction === 'prev') {
      $prevSlide.show();
      $prevSlide.attr('aria-hidden', 'false');
    }

    if ($nextSlide.is(':last-of-type')) {
      $('html, body').animate({scrollTop: $nextSlide.closest('.card').offset().top - 15}, 300);
    }

    matchCardHeights();
    animateSlide($this, $cardHeight, $direction);

    // If iframe
    var urlPath = window.location.pathname;

    if (urlPath.indexOf('iframe') >= 0) {
      var iframes = $(parent.document).find('iframe');

      iframes.each(function(index, obj) {
        // obj.style.height = obj.contentWindow.document.body.offsetHeight + 'px';
        TweenLite.to($(this), 0.5, {height: obj.contentWindow.document.body.offsetHeight + 'px', ease: Power2.easeOut});
      });
    }
  }

  function animateSlide($this, $height, $direction) {
    TweenLite.set($this.closest('.card-animation-wrapper'), {'height': 'auto'});
    TweenLite.from($this.closest('.card-animation-wrapper'), 0.5, {'height': $height, ease: Power2.easeOut, immediateRender: false});

    if ($direction ==='next') {
      TweenLite.fromTo($this.closest('.card-body'), 0.5, {'opacity': '0', 'transform': 'translateY(-20px)'}, {'opacity': '1', 'transform': 'translateY(0)'});
    } else if ($direction === 'prev') {
      TweenLite.fromTo($this.closest('.card-body'), 0.5, {'opacity': '0', 'transform': 'translateY(20px)'}, {'opacity': '1', 'transform': 'translateY(0)'});
    }
  }

  function matchCardHeights() {

    //$.fn.matchHeight._update();

    $('.row').each(function(i, elem) {
      $(elem)
        .find('.card-animation-wrapper:not(.adding, .editing) .card')
        .matchHeight({
          byRow: false,
          property: 'min-height'
        });
    });
  }

  $('.tooltip-password').tooltipster({
    content: $('#tooltip-password'),
    contentCloning: true,
    contentAsHTML: true,
    interactive: true,
    trigger: 'custom',
    maxWidth: 250,
    side: 'right',
    functionBefore: tooltipEmpty
  });

  var pInstance = $('.tooltip-password').tooltipster('instance');

  //----------------------------------------------------------------------------
  //  Tooltip Events
  //----------------------------------------------------------------------------
  var username = $('#username'),
      password = $('#passwordNew');

  if (password.length > 0) {
    modifyTooltip(password.val(), pInstance);
  }

  password.focus(function(event) {
    pInstance.open();
  });
  password.blur(function(event) {
    pInstance.close();
  });

  // Tooltip password
  password.keyup(function(event) {
    modifyTooltip($(this).val(), pInstance);
  });

  function countFromTo(from, to, reverse) {
    var arr = [];

    if (!reverse) {
      for (from; from <= to; from++) {
        if (from.toString().length === 1) {
          arr.push('0' + from.toString());
        } else {
          arr.push(from.toString());
        }
      }
    } else {
      for (to; to >= from; to--) {
        if (to.toString().length === 1) {
          arr.push('0' + to.toString());
        } else {
          arr.push(to.toString());
        }
      }
    }

    return arr;
  }

  $('.address-form').each(function(i) {
    if (i >= 1) {
      i += 1;
    } else {
      i = '';
    }
    i = i.toString();
    var $form = $(this),
        autoMonth = document.getElementById('startDateMM' + i),
        autoDay = document.getElementById('startDateDD' + i),
        autoYear = document.getElementById('startDateYYYY' + i),
        autoMonthEnd = document.getElementById('endDateMM' + i),
        autoDayEnd = document.getElementById('endDateDD' + i),
        autoYearEnd = document.getElementById('endDateYYYY' + i),
        monthList = countFromTo(1,12),
        dayList = countFromTo(1,31),
        yearList = countFromTo(1930,2017,true);

	  $('#startDateMM' + i).select2({
			data: monthList,
			placeholder: ' '
	  });

	  $('#startDateDD' + i).select2({
			data: dayList,
			placeholder: ' '
	  });

	  $('#startDateYYYY' + i).select2({
			data: yearList,
			placeholder: ' '
	  });

	  $('#endDateMM' + i).select2({
			data: monthList,
			placeholder: ' '
	  });

	  $('#endDateDD' + i).select2({
			data: dayList,
			placeholder: ' '
	  });

	  $('#endDateYYYY' + i).select2({
			data: yearList,
			placeholder: ' '
	  });
});

  //----------------------------------------------------------------------------
  //  Functions
  //----------------------------------------------------------------------------

  // Check if tooltip has children
  function tooltipEmpty(instance, helper) {
    var tooltip = $(instance.content());

    if (tooltip.children().length <= 0) {
      return false;
    }
  }

  function modifyTooltip(val, tooltip) {
    var valArr = val.split(''),
        tooltipContent = $(tooltip.content()).find('p'),
        type = $(tooltip.elementOrigin()).attr('type'),
        updated = false,
        errors = [];
    if (type === 'password') {
      var length = $('<p class="password-length">At least 8 characters</p>'),
          number = $('<p class="password-number">At least 1 number</p>'),
          upper = $('<p class="password-uppercase">An uppercase letter</p>'),
          lower = $('<p class="password-lowercase">A lowercase letter</p>'),
          special = $('<p class="password-special">At least 1 special character (@_-,#)</p>'),
          user = $('<p class="password-username">Cannot be the same as username</p>'),
          first = $('<p class="password-firstname">Cannot be first name</p>'),
          last = $('<p class="password-lastname">Cannot be last name</p>'),
          repeat = $('<p class="password-repeat">Cannot contain four or more repeating numbers, letters, or characters</p>'),
          sequential = $('<p class="password-sequential">Cannot contain three or more sequential numbers or letters (123, ABC)</p>'),
          spaces = $('<p class="password-spaces">No spaces</p>'),
          member = $('<p class="password-member">Cannot use your member ID number</p>'),
          hasRepeat = ((val.match(/(.)\1\1\1+/g)) !== null) ? true : false,
          hasNumber = false,
          hasUpper = false,
          hasLower = false,
          hasUsername = false,
          hasFirst = false,
          hasLast = false,
          hasSeq = false,
          hasSpace = false;

      // Check length
      if (valArr.length < 8) {
        checkError(length, 'add');
      } else {
        checkError(length, 'remove');
      }

      // Loop through characters
      for (i in valArr) {
        var index = parseInt(i),
            ch = valArr[index];

        // Check if number
        if ($.isNumeric(ch)) {
          hasNumber = true;
        }

        // Check if uppercase
        if (ch === ch.toUpperCase() && !$.isNumeric(ch) && /^[a-zA-Z0-9]*$/.test(ch) === true) {
          hasUpper = true;
        }

        // Check if lowercase
        if (ch === ch.toLowerCase() && !$.isNumeric(ch) && /^[a-zA-Z0-9]*$/.test(ch) === true) {
          hasLower = true;
        }

        // Check for sequential characters
        if ((index + 2) <= (valArr.length - 1)) {
          var meSeq = convertAdd([valArr[index], String.fromCharCode(valArr[index].charCodeAt(0) + 1), String.fromCharCode(valArr[index].charCodeAt(0) + 2)]),
              valSeq = convertAdd([valArr[index], valArr[index + 1], valArr[index + 2]]);

          if (meSeq.length === valSeq.length) {
            var b = valSeq.every(function(element, index) {
              return element === meSeq[index];
            });

            if (b) {
              hasSeq = true;
            }
          }

          function convertAdd(v) {
            var arr = [];

            for (character in v) {
              if (/^[a-zA-Z0-9]*$/.test(v[character]) === true) { // If not special character
                arr.push(v[character]);
              } else {
                arr = [];
                break;
              }
            }

            return arr;
          }
        }

        // Check white space
        if (ch.indexOf(' ') >= 0) {
          hasSpace = true;
        }
      }

      // Check for number
      if (!hasNumber) {
        checkError(number, 'add');
      } else {
        checkError(number, 'remove');
      }

      // Check for uppercase
      if (!hasUpper) {
        checkError(upper, 'add');
      } else {
        checkError(upper, 'remove');
      }

      // Check for lowercase
      if (!hasLower) {
        checkError(lower, 'add');
      } else {
        checkError(lower, 'remove');
      }

      // Check for special
      if (/^[a-zA-Z0-9 ]*$/.test(val) === false) {
        checkError(special, 'remove');
      } else {
        checkError(special, 'add');
      }

      // Check if contains username
      if ($('#username').length > 0) {
        if ($('#username').val() === val && val !== '') {
          checkError(user, 'add');
        } else {
          checkError(user, 'remove');
        }
      }

      // Check if contains first name
      if (val.toLowerCase() === 'john') {
        checkError(first, 'add');
      } else {
        checkError(first, 'remove');
      }

      // Check if contains last name
      if (val.toLowerCase() === 'smith') {
        checkError(last, 'add');
      } else {
        checkError(last, 'remove');
      }

      // Check for repeating characters
      if (hasRepeat) {
        checkError(repeat, 'add');
      } else {
        checkError(repeat, 'remove');
      }

      // Check for sequential characters
      if (hasSeq) {
        checkError(sequential, 'add');
      } else {
        checkError(sequential, 'remove');
      }

      // Check for spaces
      if (hasSpace) {
        checkError(spaces, 'add');
      } else {
        checkError(spaces, 'remove');
      }

      // Check for spaces
      if (val === '12345') {
        checkError(member, 'add');
      } else {
        checkError(member, 'remove');
      }
    }

    function checkError(o, f) {
      var thisClass = o.attr('class'),
          newError = true;

      tooltipContent.each(function(index, el) {
        if ($(this).hasClass(thisClass)) {
          if (f === 'add') {
            newError = false;
          } else if (f === 'remove') {
            tooltipContent.splice(index, 1);
            updated = true;
          }
        }
      });

      if (newError && f === 'add') {
        updated = true;
        errors.push(o);
      }
    }

    if (updated === true) {
      var html = '<div id="tooltip-username">';

      // Loop through existing errors
      tooltipContent.each(function(index, el) {
        html += $(this).prop('outerHTML');
      });

      // Loop through new errors
      for (i in errors) {
        html += errors[i].prop('outerHTML');
      }

      html += '</div>';

      tooltip.content(html);

      if (tooltipContent.length === 0 && errors.length === 0) {
        tooltip.close();
      } else {
        if (!tooltip.status().open && $('#' + type).is(':focus')) {
          tooltip.open();
        }
      }
    }
  }
});
