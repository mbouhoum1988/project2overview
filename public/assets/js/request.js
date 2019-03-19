var searchQuery;
      $("#searchRecipeButton").on("click", function(event) {
        event.preventDefault();
        searchQuery = $("#searchRecipe").val().trim();

        var queryURL = "https://www.food2fork.com/api/search?key=f138a3cb85c879f8b2af9455ce4f2913&q=" + searchQuery;

        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {

            var result = JSON.parse(response);
            var total = 6;

            $("#results").empty();

            for (var i = 0; i < total; i++) {
              var recipe = result.recipes[i];
              var recipeRow = $("<div class='row'></div>");
              var btn = $("<button class='btn btn-default addbutton'>add to your list</button>")
              var image_url = recipe.image_url;
              var image = $("<img>");
              image.addClass("insertImage keepElement");
              image.attr("src", image_url);

              var name = $("<h5>");
              name.addClass("title");
              name.html(recipe.title);

              recipeRow.append(name);
              recipeRow.append(image);
              recipeRow.append(
                $(`
                <a class="keepElement recipeLink" href="${recipe.source_url}">
                  ${recipe.title}
                </a>
              `));
              recipeRow.append(btn);

              $("#results").append(recipeRow);
            }

            $(".addbutton").on("click", function () {
                
                 var addname = $("<div>");
                 var addtitle = $(this).parent().children(".title");
                 var addimage = $(this).parent().children(".insertImage");
                 var addlink = $(this).parent().children(".recipeLink");
                 var addbtn = $(this).parent().children(".btn");

                 var datatitle = $(this).parent().children(".title").val();
                 var datalink = $(this).parent().children(".recipeLink").val();

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

                $.ajax("/api/food",
                {
                  method: "post",
                  data: addPost
                }).then(function() {

                });
            });
        });

      });