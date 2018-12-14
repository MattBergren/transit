$(document).ready(function() {
  $('#replace-current-rider').on('click', function() {
      $('#rider-added').removeClass('hidden');
      $('#addBenefitModal').modal('toggle');
  })

  $('#remove-rider-1').on('click', function() {
      $('#rider-removed-1').removeClass('hidden');
      $('#removeBenefitModal').modal('toggle');
  })

  $('#remove-rider-2').on('click', function() {
      $('#rider-removed-2').removeClass('hidden');
      $('#removeBenefitModal2').modal('toggle');
  })
  var tableSelect = document.getElementById('drug-costs');
  tableSelect.addEventListener('change', updateTables);

  createMobileTable('retail');

  function updateTables() {
    var selectValue = $('#drug-costs').val();
    var $retailTable = $('.retail-table');
    var $mailTable = $('.mail-table');

    if (selectValue == 'retail') {
      $('.table-slick-mail').slick('unslick');
      $mailTable.hide();
      $retailTable.show();
      createMobileTable('retail');

    }
    else if (selectValue == 'mail') {
      $('.table-slick-retail').slick('unslick');
      $retailTable.hide();
      $mailTable.show();
      createMobileTable('mail')

    }
  }

  function createMobileTable(table) {
    var tableSlick = $('.table-slick-' + table),
        slideCount = $('.table-slick-slide-' + table).length;

    tableSlick.slick({
      infinite: false,
      adaptiveHeight: true,
      prevArrow: $('.prev-arrow-' + table),
      nextArrow: $('.next-arrow-' + table),
      dots: true,
      appendDots: $('.nav-dots-' + table),
      infiniteScroll: true
    });

    // Equalize table cell height
    function tableCellHeight() {
      // Set th sizes
      this.tables = $('.mobile-table-' + table);
    }

    tableCellHeight.prototype.setTitleHeight = function() {
      var largestHeight = 0,
          thCells = this.tables.find('th[scope=col]');

      // Compare heights
      thCells.each(function() {
        var thisHeight = $(this).outerHeight();

        if (thisHeight > largestHeight) {
          largestHeight = thisHeight;
        }
      });

      // Set height
      thCells.css('height', largestHeight + 'px');
    };

    // Responsive Table
    // Insert data-header into tds
    function insertDataHeader() {
      var responsiveTable = $('.table-responsive'),
          columnCount,
          rowCount,
          thisCol,
          thisRow;

      if (responsiveTable.length) {
        responsiveTable.each(function(index, el) {
          rowCount = $(this).find('tr').length - 1;
          columnCount = $(this).find('tr:first-child th').length;

          // For each column
          for (var i = 0; i < columnCount; i++) {
            thisCol = $(this).find('tr:first-child th:nth-child(' + (i + 1) + ')').html();

            // For each row
            for (var j = 0; j < rowCount; j++) {
              thisRow = $(this).find('tr:nth-child(' + (j + 2) + ') td:nth-child(' + (i + 1) + ')');
              thisRow.prepend('<span class="mobile-table-header">' + thisCol + '</span>')
            }
          }
        });
      }
    }

    //insertDataHeader();

    $('.tooltip-large').tooltipster({
      content: $('#tooltip-large'),
      contentCloning: true,
      contentAsHTML: true,
      interactive: true,
      trigger: 'click',
      maxWidth: 250
    });
    $('.tooltip-small').tooltipster({
      content: $('#tooltip-small'),
      contentCloning: true,
      contentAsHTML: true,
      interactive: true,
      trigger: 'click',
      maxWidth: 250
    });

    tableCellHeight.prototype.setCellHeight = function() {
      // Get row count
      var rowCount = $('.table-slick-slide:first-child .mobile-table tr').length,
          cellHeights = [],
          largestHeight = 0,
          thisCell;

      for (var i = 2; i <= rowCount; i++) {
        // Clear variables
        cellHeights = [];

        // Get all cell heights
        this.tables.each(function() {
          thisCell = $(this).find('tr:nth-child(' + i + ') td');
          // Reset height
          thisCell.css('height', '');
          // If cell exists
          if (thisCell.length) {
            // If no row span
            if (!thisCell[0].hasAttribute('rowspan')) {
              cellHeights.push(thisCell.outerHeight());
            }
          }
        });

        // Find largest height
        largestHeight = Math.max.apply(Math, cellHeights) + 'px';

        // Set heights
        this.tables.each(function() {
          // Set row label height
          $(this).find('tr:nth-child(' + i + ') th[scope=row]').css('height', largestHeight);

          // Set other heights
          thisCell = $(this).find('tr:nth-child(' + i + ') td');
          // If cell exists
          if (thisCell.length) {
            // If no row span
            if (!thisCell[0].hasAttribute('rowspan')) {
              thisCell.css('height', largestHeight);
            }
          }
        });
      }
    }
  }
});
