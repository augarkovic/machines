import { DateTime } from 'luxon'
import User from 'App/Models/User'
import Machine from 'App/Models/User'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

export default class Log extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column({ columnName: 'user_id' })
  public userId: number

  @column({ columnName: 'machine_id' })
  public machineId?: number

  // Relationship
  @belongsTo(() => User, { foreignKey: 'userId' })
  public user: BelongsTo<typeof User>

  // Relationship
  @belongsTo(() => Machine, { foreignKey: 'machineId' })
  public machine: BelongsTo<typeof Machine>

  @column()
  public action?: string
}
