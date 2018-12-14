$(document).ready(function() {
  // Tooltip
  $('.tooltip-aarp-card').tooltipster({
    content: $('#tooltip-aarp-card'),
    contentCloning: true,
    contentAsHTML: true,
    interactive: true,
    trigger: 'click',
    maxWidth: 450
  });

  // Textarea counter
  if ($('.ask-question-message').length > 0) {
    $('.ask-question-message textarea').keyup(function(event) {
      var $length = $(this).val().length,
          $charLeft = 1000 - $length;

      $(this).closest('.ask-question-message').find('.message-count').html($charLeft);
    });
  }

  // Show new email fields
  $('input[name=message-email-type]').change(function(event) {
    if ($('#message-new-email').is(':checked')) {
      $('#new-email-fields').removeClass('hidden');
    } else {
      $('#new-email-fields').addClass('hidden');
    }
  });

  // Add alt email click
  $('#add-alt-email').click(function(event) {
    event.preventDefault();

    $(this).addClass('hidden');
    $('#alt-email-wrapper').removeClass('hidden');
  });

  // Add alt phone number click
  $('#add-alt-phone').click(function(event) {
    event.preventDefault();

    $(this).addClass('hidden');
    $('#alt-phone-wrapper').removeClass('hidden');
  });

  // Start call form
  $('#call-btn').click(function(event) {
    event.preventDefault();
    changeSlide('next', $(this));
  });

  // Cancel call form
  $('#call-cancel').click(function(event) {
    event.preventDefault();
    changeSlide('prev', $(this));
  });

  // Start message form
  $('#message-btn').click(function(event) {
    event.preventDefault();
    changeSlide('next', $(this));
  });

  // Cancel message form
  $('#message-cancel').click(function(event) {
    event.preventDefault();
    changeSlide('prev', $(this));
  });

  // Start question form
  $('#question-btn').click(function(event) {
    event.preventDefault();
    changeSlide('next', $(this));
  });

  // Cancel question form
  $('#question-cancel').click(function(event) {
    event.preventDefault();
    changeSlide('prev', $(this));
  });

  // Show more info on select
  $('#call-question-about').change(function(event) {
    if ($(this).val() === 'Other') {
      $('#call-more-info').closest('.field').removeClass('hidden');
    } else {
      $('#call-more-info').closest('.field').addClass('hidden');
    }
  });

  // Validation
  $('#call-form').validate({
    rules: {
      'call-number': 'required',
      'call-more-info': 'required'
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

  $('#message-form').validate({
    rules: {
      'message-email': {required: true, email: true},
      'message-email-confirm': {required: true, equalTo: '#message-email'}
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

  var test = $('#question-form').validate({
    rules: {
      'question-message': 'required',
      'question-member-number': 'required',
      'question-first-name': 'required',
      'question-last-name': 'required',
      'question-email': {required: true, email: true},
      'question-email-confirm': {required: true, equalTo: '#question-email'},
      'dob-mm': {dob: true, required: true},
      'dob-dd': {dob: true, required: true},
      'dob-yyyy': {dob: true, required: true},
      'question-alt-email': {required: function() {
        return ($('#question-alt-email-confirm').val().length > 0 || $('#question-alt-email').val().length > 0);
      }, email: true},
      'question-alt-email-confirm': {required: function() {
        return ($('#question-alt-email-confirm').val().length > 0 || $('#question-alt-email').val().length > 0);
      }, equalTo: '#question-alt-email'},
      'question-alt-phone': {required: function() {
        return ($('#question-alt-phone-confirm').val().length > 0 || $('#question-alt-phone').val().length > 0);
      }},
      'question-alt-phone-confirm': {required: function() {
        return ($('#question-alt-phone-confirm').val().length > 0 || $('#question-alt-phone').val().length > 0);
      }, equalTo: '#question-alt-phone'}
      // 'question-address': 'required',
      // 'question-city': 'required',
      // 'question-state': 'required',
      // 'question-zip': 'required'
    },
    //onfocusout: false,
    groups: {
      dobGroup: 'dob-mm dob-dd dob-yyyy'
      //,emailGroup: 'question-alt-email question-alt-email-confirm'
    },
    showErrors: function(errorMap, errorList) {
      //console.log(errorMap, errorList);
      this.defaultShowErrors();
    },
    highlight: function(element) {
      if ($(element).prop('id') == 'question-alt-email-confirm') {
        if ($(element).val().length > 0) {
          $('#question-alt-email').closest('.field').addClass('field-has-error');
        }
      }

      if ($(element).prop('id') == 'question-alt-phone-confirm') {
        if ($(element).val().length > 0) {
          $('#question-alt-phone').closest('.field').addClass('field-has-error');
        }
      }

      if ($(element).closest('.field--dob').length > 0) {
        $(element).closest('.field--dob').addClass('field-has-error');
      } else {
        $(element).closest('.field').addClass('field-has-error');
      }
    },
    unhighlight: function(element) {
      if ($(element).prop('id') == 'question-alt-email-confirm') {
        $('#question-alt-email').parents('.field').removeClass('field-has-error');
      }
      if ($(element).prop('id') == 'question-alt-email') {
        if ($('#question-alt-email-confirm').val().length <= 0) {
          $('#question-alt-email-confirm').closest('.field').removeClass('field-has-error');
          $('#question-alt-email-confirm').closest('.field').find('.error').remove();
        }
      }

      if ($(element).prop('id') == 'question-alt-phone-confirm') {
        $('#question-alt-phone').parents('.field').removeClass('field-has-error');
      }
      if ($(element).prop('id') == 'question-alt-phone') {
        if ($('#question-alt-phone-confirm').val().length <= 0) {
          $('#question-alt-phone-confirm').closest('.field').removeClass('field-has-error');
          $('#question-alt-phone-confirm').closest('.field').find('.error').remove();
        }
      }

      if ($(element).closest('.field--dob').length > 0) {
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
      }
    },
    invalidHandler: function(event, validator) {
      // 'this' refers to the form
      var errors = validator.numberOfInvalids();
      if (errors) {
        var message = errors == 1
          ? 'You missed 1 field. It has been highlighted'
          : 'You missed ' + errors + ' fields. They have been highlighted';
        $('div.error span').html(message);
        $('div.error').show();
      } else {
        $('div.error').hide();
      }
    },
    errorPlacement: function(error, element) {
      if ($(element).closest('.field--dob').length > 0) {
        element.closest('.field--dob').append(error);
      } else {
        element.closest('.field').append(error);
      }
      // console.log($(element), error)
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

  // Call submit
  $('#call-form').submit(function(event) {
    event.preventDefault();

    var $formValid = $('#call-form').valid();

    if ($formValid) {
      changeSlide('next', $(this));
    }
  });

  // Message submit
  $('#message-form').submit(function(event) {
    event.preventDefault();

    var $formValid = $('#message-form').valid(),
        $val = $(this).find('input[type=radio]:checked').val();

    if ($val === 'message-old-email') {
      changeSlide('next', $(this));
    } else {
      if ($formValid) {
        changeSlide('next', $(this));
      }
    }
  });

  // Question submit
  $('#question-submit').on('click', function(event) {
    event.preventDefault();

    var $formValid = $('#question-form').valid();


    if ($formValid) {
      changeSlide('next', $(this));

      $('html, body').animate({scrollTop: $(this).closest('.card').offset().top - 50}, 300)
    }
  });

  var autoMonth = document.getElementById('date-mm'),
      autoDay = document.getElementById('date-dd'),
      autoYear = document.getElementById('date-yyyy'),
      monthList = countFromTo(1,12),
      dayList = countFromTo(1,31),
      yearList = countFromTo(1930,2017,true);

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

  $('#date-mm').select2({
		data: monthList,
		placeholder: ' '
  });

  $('#date-dd').select2({
		data: dayList,
		placeholder: ' '
  });

  $('#date-yyyy').select2({
		data: yearList,
		placeholder: ' '
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

    animateSlide($this, $cardHeight, $direction);
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

  jQuery.extend(jQuery.validator.messages, {
    equalTo: 'Enter a value that matches the value above.'
  });
});
