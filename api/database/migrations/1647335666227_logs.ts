import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Logs extends BaseSchema {
  protected tableName = 'logs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.integer('user_id').unsigned().notNullable()
      table.integer('machine_id').unsigned()
      table.foreign('user_id').references('users.id').onUpdate('cascade').onDelete('cascade')
      table.foreign('machine_id').references('machines.id').onUpdate('cascade').onDelete('cascade')
      table.string('action').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
