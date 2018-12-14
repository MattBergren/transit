$(document).ready(function() {
  $('.js-document-date').each(function() {
    var $that = $(this);
    $that.change(function () {
        var paymentsToView = $('option', $that).filter(':selected').val();
        var customDates = $that.closest('.js-history-filters').find('.js-customhistorydates')

        if (paymentsToView === 'custom-search') {
            toggleCustomHistoryDates(customDates, true)
        } else {
            toggleCustomHistoryDates(customDates, false)
        }
    });
  });

    function toggleCustomHistoryDates(customDates, isVisible) {
        if (isVisible) {
            customDates.removeClass('hidden')
        } else {
            customDates.addClass('hidden')
        }

    }

    if ($('.collapse-close').length >= 0) {
      $('.collapse-close').click(function(event) {
        event.preventDefault();

        var $collapseID = '#' + $(this).closest('.collapse-wrapper').find('.collapse').attr('id');

        $($collapseID).collapse('hide');

        $('html, body').animate({ scrollTop: $('a[href="' + $collapseID + '"]').offset().top });
      });
    }
});
