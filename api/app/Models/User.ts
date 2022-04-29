import { DateTime } from 'luxon'
import Role from 'App/Models/Role'
import Log from 'App/Models/Log'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
  belongsTo,
  BelongsTo
} from "@ioc:Adonis/Lucid/Orm"
import Hash from "@ioc:Adonis/Core/Hash"

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public email?: string

  @column()
  public rememberMeToken?: string

  @column()
  public role_id: Number

  @column({ serializeAs: null })
  public password: string

  @column()
  public username: string

  @column({ columnName: 'isActive' })
  public isActive: boolean

  @column()
  public status: string

  @column({ columnName: 'fullName' })
  public fullName: string

  @belongsTo(() => Role, { foreignKey: 'role_id' })
  public role: BelongsTo<typeof Role>

  @hasMany(() => Log)
  public logs: HasMany<typeof Log>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
