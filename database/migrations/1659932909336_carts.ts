import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'carts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('users_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE') 
        .notNullable()
      table
        .integer('products_id')
        .unsigned()
        .references('products.id')
        .onDelete('CASCADE')  
        .notNullable()
      table.integer('total')

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
