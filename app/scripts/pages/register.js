$(document).ready(function() {
  //----------------------------------------------------------------------------
  //  Validation
  //----------------------------------------------------------------------------

  $('#register-form').validate({
    rules: {
      'member-id': 'required',
      'username': {required: true, username: true},
      'password': {required: true, password: true},
      'password-confirm': {required: true, equalTo: '#password'},
      'email': 'required',
      'email-confirm': {required: true, equalTo: '#email'},
      'dob-mm': {dob: true, required: true},
      'dob-dd': {dob: true, required: true},
      'dob-yyyy': {dob: true, required: true},
      'medicareID': {orField: '.field-group'},
      'zip': {orField: '.field-single'},
      'firstname': {orField: '.field-single'},
      'lastname': {orField: '.field-single'}
    },
    groups: {
      orGroup: 'medicareID zip firstname lastname',
      dobGroup: 'dob-mm dob-dd dob-yyyy'
    },
    highlight: function(element) {
      if ($(element).closest('.field--dob').length > 0) {
        $(element).closest('.field--dob').addClass('field-has-error');
      } else {
        $(element).closest('.field').addClass('field-has-error');
      }
    },
    unhighlight: function(element) {
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
    errorPlacement: function(error, element) {
      if ($(element).closest('.field--dob').length > 0) {
        element.closest('.field--dob').append(error);
      } else if ($(element).closest('.field-or-option').length > 0) {
        element.closest('.field-or-option').append(error);

      } else {
        element.closest('.field').append(error);
      }
    }
  });

  // Custom rules
  $.validator.addMethod('orField', function(value, element, other) {
    var numberComplete = 0;

    $(other + ' input').each(function(index, el) {
      if ($(this).val() !== '') {
        numberComplete++;
      }
    });

    if (numberComplete <= 0 && value.length < 1) {
      return false;
    } else {
      return true;
    }
  }, 'Completion of at least one set of fields is required.');

  $.validator.addMethod('username', function(value, element) {
    var tooltip = $(uInstance.content()).children().length;

    return this.optional(element) || tooltip <= 0;
  }, 'Username does not meet requirements.');

  $.validator.addMethod('password', function(value, element) {
    var tooltip = $(pInstance.content()).children().length;

    console.log(tooltip);

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

  //----------------------------------------------------------------------------
  //  Page Events
  //----------------------------------------------------------------------------

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

  $('#add-plan-confirm').click(function(event) {
    $('#additional-plan-selector').addClass('hidden');
    $('.additional-plan').removeClass('hidden');
  });

  $('#add-plan-confirm-existing').click(function(event) {
    $('#additional-plan-selector').addClass('hidden');
    $('.additional-plan').removeClass('hidden');
    $('.hidden-warning').removeClass('hidden');
  });

  $('#continue-btn').click(function(event) {
    var valid = $('#register-form').valid();

    if ($('.hidden-warning').is(':visible')) {
      event.preventDefault();
      $('#existingPlanWarningModal').modal('show');
    }

    if (valid) {
      var pathname = window.location.pathname;

      // Step 1
      if (pathname.indexOf('step1') >= 0) {
        if ($('#member-id').val() === '54321') {
          event.preventDefault();

          var additionalInfo = $('#additional-info');

          if (!additionalInfo.is(':visible')) {
            additionalInfo.prev().find('> [class*=col-]').css('z-index', '10');

            additionalInfo.show();

            if (additionalInfo.length > 0 && valid) {
              event.preventDefault();

              TweenLite.fromTo(additionalInfo, 0.8, {
                'opacity': '0',
                'transform': 'translateY(-150px)'
              },{
                'opacity': '1',
                'transform': 'translateY(0)'
              });
            }

            $('html, body').animate({scrollTop: additionalInfo.offset().top}, 500);
            additionalInfo.attr('tabindex', '0').attr('aria-hidden', 'false').focus();
          } else {
            window.location.href = '/register/register-step2.html';
          }
        } else {
          // Set Member ID and DOB in session storage for later use
          var mid = $('#member-id').val(),
              dob = $('.field--dob').find('select'),
              dobVal = [];

          dob.each(function(index, el) {
            dobVal.push($(this).val());
          });

          if (mid.length > 0) {
            sessionStorage.setItem('member-id', mid);
          }

          if (dobVal.length > 0) {
            sessionStorage.setItem('dob', dobVal);
          }
        }
      }

      // Step 2
      if (pathname.indexOf('step2') >= 0) {
        var mplan = $('#additional-plan-selector');

        if (!mplan.is(':visible') && !$('.additional-plan').is(':visible')) {
          event.preventDefault();

          mplan.removeClass('hidden');
          mplan.prev().find('> [class*=col-]').css('z-index', '10');

          TweenLite.fromTo(mplan, 0.8, {
            'opacity': '0',
            'transform': 'translateY(-150px)'
          },{
            'opacity': '1',
            'transform': 'translateY(0)'
          });

          $('html, body').animate({scrollTop: mplan.offset().top}, 500);
          mplan.attr('tabindex', '0').attr('aria-hidden', 'false').focus();
        }
      }
    } else {
      event.preventDefault();
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
  // if (autoMonth !== null && autoDay !== null && autoYear !== null) {
  //   var awesomeMonth = new Awesomplete(autoMonth, {
  // 	   list: monthList,
  //      minChars: 0,
  //      maxItems: monthList.length,
  //      autoFirst: true
  //   });

  //   var awesomeDay = new Awesomplete(autoDay, {
  // 	   list: dayList,
  //      minChars: 0,
  //      maxItems: dayList.length,
  //      autoFirst: true
  //   });

  //   var awesomeYear = new Awesomplete(autoYear, {
  // 	   list: yearList,
  //      minChars: 0,
  //      maxItems: yearList.length,
  //      sort: false,
  //      autoFirst: true,
  //   });

  //   $('.field--dob .field-input:first-of-type .material-icons').on('click keypress', function(event) {
  //     var eventType = event.type;

  //     if (eventType === 'click' || event.keyCode === 32 || event.keyCode === 13) {
  //       if (awesomeMonth.ul.childNodes.length === 0) {
  //         awesomeMonth.evaluate();
  //         awesomeDay.close();
  //         awesomeYear.close();
  //       }
  //       else if (awesomeMonth.ul.hasAttribute('hidden')) {
  //         awesomeMonth.open();
  //         awesomeDay.close();
  //         awesomeYear.close();
  //       }
  //       else {
  //         awesomeMonth.close();
  //       }
  //     }
  //   });

  //   $('.field--dob .field-input:nth-of-type(2) .material-icons').on('click keypress', function(event) {
  //     var eventType = event.type;

  //     if (eventType === 'click' || event.keyCode === 32 || event.keyCode === 13) {
  //       if (awesomeDay.ul.childNodes.length === 0) {
  //     		awesomeDay.evaluate();
  //         awesomeMonth.close();
  //         awesomeYear.close();
  //     	}
  //     	else if (awesomeDay.ul.hasAttribute('hidden')) {
  //     		awesomeDay.open();
  //         awesomeMonth.close();
  //         awesomeYear.close();
  //     	}
  //     	else {
  //     		awesomeDay.close();
  //     	}
  //     }
  //   });

  //   $('.field--dob .field-input:nth-of-type(3) .material-icons').on('click keypress', function(event) {
  //     var eventType = event.type;

  //     if (eventType === 'click' || event.keyCode === 32 || event.keyCode === 13) {
  //       if (awesomeYear.ul.childNodes.length === 0) {
  //         awesomeYear.evaluate();
  //         awesomeMonth.close();
  //         awesomeDay.close();
  //       }
  //       else if (awesomeYear.ul.hasAttribute('hidden')) {
  //         awesomeYear.open();
  //         awesomeMonth.close();
  //         awesomeDay.close();
  //       }
  //       else {
  //         awesomeYear.close();
  //       }
  //     }
  //   });

  //   $('.field-input .material-icons').on('blur focusout', function(event) {
  // 		awesomeMonth.close();
  //     awesomeDay.close();
  //     awesomeYear.close();
  //   });

  //   $('body').on('awesomplete-open awesomplete-close', $(autoYear, autoDay, autoMonth), function(e) {
  //   	checkDropdownPosition(e.target);
  //   });

  //   $('.overflow-wrapper').attr('hidden','hidden');
  // }

  //----------------------------------------------------------------------------
  //  Tooltips
  //----------------------------------------------------------------------------

  $('.tooltip-username').tooltipster({
    content: $('#tooltip-username'),
    contentCloning: true,
    contentAsHTML: true,
    interactive: true,
    trigger: 'custom',
    maxWidth: 250,
    side: 'right',
    functionBefore: tooltipEmpty
  });

  var uInstance = $('.tooltip-username').tooltipster('instance');

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
      password = $('#password');

  // Populate lists on load
  if (username.length > 0) {
    modifyTooltip(username.val(), uInstance);
  }
  if (password.length > 0) {
    modifyTooltip(password.val(), pInstance);
  }

  // Open/Close on focus
  username.focus(function(event) {
    uInstance.open();
  });
  username.blur(function(event) {
    uInstance.close();
  });

  // Tooltip username
  username.keyup(function(event) {
    modifyTooltip($(this).val(), uInstance);
  });

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

// function openAutocomplete(me, e) {
//   if (e.keyCode === 32 || e.keyCode === 13) {
//     var inputID = $(me).closest('.field-input').find('input').attr('id');

//     switch (inputID) {
//       case 'date-mm':
//         if (awesomeMonth.ul.childNodes.length === 0) {
//           awesomeMonth.evaluate();
//           awesomeDay.close();
//           awesomeYear.close();
//         }
//         else if (awesomeMonth.ul.hasAttribute('hidden')) {
//           awesomeMonth.open();
//           awesomeDay.close();
//           awesomeYear.close();
//         }
//         else {
//           awesomeMonth.close();
//         }
//       break;
//     }
//   }
// }
