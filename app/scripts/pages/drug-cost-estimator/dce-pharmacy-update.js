$(document).ready(function() {
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
        starCircleImage = {
            url: '/images/icon-svgs/mapmarker-pill-star.svg',
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
        starPinImage = {
            url: '/images/icon-svgs/mapmarker-pin-star.svg',
            size: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(20, 40),
            scaledSize: new google.maps.Size(40, 40)
        };

    // Cost spinner
    var totalCost = $('.total-cost'),
        costNumber = { cost: 0 };

    // Marker data
    var $standardMarkersData = [
        {
            lat: 44.976856,
            lng: -93.271771,
            name: 'Standard Pharmacy',
            markerNumber: '0',
            address1: '985 Universal Ave',
            address2: 'Minneapolis, MN 55403',
            phone: '(612) 555-5555',
            distance: '0.76',
            type: 'Standard Network',
            visible: true
        },
        {
            lat: 44.972161,
            lng: -93.277306,
            name: 'Hershey\'s Pharmacy',
            markerNumber: '1',
            address1: '795 Chocolate Street',
            address2: 'Minneapolis, MN 55403',
            phone: '(612) 555-5555',
            distance: '1.56',
            type: 'Standard Network',
            visible: true
        }
    ];

    for (var i = 0; i < $standardMarkersData.length; i++) {
        Store.push(['DCE', 'pharmacyStandard'], $standardMarkersData[i]);
    }

    var $saverMarkersData = [
        {
            lat: 44.981672,
            lng: -93.283818,
            name: 'CVS Pharmacy',
            markerNumber: '0',
            address1: '795 Oglethorpe Ave',
            address2: 'Minneapolis, MN 55403',
            phone: '(612) 555-5555',
            cost: '1,000.00',
            savings: '5.00',
            distance: '0.81',
            type: 'Pharmacy Saver',
            visible: true
        },
        {
            lat: 44.980445,
            lng: -93.275313,
            name: 'Bob\'s Club Pharmacy',
            markerNumber: '1',
            address1: '347 Mirum Circle',
            address2: 'Minneapolis, MN 55403',
            phone: '(612) 555-5555',
            cost: '950.00',
            savings: '10.00',
            distance: '0.93',
            type: 'Pharmacy Saver',
            visible: true
        },
        {
            lat: 44.976645,
            lng: -93.259813,
            name: 'Walblues Pharmacy',
            markerNumber: '2',
            address1: '965 Snapple Drive',
            address2: 'Minneapolis, MN 55403',
            phone: '(612) 555-5555',
            cost: '940.00',
            savings: '20.00',
            distance: '1.36',
            type: 'Pharmacy Saver',
            visible: true
        },
        {
            lat: 44.975702,
            lng: -93.273759,
            name: 'UHCMR Pharmacy',
            markerNumber: '3',
            address1: '123 Health Street',
            address2: 'Minneapolis, MN 55403',
            phone: '(612) 555-5555',
            cost: '935.00',
            savings: '25.00',
            distance: '1.72',
            type: 'Pharmacy Saver',
            visible: true
        }
    ];

    for (var i = 0; i < $saverMarkersData.length; i++) {
        Store.push(['DCE', 'pharmacySaver'], $saverMarkersData[i]);
    }

    // Initialize map
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(44.979972, -93.277818),
            zoom: 14,
            scrollwheel: false,
            styles: [
                {
                    featureType: 'administrative.land_parcel',
                    elementType: 'labels',
                    stylers: [
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'poi.business',
                    stylers: [
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text',
                    stylers: [
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'road.local',
                    elementType: 'labels',
                    stylers: [
                        {
                            visibility: 'off'
                        }
                    ]
                }
            ]
        });

        // Create markers
        var saverMarkersData = {
            '0': {
                lat: 44.981672,
                lng: -93.283818,
                name: 'CVS Pharmacy',
                markerNumber: '1'
            },
            '1': {
                lat: 44.980445,
                lng: -93.275313,
                name: 'Bob\'s Club Pharmacy',
                markerNumber: '2'
            },
            '2': {
                lat: 44.976645,
                lng: -93.259813,
                name: 'Walblues Pharmacy',
                markerNumber: '3'
            },
            '3': {
                lat: 44.975702,
                lng: -93.273759,
                name: 'UHCMR Pharmacy',
                markerNumber: '4'
            }
        };

        // Create saver markers
        for (var i = 0; i < countProperties($saverMarkersData); i++) {
            var thisMarker = $saverMarkersData[i];

            // Create marker
            saverMarkers[i] = new google.maps.Marker({
                position: {
                    lat: thisMarker.lat,
                    lng: thisMarker.lng
                },
                title: thisMarker.name,
                animation: google.maps.Animation.DROP,
                icon: blueCircleImage,
                label: {
                    text: (i + 1).toString(),
                    color: 'white'
                }
            });

            saverMarkers[i].index = i; //add index property

            // Create label
            saverLabels[i] = new MapLabel({
                text: thisMarker.name,
                position: new google.maps.LatLng(thisMarker.lat, thisMarker.lng),
                fontSize: 14,
                align: 'bottom'
            });

            // Create info window
            saverWindowContents[i] =
                `
        <p class="color-blue-base bold text-medium margin-extra-small">${saverMarkers[i].title} - ${
                    thisMarker.distance
                } mi</p>
        <p class="margin-none">${thisMarker.address1}</p>
        <p class="margin-none">$${thisMarker.cost} total annual drug cost</p>
        <a href="#" class="map-select-` +
                i +
                `">Select</a>
      `;

            saverWindows[i] = new google.maps.InfoWindow({
                content: saverWindowContents[i]
            });

            // Add click listener
            saverMarkers[i].addListener('click', function() {
                // Close other windows
                closeWindows(saverWindows);
                collapseMarkerIcons(saverMarkers);

                if (!saverMarkers[this.index].get('selected')) {
                    saverMarkers[this.index].setIcon(bluePinImage);
                } else {
                    saverMarkers[this.index].setIcon(starPinImage);
                }
                saverWindows[this.index].open(map, saverMarkers[this.index]);
                map.panTo(saverMarkers[this.index].position);
            });

            // On info window close
            saverWindows[i].addListener('closeclick', function() {
                collapseMarkerIcons(saverMarkers);
            });
        }

        // Create standard markers
        var standardMarkersData = {
            '0': {
                lat: 44.976856,
                lng: -93.271771,
                name: 'Standard Pharmacy',
                markerNumber: '1'
            },
            '1': {
                lat: 44.972161,
                lng: -93.277306,
                name: 'Hershey\'s Pharmacy',
                markerNumber: '2'
            }
        };

        for (var i = 0; i < countProperties($standardMarkersData); i++) {
            var thisMarker = $standardMarkersData[i];

            // Create marker
            standardMarkers[i] = new google.maps.Marker({
                position: {
                    lat: thisMarker.lat,
                    lng: thisMarker.lng
                },
                title: thisMarker.name,
                animation: google.maps.Animation.DROP,
                icon: blueCircleImage,
                label: {
                    text: (i + 1).toString(),
                    color: 'white'
                }
            });

            standardMarkers[i].index = i; //add index property

            // Create label
            standardLabels[i] = new MapLabel({
                text: thisMarker.name,
                position: new google.maps.LatLng(thisMarker.lat, thisMarker.lng),
                fontSize: 14,
                align: 'bottom'
            });

            // Create info window
            standardWindowContents[i] =
                `
        <p class="color-blue-base bold text-medium margin-extra-small">${standardMarkers[i].title} - ${
                    thisMarker.distance
                } mi</p>
        <p class="margin-none">${thisMarker.address1}</p>
        <a href="#" class="map-select-` +
                i +
                `">Select</a>
      `;

            standardWindows[i] = new google.maps.InfoWindow({
                content: standardWindowContents[i]
            });

            // Add click listener
            standardMarkers[i].addListener('click', function() {
                // Close other windows
                closeWindows(standardWindows);
                collapseMarkerIcons(standardMarkers);

                if (!standardMarkers[this.index].get('selected')) {
                    standardMarkers[this.index].setIcon(bluePinImage);
                } else {
                    standardMarkers[this.index].setIcon(starPinImage);
                }

                standardWindows[this.index].open(map, standardMarkers[this.index]);
                map.panTo(standardMarkers[this.index].position);
            });

            // On info window close
            standardWindows[i].addListener('closeclick', function() {
                collapseMarkerIcons(standardMarkers);
            });
        }

        // Close info window on map click
        map.addListener('click', function() {
            closeWindows(saverWindows);
            closeWindows(standardWindows);
            collapseMarkerIcons(saverMarkers);
            collapseMarkerIcons(standardMarkers);
        });

        google.maps.event.addDomListener(window, 'resize', function() {
            var mapCenter = map.getCenter();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(mapCenter);
        });
    }

    // Tab pharmacy first click (initiate map)
    $('li[href="#pharmacy-tab"], a[data-toggle="tab"][href="#pharmacy-tab"]').one('shown.bs.tab', function(e) {
        initMap();
        setMarkers(saverMarkers, map);
        centerMap(saverMarkers);
        setMarkers(saverLabels, map);
    });

    // Refresh on resize
    // google.maps.event.trigger(map, "resize");

    // Tab clicked
    $('a[data-toggle="tab"][href="#drugs-tab"]').on('show.bs.tab', function(e) {
        $('ul.arrow-tabs li.arrow-tab-item').removeClass('active');
        $('ul.arrow-tabs li.arrow-tab-item:first-child').addClass('active');
        $('html, body').animate({ scrollTop: $('ul.arrow-tabs').offset().top }, 300);
    });
    $('a[data-toggle="tab"][href="#pharmacy-tab"]').on('show.bs.tab', function(e) {
        $('ul.arrow-tabs li.arrow-tab-item').removeClass('active');
        $('ul.arrow-tabs li.arrow-tab-item:nth-child(2)').addClass('active');
        // $('html,body').scrollTop($('ul.arrow-tabs').offset().top);
        $('html, body').animate({ scrollTop: $('ul.arrow-tabs').offset().top }, 300);
    });
    $('a[data-toggle="tab"][href="#costs-tab"]').on('show.bs.tab', function(e) {
        $('ul.arrow-tabs li.arrow-tab-item').removeClass('active');
        $('ul.arrow-tabs li.arrow-tab-item:nth-child(3)').addClass('active');
        $('html, body').animate({ scrollTop: $('ul.arrow-tabs').offset().top }, 300);
    });

    // Pharmacy filter change
    var $pharmacyFilters = $('input[name="pharmacy-type"]');

    $pharmacyFilters.on('change', function(e) {
        switchVisbTile($(this).val());
    });

    filterPharmacyResults('saver');

    function filterPharmacyResults(type) {
        var pharmacyResults, resultIndex, arrMarkers, windowType;

        if (type === 'saver') {
            pharmacyResults = $('.pharmacy-saver-block').find('li');
            arrMarkers = saverMarkers;
            windowType = saverWindows;
        } else if (type === 'standard') {
            pharmacyResults = $('.pharmacy-standard-block').find('li');
            arrMarkers = standardMarkers;
            windowType = standardWindows;
        }

        pharmacyResults.on('mouseover', function(event) {
            event.preventDefault();

            if ($(this).hasClass('selected')) {
                return;
            }

            // Check if any infowindows open
            if (isWindowOpen(windowType)) {
                return;
            }

            resultIndex = $(this).index();

            // Expand marker
            if (saverMarkers[resultIndex] !== undefined) {
                arrMarkers[resultIndex].setIcon(bluePinImage);
            }
        });

        pharmacyResults.on('mouseout', function(event) {
            event.preventDefault();

            if ($(this).hasClass('selected')) {
                return;
            }

            // Check if any infowindows open
            if (isWindowOpen(windowType)) {
                return;
            }

            resultIndex = $(this).index();

            // Collapse marker
            if (saverMarkers[resultIndex] !== undefined) {
                arrMarkers[resultIndex].setIcon(blueCircleImage);
            }
        });

        $('a.show-on-map').on('click', function(e) {
            e.preventDefault();

            var $selectedPharm = ifSelected();

            if ($selectedPharm === undefined) {
                resultIndex = $(this)
                    .closest('li')
                    .index();
            } else {
                resultIndex = $selectedPharm;
            }

            // Close other windows and open current
            google.maps.event.trigger(map, 'click');
            google.maps.event.trigger(arrMarkers[resultIndex], 'click');
            map.panTo(arrMarkers[resultIndex].position);

            $('html, body').animate({ scrollTop: $('.map-toggle').offset().top }, 300);
            $('#collapseMap').collapse('show');
        });

        $('a.select-pharmacy', pharmacyResults).on('click', function(e) {
            e.preventDefault();

            resultIndex = $(this)
                .parents('li')
                .index();

            selectPharmacy($(this), resultIndex, type);
        });
    }

    // Mail service selected
    $('#mail-service-select').click(function(event) {
        event.preventDefault();

        let savedPharmacy = {
            name: 'Preferred Mail Service',
            address1: 'Delivered to your home',
            address2: '',
            phone: '',
            type: 'Mail Service'
        };

        Store.set(['DCE', 'savedPharmacy'], savedPharmacy);

        Store.set(['DCE', 'savedPharmacy'], { savingsAvail: false });

        // if (Store.ref(['DCE', 'savedDrugs', 'drugs']).data.length > 0) {
        //   Store.set(['DCE'], {savingsAvail: true});
        // }

        // $('#pharmacy-form').hide();
        // $('#pharmacy-results').hide();
        // $('.pharmacy-saver-block').hide();
        // $('.pharmacy-standard-block').hide();
        // $('.mail-service-block').hide();
        $('#mail-service-select').addClass('select-pharmacy');
        $('.selected-pharmacy').show();
        $('.map-wrapper').attr('pharmacy-selected', 'true');
        // Scroll to pharmacy header
        $('html,body').scrollTop($('#pharmacy-header').offset().top);
    });

    // Search for a new pharmacy
    $('.card-body').on('click', '.search-new-pharmacy', function(event) {
        event.preventDefault();

        google.maps.event.trigger(map, 'click');

        var pharmacySidebar = `
        <a href="#pharmacy-header">Choose a Pharmacy to see your drug costs</a>
    `;

        // Remove markers from map
        removeAllMarkers();

        $('#pharmacy-sidebar').html(pharmacySidebar);

        setMarkers(saverMarkers, map);
        switchVisbTile('saver');
        $('.selected-pharmacy').hide();
        $('#pharmacy-form').show();
        $('#pharmacy-results').show();
        $('.pharmacy-saver-block').show();
        $('#collapseMap').collapse('show');
        $('.map-wrapper').removeAttr('pharmacy-selected');
        $('#drug-pharmacy-sidebar-table').hide();
    });

    // Pharmacy Section
    $('#pharmacy-type input[type=radio]').change(function(event) {
        event.preventDefault();
        switchVisbTile($(this).val());
    });

    // Zipcode button clicked
    $('#zipcode-button').click(function(event) {
        event.preventDefault();

        var zipValue = $('#zipcode').val();

        if (zipValue === '90210') {
            $('.pharmacy-listing').show();
            $('.pharmacy-error').hide();
        } else {
            $('.pharmacy-listing').hide();
            $('.pharmacy-error').show();
        }
    });

    // Collapse map on mobile screens
    var windowWidth = $(window).width();

    var collapseMapMobile = debounce(function() {
        windowWidth = $(window).width();

        if (windowWidth < 768) {
            $('#collapseMap').collapse('hide');
        }
    }, 250);

    if (windowWidth < 768) {
        $('#collapseMap').collapse('hide');
    }

    // window.addEventListener('resize', collapseMapMobile);

    // Refresh map on collapse open
    $('#collapseMap').on('shown.bs.collapse', function() {
        google.maps.event.trigger(map, 'resize');

        if ($('.pharmacy-standard-block').css('display') === 'block') {
            centerMap(standardMarkers);
        } else if ($('.pharmacy-saver-block').css('display') === 'block') {
            centerMap(saverMarkers);
        }
    });

    // Map select link click
    $('#map').on('click', '[class*=map-select]', function(event) {
        event.preventDefault();

        var $index = $(this)
                .attr('class')
                .match(/\d+/)[0],
            $type;

        var $visibTab = $('#pharmacy-results')
            .children()
            .filter(':visible')
            .attr('class');

        switch ($visibTab) {
            case 'pharmacy-standard-block':
                $type = 'standard';
                break;
            case 'pharmacy-saver-block':
                $type = 'saver';
                break;
        }

        selectPharmacy($(this), $index, $type);
    });

    //---------------------------------------------------------------------------
    // Functions
    //---------------------------------------------------------------------------

    // Count number of items in object
    function countProperties(obj) {
        var count = 0;

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) ++count;
        }

        return count;
    }

    // Set map markers
    function setMarkers(arr, context) {
        for (var i = 0; i < arr.length; i++) {
            // Check if marker selected
            if (!arr[i].get('selected')) {
                arr[i].setMap(context);
            } else {
                arr[i].setMap(context);
                arr[i].setIcon(starCircleImage);
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
            if (!arr[i].get('selected')) {
                arr[i].setIcon(blueCircleImage);

                // add number back in
                arr[i].set('label', { text: i + 1, color: 'white' });
            } else {
                arr[i].setIcon(starCircleImage);
            }
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
                    if (!regexPrice.test(windowContent) && !regexStandard.test(windowContent)) {
                        windowContent = windowContent.concat(
                            '<p class="margin-none">$1234.56 total annual drug cost</p>'
                        );
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
            if (!saverMarkers[i].get('selected')) {
                saverMarkers[i].setMap(null);
                saverMarkers[i].setIcon(blueCircleImage);
            }
        }
        for (var i = 0; i < standardMarkers.length; i++) {
            if (!standardMarkers[i].get('selected')) {
                standardMarkers[i].setMap(null);
                standardMarkers[i].setIcon(blueCircleImage);
            }
        }
    }

    // Switch visible tile
    function switchVisbTile(val) {
        var radioVal = val,
            saverBlock = $('.pharmacy-saver-block'),
            standardBlock = $('.pharmacy-standard-block'),
            mailBlock = $('.mail-service-block'),
            retailBlock = $('.pharmacy-retail-block'),
            collapseMap = $('#collapseMap'),
            mapToggle = $('.map-toggle');

        if (radioVal === 'saver') {
            // Hide other blocks
            mailBlock.hide();
            standardBlock.hide();
            retailBlock.hide();
            removeAllMarkers();
            setMarkers(saverMarkers, map);
            filterPharmacyResults(radioVal);
            centerMap(saverMarkers);
            // Show
            saverBlock.show();
            collapseMap.collapse('show');
            mapToggle.show();
        } else if (radioVal === 'mail-service') {
            // Hide other blocks
            saverBlock.hide();
            standardBlock.hide();
            retailBlock.hide();
            removeAllMarkers();
            // Show
            mailBlock.show();
            collapseMap.collapse('hide');
            mapToggle.hide();
        } else if (radioVal === 'standard') {
            // Hide other blocks
            mailBlock.hide();
            saverBlock.hide();
            retailBlock.hide();
            removeAllMarkers();
            setMarkers(standardMarkers, map);
            filterPharmacyResults(radioVal);
            centerMap(standardMarkers);
            // Show
            standardBlock.show();
            collapseMap.collapse('show');
            mapToggle.show();
        } else if (radioVal === 'retail') {
            // Hide other blocks
            mailBlock.hide();
            saverBlock.hide();
            removeAllMarkers();
            setMarkers(standardMarkers, map);
            filterPharmacyResults('standard');
            centerMap(standardMarkers);
            // Show
            standardBlock.show();
            retailBlock.show();
            collapseMap.collapse('show');
            mapToggle.show();
        }
    }

    // Set total price
    function setTotalPrice() {
        TweenLite.to(costNumber, 1, { cost: 1234.56, onUpdate: showPrice });

        function showPrice() {
            totalCost.html(costNumber.cost.toFixed(2));
        }

        $('.drug-tiers').html('12.34');
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

    // Check if any pharms selected
    function ifSelected() {
        var $pharms = [saverMarkers, standardMarkers],
            $starred;

        for (var i = 0; $pharms.length > i; i++) {
            var $markers = $pharms[i];

            for (var j = 0; $markers.length > j; j++) {
                if ($markers[j].get('selected')) {
                    $starred = j;
                }
            }
        }

        return $starred;
    }

    // Select pharmacy
    function selectPharmacy($this, $index, $type) {
        // Check if saver or standard
        var $visibTab = $('#pharmacy-results')
                .children()
                .filter(':visible')
                .attr('class'),
            $markers,
            $pharmacyType,
            $oldIndex,
            pharmacyResults,
            arrMarkers,
            windowType;

        if ($type === 'saver') {
            pharmacyResults = $('.pharmacy-saver-block').find('li');
            arrMarkers = saverMarkers;
            windowType = saverWindows;
        } else if ($type === 'standard') {
            pharmacyResults = $('.pharmacy-standard-block').find('li');
            arrMarkers = standardMarkers;
            windowType = standardWindows;
        }

        switch ($visibTab) {
            case 'pharmacy-standard-block':
                $markers = $standardMarkersData;
                $pharmacyType = 'pharmacyStandard';
                break;
            case 'pharmacy-saver-block':
                $markers = $saverMarkersData;
                $pharmacyType = 'pharmacySaver';
                break;
            case 'mail-service-block':
                alert('mail');
                break;
        }

        // Show pharmacies
        var $pharmacyCount = Store.ref(['DCE', $pharmacyType]).data.length;

        for (var i = 0; i < $pharmacyCount; i++) {
            Store.set(['DCE', $pharmacyType, i], { visible: true });
        }

        Store.set(['DCE', $pharmacyType, $index], { visible: false });

        // Remove all other selected pharmacies
        var $selected = pharmacyResults.find('.selected');
        $selected.removeClass('selected');

        collapseMarkerIcons(arrMarkers);

        // If drugs added set total price
        if ($('#drugs-tab .drug-container').length !== 0) {
            setTotalPrice();
        }

        // Remove markers from map
        // removeOtherMarkers(resultIndex, arrMarkers, windowType);

        google.maps.event.trigger(arrMarkers[$index], 'click');
        map.panTo(arrMarkers[$index].position);

        // Reset markers
        for (var i = 0; i < standardMarkers.length; i++) {
            standardMarkers[i].setIcon(blueCircleImage);
            standardMarkers[i].set('selected', false);
            standardMarkers[i].set('label', { text: i + 1, color: 'white' });
        }
        for (var i = 0; i < saverMarkers.length; i++) {
            saverMarkers[i].setIcon(blueCircleImage);
            saverMarkers[i].set('selected', false);
            saverMarkers[i].set('label', { text: i + 1, color: 'white' });
        }

        // Set star marker
        arrMarkers[$index].setIcon(starPinImage);
        arrMarkers[$index].set('selected', true);

        // Remove select link from info window
        var windowContent = windowType[$index].getContent(),
            regexSelect = /(?=Select)\w+/g,
            regexPrice = /(\$1234\.56)+/g;

        if (regexSelect.test(windowContent)) {
            windowContent = windowContent.replace('<a href="#">Select</a>', '');
            windowType[$index].setContent(windowContent);
        }
        if (regexPrice.test(windowContent)) {
            windowContent = windowContent.replace('<p class="margin-none">$1234.56 total annual drug cost</p>', '');
            windowType[$index].setContent(windowContent);
        }

        // Remove number label
        arrMarkers[$index].set('label', { text: ' ', color: 'white' });

        // Add pharmacy
        var pharmacyName = $this
            .parents('li')
            .find('.pharmacy-name')
            .text();

        Store.set(['DCE', 'savedPharmacy'], $markers[$index]);

        Store.set(['DCE', 'savedPharmacy'], { savingsAvail: true });

        if (Store.ref(['DCE', 'savedDrugs', 'drugs']).data.length > 0) {
            Store.set(['DCE'], { savingsAvail: true });
        }

        $('.selected-pharmacy').show();
        $('.map-wrapper').attr('pharmacy-selected', 'true');
        // Scroll to pharmacy header
        $('html,body').animate({ scrollTop: $('ul.map-toggle').offset().top });
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
});
