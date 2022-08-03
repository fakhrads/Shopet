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
      response.redirect().toPath('category_new_post')
    } catch (error) {
      session.flash({error: 'Gagal membuat kategori!'})
      response.redirect().toPath('category_new_post')
      
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
