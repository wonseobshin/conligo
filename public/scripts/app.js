function generateItem(category, name, id) {
  let list = '';
  switch (category) {
    case "Movie":
    case "Movies":
    case "TelevisionProgram":
    case "TelevisionPrograms":
      list = "#list-movies"
      break;
    case "Book":
    case "Books":
      list = "#list-books"
      break;
    case "Restaurant":
    case "Restaurants":
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

  $(".todo-title").click(function() {
    var $todoTitle = $(".todo-title");
    var $thisTodoList = $(this).siblings();
    var $thisTodoList.css("display", "flex");

    $(this).parent().parent().css("order", "-1");
    $(this).parent().parent().siblings().css("order", "0");
    $(this).parent().css("order", "-1");
    $(this).parent().siblings().css("order", "0");

  });

  $('.todo-input').keydown(function(event) {
    if (event.which == 13) {
      this.form.submit();
      event.preventDefault();
    }
  });
});
