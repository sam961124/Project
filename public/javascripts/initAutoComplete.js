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
    var mapSet = false;
    //check whether browser supports GPS locating
    var setDefaultPos = function() {
        mapSet = true;
        myCenter.lat = 25.021719;
        myCenter.lng = 121.534958;
        var myLatlng = new google.maps.LatLng(myCenter.lat, myCenter.lng);
        addMarker(myLatlng);
    }
    /*if (navigator.geolocation) {
        try {
            navigator.geolocation.getCurrentPosition(function(position) {
                location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                addMarker(location);
            })
        } catch (e) {
            setDefaultPos();
        }
    } else {
        setDefaultPos();
    };*/

    if (!mapSet)
        setDefaultPos();

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
