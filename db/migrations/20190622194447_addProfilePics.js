
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function (table) {
        table.string('profile_pic');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function (table) {
        table.dropColumns('profile_pic');
      });
};
