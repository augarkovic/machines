import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Machines extends BaseSchema {
  protected tableName = 'machines'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('name')
      table.text('description')
      table.string('state')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
