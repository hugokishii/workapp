
exports.up = function(knex) {
  return knex.schema.createTable('advert', function(table){
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('imageAdvert').notNullable();
    table.string('employee_id').notNullable();
    table.foreign('employee_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('advert');
};
