$(document).ready(function() {
  
  $('.js-payment-date').each(function() {
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
});
