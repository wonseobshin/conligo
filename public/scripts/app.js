$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((todos) => {
    for(const todo of todos) {
      $("<div>").text('Your list: ' + todo.name).appendTo($("body"));
    }
  });;
});
