// Example queryURL for Giphy API
var apiKey = "CD74uYBJ6ajZIvEZFZpYNGXE8pFUM8Xw"
var limit = 10
var topicsList =
    ["cheesesteak",
        "pizza",
        "cheeseburger",
        "ice cream",
        "peanuts",
        "cereal",
        "bacon",
        "eggs"
    ]




function makeButton(name) {

    var button = $("<button>")

    button.attr("id", name)
    button.attr("class", "btn")

    button.text(name)

    $("#buttonStart").append(button)

}


for (var i = 0; i < topicsList.length; i++) {

    makeButton(topicsList[i])
}


$("#submit").on("click", function (event) {

    event.preventDefault();

    var textInput = $("#textBox").val().trim()

    topicsList.push(textInput)

    makeButton(textInput)

    $("#textBox").val("")
})


$(document).on("click", ".btn", function () {

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey
    var searchTerm = $(this).attr("id")

    queryURL = queryURL + "&q=" + searchTerm + "&limit=" + limit

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            animalImage.attr("class", "gif")

            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height_still.url);

            // Appending the paragraph and image tag to the animalDiv

            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifStart").prepend(animalDiv);
        }

    });

})

// thanks SO
$('body').on('click', '.gif', function () {

    var src = $(this).attr("src");
    if ($(this).hasClass('playing')) {
        //stop
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
    } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
});