let drugArr = [];
let providerArr = [];
let providerModal = [];
let drugTotal = 0;
let providerTotal = 0;
let $carousel = $('#provider-carousel');

function changeSlide($direction, $this) {
  let $thisSlide = $this.closest('.card').find('.card-slide[aria-hidden=false]'),
      $nextSlide = $thisSlide.next(),
      $prevSlide = $thisSlide.prev(),
      $cardHeight = $this.closest('.card-animation-wrapper').outerHeight();

  $thisSlide.hide();
  $thisSlide.attr('aria-hidden', 'true');

  if ($direction === 'next') {
    $nextSlide.show();
    $nextSlide.attr('aria-hidden', 'false');
  } else if ($direction === 'prev') {
    $prevSlide.show();
    $prevSlide.attr('aria-hidden', 'false');
  }

  if ($nextSlide.is(':last-of-type')) {
    $('html, body').animate({scrollTop: $nextSlide.closest('.card').offset().top - 15}, 300);
  }

  animateSlide($this, $cardHeight, $direction);
}

function animateSlide($this, $height, $direction) {
  TweenLite.set($this.closest('.card-animation-wrapper'), {'height': 'auto'});
  TweenLite.from($this.closest('.card-animation-wrapper'), 0.5, {'height': $height, ease: Power2.easeOut, immediateRender: false});

  if ($direction ==='next') {
    TweenLite.fromTo($this.closest('.card-body'), 0.5, {'opacity': '0', 'transform': 'translateY(-20px)'}, {'opacity': '1', 'transform': 'translateY(0)'});
  } else if ($direction === 'prev') {
    TweenLite.fromTo($this.closest('.card-body'), 0.5, {'opacity': '0', 'transform': 'translateY(20px)'}, {'opacity': '1', 'transform': 'translateY(0)'});
  }
}

function addRowToDrugTable() {
  $('.phr-drug-table tr:not(.drug-row)').after(`
  <tr class="drug-row drug-row__added-by-me" data-row-id="${drugArr[0].dname}">
    <td data-drug-name="${drugArr[0].dname}" data-drug-strength="${drugArr[0].strength}">
      <span class="added-drug-name">${drugArr[0].name} ${drugArr[0].strength}</span> <a href="#" class="lowercase added-by-me">Added by me</a>
      </td>
    <td data-drug-provider="${drugArr[0].provider}">
      <span class="provider-name">${drugArr[0].provider}</span>
    </td>
    <td data-drug-frequency="${drugArr[0].frequency}">
      <span class="mobile-table-header">Frequency</span>
      <div class="table-dots"></div>
      <span>${drugArr[0].frequency}</span>
    </td>
    <td data-drug-date="${drugArr[0].date}">
      <span class="mobile-table-header">Date Prescribed</span>
      <div class="table-dots"></div>
      <span>${drugArr[0].date}</span>
    </td>
  </tr>`);
}

function addRowToProviderTable() {
  $('.phr-provider-table tr:not(.provider-row)').after(`
  <tr class="provider-row provider-row__added-by-me" data-row-id="${providerArr[0].dname}">
      <td data-provider-name="${providerArr[0].dname}">
        <a href="#" class="provider-name">${providerArr[0].name}</a> <a href="#" class="lowercase added-by-me">Added by me</a>
      </td>
      <td data-provider-specialty="${providerArr[0].specialty}">
        <span class="mobile-table-header">Specialty</span>
        <div class="table-dots"></div>
        <span>${providerArr[0].specialty}</span>
      </td>
      <td data-provider-facility="${providerArr[0].facility}" class="print-only">
        <span class="mobile-table-header">Facility</span>
        <div class="table-dots"></div>
        <span>${providerArr[0].facility}</span>
      </td>
      <td data-provider-city="${providerArr[0].city}" data-provider-state="${providerArr[0].state}">
        <span class="mobile-table-header">Location</span>
        <div class="table-dots"></div>
        <span>${providerArr[0].city}</span>
      </td>
      <td data-provider-phone="${providerArr[0].phone}" class="print-only">
        <span class="mobile-table-header">Phone</span>
        <div class="table-dots"></div>
        <span>${providerArr[0].phone}</span>
      </td>
      <td data-provider-date="${providerArr[0].date}">
        <span class="mobile-table-header">Date of Record</span>
        <div class="table-dots"></div>
        <span>${providerArr[0].date}</span>
      </td>
    </tr>`);

  // Add new provider to carousel modal
  // is carousel initialized?
  if ($carousel.length && !$carousel.hasClass('slick-initialized')) {
    initProviderCarousel();
  }

  // add new provider slide to carousel
  $carousel.slick('slickAdd', `
  <div class="container-fluid" data-slide-name="${providerArr[0].dname}">
    <div id="viewProviderCarouselModalLabel" class="modal-title">
      <h1 class="h4 margin-small" id="provider-name" data-provider-name="${providerArr[0].dname}">${providerArr[0].name}</h1>
      <span class="primary-care-provider"><a href="#" class="lowercase added-by-me">Added by me</a></span>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="table-body margin-small">
          <div class="table-body-row field--row">
            <div class="table-body-cell">
              <label for="provider-name">Specialty:</label>
            </div>
            <div class="table-body-cell" id="provider-specialty">
              ${providerArr[0].specialty}
            </div>
          </div>
          <div class="table-body-row field--row">
            <div class="table-body-cell">
              <label for="provider-facility">Facility:</label>
            </div>
            <div class="table-body-cell" id="provider-facility">
              ${providerArr[0].facility}
            </div>
          </div>
          <div class="table-body-row field--row">
            <div class="table-body-cell">
              <label for="provider-city">City:</label>
            </div>
            <div class="table-body-cell" id="provider-city">
              ${providerArr[0].city}
            </div>
          </div>
          <div class="table-body-row field--row">
            <div class="table-body-cell">
              <label for="provider-phone">Phone:</label>
            </div>
            <div class="table-body-cell" id="provider-phone">
              ${providerArr[0].phone}
            </div>
          </div>
          <div class="table-body-row field--row">
            <div class="table-body-cell">
              <label for="provider-date">Date:</label>
            </div>
            <div class="table-body-cell" id="provider-date">
              ${providerArr[0].date}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`, true);

  // TweenLite.to($('.provider-row.new'), 2, {
  //   delay: 3,
  //   backgroundColor: '#ffffff'
  // });
}

function updateTableTotals() {
  drugTotal = $('.phr-drug-table tbody tr.drug-row').length;
  providerTotal = $('.phr-provider-table').find('tr.provider-row').length;

  $('.show-drug-btn').show();
  $('.show-provider-btn').show();

  $('.drug-showing-total').html($('.phr-drug-table tr.drug-row:not(.row-hidden), .phr-drug-table tr.drug-row.row-visible').length);
  $('.drug-total').text(drugTotal);
  $('.provider-showing-total').html($('.phr-provider-table tr.provider-row:not(.row-hidden), .phr-provider-table tr.provider-row.row-visible').length);
  $('.provider-total').text(providerTotal);

  $('.show-drug-btn, .show-provider-btn').show();

  if (drugTotal <= 7) {
    $('.show-drug-btn').hide();
  }

  if (providerTotal <= 7) {
    $('.show-provider-btn').hide();
  }

  if ($(window).innerWidth() < 768) {
    $('.show-provider-btn').show();
    if (providerTotal <= 4) {
      $('.show-provider-btn').hide();
    }
  }
}

function showRecords(n) {
  $('.phr-table tr:not(:first-child)').each(function () {
    $(this).removeClass('row-hidden row-visible');
    if ($(this).index() > n) {
      $(this).addClass('row-hidden');
    }
  });
}

function getDataObject($row) {
  let dataObj = {};

  $row.find('td').each(function () {
    let obj = $(this).data();
    for (let key in obj) {
      dataObj[key] = obj[key] == '--' ? '' : obj[key];
    }
  });

  return dataObj;
}

function showProviderCarouselModal(idx) {
  $('#provider-carousel').data('slide-index', (idx - 1));
  $('#viewProviderCarouselModal').modal('toggle');
}

function showProviderModal($row) {
  let dataObj = getDataObject($row);

  $('#viewProviderModal #provider-name').text($row.find('.provider-name').text());
  $('#viewProviderModal #provider-specialty').text(dataObj.providerSpecialty);
  $('#viewProviderModal #provider-facility').text(dataObj.providerFacility);
  $('#viewProviderModal #provider-city').text(dataObj.providerCity);
  $('#viewProviderModal #provider-state').text(dataObj.providerState);
  $('#viewProviderModal #provider-date').text(dataObj.providerDate);
  $('#viewProviderModal #provider-phone').text(dataObj.providerPhone);
  $('#viewProviderModal').modal('toggle');
}

function showDrugModal($row) {
  let dataObj = getDataObject($row);
  let name = $row.find('.added-drug-name').text();

  $('#viewDrugModal').data('row-id', dataObj.drugName);
  $('#viewDrugModal #drug-name').val(name);
  $('#viewDrugModal #drug-strength').val(dataObj.drugStrength);
  $('#viewDrugModal #drug-frequency').val(dataObj.drugFrequency);
  $('#viewDrugModal #drug-provider').val(dataObj.drugProvider);
  let arr = dataObj.drugDate.split('/');
  if (arr.length > 1) {
    $('#viewDrugModal #drug-date').val(`${arr[2]}-${arr[0]}-${arr[1]}`);
  }
  $('#viewDrugModal').modal('toggle');
}

function showEditProviderModal($row) {
  let dataObj = getDataObject($row);
  let name = $row.find('.provider-name').text();

  $('#editProviderModal').data('row-id', $row.data('row-id'));
  $('#editProviderModal #provider-name').val(name);
  $('#editProviderModal #provider-specialty').val(dataObj.providerSpecialty);
  $('#editProviderModal #provider-facility').val(dataObj.providerFacility);
  $('#editProviderModal #provider-city').val(dataObj.providerCity);
  $('#editProviderModal #provider-state').val(dataObj.providerState);
  $('#editProviderModal #provider-state').val(dataObj.providerDate);
  let arr = dataObj.providerDate.split('/');
  if (arr.length > 1) {
    $('#editProviderModal #provider-date').val(`${arr[2]}-${arr[0]}-${arr[1]}`);
  }

  // $('#editProviderModal #provider-date').val(dataObj.providerDate);
  $('#editProviderModal #provider-phone').val(dataObj.providerPhone);
  $('#editProviderModal').modal('toggle');
}

function scrollToElement(selector, time, verticalOffset) {
  time = typeof (time) != 'undefined' ? time : 1000;
  verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
  element = $(selector);
  offset = element.offset();
  offsetTop = offset.top + verticalOffset;
  $('html, body').animate({
    scrollTop: offsetTop
  }, time);
}

function formatDate(date) {
  if (date.indexOf('/') > -1) { return date; }
  let arr = date.split('-');
  let finalDate = `${arr[1]}/${arr[2]}/${arr[0]}`;
  return finalDate;
}

function resetShowAllButton () {
  $('.show-drug-btn, .show-provider-btn').removeClass('showingAll');
  $('.show-drug-btn, .show-provider-btn').text('Show All');
}

function initProviderCarousel() {
  $carousel.slick({
    adaptiveHeight: true,
    infinite: false,
    nextArrow: $('.slick-next--provider'),
    prevArrow: $('.slick-prev--provider'),
    initialSlide: $carousel.data('slide-index')
  });
}

function removeFromCarousel(name) {
  $carousel.slick('slickRemove', $carousel.find(`[data-slide-name='${name}']`).data('slick-index'));
}

$(document).ready(function() {
  $('.phr-drug-table').addClass('phr-drug-table--isLoaded');

  // remove divider and mirum logo
  $('.logo-container .logo-divider, .logo-container img:last-of-type').hide();

  let date = new Date();
  // $('#addProviderModal input[name="provider-date"]').val(date.toLocaleDateString());
  // $('#addDrugModal input[name="drug-date"]').val(date.toLocaleDateString());

  $(window).on('resize', function () {
    updateTableTotals();

    if (!$('body').hasClass('expanded')) {
      resetShowAllButton();
      if ($(window).innerWidth() < 768) {
        // show 4 records on mobile
        showRecords(4);
      } else {
        // show 7 records on desktop
        showRecords(7);
      }
    }

    updateTableTotals();
  }).trigger('resize');

	$(document).on('click', '.provider-row', function(e) {
    e.preventDefault();
    // showProviderModal($(this));
    if (!$(e.target).hasClass('added-by-me')) {
      showProviderCarouselModal($(this).index());
    }
  });

  // added by me link in drug table
  $(document).on('click', '.drug-row a.added-by-me', function (e) {
    e.preventDefault();
    showDrugModal($(this).closest('.drug-row'));
  });

  // added by me link in provider table
  $(document).on('click', '.provider-row a.added-by-me', function (e) {
    e.preventDefault();
    showEditProviderModal($(this).closest('.provider-row'));
  });

  // added by me link in provider carousel
  $(document).on('click', '.primary-care-provider a.added-by-me', function (e) {
    e.preventDefault();
    let pname = $(this).closest('.container-fluid').data('slide-name');
    let $td = $('.phr-provider-table').find(`td[data-provider-name=${pname}]`);
    $('#viewProviderCarouselModal').modal('hide');

    let st = setTimeout(() => {
      showEditProviderModal($td.closest('.provider-row'));
    }, 500);
  });

	$('.phr-print-button').on('click', function(e) {
    e.preventDefault();
		window.print();
  });

	$('.show-drug-btn').on('click', function(e) {
    e.preventDefault();
		let $rows = $('.phr-drug-table tr.row-hidden');

		if (!$(this).hasClass('showingAll')) {
      $(this).addClass('showingAll');
      $rows.addClass('row-visible');
      $(this).text('Show Fewer');
      $('body').addClass('expanded');
    } else {
			$(this).removeClass('showingAll');
      $rows.removeClass('row-visible');
      $(this).text('Show All');
      $('body').removeClass('expanded');
    }

    updateTableTotals();
    scrollToElement('#Drugs', 500, -30);
  });

  $('.show-provider-btn').on('click', function (e) {
    e.preventDefault();
    let $rows = $('.phr-provider-table').find('tr.row-hidden');

    if (!$(this).hasClass('showingAll')) {
      $(this).addClass('showingAll');
      $rows.addClass('row-visible');
      $(this).text('Show Fewer');
      $('body').addClass('expanded');
    } else {
      $(this).removeClass('showingAll');
      $rows.removeClass('row-visible');
      $(this).text('Show All');
      $('body').removeClass('expanded');
    }

    updateTableTotals();
    scrollToElement('#Providers', 500, -30);
  });

  $('.delete-provider-btn').on('click', function (e) {
    changeSlide('next', $(this));
    $('#editProviderModal').find('.modal-title h1').text('Delete Provider');
  });

  $('.delete-provider-yes').on('click', function () {
    let rowid = $('#editProviderModal').data('row-id');
    $('.phr-provider-table').find(`[data-row-id='${rowid}']`).remove();
    updateTableTotals();
    $('#editProviderModal').find('.modal-title h1').text('Edit or Delete Provider');
    $('#editProviderModal').modal('hide');
    removeFromCarousel(rowid);
    // $carousel.slick('slickRemove', $carousel.find(`[data-slide-name='${rowid}']`).data('slick-index'));
  });

  $('.delete-provider-no').on('click', function () {
    changeSlide('prev', $(this));
    $('#editProviderModal').find('.modal-title h1').text('Delete Provider');
  });

  $('.save-provider-btn').on('click', function () {
    let valid = $('#edit-provider-form').valid();
    let rowid = $('#editProviderModal').data('row-id');

    if (valid) {
      $('.phr-provider-table').find(`[data-row-id='${rowid}']`).remove();

      let $el = {
        'name': $('#edit-provider-form input[name="provider-name"]'),
        'specialty': $('#edit-provider-form select[name="provider-specialty"]'),
        'city': $('#edit-provider-form input[name="provider-city"]'),
        'state': $('#edit-provider-form input[name="provider-state"]'),
        'facility': $('#edit-provider-form input[name="provider-facility"]'),
        'phone': $('#edit-provider-form input[name="provider-phone"]'),
        'date': $('#edit-provider-form input[name="provider-date"]')
      }

      let formObj = {};

      formObj.name = $el.name.val();
      formObj.specialty = $el.specialty.val() || '--';
      formObj.facility = $el.facility.val() || '--';
      // formObj.location = $el.city.val() || '--';
      formObj.city = $el.city.val() || '--';
      formObj.phone = $el.phone.val() || '--';
      // formObj.state = $el.state.val();
      formObj.date = $el.date.val() ? formatDate($el.date.val()) : '--';

      providerArr.pop();
      providerArr.push(formObj);

      removeFromCarousel(rowid);
      addRowToProviderTable();
      updateTableTotals();

      $('#editProviderModal').modal('hide');

      document.getElementById('edit-provider-form').reset();
    }
  });

  $('.delete-drug-btn').on('click', function(e) {
    changeSlide('next', $(this));
    $('#viewDrugModal').find('.modal-title h1').text('Delete Drug');
  });

  $('.delete-drug-yes').on('click', function() {
    let rowid = $('#viewDrugModal').data('row-id');
    $('.phr-drug-table').find(`[data-row-id='${rowid}']`).remove();
    updateTableTotals();
    $('#viewDrugModal').find('.modal-title h1').text('Edit or Delete Drug');
    $('#viewDrugModal').modal('hide');
  });

  $('.delete-drug-no').on('click', function() {
    changeSlide('prev', $(this));
    $('#viewDrugModal').find('.modal-title h1').text('Edit or Delete Drug');
  });

  $('.save-drug-btn').on('click', function(e) {
    e.preventDefault();
    let valid = $('#edit-drug-form').valid();
    let rowid = $('#viewDrugModal').data('row-id');

    if (valid) {
      $('.phr-drug-table').find(`[data-row-id='${rowid}']`).remove();

      let $el = {
        'name': $('#edit-drug-form input[name="drug-name"]'),
        'frequency': $('#edit-drug-form input[name="drug-frequency"]'),
        'strength': $('#edit-drug-form input[name="drug-strength"]'),
        'provider': $('#edit-drug-form input[name="drug-provider"]'),
        'date': $('#edit-drug-form input[name="drug-date"]')
      }

      let formObj = {};

      formObj.name = $el.name.val();
      formObj.frequency = $el.frequency.val() || '--';
      formObj.strength = $el.strength.val() || '';
      formObj.provider = $el.provider.val() || '--';
      formObj.date = $el.date.val() ? formatDate($el.date.val()) : '--';

      drugArr.pop();
      drugArr.push(formObj);

      addRowToDrugTable();
      updateTableTotals();

      $('#viewDrugModal').modal('hide');

      document.getElementById('edit-drug-form').reset();
    }
  });

  $('.add-drug-form-button').on('click', function(e) {
    e.preventDefault();

    let valid = $('#add-drug-form').valid();

    if (valid) {
      let $el = {
        'name': $('#add-drug-form input[name="drug-name"]'),
        'frequency': $('#add-drug-form input[name="drug-frequency"]'),
        'strength': $('#add-drug-form input[name="drug-strength"]'),
        'provider': $('#add-drug-form input[name="drug-provider"]'),
        'date': $('#add-drug-form input[name="drug-date"]')
      }

      let formObj = {};
      let str = $el.name.val();

      formObj.dname = str.replace(/\W+/g, '-').toLowerCase();
      formObj.name = $el.name.val();
      formObj.frequency = $el.frequency.val() || '--';
      formObj.strength = $el.strength.val() || '';
      formObj.provider = $el.provider.val() || '--';
      formObj.date = $el.date.val() ? formatDate($el.date.val()) : '--';

      drugArr.pop();
      drugArr.push(formObj);

      addRowToDrugTable();
      updateTableTotals();

      $('#addDrugModal').modal('hide');

      document.getElementById('add-drug-form').reset();
    }
  });

  $('.add-provider-form-button').on('click', function (e) {
    e.preventDefault();
    let valid = $('#add-provider-form').valid();

    if (valid) {
      let $el = {
        'name': $('#add-provider-form input[name="provider-name"]'),
        'specialty': $('#add-provider-form select[name="provider-specialty"]'),
        'city': $('#add-provider-form input[name="provider-city"]'),
        'state': $('#add-provider-form input[name="provider-state"]'),
        'facility': $('#add-provider-form input[name="provider-facility"]'),
        'phone': $('#add-provider-form input[name="provider-phone"]'),
        'date': $('#add-provider-form input[name="provider-date"]')
      }

      let formObj = {};
      let str = $el.name.val();

      formObj.dname = str.replace(/\W+/g, '-').toLowerCase();
      formObj.name = $el.name.val();
      formObj.specialty = $el.specialty.val() || '--';
      formObj.facility = $el.facility.val() || '--';
      // formObj.location = $el.city.val() || '--';
      formObj.city = $el.city.val() || '--';
      formObj.phone = $el.phone.val() || '--';
      // formObj.state = $el.state.val();
      formObj.date = $el.date.val() ? formatDate($el.date.val()) : '--';

      providerArr.pop();
      providerArr.push(formObj);

      addRowToProviderTable();
      updateTableTotals();

      $('#addProviderModal').modal('hide');

      document.getElementById('add-provider-form').reset();
    }
  });

  let drugValidator = $('#add-drug-form').validate({
    rules: {
      'drug-name': 'required',
    },
    highlight: function (element) {
      $(element).closest('.field--row').addClass('field-has-error');
    },
    unhighlight: function (element) {
      $(element).closest('.field--row').removeClass('field-has-error');
    },
    errorPlacement: function (error, element) {
      element.closest('.field--row').find('.table-body-cell:nth-of-type(2)').append(error);
    }
  });

  let editDrugValidator = $('#edit-drug-form').validate({
    rules: {
      'drug-name': 'required',
    },
    highlight: function (element) {
      $(element).closest('.field--row').addClass('field-has-error');
    },
    unhighlight: function (element) {
      $(element).closest('.field--row').removeClass('field-has-error');
    },
    errorPlacement: function (error, element) {
      element.closest('.field--row').find('.table-body-cell:nth-of-type(2)').append(error);
    }
  });

  let providerValidator = $('#add-provider-form').validate({
    rules: {
      'provider-name': 'required',
    },
    highlight: function (element) {
      $(element).closest('.field--row').addClass('field-has-error');
    },
    unhighlight: function (element) {
      $(element).closest('.field--row').removeClass('field-has-error');
    },
    errorPlacement: function (error, element) {
      element.closest('.field--row').find('.table-body-cell:nth-of-type(2)').append(error);
    }
  });

  let editProviderValidator = $('#edit-provider-form').validate({
    rules: {
      'provider-name': 'required',
    },
    highlight: function (element) {
      $(element).closest('.field--row').addClass('field-has-error');
    },
    unhighlight: function (element) {
      $(element).closest('.field--row').removeClass('field-has-error');
    },
    errorPlacement: function (error, element) {
      element.closest('.field--row').find('.table-body-cell:nth-of-type(2)').append(error);
    }
  });

  $('#email-records-form').validate({
    rules: {
      'message-email': 'required',
      'message-email-confirm': 'required'
    },
    highlight: function (element) {
      $(element).closest('.field').addClass('field-has-error');
    },
    unhighlight: function (element) {
      $(element).closest('.field').removeClass('field-has-error');
    },
    errorPlacement: function (error, element) {
      element.closest('.field').find('.table-body-cell:nth-of-type(2)').append(error);
    }
  });

  // Show new email fields
  $('input[name=message-email-type]').change(function (event) {
    if ($('#message-new-email').is(':checked')) {
      $('#new-email-fields').removeClass('hidden');
    } else {
      $('#new-email-fields').addClass('hidden');
    }
  });

  // Message submit
  $('#email-records-form').submit(function (event) {
    event.preventDefault();

    let $formValid = $('#email-records-form').valid(),
      $val = $(this).find('input[type=radio]:checked').val();

    if ($val === 'message-old-email') {
      changeSlide('next', $(this));
      $('.email-cancel-link').hide();
    } else {
      if ($formValid) {
        changeSlide('next', $(this));
        $('.email-cancel-link').hide();
      }
    }
  });

  $('#message-send').on('click', function(e) {
    changeSlide('prev', $(this));
  });

  $('#addDrugModal, #addProviderModal').on('show.bs.modal', function (e) {
    $(this).find('form').get(0).reset();
  });

  $('#viewProviderCarouselModal').on('shown.bs.modal', function (e) {
    $(this).find('provider-carousel').focus();
    // Provider carousel
    if ($carousel.length && !$carousel.hasClass('slick-initialized')) {
      initProviderCarousel();
    } else {
      $carousel.slick('slickGoTo', $carousel.data('slide-index'), true);
    }
  });

  $('#viewDrugModal').on('hidden.bs.modal', function (e) {
    $('#viewDrugModal .card-slide:first-child').show();
    $('#viewDrugModal .card-slide:first-child').attr('aria-hidden', 'false');
    $('#viewDrugModal .card-slide:last-child').hide();
    $('#viewDrugModal .card-slide:last-child').attr('aria-hidden', 'true');
    $('#viewDrugModal').find('.modal-title h1').text('Edit or Delete Drug');
    document.getElementById('edit-drug-form').reset();
  });

  $('#editProviderModal').on('hidden.bs.modal', function (e) {
    $('#editProviderModal .card-slide:first-child').show();
    $('#editProviderModal .card-slide:first-child').attr('aria-hidden', 'false');
    $('#editProviderModal .card-slide:last-child').hide();
    $('#editProviderModal .card-slide:last-child').attr('aria-hidden', 'true');
    $('#editProviderModal').find('.modal-title h1').text('Edit or Delete Provider');
    document.getElementById('edit-provider-form').reset();
  });

  $('#addProviderModal, #editProviderModal').on('hidden.bs.modal', function (e) {
    $(this).find('.field--row').removeClass('field-has-error');
    providerValidator.resetForm();
  });

  $('#addDrugModal, #viewDrugModal').on('hidden.bs.modal', function (e) {
    $(this).find('.field--row').removeClass('field-has-error');
    drugValidator.resetForm();
    editDrugValidator.resetForm();
  });

  $('#viewDrugModal, #editProviderModal, #addDrugModal, #addProviderModal').modalTabbing();

  $(window.document).on('shown.bs.modal', '.modal', function () {
    window.setTimeout(function () {
      $('[data-modalfocus]', this).focus();
    }.bind(this), 100);
  });
});

(function ($) {

  $.fn.modalTabbing = function () {

    var tabbing = function (jqSelector) {
      var inputs = $(jqSelector).find('select, input, textarea, button, a[href]').filter(':visible').not(':disabled');

      //Focus to first element in the container.
      inputs.first().focus();

      $(jqSelector).on('keydown', function (e) {
        if (e.which === 9) {

          var inputs = $(jqSelector).find('select, input, textarea, button, a[href]').filter(':visible').not(':disabled');

          /*redirect last tab to first input*/
          if (!e.shiftKey) {
            if (inputs[inputs.length - 1] === e.target) {
              e.preventDefault();
              inputs.first().focus();
            }
          }
          /*redirect first shift+tab to last input*/
          else {
            if (inputs[0] === e.target) {
              e.preventDefault();
              inputs.last().focus();
            }
          }
        }
      });
    };

    return this.each(function () {
      tabbing(this);
    });

  };
})(jQuery);
