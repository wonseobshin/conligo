exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, username: 'Alice', first_name: 'Alice', last_name: 'Smith', email: 'asmith@conlingo.com', password:'asdf'}),
        knex('users').insert({id: 2, username: 'Bob', first_name: 'Robert', last_name: 'Smith', email: 'rsmith@conlingo.com', password:'asdfg'}),
        knex('users').insert({id: 3, username: 'Charlie', first_name: 'Charles', last_name: 'Xavier', email: 'profx@x-men.com', password:'x'})
      ]);
    });
};
