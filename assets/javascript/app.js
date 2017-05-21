var movies = ["Aladdin", "Tommy Boy", "Frozen", "The Lion King"];

function displayMovieInfo() {
    var person = $(this).attr("data-name");
    $("#gifs-appear-here").empty();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var personImage = $("<img>");
                    personImage.addClass("gif");
                    personImage.attr("data-state", "still");
                    personImage.attr("data-still", results[i].images.fixed_height_still.url);
                    personImage.attr("data-animate", results[i].images.fixed_height.url);
                    personImage.attr("src", results[i].images.fixed_height_still.url);
                    gifDiv.append(p);
                    gifDiv.append(personImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }
            console.log(results);
            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
                console.log(this);
            });
        });
}

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < movies.length; i++) {
        var a = $("<button>");
        a.addClass("movie btn btn-primary");
        a.attr("data-name", movies[i]);
        a.text(movies[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-movie").on("click", function(event) {
    event.preventDefault();
    var movie = $("#movie-input").val().trim();
    movies.push(movie);
    console.log(movies)
    renderButtons();
    $("#movie-input").val("");
});

$(document).on("click", ".movie", displayMovieInfo);

renderButtons();
