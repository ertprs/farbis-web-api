/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'SIREIS ::.. ';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'SIREIS ::.. ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};

function myMap() {
    // directive link function
    link = function(scope, element, attrs) {
        var map, infoWindow;
        var markers = [];
        var bounds = new google.maps.LatLngBounds();

        // map config
        var mapOptions = {
            center: new google.maps.LatLng(-12.0466083, -77.0430169),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            styles: [
                {
                  "featureType": "poi",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                }
              ]
        };

        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }    

        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title
                //icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };
            console.log('miid: '+id_programacion);
            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                /*
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                var contentString = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
                '<div id="bodyContent">'+
                '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
                'sandstone rock formation in the southern part of the '+
                'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
                'south west of the nearest large town, Alice Springs; 450&#160;km '+
                '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
                'features of the Uluru - Kata Tjuta National Park. Uluru is '+
                'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
                'Aboriginal people of the area. It has many springs, waterholes, '+
                'rock caves and ancient paintings. Uluru is listed as a World '+
                'Heritage Site.</p>'+
                '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
                'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
                '(last visited June 22, 2009).</p>'+
                '</div>'+
                '</div>';

                // create new window
                var infoWindowOptions = {
                    //content: content
                    content: contentString
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
                */
               scope.verDetalleMapa(id_programacion);
            });
            
        }

        function setMarkerCustom(map, position, title, programacion) {
            var marker;
            var markerIcon = {
                url: 'img/icons/pin-red-24.svg',
                scaledSize: new google.maps.Size(24, 24),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(32,65),
                labelOrigin: new google.maps.Point(12,33)
              };

            var markerOptions = {
                position: position,
                map: map,
                title: title,
                label: {
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: "12px",
                    text: title,
                },
                icon: markerIcon
                //label: "Hola mundo"
                //icon: 'img/icons/pin-red-24.png'
            };
            scope.programacion = programacion;
            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array
            
            //extend the bounds to include each marker's position
            bounds.extend(marker.position);

            google.maps.event.addListener(marker, 'click', function () {
                /*
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
                */

               scope.verDetalleMapa(programacion);
            });
            
            //now fit the map to the newly inclusive bounds
            map.fitBounds(bounds);
        }

        // Removes the overlays from the map, but keeps them in the array
        function clearMarkers() {
            if (markers) {
                for (i in markers) {
                    markers[i].setMap(null);
                }
                bounds = new google.maps.LatLngBounds();
            }
        }

        // show the map and place some markers
        initMap();

        //setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
        //setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
        //setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
        scope.setMarkerCustom = function(position, titulo, programacion) {
            setMarkerCustom(map, position, titulo, programacion);
        };

        scope.clearMarkers = function() {
            clearMarkers();
        };
    };

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
};

/**
 *
 * Pass all functions into module
 */
angular
    .module('FarbisWebApp')
    .directive('pageTitle', pageTitle)
    .directive('myMap', myMap);
