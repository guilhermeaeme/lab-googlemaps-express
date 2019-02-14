window.onload = () => {
  const ironhackBCN = {
    lat: -23.5505199,
    lng: -46.63330939999997
  };
  
  const markers = []
  
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ironhackBCN
  });

  let center = {
    lat: undefined,
    lng: undefined
  }; 

  function getRestaurants() {
    axios.get("/restaurants/api")
     .then( response => {
       console.log(response.data.restaurants);
       placeRestaurants(response.data.restaurants);
     })
     .catch(error => {
       console.log(error);
     })
   }
  
   function placeRestaurants(restaurants){
    restaurants.forEach(function(restaurant){
      console.log(restaurant);
      const center = {
        lat: restaurant.location.coordinates[1],
        lng: restaurant.location.coordinates[0]
      };
      const pin = new google.maps.Marker({
        position: center,
        map: map,
        title: restaurant.name
      });
      markers.push(pin);
    });
  }
  
  getRestaurants();
};

const geocoder = new google.maps.Geocoder();

document.getElementById('getLatLng').addEventListener('click', function () {
  // geocodeAddress(geocoder, map);
  geocodeAddress(geocoder);
});

function geocodeAddress(geocoder, resultsMap) {
  let address = document.getElementById('address').value;

  geocoder.geocode({ 'address': address }, function (results, status) {

    if (status === 'OK') {
      /*
      resultsMap.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      */
      document.getElementById('latitude').value = results[0].geometry.location.lat();
      document.getElementById('longitude').value = results[0].geometry.location.lng();
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
