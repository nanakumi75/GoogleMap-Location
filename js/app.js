//set map options to Malden USA MA

var mylatlng = {lat:42.924752,lng:-71.071022};

var mapOptions = {
    center:mylatlng,
    zoom:7,
    mapTypeId:google.maps.MapTypeId.ROADMAP
};

//create the map
var map = new google.maps.Map(document.getElementById("googleMap"),mapOptions);

//create Directions Service object
//to use the route method to get results
var directionService = new google.maps.DirectionsService();

//create directionRenderer Object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the dorectionsRenderer to the map
directionsDisplay.setMap(map);

function calcRoute(){
    //create a request
    var request = {
        origin:document.getElementById("from").value,
        destination:document.getElementById('to').value,
        travelMode:google.maps.TravelMode.DRIVING,
        unitSystem:google.maps.UnitSystem.IMPERIAL
    }

    //pass request to the route method
    directionService.route(request,(result,status) =>{
      if(status == google.maps.DirectionsStatus.OK){
         
        //get distance and time
        
        const output = document.querySelector("#output");
        output.innerHTML = "<div class='alert alert-primary'>From: " + document.getElementById('from').value +".<br/> To: " + document.getElementById('to').value+".<br/>Driving Distance <i class='icofont-road'></i>: " + result.routes[0].legs[0].distance.text + "<br/>Duration <i class='icofont-clock-time'></i>: " + result.routes[0].legs[0].duration.text + ".</div>";

        //display the route
        directionsDisplay.setDirections(result);
      }else{

        //delete routes from map
        directionsDisplay.setDirections({routes:[]});

        //center map in Malden USA
          map.setCenter(mylatlng);

          //show error message if request is not within area of coverage
          output.innerHTML = "<div class='alert alert-danger'><i class='icofont-warning'></i> We could not retrieve traveling information.</div>";
      }
    });
}

//create autocomplete objects for inputs
var options = {
    types:['(cities)']
}

var input1 = document.getElementById('from');
var autocomplete1 = new google.maps.places.Autocomplete(input1,options);

var input2 = document.getElementById('to');
var autocomplete2 = new google.maps.places.Autocomplete(input2,options);