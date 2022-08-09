import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response, session }: HttpContextContract, next: () => Promise<void>) {
    await auth.use('web').authenticate()
    if(auth.use('web').user!.level == "Admin" || auth.use('web').user!.level == "Owner") {
        await next()
      } else {
        session.flash({error: 'Anda tidak memiliki akses!'})
        response.redirect().back()
    }
  }
}
