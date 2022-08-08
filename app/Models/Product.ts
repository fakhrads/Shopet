import { DateTime } from 'luxon'
import { BaseModel, 
  belongsTo, 
  BelongsTo, 
  column,
} from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public categories_id: number

  @belongsTo(() => Category,{ localKey: 'id', foreignKey:'categories_id'})
  product: BelongsTo<typeof Category>

  @column()
  public nama_product: string

  @column()
  public jenis_product: string

  @column()
  public stok_product: number

  @column()
  public harga: number

  @column()
  public status: string

  @column()
  public deskripsi_product: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
