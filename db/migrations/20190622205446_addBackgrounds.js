
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function (table) {
        table.string('background_pic');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function (table) {
        table.dropColumns('background_pic');
      });
};
