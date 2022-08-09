import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    const data = await Category.all()
    return view.render('admin/categories', {data: data})
  }

  public async create({ auth, response, request, session}: HttpContextContract) {
    await auth.use('web').authenticate()
    const category_name = request.input('nama_kategori')

    try {
      await Category.create({
        category_name: category_name
      })
      session.flash({success: 'Berhasil membuat kategori baru!'})
      response.redirect().toRoute('category')
    } catch (error) {
      session.flash({error: 'Gagal membuat kategori!'})
      response.redirect().toRoute('category')
      
    }
  }

  public async show({ auth, request, view}: HttpContextContract) {
    await auth.use('web').authenticate

    const data = request.params()

    const data_categories = await Category.findOrFail(data.id)
    return view.render('admin/edit_categories',{data:data_categories})
  }

  public async edit({}: HttpContextContract) {}

  public async update({auth, session, response, request}: HttpContextContract) {
    await auth.use('web').authenticate()
    const category_name = request.input('nama_kategori')

    try {
      await Category.updateOrCreate({},{
        category_name: category_name
      })
      session.flash({success: 'Berhasil mengubah kategori!'})
      response.redirect().back()
    } catch (error) {
      session.flash({error: error.message})
      response.redirect().back()
      
    }
  }

  public async destroy({ auth, request, session, response }: HttpContextContract) {
    await auth.use('web').authenticate

    const id = request.input('id_kategori')
    try {
      const kategori = await Category.findOrFail(id)
      await kategori.delete() 

      session.flash({ success: 'Berhasil menghapus kategori!'})
      response.redirect().back()
  } catch (e) {
      session.flash({ error : e.message})
      response.redirect().back()
  }
  }
}
