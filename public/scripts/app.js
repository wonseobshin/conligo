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
    name: id,
    draggable: "true",
    ondragstart: "dragstart_handler(event);"

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
    if ($(window).innerWidth() <= 430) {
      var $thisTodoList = $(this).siblings();
      var $currentList = $(this).parent().children(".todo-list").id;

      $(".todo-list").each(function(index, someList) {
        console.log(someList.id);
        if (someList.id !== $currentList) {
          $(this).slideUp(300)
        }
      })
      setTimeout(() => {
        $thisTodoList.slideDown(300);
      }, 400)
    }
  });

  $('.todo-input').keydown(function(event) {
    if (event.which == 13) {
      this.form.submit();
      event.preventDefault();
    }
  });
});

function dragstart_handler(event) {
  /*  var img = new Image();
    img.src = "/../images/todo.png";
    event.dataTransfer.setDragImage(img, 0, 0);
  */

  // Add the target element's id to the data transfer object
  event.dataTransfer.setData("text", event.target.id);
  console.log("dragStart: ", event.dataTransfer);
}

function dragover_handler(event) {
  event.preventDefault();
  // Set the dropEffect to move
  event.dataTransfer.dropEffect = "move"
}

function drop_handler(event) {
  console.log("dropped")
  event.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
  var data = event.dataTransfer.getData("text");
  console.log("appending: ", document.getElementById(data));

  event.target.appendChild(document.getElementById(data));
}
