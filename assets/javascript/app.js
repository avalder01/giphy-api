
// array of spooky topics 
var topics = ["Buffy", "Pumpkin", "Ghost", "Vampire", "Witch", "Courage The Cowardly Dog", "Sabrina The Teenage Witch"];

// displaySpookyInfo function re-renders the HTML to display content
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
            var pOne = $("<p>").text("Rating: " + rating);
            var spookyImage = $("<img>").addClass("gif");
            spookyImage.attr("src", results[i].images.fixed_width_still.url);
            spookyImage.attr("data-still", results[i].images.fixed_width_still.url);
            spookyImage.attr("data-animate", results[i].images.fixed_width.url);
            spookyImage.attr("data-state", "still");
            gifDiv.prepend(pOne);
            gifDiv.prepend(spookyImage);
            $("#gifsHere").prepend(gifDiv);
          }
        }
      });
  };
  
// click event that triggers the gifs to be static/animated when clicked 

function staticAnimate() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };
  // Function that renders buttons
function renderButtons() {
    $("#buttonsHere").empty();

    for (var i = 0; i < topics.length; i++) {
        var button= $('<button type="button" class="btn btn-success">');
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

//  click event listeners 
$(document).on("click", ".topic-btn", displaySpookyInfo);
$(document).on("click", ".gif", staticAnimate);

// calls renderButtons function 
renderButtons();



































