$(document).ready(function() {
	

	 // create click event handler for register button
    $("#register-btn").click(function(){
        // alert("register");
        // window.location.replace("/register");
        $("#main-container").hide()

  		wanted = "register"
		var data = $.ajax({
                    type: "GET",
                    url: "/register",
                    data: wanted,
                    cache: false,
                    success: function(data){
                        $("#main-container").html(data).fadeIn();
                    },
                    dataType:'html',
                    error : function(request,error)
                    {
                        alert("Request: "+JSON.stringify(request));
                        alert("error: "+JSON.stringify(error))
                    }
                });
    }); 

    // create click event handler for forgot pw button
     $("#forgot-btn").click(function(){
        alert("you forgot");
    });

     // change styling for login form based on user input
      $('#username, #password').on('input', function() {
    if ($('#username').val() && $('#password').val()) {
        $('.login').addClass('buttonafter');
    } else {
        $('.login').removeClass('buttonafter');
    }
});


});

// setTimeout(function(){
//              $("#account-btn").attr("class","nav-link active");
//       }, 150);