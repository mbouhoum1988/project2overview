var searchQuery;
$("#searchRecipeButton").on("click", function(event) {
  event.preventDefault();
  searchQuery = $("#searchRecipe")
    .val()
    .trim();

  var queryURL = "https://api.edamam.com/search?q="; 
  queryURL += searchQuery; 
  queryURL += "&app_id=cfbcb06c&app_key=df0452d2212b0c38ac05a429fc61c3af";

  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var total = 9;

    $("#results").empty();

    for (var i = 0; i < total; i++) {
      var recipes = response.hits[i];
      var recipeRow = $("<div class='row'></div>");

      var imageUrl = recipes.recipe.image;
      var image = $("<img>");
      image.addClass("insertImage keepElement");
      image.attr("src", imageUrl);

      var name = $("<h5>");
      name.addClass("title");
      name.html(recipes.recipe.label);

      var link = $("<a>" + recipes.recipe.label + "</a>");
      link.addClass("keepElement recipeLink");
      link.attr("href", recipes.recipe.url);

      var btn = $(
        "<button class='btn btn-default addbutton'>add to your list</button>"
      );

      recipeRow.append(name);
      recipeRow.append(image);
      recipeRow.append(link);
      recipeRow.append(btn);

      $("#resultsshow").show();
      $("#results").append(recipeRow);
    }

    $(".addbutton").on("click", function() {
      var addname = $("<div id='addname'>");
      var addtitle = $(this)
        .parent()
        .children(".title");
      var addimage = $(this)
        .parent()
        .children(".insertImage");
      var addlink = $(this)
        .parent()
        .children(".recipeLink");
      var addbtn = $(this)
        .parent()
        .children(".btn");

      var datatitle = $(this)
        .parent()
        .children(".title")
        .html();
      var datalink = $(this)
        .parent()
        .children(".recipeLink")
        .attr("href");

      var addPost = {
        text: datatitle,
        description: datalink
      };

      console.log(addPost);

      addname.append(addtitle);
      addname.append(addimage);
      addname.append(addlink);
      addname.append(addbtn);

      $("#display").append(addname);

      addname.children(".btn").remove();
      $("#shows").show();

      $.ajax("/api/food", {
        method: "post",
        data: addPost
      }).then(function(){});
    });
  });
});
