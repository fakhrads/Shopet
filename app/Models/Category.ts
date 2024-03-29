import { DateTime } from 'luxon'
import { BaseModel, column,
  hasMany,
  HasMany  } from '@ioc:Adonis/Lucid/Orm'

import Product from 'App/Models/Product'

export default class Category extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Product, {
    foreignKey: 'categories_id', // defaults to userId
  })
  public categories_id: HasMany<typeof Product>

  @column()
  public category_name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
