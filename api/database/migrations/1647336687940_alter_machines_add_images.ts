import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterMachinesAddImages extends BaseSchema {
  protected tableName = 'machines'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('image')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('image')
    })
  }
}
