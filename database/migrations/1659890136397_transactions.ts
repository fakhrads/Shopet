import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('total_harga')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
