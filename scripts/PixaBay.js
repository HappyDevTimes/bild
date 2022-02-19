var pageNumber = 1;
var API_KEY = '6842085-e1731a927520d8ddf63cd9325';
var searchQ = "";
var colorQ = "";
var URL = "";

$("#sokbutton").click(() => {
    search()
});

$(document).ready(() => {
    search();
});

function search() {
    searchQ = $("#searchfield").val();
    colorQ = $('#colors').find(":selected").text().toLowerCase();
    URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(searchQ) + "&colors=" + encodeURIComponent(colorQ) + "&per_page=10&page=" + pageNumber;
    $('#image-container').empty();
    $.getJSON(URL, function (data) {
        console.log(data)
        if (parseInt(data.totalHits) > 0)

            $.each(data.hits, function (i, hit) {
                console.log(hit.previewURL);
                // $('#image-container').append("<div id='imagegrid'><img src=" + hit.largeImageURL + "></img></div>");

                var grid = document.createElement('div');
                grid.setAttribute("id", "imagegrid");
                grid.innerHTML = "<img src=" + hit.largeImageURL + "></img>";

                var user = document.createElement("p");
                user.innerHTML = hit.user

                var tags = document.createElement("p");
                tags.innerHTML = hit.tags

                grid.append(user);
                grid.append(tags);
                $('#image-container').append(grid);


            });
        else
            console.log('No hits');
    });
}

$('#nextButton').click(function () {
    pageNumber++;
    $('#image-container').empty();
    URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(searchQ) + "&colors=" + encodeURIComponent(colorQ) + "&per_page=10&page=" + pageNumber;
    $.getJSON(URL, function (data) {
        if (parseInt(data.totalHits) > 0)

            $.each(data.hits, function (i, hit) {
                console.log(hit.previewURL);
                $('#image-container').append("<div id='imagegrid'><img src=" + hit.largeImageURL + "></img></div>");
            });
        else
            console.log('No hits');
    });
});

$(function () {
    $('#previousButton').click(function () {
        if (pageNumber == 1) return;
        pageNumber--;
        URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(searchQ) + "&colors=" + encodeURIComponent(colorQ) + "&per_page=10&page=" + pageNumber;
        $('#image-container').empty();
        $.getJSON(URL, function (data) {
            if (parseInt(data.totalHits) > 0)

                $.each(data.hits, function (i, hit) {
                    console.log(hit.previewURL);
                    $('#image-container').append("<div id='imagegrid'><img src=" + hit.largeImageURL + "></img></div>");
                });
            else
                console.log('No hits');
        });
    });
});
