$(document).ready(function() {
  //----------------------------------------------------------------------------
  //  Validation
  //----------------------------------------------------------------------------

  $('#sign-in-form').validate({
    rules: {
      'username': 'required',
      'password': {required: true, password: true},
      'password-confirm': {required: true, equalTo: '#password'},
      'member-id': 'required',
      'dob-mm': {dob: true, required: true},
      'dob-dd': {dob: true, required: true},
      'dob-yyyy': {dob: true, required: true},
      'missing': 'required',
      'lastname': 'required',
      'zipcode': 'required'
    },
    groups: {
      dobGroup: 'dob-mm dob-dd dob-yyyy'
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

  $.validator.addMethod('password', function(value, element) {
    var tooltip = $(pInstance.content()).children().length;

    return this.optional(element) || tooltip <= 0;
  }, 'Password does not meet requirements.');

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

  $('#email-modal-form').validate({
    rules: {
      'email-type': 'required',
      'new-email': 'required',
      'new-email-confirm': {required: true, equalTo: '#new-email'}
    },
    highlight: function highlight(element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').addClass('field-has-error');
      } else {
        $(element).closest('.field').addClass('field-has-error');
      }

      $(element).closest('form').find('legend').addClass('field-has-error');
    },
    unhighlight: function unhighlight(element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').removeClass('field-has-error');
      } else {
        $(element).closest('.field').removeClass('field-has-error');
      }
      $(element).closest('form').find('legend').removeClass('field-has-error');
    },
    errorPlacement: function errorPlacement(error, element) {
      if ($(element).closest('.radio-group').length > 0) {
        $(element).closest('.radio-group').append(error);
      } else {
        $(element).closest('.field').append(error);
      }
    }
  });

  //----------------------------------------------------------------------------
  //  Page Events
  //----------------------------------------------------------------------------

  $('#email-modal-continue').click(function(event) {
    event.preventDefault();

    var valid = $('#email-modal-form').valid();

    if (valid) {
      $('#multipleEmailModal').modal('hide');
    }
  });

  $('[name="email-type"]').change(function(event) {
    if ($(this).val() === 'diff-email') {
      $('.padding-left-large').removeClass('hidden');
    } else {
      $('.padding-left-large').addClass('hidden');
    }
  });

  $('#sign-in-btn').click(function(event) {
    var valid = $('#sign-in-form').valid();

    if (!valid) {
      event.preventDefault();
    }
  });

  $('#missing-btn').click(function(event) {
    var valid = $('#sign-in-form').valid();

    if (valid) {
      event.preventDefault();
      window.location.href = '/sign-in/assistance/sign-in-assistance-additional.html';
    }
  });

  $('#missing-additional-btn').click(function(event) {
    var valid = $('#sign-in-form').valid();

    if (valid) {
      event.preventDefault();
      window.location.href = '/sign-in/assistance/sign-in-assistance-confirm.html';
    }
  });

  $('#change-password-btn').click(function(event) {
    var valid = $('#sign-in-form').valid();

    if (valid) {
      event.preventDefault();
      window.location.href = '/sign-in/assistance/sign-in-new-password-confirmation.html';
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

  // Check if session storage exists and set values
  var mid = sessionStorage.getItem('member-id'),
      dob = sessionStorage.getItem('dob');

  if (mid !== null && mid.length > 0) {
    $('#member-id').attr('value', mid);
  }

  if (dob !== null && dob.length > 0) {
    dob = dob.split(',');

    $(autoMonth).val(dob[0]).trigger('change');
	  $(autoDay).val(dob[1]).trigger('change');
	  $(autoYear).val(dob[2]).trigger('change');
  }

  //----------------------------------------------------------------------------
  //  Tooltips
  //----------------------------------------------------------------------------

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
  var password = $('#password');

  // Populate lists on load
  if (password.length > 0 && password.hasClass('tooltipstered')) {
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
        type = $(tooltip.elementOrigin()).attr('id'),
        updated = false,
        errors = [];

    if (type === 'username') {
      var length = $('<p class="usrnm-length">At least 5 characters</p>'),
          number = $('<p class="usrnm-number">At least 1 number</p>'),
          spaces = $('<p class="usrnm-spaces">No spaces</p>'),
          group = $('<p class="usrnm-group">Cannot use health plan group number</p>'),
          special = $('<p class="usrnm-special">Can contain special characters (@_-,#)</p>'),
          hasNumber = false,
          hasSpace = false;

      // Check length
      if (valArr.length < 5) {
        checkError(length, 'add');
      } else {
        checkError(length, 'remove');
      }

      // Loop through characters
      for (i in valArr) {
        var ch = valArr[i];

        // Check if number
        if ($.isNumeric(ch)) {
          hasNumber = true;
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

      // Check for space
      if (hasSpace) {
        checkError(spaces, 'add');
      } else {
        checkError(spaces, 'remove');
      }

      // Check for special
      if (/^[a-zA-Z0-9@_\-,#. ]*$/.test(val) === false) {
        checkError(special, 'add');
      } else {
        checkError(special, 'remove');
      }
    } else if (type === 'password') {
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
