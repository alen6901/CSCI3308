var current_page = 0;
function getPhotos(page) {
    var key = "173e29e754fddf7b7e3c325358bed4a8";
    if (
        document.getElementById("min_taken_date").value &
        document.getElementById("tags").value
    ) {
        var minDate = document.getElementById("min_taken_date").value;
        var tag = document.getElementById("tags").value;
    }
    var url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags='${tag}'&min_taken_date=${minDate}&privacy_filter=&safe_search=&extras=url_sq&per_page=20&page=&format=json&nojsoncallback=1`; //Place your Flickr API Call Here
    $.ajax({ url: url, dataType: "json" }).then((data) => {
        console.log(data); //Review all of the data returned
        data.photos.photo.map((items) => {
            var place = document.createElement("div");
            place.innerHTML = `<img src='${items.url_sq}'>
                <p> '${items.title}' <p>`;
            placeholder.append(place);
        });
    });
    current_page++;
}
window.onscroll = function (ev) {
    if (
        window.innerHeight + Math.ceil(window.pageYOffset) >=
        document.body.offsetHeight
    ) {
        // you're at the bottom of the page
        getPhotos(current_page);
    }
};
