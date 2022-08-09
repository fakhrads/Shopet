import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ auth, view}: HttpContextContract) {
    await auth.use('web').authenticate
    const data = await User.all()

    return view.render('owner/users',{data_karyawan:data})
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({ auth, view, request }: HttpContextContract) {
    await auth.use('web').authenticate

    const data = request.params()
    const data_karyawan = await User.findOrFail(data.id)

    return view.render('owner/edit_users',{data_karyawan:data_karyawan})
  }

  public async edit({}: HttpContextContract) {}

  public async update({auth, request, response, session}: HttpContextContract) {
    await auth.use('web').authenticate
    const nama = request.input('nama')
    const email = request.input('email')
    try {
        await User.updateOrCreate({},{
            nama: nama,
            email: email,
        })
        session.flash({ success: 'Berhasil ubah data karyawan!'})
        response.redirect().back()
    } catch (e) {
        session.flash({ error : e.message})
        response.redirect().back()
    }
  }

  public async updatePassword({auth, request, response, session}: HttpContextContract) {
    await auth.use('web').authenticate
    const password = request.input('password')
    try {
        await User.updateOrCreate({},{
            password: password,
        })
        session.flash({ success: 'Berhasil ubah password karyawan!'})
        response.redirect().back()
    } catch (e) {
        session.flash({ error : e.message})
        response.redirect().back()
    }
  }

  public async destroy({auth, request, session, response}: HttpContextContract) {
    await auth.use('web').authenticate

    const user_id = request.input('id_user')
    try {
        const user = await User.findOrFail(user_id)
        await user.delete() 

        session.flash({ success: 'Berhasil menghapus karyawan!'})
        response.redirect().back()
    } catch (e) {
        session.flash({ error : e.message})
        response.redirect().back()
    }
  }
  
}
