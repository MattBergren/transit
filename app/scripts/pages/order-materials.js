$(document).ready(function() {
  // Hide error on radio select
  $('.select-item-form-ship').change(function(event) {
    var $val = $('.select-item-form-ship input:radio:checked').val();

    $('.form-error').hide();

    if ($val === 'medicare-hospital') {
      $('.hidden-select-block').show();
    } else {
      $('.hidden-select-block').hide();
    }
  });

  $('.select-item-submit').click(function(event) {
    var $formValid;

    if ($(this).closest('.select-item-form').length > 0) {
      $formValid = $(this).closest('.select-item-form').valid();
    } else {
      $formValid = $(this).closest('.select-item-form-ship').valid();
    }

    if (!$formValid) {
      event.preventDefault();
    }
  });

  // Validation
  $('.select-item-form').validate({
    rules: {
      'order-materials': 'required'
    },
    messages: {
      'order-materials': '<img src="/images/icon-svgs/important.svg" alt="Error" class="img-text"> One item must be selected to submit order'
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

  $('.select-item-form-ship').validate({
    rules: {
      'order-materials-ship': 'required'
    },
    messages: {
      'order-materials-ship': '<img src="/images/icon-svgs/important.svg" alt="Error" class="img-text"> One item must be selected to submit order'
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
});
