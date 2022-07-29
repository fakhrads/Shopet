import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({ view }: HttpContextContract) {
    return view.render('admin/categories')
  }

  public async create({ auth, response, request }: HttpContextContract) {
    await auth.use('web').authenticate()
    const category_name = request.input('category_name')

    try {
      await Category.create({
        category_name: category_name
      })

      response.redirect().back()
    } catch (error) {
      response.badRequest("Gagal Membuat Surat")
      
    }
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
