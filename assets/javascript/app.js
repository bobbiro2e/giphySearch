var tvshows = ["Game of Thrones", "American Horror Story", "Stranger Things", "Black Mirror", "Jessica Jones"];

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < tvshows.length; i++) {
        var button = $("<button>");
        button.addClass("tvshow-btn btn-outline-light rounded");
        button.attr("data-name", tvshows[i]);
        button.text(tvshows[i]);
        $("#buttons-view").append(button);
    }
}

$("#add-tvshow").on("click", function (event) {
    event.preventDefault();
    var tvshowInput = $("#tvshow-input").val().trim();
    tvshows.push(tvshowInput);
    renderButtons();
    $("#tvshow-input").val("")
});

renderButtons();


function displayGif() {

    var apiKey = "uqoGuh8Hglo2HoyCFHUHo2KEJK3KyEmm"

    var tvshow = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + tvshow + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        console.log(results)
        for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r") {

                var gifDiv = $("<div>");
                gifDiv.addClass("item d-inline-flex justify-content-around flex-wrap")

                var tvshowIMG = $("<img>");

                tvshowIMG.attr("src", results[i].images.fixed_height_still.url);
                tvshowIMG.attr("data-still", results[i].images.fixed_height_still.url)
                tvshowIMG.attr("data-animate", results[i].images.fixed_height.url)
                tvshowIMG.attr("data-state", "still")
                tvshowIMG.addClass("img")

                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                p.addClass("rating")
                gifDiv.append(tvshowIMG);
                gifDiv.append(p);

                $("#gifs-appear-here").prepend(gifDiv);

            }

        }
    });

};
$(document).on("click", ".img", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "playing")
    } else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
    }
});

$(document).on("click", ".tvshow-btn", displayGif);

