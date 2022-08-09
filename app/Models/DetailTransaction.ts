import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Transaction from './Transaction'
import Product from './Product'

export default class DetailTransaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public transactions_id: number

  @belongsTo(() => Transaction,{ localKey: 'id', foreignKey:'transactions_id'})
  transactions: BelongsTo<typeof Transaction>

  @column()
  public products_id: number

  @belongsTo(() => Product,{ localKey: 'id', foreignKey:'products_id'})
  products: BelongsTo<typeof Product>

  @column()
  public total: number

  @column()
  public total_harga: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
