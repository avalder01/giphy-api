
// array of spooky topics 
var topics = ["buffy", "pumpkin", "ghost", "vampire", "witch", "courage the cowardly dog", "sabrina the teenage witch"];

// displaySpookyInfo function re-renders the HTML to display the appropriate content
function displaySpookyInfo() {
    var spooky = $(this).attr("data-name");
    // Constructing a URL to search Giphy for various spooky gifs
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      spooky + "&api_key=r7IFXiT9CgQSHqGes7mqMrZ12J6EKcWC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var spookyImage = $("<img>");

            spookyImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(spookyImage);

            $("#gifsHere").prepend(gifDiv);
          }
        }
      });
  };

  // Function that renders buttons
function renderButtons() {
    $("#buttonsHere").empty();

    for (var i = 0; i < topics.length; i++) {
        var button= $("<button>");
        button.addClass("topic-btn");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#buttonsHere").append(button);
    }
  };

  // This function adds a button of the users chosen topic
  $("#addSpook").on("click", function(event) {
    event.preventDefault();
    var userChoice = $("#topicInput").val().trim();
    topics.push(userChoice);
    renderButtons();
});

//  click event listener that triggers the computer to pull giphs when clicked
$(document).on("click", ".topic-btn", displaySpookyInfo);

// calls renderButtons function 
renderButtons();



// click event that triggers the gifs to be static/animated when clicked 
// figure out how to link this with the gifs 
// change ".gif"
$(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });


// To do list 
// .make gifs static until clicked
// .make gifs still when clicked again





























