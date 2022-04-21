var mostrecentCocktail;
function getCocktail() {
    Cocktail = document.getElementById("Cocktail").value;
    console.log("getCocktail");
    console.log(Cocktail);
    if (Cocktail) {
        var url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${Cocktail}`;
        $.ajax({ url: url, dataType: "json" }).then((data) => {
            console.log(data); //Review all of the data returned
            mostrecentCocktail = data.drinks[0];
            console.log(mostrecentCocktail);
            var place = document.getElementById("Cocktail Data");
            let drinkName = mostrecentCocktail.strDrink
                ? mostrecentCocktail.strDrink
                : "-";
            let drinkCategory = mostrecentCocktail.strCategory
                ? mostrecentCocktail.strCategory
                : "-";
            let drinkTags = mostrecentCocktail.strTags
                ? mostrecentCocktail.strTags
                : "-";
            let drinkInstruction = mostrecentCocktail.strInstructions
                ? mostrecentCocktail.strInstructions
                : "-";

            place.innerHTML = `<h4 name = 'strDrink' id = 'strDrink'><b>${drinkName}</b></h4>
                <h5 id = 'strCategory'><b>Category: ${drinkCategory}</b></h5>
                <img id = 'strDrinkThumb' src = ${mostrecentCocktail.strDrinkThumb}></img>
                <br></br>
                <h10 id = 'strTags'><b>Tags: ${drinkTags}</b></h10>
                <br></br>
                <h10 id = 'strInstructions'><b>Instructions:</b> ${drinkInstruction}</h10>`;
            placeholder.append(place);
        });
    }
}
function getSearch() {
    console.log("getSearch");
    console.log(mostrecentCocktail);
    if (mostrecentCocktail) {
        let drinkName = mostrecentCocktail.strDrink
            ? mostrecentCocktail.strDrink
            : "-";
        let drinkCategory = mostrecentCocktail.strCategory
            ? mostrecentCocktail.strCategory
            : "-";
        let drinkUrl = mostrecentCocktail.strDrinkThumb
            ? mostrecentCocktail.strDrinkThumb
            : "-";
        let drinkTags = mostrecentCocktail.strTags
            ? mostrecentCocktail.strTags
            : "-";
        let drinkInstruction = mostrecentCocktail.strInstructions
            ? mostrecentCocktail.strInstructions
            : "-";
        var jsonData = {
            drink: [
                {
                    Name: drinkName,
                    Category: drinkCategory,
                    Url: drinkUrl,
                    Tags: drinkTags,
                    Instructions: drinkInstruction,
                },
            ],
        };
        $.ajax({
            type: "Post",
            url: "/searches",
            data: jsonData,
            success: function (data, status) {
                console.log("posting for db");
                alert("added to searchHistory");
                window.location.assign("/searches");
            },
            error: function (status, error) {
                console.log("error");
            },
        });
    }
}

function gotosearch() {
    var request = new XMLHttpRequest();
    request.open("GET", "/searches");
    request.send(null);
    alert(request.status);
}
