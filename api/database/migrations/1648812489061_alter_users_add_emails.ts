import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterUsersAddEmails extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('email')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('email')
    })
  }
}
