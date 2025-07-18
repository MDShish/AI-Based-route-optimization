document.addEventListener("DOMContentLoaded", function () {
    const trafficDropdown = document.getElementById("trafficCondition");
    const weatherDropdown = document.getElementById("weatherImpact");
  
    trafficDropdown.addEventListener("change", updateRoute);
    weatherDropdown.addEventListener("change", updateRoute);
  });
  
  function updateRoute() {
    const traffic = document.getElementById("trafficCondition").value;
    const weather = document.getElementById("weatherImpact").value;
  
    // Example: use console to debug
    console.log("User selected: ", traffic, weather);
  
    // You can call your routing function here
    // Use logic to adjust settings based on user inputs
    let trafficModel = 'bestguess';
  
    if (traffic === 'heavy') trafficModel = 'pessimistic';
    if (traffic === 'emergency') trafficModel = 'optimistic';
  
    let avoidHighways = false;
    if (weather === 'storm') avoidHighways = true; // example rule
  
    // Re-invoke routing with new preferences
    routeWithOptions({ trafficModel, avoidHighways });
  }
  