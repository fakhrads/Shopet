import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate
    const categories = await Category.all()
    const produk = await Product.all()

    return view.render('admin/product',{ data: categories, data_produk: produk})
  }

  public async create({}: HttpContextContract) {}

  public async store({ auth , request, response, session}: HttpContextContract) {
    await auth.use('web').authenticate
    const nama_product = request.input('nama_produk')
    const categoryId = request.input('kategori')
    const stok = request.input('stok')
    const harga = request.input('harga')
    const deskripsi = request.input('deskripsi')
    
    try {
      await Product.create({
        categories_id: categoryId,
        nama_product: nama_product,
        jenis_product: "Ikan",
        stok_product: stok,
        harga: harga,
        status: "Tersedia",
        deskripsi_product: deskripsi

      })
      session.flash({success: 'Berhasil menambahkan produk baru!'})
      response.redirect().toRoute('product_admin')
    } catch (error) {
      session.flash({error: error.message})
      response.redirect().toRoute('product_admin')
      
    }

  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
