
$('.payment-form .collapse-toggle').on('click', function() {
  $(this).toggleClass('hidden')
})

$('#showCreditCardForm').on('click', function(event) {
  event.preventDefault()
  $(this).addClass('hidden')
  $('#savedCardRadios :checked').prop('checked', false);
  $('#creditCardForm').removeClass('hidden')
})

$('#savedCardRadios input[type=radio]').change(function(event) {
    if (!$('#creditCardForm').hasClass('hidden')) {
        $('#creditCardForm').addClass('hidden')
        $('#showCreditCardForm').removeClass('hidden');
    }
})

$('#payment-type-form input').change(function(event) {
/* Act on the event */
var inputVal = $(this).val(),
    creditCollapse = $('.collapse#collapseCredit'),
    checkCollapse = $('.collapse#collapseCheck'),
    isHidden = true;

if (inputVal === 'credit') {
  // If check showing
  if (checkCollapse.hasClass('in')) {
    checkCollapse.collapse('hide');
    // After hidden
    checkCollapse.on('hidden.bs.collapse', function() {
      creditCollapse.collapse('show');
    });
  } else {
    creditCollapse.collapse('show');
  }
} else {
  // If credit showing
  if (creditCollapse.hasClass('in')) {
    creditCollapse.collapse('hide');
    // After hidden
    creditCollapse.on('hidden.bs.collapse', function() {
      checkCollapse.collapse('show');
    });
  } else {
    checkCollapse.collapse('show');
  }
}
});

$('#cancelExistingAutoPayButton').on('click', function(e) {
    e.preventDefault()
    $('#cancellingAutomaticPayment').removeClass('hidden')
    $('#editAutomaticPaymentButton').text('Set Up Automatic Payments')
})

$('#cancelExistingRecurringPayButton').on('click', function(e) {
    e.preventDefault()
    $('#cancellingRecurringPayment').removeClass('hidden')
    $('#editRecurringPaymentButton').text('Set Up Recurring Payments')
})

function confirmLegal(e, path) {
    e.preventDefault()
    var agreed = $('#termsAgree:checked').length > 0;
    let checkParent = $('#termsAgree').parents('#termsAgreeWrapper')[0]
    $(checkParent).removeClass('has-error')
    if (!agreed) {
        $(checkParent).addClass('has-error')
    } else {
        window.location.href = path;
    }
}

// Validation
$('#auto-payments').validate({
  rules: {
    'other-amount-number': {'other-amount': true},
    'auto-payments-routing': 'required',
    'auto-payments-routing-confirm': {required: true, equalTo: '#auto-payments-routing'},
    'auto-payments-account-number': 'required',
    'auto-payments-account-number-confirm': {required: true, equalTo: '#auto-payments-routing'},
    'auto-payments-first-name': 'required',
    'auto-payments-last-name': 'required',
    'auto-payments-sig-consent': 'required'
  },
  highlight: function(element) {
    $(element).closest('.field--row').addClass('field-has-error');
  },
  unhighlight: function(element) {
    $(element).closest('.field--row').removeClass('field-has-error');
  },
  errorPlacement: function(error, element) {
    if (element.closest('.field--row').find('.table-body-cell:nth-of-type(2)').length > 0) {
      element.closest('.field--row').find('.table-body-cell:nth-of-type(2)').append(error);
    } else {
      element.closest('.field--row').find('.field-input').append(error);
    }
  }
});

$('#terms-only').validate({
  rules: {
    'termsAgree': 'required'
  },
  highlight: function(element) {
    $(element).closest('.field').addClass('field-has-error');
  },
  unhighlight: function(element) {
    $(element).closest('.field').removeClass('field-has-error');
  },
  errorPlacement: function(error, element) {
    $(element).closest('.field').find('.field-input--radio').append(error);
  }
});

$('#amount-paid').validate({
  rules: {
    'other-amount-number': 'required'
  },
  highlight: function(element) {
    $(element).closest('.field--row').addClass('field-has-error');
  },
  unhighlight: function(element) {
    $(element).closest('.field--row').removeClass('field-has-error');
  },
  errorPlacement: function(error, element) {
    $(element).closest('.field--row').find('.field-input').append(error);
  }
});

$('#payment-form').validate({
  rules: {
    'other-amount-number': 'required'
  },
  highlight: function(element) {
    $(element).closest('.field--row').addClass('field-has-error');
  },
  unhighlight: function(element) {
    $(element).closest('.field--row').removeClass('field-has-error');
  },
  errorPlacement: function(error, element) {
    $(element).closest('.field--row').find('.field-input').append(error);
  }
});

// Call submit
$('.submit-payment').on('click', function(event) {
  event.preventDefault();
  var $formValid = $('#auto-payments').valid();

  $('#auto-payments').submit();
});

// Payment Submit
$('#terms-only-btn').click(function(event) {
  var $formValid = $('#terms-only').valid();

  if (!$formValid) {
    event.preventDefault();
  }
});

$.validator.addMethod('other-amount', function(value, element) {
  var valid = true;
  var $radio = $(element).parents('.field--row').find('input[type="radio"]');

  if ($radio.prop('checked')) {
    if ($(element).val() === '') {
      valid = false;
    }
  }

  if (valid) {
    return true;
  } else {
    return false;
  }
}, 'This field is required.');
