import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    
    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/dashboard')
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
