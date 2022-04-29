import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Machine from 'App/Models/Machine'
import Log from 'App/Models/Log'
import { DateTime } from 'luxon'

export default class MachinesController {
  public async index({ response }: HttpContextContract) {
    const machines = await Machine.all()

    response.json({
      message: 'Successfully fetched all machines',
        data: machines
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {

    const { name, description, state, image } = request.body()

    const machine = await Machine.create({ name, description, state, image })

    response.status(200).json({
      message: 'Machine successfully created',
      data: machine
    })
  }

  public async show({ params: { id }, response }: HttpContextContract) {
    const machine = await Machine.find(id)

    if(machine) {
      response.status(200).json({
        message: 'Machine found',
        data: machine
      })
    }
    else {
      response.status(404).json({
        message: 'Machine not found',
        data: {}
      })
    }
  }

  public async edit({}: HttpContextContract) {}

  public async update({ params: { id }, request, response, auth }) {

    const machine = await Machine.find(id)

    if (machine) {
      const { name, description, state } = request.body()

      machine.name = name
      machine.description = description
      machine.state = state

      await machine.save()

      const machine_id = id
      const user_id = auth.user.id
      const action = 'machine ' + machine.name + ' updated by user ' + auth.user.username

      const log = await Log.create({ user_id, machine_id, action })

      response.status(200).json({
        message: 'Machine successfully updated',
        data: machine
      })
    } else {
      response.status(404).json({
        message: 'Machine not found',
        data: {}
      })
    }
  }

  public async destroy({ params: { id }, response }: HttpContextContract) {
    const machine = await Machine.find(id)

    if (machine) {
      await machine.delete()
      
      response.status(200).json({
        message: 'Machine successfully deleted',
        data: id
      })
    }
    else {
      response.status(404).json({
        message: 'Machine not found',
        data: {}
      })
    }
  }
}
