var ccEnchancement = (function() {

    var checkOnFocus = function(selector) {
        $(selector).on('focus', function(){
            $(this).siblings('input[type="radio"]').prop('checked', true);
            $(this).attr('aria-required', 'true');
        });
        $(selector).on('blur', function(){
            $(this).attr('aria-required', 'false');
        });
    };

    var abandonModal = function() {
        var valueEntered = false;
        $('.js-checking-form__form input[type=text]').each(function(){
            var textValue = $(this).val();
            if(textValue != '') {
                valueEntered = true;
            }
        });
    };

    var toggleTableHistory = function() {

        $('.plan-card__table-link').on('click', function(e){
            e.preventDefault();
            if($('.plan-card__toggle-show').is(':visible')) {
                $(this).closest('.plan-card__toggle-show').addClass('hidden').removeClass('show');
                $(this).closest('.plan-card__footer').find('.plan-card__toggle-hide').addClass('show').removeClass('hidden');
            } else {
                $(this).closest('.plan-card__toggle-hide').addClass('hidden').removeClass('show');
                $(this).closest('.plan-card__footer').find('.plan-card__toggle-show').addClass('show').removeClass('hidden');
            }
        });

    };

    var showModalContent = function() {
        $('a[data-target="#moreInfoModal"]').on('click', function(){
            var id = '#' + $(this).data('content');
            $('.modal-content').hide();
            $(id).show();
        });
    };

    return {
        checkOnFocus: checkOnFocus,
        toggleTableHistory: toggleTableHistory,
        showModalContent: showModalContent
    };

})();

ccEnchancement.checkOnFocus('.js-payment-amount-input');
ccEnchancement.toggleTableHistory();
ccEnchancement.showModalContent();