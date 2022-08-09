import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import User from './User'

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public products_id: number

  @belongsTo(() => Product,{ localKey: 'id', foreignKey:'products_id'})
  product: BelongsTo<typeof Product>

  
  @column()
  public users_id: number

  @belongsTo(() => User,{ localKey: 'id', foreignKey:'users_id'})
  users: BelongsTo<typeof User>

  @column()
  public total: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
