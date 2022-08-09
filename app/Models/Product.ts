import { DateTime } from 'luxon'
import { BaseModel, 
  belongsTo, 
  BelongsTo, 
  column,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Cart from './Cart'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public categories_id: number

  @belongsTo(() => Category,{ localKey: 'id', foreignKey:'categories_id'})
  product: BelongsTo<typeof Category>

  @hasMany(() => Cart, {
    foreignKey: 'products_id', // defaults to userId
  })
  public products_id: HasMany<typeof Cart>

  @column()
  public nama_product: string

  @column()
  public stok_product: number

  @column()
  public harga: number

  @column()
  public status: string

  @column()
  public photo_path: string

  @column()
  public deskripsi_product: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
