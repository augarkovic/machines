/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.resource('machines', 'MachinesController')

Route.resource('users', 'UsersController')

Route.post("register", "AuthController.register")

Route.post("login", "AuthController.login")

Route.get("user", "AuthController.user")

Route.post("logout", "AuthController.logout")

Route.get('logs/mostRecentLog/:machineId', "LogsController.mostRecentLog")

// https://pusher.com/tutorials/api-authentication-adonis/
// https://www.section.io/engineering-education/build-a-restful-api-with-adonisjs/
// https://warrenwong.org/posts/add-authentication-to-adonisjs/


// https://github.com/techlab23/nuxt-adonis-jwt-auth?ref=https://coder.social