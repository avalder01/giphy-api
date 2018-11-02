
var topics = ["buffy", "pumpkin", "ghost"];

function renderButtons() {
    $("#buttonsHere").empty();

    for (var i = 0; i < topics.length; i++) {
        var button= $("<button>");
        button.addClass("topic");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#buttonsHere").append(button);
    }
  };

//   $("#addCartoon").on("click", function(event) {
//     event.preventDefault();
//     var cartoon = $("#cartoonInput").val().trim();
//     cartoons.push(cartoon);
//     renderButtons();
// });
renderButtons();
// Event listener for all button elements
$("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var spooky = $(this).attr("data-name");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      spooky + "&api_key=r7IFXiT9CgQSHqGes7mqMrZ12J6EKcWC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var spookyImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            spookyImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(spookyImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifsHere").prepend(gifDiv);
          }
        }
      });
  });






























