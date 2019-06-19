
exports.up = function(knex, Promise) {
  return addUsersTable().then(addTodosTable)

  function addUsersTable () {
    return knex.schema.table('users', function (table) {
      table.renameColumn('name', 'username');
      table.string('first_name', [50]);
      table.string('last_name', [50]);
      table.string('email', [50]);
      table.string('password', [255]);
    });
  }
  function addTodosTable(){
    return knex.schema.createTable('todos', function (table) {
      table.increments('id');
      table.string('name', [50]);
      table.string('category', [50]);
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    });
  }
}

exports.down = function(knex, Promise) {
  return dropTodos().then(editUsers);

  function dropTodos() {
    return knex.schema.dropTable('todos');
  }
  function editUsers() {
    return knex.schema.table('users', function (table) {
      table.dropColumns('first_name', 'last_name', 'email', 'password');
      table.renameColumn('username', 'name');
    })
  }
};
