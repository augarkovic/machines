import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('username')
      table.string('password')
      table.string('fullName')
      table.integer('role_id').unsigned()
      table.foreign('role_id').references('roles.id').onUpdate('cascade').onDelete('cascade')
      table.boolean('isActive')
      table.string('status')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
