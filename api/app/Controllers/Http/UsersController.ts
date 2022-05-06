import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all()

    response.json({
      message: 'Successfully fetched all users',
        data: users
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({params: { id }, request, response, auth}) {
    const user = await User.find(id)

    if(user) {
      const { role_id } = request.body()

      user.role_id = role_id

      await user.save()

      response.status(200).json({
        message: 'User successfully updated',
        data: user
      })
    } else {
      response.status(404).json({
        message: 'User not found',
        data: {}
      })
    }
  }

  public async destroy({}: HttpContextContract) {}
}
