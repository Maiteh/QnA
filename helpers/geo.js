  function getLocation(position) {
    return Location(position.coords.latitude, position.coords.longitude);
  }

  var Location = function (lat, lon) {
    this.latitude  = lat;
    this.longitude = lon;
    check();
  };

  function check() {
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.latitude + "," + this.longitude + "&sensor=true";
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json", 
      success: function(response) {
        LocationName(response);
      },
      error: function() {
        console.log("Error");
      }});
    };

	LocationName = function(arg){
      var locationName = arg.results[0].address_components[2].short_name;
	};

