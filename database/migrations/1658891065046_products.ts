import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('categories_id')
        .unsigned()
        .references('categories.id')
        .onDelete('CASCADE') 
      table.string('nama_product')
      table.string('jenis_product')
      table.string('deskripsi_product')
      table.integer('stok_product')
      table.enum('status',['Tersedia','Tidak Tersedia']).notNullable().defaultTo('Tersedia')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
