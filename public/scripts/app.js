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
    "class": 'list-item source',
    ondragstart: "dragstart_handler(event);",
    draggable: "true",
    name: id
  }).append($("<img>", {
    "class": 'delete-item',
    src: '/images/delete.png'
  })).append($("<b>", {
    text: name
  })).append($("<img>", {
    "class": 'move-item',
    src: '/images/move.png'
  })).appendTo($(list))
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

// After board is generated list items ae available, ALL calls to the list items after this point
$(document).ajaxStop(function() {
  $(".delete-item").click(function() {
    var $itemID = $(this).parent()[0].attributes.name.value;
    var $itemToRemove = $(this).parent()[0];
    $($itemToRemove).css("border-style", "none");
    $($itemToRemove).slideUp("slow");

    $.ajax({
      method: "delete",
      url: `/api/users/${$itemID}`,
    })
  });

})
