
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {name: 'Tableau', category: 'Restaurants', user_id: 1},
        {name: 'The Hobbit', category: 'Books', user_id: 2},
        {name: 'X-men', category: 'Movies', user_id: 3},
        {name: 'Wheelchair', category: 'Products', user_id: 3}
      ]);
    });
};
