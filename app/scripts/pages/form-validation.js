// FORM ERROR HANDLING -- POP THE ERRORS

// payments specific.
$('[data-form-target]').on('click', function(e) {
    e.preventDefault();
    let formTarget = $(this).data('form-target');
    let goTo = $(this).data('goto');
    validateForm(formTarget, goTo);
})

function validateForm(target, goTo) {
    let formTarget = `[data-form=${target}]`
    let formFields = getRequiredFormFields(formTarget)

    console.log(formFields)
    if (!$('#other-amount').is(':checked')) {

        formFields = formFields.filter(function(field) {
            let targetId = field.target[0].id;
            if (targetId === 'other-amount-number' || targetId === 'total-amount' || targetId === 'other-amount') {
                return false;
            } else {
                return true
            }
        })
    }

    console.log(formFields)

    let hasErrors = checkForErrors(formTarget, formFields)

    if (!hasErrors) {
        window.location.href = goTo;
    }
}

// global form validation -- turned off for now.
// $('[data-form-target]').on('click', function(e) {
//     e.preventDefault();
//     let formTarget = $(this).data('form-target');
//     let goTo = $(this).data('goto');
//     validateForm(formTarget, goTo);
// })

$('[data-formfield]').focus(function() {
    let parentFormField = $(this).parents('.longform__row')[0]
    let target = $(this)
    toggleErrorOnField(target, true)
})

$('[data-form] fieldset :checkbox, [data-form] fieldset :radio').change(function() {
    let parentFormField = $(this).parents('.longform__row')[0]
    let target = $(this)

    // at the beginning, reset them
    toggleErrorOnField(target, true)

    let checkParent = target.closest('fieldset')

    if (checkParent.find(':checked').length < 1) {
        toggleErrorOnField(target)
    }

})

$('[data-formfield]').focusout(function() {

    let parentForm = $(this).parents('[data-form]')[0]
    let target = $(this)

    // only do error toggling if form has already been submitted
    if ($(parentForm).hasClass('has-errors')) {
        let parentFormField = $(this).parents('.longform__row')[0]

        // at the beginning, reset them
        toggleErrorOnField(target, true)
        if (target.is( 'select' )) {
            if (target.find(':selected').is(':disabled')) {
                toggleErrorOnField(target);
            }
        } else if (target.val() == false) {
            toggleErrorOnField(target);
        }
    }

    if ($(this).attr('data-matchfield')) {
        toggleErrorOnField(target, true)
        let matchField = $(this).data('matchfield')

        if ($(this).val() !== $(`[data-formfield=${matchField}]`).val()) {
            toggleErrorOnField(target)
        }
    }

})

function getRequiredFormFields(formTarget) {
    let targetFormFields = [];
    $(`${formTarget} :input:not(:button,:hidden,[data-optional])`).each(function(){
        let thisField = {
            target: $(this),
            value: $(this).val()
        }
        targetFormFields.push(thisField)
    });
    return targetFormFields
}

function checkForErrors(formTarget, formFields) {

    var formHasErrors = false,
        formErrorCount = 0,
        errorSummary = $(`${formTarget} .error-summary`)

    formFields.forEach(function(field) {
        let target = field.target
        // at the beginning, reset them
        toggleErrorOnField(target, true)
        if (target.is(':radio, :checkbox')) {
            let checkParent = target.closest('fieldset')

            if (checkParent.find(':checked').length < 1) {
                toggleErrorOnField(target)
            }
        }
        if (target.is( 'select' )) {
            if (target.find(':selected').is(':disabled')) {
                formErrorCount++;
                toggleErrorOnField(target);
                formHasErrors = true;
            }
        } else if (target.val() == false) {
            formErrorCount++;
            toggleErrorOnField(target);
            formHasErrors = true;
        }

    });

    if (formErrorCount > 0) {
        $(formTarget).addClass('has-errors');
        errorSummary.removeClass('hidden');
        errorSummary.find('.error-summary-count').text(formErrorCount);
    } else {
        errorSummary.addClass('hidden')
    }

    return formHasErrors;
}

function toggleErrorOnField(field, reset) {
    var erroredFieldBlock = field.parents('.longform__row');

    if (reset) {
        erroredFieldBlock.removeClass('has-error')
    } else {
        erroredFieldBlock.toggleClass('has-error');
    }
}

// $('[data-validation]').keypress(function(event) {
//   var key = event.key;
//   var valMethod = $(this).data('validation')
//   if (valMethod === 'numbersAndSpaces') {
//       var regex = /[0-9 ]+/
//       console.log(regex.test(key))
//       return regex.test(key)
//   }
// })
