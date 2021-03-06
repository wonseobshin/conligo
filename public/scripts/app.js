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

  // adapted from http://jsfiddle.net/QcQYa/10/
  function expandListOnHover(target) {

    var $thisTodoList = $(target).siblings();
    var $currentList = $(target).parent().children(".todo-list")[0].id;

    setTimeout(() => {
      $thisTodoList.slideDown(300);
      setTimeout(() => {
        // isSliding = false;
        todoListStates[target.id] = false;
      }, 300)
    }, 400)

    $(".todo-list").each(function(index, someList) {
      if (someList.id !== $currentList) {
        $(this).slideUp(300)
      }
    })

  }

  $(".todo-list").on("touchmove", function(event) {
    event.preventDefault();
  });

  const todoListStates = {}
  $('.todo-title').each((_, element) => { todoListStates[element.id] = false });

  $(".todo-title").on("pointermove", function(evt) {
    todoListStates[evt.target.id] = true;
    setTimeout(() => {
      if ($(window).innerWidth() <= 430) {
        if (todoListStates[evt.target.id]) {
          // isSliding = true;
          expandListOnHover(evt.target);
        }
      }
    }, 1000)

  })

  $('.todo-title').on('pointerleave', function(evt) {
    todoListStates[evt.target.id] = false;
  })

  $('.todo-input').keydown(function(event) {
    if (event.which == 13) {
      this.form.submit();
      event.preventDefault();
      $("#create-new-todo")
        .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Please Wait');
    }
  });
  $('#create-new-todo').click(function(event) {
    this.form.submit();
    event.preventDefault();
    $("#create-new-todo")
      .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Please Wait');
  });


});

// After board is generated list items ae available, ALL calls to the list items after this point
$(document).ajaxStop(function() {
  var categories = document.getElementsByClassName("todo-list");
  Array.from(categories).forEach(function(element) {
    var sortable = Sortable.create(element, {
      group: "categories",
      animation: 150,
      dragoverBubble: true,
      emptyInsertThreshold: 15,
      onEnd: function(event) {
        var itemID = event.item.attributes.name.value;
        var newCategory = event.to.id.slice(5);
        newCategory = newCategory.charAt(0).toUpperCase() + newCategory.slice(1);
        $.ajax({
          method: "put",
          url: `/api/users/item/${itemID}`,
          data: {
            newCategory: newCategory
          }
        })

      }
    })
  });

  $(".delete-item").click(function() {
    var $itemID = $(this).parent()[0].attributes.name.value;
    var $itemToRemove = $(this).parent()[0];
    $($itemToRemove).css("border-style", "none");
    $($itemToRemove).slideUp("slow");

    $.ajax({
      method: "delete",
      url: `/api/users/item/${$itemID}`,
    })
  });
})
