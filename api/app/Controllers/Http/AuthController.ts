import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'



export default class AuthController {
    public async login({ request, auth, response }: HttpContextContract) {
        const { username, password } = request.body()

        try {
            const token = await auth.use("api").attempt(username, password, {
                expiresIn: "10 days",
            });

            return response.status(200).json({
                message: 'Token successfully generated',
                data: token
            })  
        } catch {
            return response.status(404).json({
                message: 'Invalid username/password!',
                data: {},
            })  
        }
    }

    public async register({ request, auth, response }: HttpContextContract) {
        const { email, username, password, fullName } = request.body()
        const userUsername = await User.findBy('username', username)
        const userEmail = await User.findBy('email', email)

        if (userUsername || userEmail) {
            return response.status(400).json({
                message: 'User already exists!',
                data: {}
            })
        } else {
            const role_id = 1
            const isActive = false
            const status = "registered"
            const newUser = await User.create({ username, password, email, fullName, role_id, isActive, status  })
    
            return response.status(200).json({
                message: 'User successfully registered!',
                data: newUser
            })
        }
    }


    public async user({ request, auth, response }: HttpContextContract) {
        console.log(auth.user);
        
        if (auth.user) {
            const user = await User.query().where('id', auth.user.id).preload('role').preload('logs').firstOrFail()

            user.isActive = true
            await user.save()
    
            return response.json({
                message: 'User successfully fetched!',
                data: user
            })
        }

        return response.status(404).json({
            message: 'User not found',
            data: {}
        })
    }

    public async logout({ auth, response }) {
        const loggedUser = await User.findBy('id', auth.user.id)
        if (loggedUser) {
            loggedUser.isActive = false
            loggedUser.save()
        }

        await auth.use('api').logout()

        return response.status(200).json({
                message: 'User logged out!',
                data: {}
        })
    }
}
