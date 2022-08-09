import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class RegistersController {
    public async registerPage({ view }: HttpContextContract) {
      return view.render('auth/register')
    }

    public async create({ response, request, session }: HttpContextContract) {
        const nama = request.input('nama')
        const email = request.input('email')
        const password = request.input('password')
        console.log(nama,email,password)

        try {
            await User.create({
                nama: nama,
                email: email,
                password: password
            })
            session.flash({ success: 'Berhasil registrasi!'})
            response.redirect().back()
        } catch (e) {
            session.flash({ error : e.message})
            response.redirect().back()
        }
    }
}
