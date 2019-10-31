$(document).ready(function() {
    // Google Maps JS
    var directionsDisplay, directionsService, map;

    // function to oad map
    function initialize() {
        
        // Code To Get Properties Data
        // Create a request variable and assign a new XMLHttpRequest object to it.
        var request = new XMLHttpRequest();

        // Open a new connection, using the GET request on the URL endpoint
        request.open('POST', 'http://localhost:8000/api/properties-map-data', true);

        // on response
        request.onload = function(data) {
            console.log(JSON.parse(data.target.response));
            var properties = (JSON.parse(data.target.response)).data;
            // console.log("properties" + properties);
            for (var i = 0; i < properties.length; i++) {
                // console.log(i);
                // console.log(properties[i]);
                addMarker({
                    coords: {
                        lat: parseFloat(properties[i].latitude),
                        lng: parseFloat(properties[i].longitude)
                    },
                    content: `<div class='w-100 p-1'>
                                <div class='w-75 pr-2 float-left'>
                                    <span class="map_property_title"><strong>${properties[i].title}</strong></span>
                                </div>
                                <div class='w-25 float-left'>
                                    <span class='map_property_price'>${properties[i].price} $</span>
                                </div>
                            </div>`
                });
            };

        };

        // Send request
        request.send();

        // Map Code
        var directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();
        var mapCenterLatLong = new google.maps.LatLng(31.5204, 74.3587);
        var mapOptions = { 
        zoom:14, 
        mapTypeId: google.maps.MapTypeId.ROADMAP, 
        center: mapCenterLatLong 
        }
        map = new google.maps.Map(
        document.getElementById("map_canvas"), 
        mapOptions
        );
        directionsDisplay.setMap(map);
        
        // Click Listner Code 
        google.maps.event.addListener(map, "click", function(event) {
            console.log(event.latLng);
            alert(event.latLng);
        });

        // add marker code
        function addMarker(props) {
            // alert(props.coords.lat);
            var marker = new google.maps.Marker({
                position: props.coords,
                map: map
            })

            // marker icon
            if(props.iconImage) {
                marker.setIcon(props.iconImage);
            }

            // marker info window content
            if(props.content) {
                var infoWindow = new google.maps.InfoWindow({
                    content: props.content
                })
                
                marker.addListener('mouseover', function() {
                    infoWindow.open(map, this);
                });
                
                // assuming you also want to hide the infowindow when user mouses-out
                marker.addListener('mouseout', function() {
                    infoWindow.close();
                });
            }
        }

    };

    setTimeout(function() {
        // alert("ok");
        initialize();
    }, 3000);

})