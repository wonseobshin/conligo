$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(function(todos) {
    for(var todo of todos) {
      $("<div>").text('Your list: ' + todo.name).appendTo($("body"));
    }
  });
});
