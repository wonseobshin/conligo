function generateItem(category, name, id) {
  let list = '';
  switch (category) {
    case "Movie":
      list = "#list-movies"
      break;
    case "TelevisionProgram":
      list = "#list-movies"
      break;
    case "Book":
      list = "#list-books"
      break;
    case "Restaurant":
      list = "#list-restaurants"
      break;
    default:
      list = "#list-products"
  }


  $("<div>", {
    "class": 'list-item',
    text: name,
    name: id
  }).appendTo($(list))
}


$(document).ready(function() {

  // fill todo lists
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(function(todos) {
    for (var todo of todos) {
      generateItem(todo.category, todo.name, todo.id);
    }
  });

});
