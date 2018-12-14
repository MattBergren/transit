$(document).ready(function() {
    var addDrugSlick = $('.add-drug-slick');

    var autocomplete = document.getElementById('drug-search-input');

    var awesomecomplete = new Awesomplete(autocomplete, {
        list: drugList,
        minChars: 4
    });

    autocomplete.addEventListener('awesomplete-selectcomplete', function(e) {
        $newDrug['title'] = e.text.label;

        setDrugValues($newDrug);
        // Go to next slide
        changeSlide('next');
    });

    // Cost spinner
    var totalCost = $('.total-cost'),
        costNumber = { cost: 0 };

    // Zip code button clicked
    $('#zipcode-button').click(function(event) {
        event.preventDefault();

        var zipcodeVal = $('#zipcode').val();

        if (zipcodeVal !== '' && $.isNumeric(zipcodeVal)) {
            // Hide other blocks
            $('.mail-service-block').hide();
            $('.pharmacy-standard-block').hide();
            // Show Pharmacy Saver
            $('.pharmacy-saver-block').show();
            $('#collapseMap').collapse('show');

            $('#pharmacy-type input[value=saver]').attr('checked', true);
            $(window).trigger('mapUpdate');
        }
    });

    // Tab arrow click
    $('ul.arrow-tabs li a.arrow-tab-item').click(function(event) {
        $('ul.arrow-tabs li a.arrow-tab-item').removeClass('active');
        $(this).addClass('active');
    });

    // First slide continue
    $('#drug-search-button').click(function(event) {
        event.preventDefault();

        var $altSearch = $('#alt-search');

        $altSearch.hide();
        $altSearch.attr('tabindex', '0');

        var $searchVal = $('#drug-search-input').val(),
            $validate = $('#add-drug-search').valid();

        // Validate input
        if ($validate) {
            if (validateDrugSearch($searchVal)) {
                $newDrug['title'] = $searchVal;

                setDrugValues($newDrug);

                changeSlide('next');
            } else {
                var drug = $('#drug-radios'),
                    other = $('#lipitor-radios');

                if ($searchVal.toLowerCase().indexOf('drug') >= 0) {
                    other.addClass('hidden');
                    drug.removeClass('hidden');
                } else {
                    drug.addClass('hidden');
                    other.removeClass('hidden');
                }
                fadeContent(true, $('#main-search'), $altSearch);
                $altSearch.focus();
            }
        }
    });

    // Second slide continue
    $('#drug-dosage-button').click(function(event) {
        event.preventDefault();

        var $dosageVal = $('#dosage-radios input[type=radio]:checked').val(),
            $qtyVal = $('#quantity').val(),
            $freqVal = $('#frequency').val(),
            $searchVal = $('#drug-search-input').val(),
            $regTitle = `${$searchVal} ${$dosageVal}mg`,
            $genericTitle = `Acme Non-${$searchVal} ${$dosageVal}mg`,
            $valid = $('#add-drug-details').valid();

        if ($valid) {
            // Add to drug array
            $newDrug['qty'] = $qtyVal;
            $newDrug['freq'] = $freqVal;
            $newDrug['dosage'] = $dosageVal;

            setDrugValues($newDrug);

            // Go to next slide
            changeSlide('next');
        }
    });

    // Third slide continue
    $('#save-drug-button').click(function(event) {
        event.preventDefault();

        var $dosageVal = $('#dosage-radios input[type=radio]:checked').val(),
            $searchVal = $('#drug-search-input').val(),
            $genericVal = $('#generic-check input[type=radio]:checked').val(),
            $regTitle = `${$searchVal} ${$dosageVal}mg`,
            $genericTitle = `Acme Non-${$searchVal} ${$dosageVal}mg`;

        if ($genericVal === 'original') {
            // Add to drug array
            $newDrug['title'] = $regTitle;
            $newDrug['generic'] = true;
        } else {
            $newDrug['title'] = $genericTitle;
            $newDrug['generic'] = false;
        }

        // Get random boolean and set drug limits
        var random_boolean = Math.random() >= 0.5;

        if (random_boolean) {
            $newDrug['limits'] = true;
        } else {
            $newDrug['limits'] = false;
        }

        // Create new drug
        Store.push(['DCE', 'savedDrugs', 'drugs'], $newDrug);
        Store.set(['DCE', 'savedDrugs'], { noDrugs: false });

        // Add total costs and saving message
        if (Store.ref(['DCE', 'savedPharmacy']).data['name'] !== undefined) {
            Store.set(['DCE'], { savingsAvail: true });
            setTotalPrice();
        }

        if (random_boolean) {
            // Set tooltips
            $('.tooltip-small').tooltipster({
                content: $('#tooltip-small'),
                contentCloning: true,
                contentAsHTML: true,
                interactive: true,
                trigger: 'click',
                maxWidth: 250
            });
        }

        // Add more drugs text to summary
        var drugCount = Store.ref(['DCE', 'savedDrugs', 'drugs']).data.length;

        if (drugCount > 3) {
            $('.msg-more-drugs').html('<span class="italic">...and ' + (drugCount - 3) + ' other(s)</span>');
        }

        // Refresh match height
        $('.match-height-drug').matchHeight({ remove: true });
        $('.match-height-drug').matchHeight();

        $('#drugModal').modal('hide');

        $('html, body').animate({ scrollTop: $('ul.arrow-tabs').offset().top }, 300);
    });

    // Drug alt back button clicked
    $('#drug-alt-back-button').click(function(event) {
        event.preventDefault();

        fadeContent(true, $('#alt-search'), $('#main-search'));
    });

    $('#add-drug').click(function(event) {
        event.preventDefault();

        $newDrug = {};
        resetModal();
    });

    $('.drug-back').click(function(event) {
        event.preventDefault();

        changeSlide('prev');
    });

    // Change focus on modal close
    $('#drugModal').on('hidden.bs.modal', function(e) {
        $('#add-drug').focus();
    });

    $('a.edit-drug-list').on('click', function(e) {
        e.preventDefault();
        $('a[data-toggle="tab"][href="#drugs-tab"]').trigger('click');
    });

    $('a.edit-pharmacy').on('click', function(e) {
        e.preventDefault();
        $('a[data-toggle="tab"][href="#pharmacy-tab"]').trigger('click');
    });


    //----------------------------------------------------------------------------
    // Validation
    //----------------------------------------------------------------------------

    $('#add-drug-search').validate({
        rules: {
            'drug-search-input': { required: true, minlength: 4 },
            'alt-sug': 'required'
        },
        highlight: function(element) {
            if ($(element).closest('.field').length < 1) {
                $(element)
                    .closest('.field--inline')
                    .addClass('field-has-error');
            } else {
                $(element)
                    .closest('.field')
                    .addClass('field-has-error');
            }
        },
        unhighlight: function(element) {
            if ($(element).closest('.field').length < 1) {
                $(element)
                    .closest('.field--inline')
                    .removeClass('field-has-error');
            } else {
                $(element)
                    .closest('.field')
                    .removeClass('field-has-error');
            }
        },
        errorPlacement: function(error, element) {
            element
                .closest('#add-drug-search')
                .find('.form-error-block')
                .append(error);
        }
    });

    $('#add-drug-details').validate({
        rules: {
            quantity: 'required'
        },
        highlight: function(element) {
            $(element)
                .closest('.field--row-small')
                .addClass('field-has-error');
        },
        unhighlight: function(element) {
            $(element)
                .closest('.field--row-small')
                .removeClass('field-has-error');
        },
        errorPlacement: function(error, element) {
            element
                .closest('.field--row-small')
                .find('.table-body-cell:nth-of-type(2)')
                .append(error);
        }
    });
});

var drugList = ['Drug A', 'Drug B', 'Drug C', 'Drug D', 'Drug E', 'Drug F', 'Drug G', 'Drug H', 'Drug I'],
    $newDrug = {};

//----------------------------------------------------------------------------
// Functions
//----------------------------------------------------------------------------

// Change slide
function changeSlide($direction) {
    var $wrapper = $('.add-drug-animation-wrapper'),
        $wrapperHeight = $wrapper.outerHeight(),
        $thisSlide = $('.add-drug-slide[aria-hidden="false"]'),
        $nextSlide,
        $animateDirection;

    $('#alt-search').hide();
    $('#alt-search').attr('tabindex', '-1');

    if ($direction === 'next') {
        $nextSlide = $thisSlide.next();
        $animateDirection = '-80px';
    } else {
        $nextSlide = $thisSlide.prev();
        $animateDirection = '80px';
    }

    // Check if next slide exists
    if ($nextSlide.length) {
        $thisSlide
            .hide()
            .attr('aria-hidden', 'true')
            .attr('tabindex', '-1');
        $nextSlide
            .show()
            .attr('aria-hidden', 'false')
            .attr('tabindex', '0')
            .focus();

        TweenLite.set($wrapper, { height: 'auto' });
        TweenLite.from($wrapper, 0.5, { height: $wrapperHeight, ease: Power2.easeOut, immediateRender: false });

        // Fade in next slide
        TweenLite.fromTo(
            $nextSlide,
            0.5,
            {
                transform: 'translateY(' + $animateDirection + ')',
                opacity: '0',
                ease: Power2.easeOut
            },
            {
                transform: 'translateY(0)',
                opacity: '1',
                ease: Power2.easeOut
            }
        );
    }
}

// Fade in/out
function fadeContent($animate, $this, $next) {
    var $wrapper = $('.add-drug-animation-wrapper'),
        $wrapperHeight = $wrapper.outerHeight();

    // Check if next slide exists
    $next
        .show()
        .attr('aria-hidden', 'false')
        .attr('tabindex', '0');

    if ($animate) {
        TweenLite.set($wrapper, { height: 'auto' });
        TweenLite.from($wrapper, 0.5, { height: $wrapperHeight, ease: Power2.easeOut, immediateRender: false });

        // Fade in next slide
        TweenLite.fromTo(
            $next,
            0.5,
            {
                opacity: 0,
                ease: Power2.easeOut
            },
            {
                opacity: 1,
                ease: Power2.easeOut
            }
        );
    }
}

// Reset modal
function resetModal() {
    $('#dosage-radios .radio-block:first-of-type input[type=radio]').prop('checked', true);
    $('#quantity').val('30');
    $('#drug-search-input').val('');
    $('#generic-check input[value="original"]').prop('checked', true);

    // Show first slide
    var $visibSlide = $('.add-drug-slide[aria-hidden="false"]'),
        $firstSlide = $('.add-drug .add-drug-slide:first-child');

    $visibSlide.hide();
    $visibSlide.attr('aria-hidden', 'true');

    $firstSlide.attr('aria-hidden', 'false');
    $firstSlide.show();
    $('#alt-search').hide();
    $('.add-drug-slide').removeAttr('style');
}

// Set total price
function setTotalPrice() {
    TweenLite.to(costNumber, 1, { cost: 1234.56, onUpdate: showPrice });

    function showPrice() {
        totalCost.html(costNumber.cost.toFixed(2));
    }

    $('.drug-tiers').html('XX.XX');
}

// Validate drug input
function validateDrugSearch(val) {
    var validation = drugList;

    for (var i = 0; i < validation.length; i++) {
        if (val === validation[i]) {
            return true;
        }
    }
}

function setDrugValues(obj) {
    var addDrug = $('.add-drug');
    // Drug Name
    if ('title' in obj) {
        addDrug.find('.drug-name').html(obj['title']);
        addDrug.find('.drug-name-generic').html('Acme Non-' + obj['title']);
    }
    // Drug Dosage
    if ('dosage' in obj) {
        addDrug.find('.add-drug-slide:nth-child(3) .drug-name').append(' ' + obj['dosage'] + 'mg');
        addDrug.find('.drug-name-generic').append(' ' + obj['dosage'] + 'mg');
    }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Space key press
function btnSpacePress(me, event) {
    if (event.keyCode === 32) {
        event.preventDefault();

        $newDrug['title'] = me.innerHTML;

        setDrugValues($newDrug);
        changeSlide('next');

        $('#drug-search-input').val($newDrug['title']);
    }
}

// Anchor button click
function btnClick(me, event) {
    event.preventDefault();

    $newDrug['title'] = me.innerHTML;

    setDrugValues($newDrug);
    changeSlide('next');

    $('#drug-search-input').val($newDrug['title']);
}

// Open generic modal
function openGenericModal(me, event) {
    event.preventDefault();

    var name = $(me)
        .closest('.drug-container')
        .find('.subtitle')
        .text();

    $('#genericModal')
        .find('.drug-name')
        .html(name);
    $('#genericModal')
        .find('.generic-name')
        .html('Acme Non-' + name);

    $('#genericModal').modal('show');
}
