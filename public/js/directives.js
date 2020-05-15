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

        var markersPeople = [];
        var boundsPeople = new google.maps.LatLngBounds();
        var isMoving = false;

        // map config
        var mapOptions = {
            center: new google.maps.LatLng(-12.0466083, -77.0430169),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            scrollwheel: false,
            disableDefaultUI: true,
            fullscreenControl: true,
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
            //map.fitBounds(bounds);
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
        initFirebase();

        //setMarkerCustom(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
        //setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
        //setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
        scope.setMarkerCustom = function(position, titulo, programacion) {
            setMarkerCustom(map, position, titulo, programacion);
        };

        scope.clearMarkers = function() {
            clearMarkers();
        };

        // init firebase
        function initFirebase() {
            // Your web app's Firebase configuration
            var firebaseConfig = {
                apiKey: "AIzaSyAK0HGZmmXrNTANPa69Cl25TORvdE1YCKA",
                authDomain: "farbis-176705.firebaseapp.com",
                databaseURL: "https://farbis-176705.firebaseio.com",
                projectId: "farbis-176705",
                storageBucket: "farbis-176705.appspot.com",
                messagingSenderId: "1018735448200",
                appId: "1:1018735448200:web:a5596f38cac6a52ee38f3d"
            };
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            console.log('init firebase');
            loadPeople();
        }

        function loadPeople() {
            // Get a reference to the database service
            var commentsRef = firebase.database().ref('usuarios');
            commentsRef.on('child_added', function(data) {
                console.log('child_added');
                console.log(data);
                const id_usuario = data.key;
                const login = data.val().login;
                const lat = data.val().lat;
                const lon = data.val().lon;
                const color = data.val().color;

                setMarkerPeople(map, new google.maps.LatLng(lat, lon), login, id_usuario, color);

                searchMarker(id_usuario);
            });

            commentsRef.on('child_changed', function(data) {
                console.log('child_changed');

                if (!isMoving) {
                    const id_usuario = data.key;
                    const marker = searchMarker(id_usuario);
                    const lat = data.val().lat;
                    const lon = data.val().lon;
                    //changePeopleMarkerPosition(marker, new google.maps.LatLng(lat, lon));
                    var position = marker.position;
                    if (position) {
                        const fromLat = position.lat();
                        const fromLng = position.lng();
                        frames = [];
                        for (var percent = 0; percent < 1; percent += 0.01) {
                            curLat = fromLat + percent * (lat - fromLat);
                            curLng = fromLng + percent * (lon - fromLng);
                            frames.push(new google.maps.LatLng(curLat, curLng));
                        }
                        isMoving = true;
                        move(marker, frames, 0, 20, new google.maps.LatLng(lat, lon));
                        isMoving = false;
                    }
                }
            });

            commentsRef.on('child_removed', function(data) {
                console.log('child_removed');
                const id_usuario = data.key;
                const marker = searchMarker(id_usuario);
                deletePeopleMarker(marker);
            });

        }
        function setMarkerPeople(map, position, title, id, color) {
            var marker;
            var markerIcon = {
                //url: 'img/icons/pin-red-24.svg',
                scaledSize: new google.maps.Size(24, 24),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(32,65),
                labelOrigin: new google.maps.Point(0,0),
                path: "M12.105,0.441c-6.006,0-10.893,4.886-10.893,10.894c0,8.17,10.893,20.229,10.893,20.229S23,19.505,23,11.335"+
                "C23,5.328,18.112,0.441,12.105,0.441 M12.105,3.554c1.713,0,3.112,1.401,3.112,3.113c0,1.727-1.399,3.112-3.112,3.112"+
                "c-1.71,0-3.111-1.385-3.111-3.112C8.994,4.955,10.396,3.554,12.105,3.554 M12.105,19.116c-2.598,0-4.886-1.323-6.224-3.346"+
                "c0.031-2.055,4.155-3.19,6.224-3.19c2.07,0,6.195,1.135,6.225,3.19C16.993,17.793,14.704,19.116,12.105,19.116",
                    strokeColor: color,
                    fillColor: color,
                    fillOpacity: 1.0,
                    scale: 1
              };

            var markerOptions = {
                position: position,
                map: map,
                title: title,
                label: {
                    color: '#3a619b',
                    fontWeight: 'bold',
                    fontSize: "12px",
                    text: title,
                },
                icon: markerIcon
            };
            
            marker = new google.maps.Marker(markerOptions);
            marker.timestamp = id;
            markersPeople.push(marker); // add marker to array
            
            //extend the bounds to include each marker's position
            boundsPeople.extend(marker.position);

            google.maps.event.addListener(marker, 'click', function () {
            });
            
            //now fit the map to the newly inclusive bounds
            map.fitBounds(boundsPeople);
        }

        function searchMarker(id) {
            const index = markersPeople.findIndex(f=>f.timestamp==id);
            if (index >= 0) {
                return markersPeople[index];
            }
            return null;            
        }

        function changePeopleMarkerPosition(marker, position) {
            if (marker) {
                marker.setPosition(position);
                boundsPeople = new google.maps.LatLngBounds();
            }
        }

        function move(marker, latlngs, index, wait, newDestination) {
            marker.setPosition(latlngs[index]);
            if(index != latlngs.length-1) {
              // call the next "frame" of the animation
              setTimeout(function() { 
                move(marker, latlngs, index+1, wait, newDestination); 
              }, wait);
            }
            else {
              // assign new route
              marker.position = marker.destination;
              marker.destination = newDestination;
            }
          }

        function deletePeopleMarker(marker) {
            if (marker) {
                marker.setMap(null);
                boundsPeople = new google.maps.LatLngBounds();
            }
        }

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
