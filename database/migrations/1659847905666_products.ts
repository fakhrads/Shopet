import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
    })
  }

  public async down () {
    this.schema.dropTable('jenis_product')
  }
}
