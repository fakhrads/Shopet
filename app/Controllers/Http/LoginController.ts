import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
    
    public async loginPage({ view }: HttpContextContract) {
      return view.render('auth/login')
    }

    public async login({ auth, request, response, session }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
        
        try {
          await auth.use('web').attempt(email, password)
          response.redirect('/')
        } catch (e){
          session.flash({ notification: e.message})
          return response.redirect().toRoute('loginPage')
        }
    }
}
