import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('users_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE') 
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
