function routeWithOptions(options) {
    const origin = "Majestic, Bangalore";
    const destination = "Electronic City, Bangalore";
  
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: { lat: 12.9716, lng: 77.5946 },
    });
  
    directionsRenderer.setMap(map);
  
    const request = {
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(Date.now()),
        trafficModel: options.trafficModel || 'bestguess'
      },
      avoidHighways: options.avoidHighways || false
    };
  
    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
      } else {
        alert("Routing failed: " + status);
      }
    });
  }
  