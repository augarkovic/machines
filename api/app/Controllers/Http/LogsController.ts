import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log';

export default class LogsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async mostRecentLog({ request, response, params }: HttpContextContract) {
    const mostRecentLog = await Log.query().where('machine_id', '=', params.machineId).where('action', 'ilike', `%updated%`).preload('user').orderBy('created_at', 'desc').first()
    
    if (mostRecentLog) {
      response.json({
        message: 'Successfully fetched the most recent log',
        data: mostRecentLog
      })
    } else {
      response.status(404).json({
        message: 'Most recent log not found',
        data: {}
      })
    }

  }
}
