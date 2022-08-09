import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'detail_transactions'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('total_harga').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
