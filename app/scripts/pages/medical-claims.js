$(document).ready(function() {
  // Show/hide claims list / Custom search
  $('#claim-type').change(function(event) {
    var $val = $(this).val(),
        $medTable = $('#table-medical'),
        $presTable = $('.table-prescription'),
        $loading = $presTable.closest('.container--base').find('.loading-block');

    switch ($val) {
      case 'medical':
        $loading.show();
        $presTable.hide();
        $medTable.show();
        break;
      default:
        $loading.show();
        $medTable.hide();
        $presTable.show();
    }

    setTimeout(function () {
      $loading.hide();
    }, 300);
  });

  $('#provider-type').change(function(event) {
    var $val = $(this).val();

    $('.provider-result').html('20 claims from ' + $val);
  });

  $('[id*=date-range]').change(function(event) {
    var $val = $(this).val();

    // Show no results message
    if ($val === '30 days') {
      $('.claim-results').hide();
      $('.claim-no-results').removeClass('display-none');
    } else {
      $('.claim-results').show();
      $('.claim-no-results').addClass('display-none');
    }
  });
});
