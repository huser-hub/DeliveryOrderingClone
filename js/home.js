$(document).ready(function() {
	// load nav bar
	  $("#nav-placeholder").load("nav.html");
	  $("#main-container").hide()

	 	// $("#main-container").load("restaurants.ejs");

	 	$( document ).on( "click", "a", function() {
	 		// $("#acct").removeClass("active")
	  	// 	$("#home").addClass("active")
	  		// $("#main-container").hide()
	  		if (this.id == "home-btn") return
	  		// alert("clicked" + this.id)
	
		var data = $.ajax({
                    type: "GET",
                    url: "/res",
                    data: {"name":this.id},
                    cache: false,
                    success: function(data){
                		// console.log(data)
                        $("#main-container").html(data).fadeIn();
                          // $('#main-container').hide();
       					 // $('#main-container').show("fade", 200);
                    },
                    dataType:'html',
                    error : function(request,error)
                    {
                        alert("Request: "+JSON.stringify(request));
                        alert("error: "+JSON.stringify(error))
                    }
                  });
		});

	 	$( document ).on( "click", "#home-btn", function() {
	 		$("#acct").removeClass("active")
	  		$("#home").addClass("active")
	  		$("#main-container").hide()

		wanted = "home"
		var data = $.ajax({
                    type: "GET",
                    url: "/get_restaurants",
                    data: wanted,
                    cache: false,
                    success: function(data){
                	
                        $("#main-container").html(data).fadeIn();
                          // $('#main-container').hide();
       					 // $('#main-container').show("fade", 200);
                    },
                    dataType:'html',
                    error : function(request,error)
                    {
                        alert("Request: "+JSON.stringify(request));
                        alert("error: "+JSON.stringify(error))
                    }
                  });
		});

	  $( document ).on( "click", "#account-btn", function() {
	  		$("#main-container").hide()

	  		$("#home").removeClass("active")
	  		$("#acct").addClass("active")


	  		wanted = "account"
			var data = $.ajax({
	                    type: "GET",
	                    url: "/get_account",
	                    data: wanted,
	                    cache: false,
	                    success: function(data){
	                    // $('#main-container').hide();
	                        $("#main-container").html(data).fadeIn();
       					 // $('#main-container').show("fade", 20);
	                    },
	                    dataType:'html',
	                    error : function(request,error)
	                    {
	                        alert("Request: "+JSON.stringify(request));
	                        alert("error: "+JSON.stringify(error))
	                    }
	                  });

		});

	   $( "#home-btn" ).trigger( "click" );

	
});


setTimeout(function(){
             $( "#home-btn" ).trigger( "click" );

      }, 100);