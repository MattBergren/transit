$(document).ready(function() {
  // // Change filters on plan type select
  // $('#plan-type').change(function(event) {
  //   var $val = $(this).val(),
  //       $retail = $('#retail-checkbox'),
  //       $saver = $('#saver-checkbox');
  //
  //   if ($val === 'Preferred') {
  //     $saver.hide();
  //     $retail.show();
  //   } else {
  //     $retail.hide();
  //     $saver.show();
  //   }
  // });

  // Show county modal
  $('#zipcode-button').click(function(event) {
    event.preventDefault();

    if ($('#zipcode').val() === '12345') {
      $('#countyModal').modal('show');
    }
  });

  // Open filters if desktop
  var $filterBody = $('.filter-body-wrapper'),
      $filterButton = $('.filter-button'),
      $windowWidth = $(window).width();

  if ($windowWidth > 768) {
    TweenLite.set($filterBody, { opacity: 1, height: 'auto', display: 'block' });

    TweenLite.from($filterBody, 0.3, {
      display: 'none',
      height: '0'
    });

    $filterButton.attr('data-filter-open', 'true');
  }

  // Open / close filters
  $filterButton.click(function(event) {
    event.preventDefault();

    var $filterOpen = $(this).attr('data-filter-open');

    $windowWidth = $(window).width();

    // If mobile
    if ($windowWidth <= 768) {
      if ($filterOpen === 'false') {
        TweenLite.set($filterBody, { opacity: 0, height: 'auto' });

        TweenLite.to($filterBody, 0.3, {
          display: 'block',
          opacity: 1,
          top: '85%'
        });

        $(this).attr('data-filter-open', 'true');
      } else {
        TweenLite.to($filterBody, 0.3, {
          display: 'none',
          opacity: 0,
          top: '50%'
        });

        $(this).attr('data-filter-open', 'false');
      }
    } else {
      if ($filterOpen === 'false') {
        TweenLite.set($filterBody, { opacity: 1, height: 'auto', display: 'block' });

        TweenLite.from($filterBody, 0.3, {
          display: 'none',
          height: '0'
        });

        $(this).attr('data-filter-open', 'true');
      } else {
        TweenLite.to($filterBody, 0.3, {
          display: 'none',
          height: '0'
        });

        $(this).attr('data-filter-open', 'false');
      }
    }
  });

  // Filter results and count pharmacies
  $('.pharmacyFilters').change(function(event) {
    $('#filterNumber').html($(this).find('input[type=checkbox]:checked').length);

    // Show loading block
    var $loadingBlock = $('.loading-block');

    if (!$loadingBlock[0].hasAttribute('load-animating')) {
      $loadingBlock.show();
      $loadingBlock.attr('load-animating', 'true');

      setTimeout(function () {
        $loadingBlock.fadeOut('fast');
        $loadingBlock.removeAttr('load-animating');
      }, 300);
    }

    // Filter results
    var $currentFilters = $(this).find('input[type=checkbox]:checked'),
        $resultFilters,
        $thisFilter,
        $newResults = [],
        $filterCount = [];

    // Check each pharmacy
    for (var i = 0; i < $preferredPharmacies.length; i++) {
      $resultFilters = $preferredPharmacies[i].filters;
      $filterCount = [];

      // Check if contains selected filters
      $currentFilters.each(function(index, el) {
        for (var j = 0; j < $resultFilters.length; j++) {
          // Check current pharmacy
          if (el.value === $resultFilters[j]) {
            $filterCount.push('');
            break;
          }
        }
      });

      // If all filters match
      if ($currentFilters.length === $filterCount.length) {
        $newResults.push($preferredPharmacies[i]);
      }
    }

    // Set map pins
    setMarkers(saverMarkers, null);
    setMarkers(saverLabels, null);

    var $newMarkers = [],
        $newLabels = [],
        $markerIndex = 1;

    for (var i = 0; i < $newResults.length; i++) {
      var $thisName = $newResults[i].name;

      // Each marker
      for (var j = 0; j < saverMarkers.length; j++) {
        if ($thisName === saverMarkers[j].title) {
          $newMarkers.push(saverMarkers[j]);
          $newLabels.push(saverMarkers[j]);

          // Change number label
          saverMarkers[j].set('label', {text: $markerIndex, color: 'white'});
          $markerIndex++;
        }
      }
    }

    setMarkers($newMarkers, map);
    setMarkers($newLabels, map);
    centerMap(saverMarkers);

    // Remove all listings from storage
    Store.set(['PL'], {resultList: $newResults});

    if ($newResults.length === 0) {
      Store.set(['PL'], {hasResults: false});
      $('#collapseMap').collapse('hide');
    } else {
      Store.set(['PL'], {hasResults: true});
      $('#collapseMap').collapse('show');
      centerMap(saverMarkers);
    }
  });

  // Add pharmacies to list
  var $preferredPharmacies = [
    {
      'lat': 44.981672,
      'lng': -93.283818,
      'markerNumber': '1',
      'name': 'CVS Pharmacy',
      'address1': '795 Oglethorpe Ave',
      'address2': 'Minneapolis, MN 55408',
      'phone': '612-555-5555 (TTY 711)',
      'distance': '0.81',
      'type': 'standard',
      'filters': [
        'Standard Network Pharmacy',
        'Open 24 Hours',
        'Mail Order Pharmacy'
      ]
    },
    {
      'lat': 44.980445,
      'lng': -93.275313,
      'markerNumber': '2',
      'name': 'Bob\'s Club Pharmacy',
      'address1': '347 Mirum Circle',
      'address2': 'Minneapolis, MN 55408',
      'phone': '612-555-5555 (TTY 711)',
      'distance': '0.93',
      'type': 'saver',
      'filters': [
        'Open 24 Hours',
        'Mail Order Pharmacy',
        'E-Prescribing',
        'Long-Term Care',
        'Home Infusion and Speciality'
      ]
    },
    {
      'lat': 44.976645,
      'lng': -93.259813,
      'markerNumber': '3',
      'name': 'Walblues',
      'address1': '965 Snapple Drive',
      'address2': 'Minneapolis, MN 55408',
      'phone': '612-555-5555 (TTY 711)',
      'distance': '1.36',
      'type': 'saver',
      'filters': [
        'Open 24 Hours',
        'Mail Order Pharmacy',
      ]
    },
    {
      'lat': 44.975702,
      'lng': -93.273759,
      'markerNumber': '4',
      'name': 'UHCMR Pharmacy',
      'address1': '123 Health Drive',
      'address2': 'Minneapolis, MN 55408',
      'phone': '612-555-5555 (TTY 711)',
      'distance': '1.55',
      'type': 'standard',
      'filters': [
        'Standard Network Pharmacy',
        'Open 24 Hours',
        'Mail Order Pharmacy',
      ]
    }
  ];

  for (var i = 0; i < $preferredPharmacies.length; i++) {
    Store.push(['PL', 'resultList'], $preferredPharmacies[i]);
  }

  // Result listing hover
  $('ul.pharmacy-list > li').hover(function() {
    var $index = $(this).index() - 1;

    if ($index >= 0) {
      // Check if any infowindows open
      if (isWindowOpen(saverWindows)) {
        return;
      }

      // Set icon
      if ($preferredPharmacies[$index]) {
        if ($preferredPharmacies[$index].type === 'saver') {
          saverMarkers[$index].setIcon(greenPinImage);
        } else {
          saverMarkers[$index].setIcon(bluePinImage);
        }
      }
    }
  }, function() {
    var $index = $(this).index() - 1;

    if ($index >= 0) {
      // Check if any infowindows open
      if (isWindowOpen(saverWindows)) {
        return;
      }

      // Set icon
      if ($preferredPharmacies[$index]) {
        if ($preferredPharmacies[$index].type === 'saver') {
          saverMarkers[$index].setIcon(greenCircleImage);
        } else {
          saverMarkers[$index].setIcon(blueCircleImage);
        }
      }
    }
  });

  // Get pharmacy type & add to results
  (function() {
    var $pharmacyType = $('#pharmacy-saver').next().html();

    $preferredPharmacies[1]['filters'].unshift($pharmacyType);
    $preferredPharmacies[2]['filters'].unshift($pharmacyType);
  })();


  // console.log(Store.ref(['PL']).data['resultList']);


  //----------------------------------------------------------------------------
  //  Google Maps API
  //----------------------------------------------------------------------------

  var map,
      infoWindows = [],
      saverMarkers = [],
      saverLabels = [],
      saverWindows = [],
      saverWindowContents = [],
      standardMarkers = [],
      standardLabels = [],
      standardWindows = [],
      standardWindowContents = [],
      blueCircleImage = {
        url: '/images/icon-svgs/mapmarker-pill-blue.svg',
        size: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 20),
        scaledSize: new google.maps.Size(40, 40)
      },
      greenCircleImage = {
        url: '/images/icon-svgs/mapmarker-pill-green.svg',
        size: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 20),
        scaledSize: new google.maps.Size(40, 40)
      },
      bluePinImage = {
        url: '/images/icon-svgs/mapmarker-pin-blue.svg',
        size: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 40),
        scaledSize: new google.maps.Size(40, 40)
      },
      greenPinImage = {
        url: '/images/icon-svgs/mapmarker-pin-green.svg',
        size: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 40),
        scaledSize: new google.maps.Size(40, 40)
      };

  // Cost spinner
  var totalCost = $('.total-cost'),
      costNumber = {cost: 0};

  // Initialize map
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(44.979972, -93.277818),
      zoom: 14,
      scrollwheel: false,
      styles:
        [
          {
            'featureType': 'administrative.land_parcel',
            'elementType': 'labels',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'poi.business',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'labels.text',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road.local',
            'elementType': 'labels',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          }
        ]
    });

    // Create saver markers
    for (var i = 0; i < $preferredPharmacies.length; i++) {
      var thisMarker = $preferredPharmacies[i];

      // Create marker
      saverMarkers[i] = new google.maps.Marker({
        position: {
          lat: thisMarker.lat,
          lng: thisMarker.lng
        },
        title: thisMarker.name,
        animation: google.maps.Animation.DROP,
        label: {
          text: (i + 1).toString(),
          color: 'white'
        }
      });

      // Set icon
      if (thisMarker.type === 'saver') {
        saverMarkers[i].setIcon(greenCircleImage);
      } else {
        saverMarkers[i].setIcon(blueCircleImage);
      }

      saverMarkers[i].index = i; //add index property

      // Create label
      saverLabels[i] = new MapLabel({
        text: thisMarker.name,
        position: new google.maps.LatLng(thisMarker.lat, thisMarker.lng),
        fontSize: 14,
        align: 'bottom'
      });

      // Create info window
      if (thisMarker.type === 'saver') {
        saverWindowContents[i] = `
          <p class="color-green-dark bold text-medium margin-extra-small">
            ${saverMarkers[i].title} - ${thisMarker.distance} mi
          </p>
          <p class="margin-none">${thisMarker.address1}</p>
          <a href="#">Get Directions</a>
        `;
      } else {
        saverWindowContents[i] = `
          <p class="color-blue-base bold text-medium margin-extra-small">
            ${saverMarkers[i].title} - ${thisMarker.distance} mi
          </p>
          <p class="margin-none">${thisMarker.address1}</p>
          <a href="#">Get Directions</a>
        `;
      }

      saverWindows[i] = new google.maps.InfoWindow({
        content: saverWindowContents[i],
      });

      // Add click listener
      saverMarkers[i].addListener('click', function () {
        // Close other windows
        closeWindows(saverWindows);
        collapseMarkerIcons(saverMarkers);

        // Set icon
        if ($preferredPharmacies[this.index].type === 'saver') {
          saverMarkers[this.index].setIcon(greenPinImage);
        } else {
          saverMarkers[this.index].setIcon(bluePinImage);
        }

        saverWindows[this.index].open(map, saverMarkers[this.index]);
        map.panTo(saverMarkers[this.index].position);
      });

      // On info window close
      saverWindows[i].addListener('closeclick',function(){
        collapseMarkerIcons(saverMarkers);
      });
    }

    // Close info window on map click
    map.addListener('click', function() {
        closeWindows(saverWindows);
        collapseMarkerIcons(saverMarkers);
    });

    google.maps.event.addDomListener(window, 'resize', function() {
      var mapCenter = map.getCenter();
      google.maps.event.trigger(map, 'resize');
      map.setCenter(mapCenter);
    });
  }

  // Initialize Map
  initMap();
  setMarkers(saverMarkers, map);
  centerMap(saverMarkers);
  setMarkers(saverLabels, map);

  //----------------------------------------------------------------------------
  //  Functions
  //----------------------------------------------------------------------------

  // Set map markers
  function setMarkers(arr, context) {
    for (var i = 0; i < arr.length; i++) {
      // Check if marker selected
      if (!arr[i].get('selected')) {
        arr[i].setMap(context);
      } else {
        arr[i].setMap(context);
        arr[i].setIcon(greenCircleImage);
      }
    }
  }

  // Close all info windows
  function closeWindows(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].close();
    }
  }

  // Collapse all marker icons
  function collapseMarkerIcons(arr) {
    for (var i = 0; i < arr.length; i++) {
      // Check if marker selected
      if ($preferredPharmacies[i].type === 'saver') {
        arr[i].setIcon(greenCircleImage);
      } else {
        arr[i].setIcon(blueCircleImage);
      }

      // console.log(arr[i].get('label').text);

      // add number back in
      // arr[i].set('label', {text: i + 1, color: 'white'});
    }
  }

  // Remove other markers
  function removeOtherMarkers(index, markers, infoWindow) {
    for (var i = 0; i < markers.length; i++) {
      if (i !== index) {
        markers[i].setMap(null);

        // Remove selected attribute
        markers[i].set('selected', false);

        // Add content back into info window
        if (infoWindow !== undefined) {
          let windowContent = infoWindow[i].getContent(),
              regexSelect = /(?=Select)\w+/g,
              regexStandard = /(Standard)+/g,
              regexPrice = /(\$1234\.56)+/g;

          // Price
          if(!regexPrice.test(windowContent) && !regexStandard.test(windowContent)) {
            windowContent = windowContent.concat('<p class="margin-none">$1234.56 total annual drug cost</p>');
            infoWindow[i].setContent(windowContent);
          }

          // select
          if (!regexSelect.test(windowContent)) {
            windowContent = windowContent.concat('<a href="#">Select</a>');
            infoWindow[i].setContent(windowContent);
          }
        }
      }
    }
  }

  // Remove all markers
  function removeAllMarkers() {
    for (var i = 0; i < saverMarkers.length; i++) {
      saverMarkers[i].setMap(null);
      saverMarkers[i].setIcon(blueCircleImage);
    }
    for (var i = 0; i < standardMarkers.length; i++) {
      standardMarkers[i].setMap(null);
      standardMarkers[i].setIcon(blueCircleImage);
    }
  }

  // Center map on bounds
  function centerMap(arr) {
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < arr.length; i++) {
     bounds.extend(arr[i].getPosition());
    }

    map.fitBounds(bounds);
  }

  function isWindowOpen(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].getMap()) {
        return true;
      }
    }
  }

  // Count number of items in object
  function countProperties(obj) {
    var count = 0;

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }

    return count;
  }
});
