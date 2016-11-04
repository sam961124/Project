var map;
var geocoder;
var myCenter = new Object();

function initMap() {
    //map options
    var location;
    //user Icon settings
    geocoder = new google.maps.Geocoder();
    var myOptions = {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    //check whether browser supports GPS locating
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            addMarker(location);
        });
    } else {
        location = new google.maps.LatLng(25.09108, 121.5598);
        addMarker(location);
    }
    showHospital();
}

//add User location marker
function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        title: "You are here!",
        map: map
    });
    map.setCenter(location);
}
