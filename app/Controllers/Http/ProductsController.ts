import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import Application from '@ioc:Adonis/Core/Application'

export default class ProductsController {
  public async index({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate
    const categories = await Category.all()
    const produk = await Product.all()

    return view.render('admin/product',{ data: categories, data_produk: produk})
  }

  
  public async photo({ response, request }: HttpContextContract) {
    const data = request.params()

    const path = "uploads/" + data.name

    const filePath = Application.tmpPath(path)
    response.download(filePath)
  }

  public async create({ auth, request, response, session}: HttpContextContract) {
    await auth.use('web').authenticate
    const id_produk = request.input('id')
    const nama_product = request.input('nama_produk')
    const categoryId = request.input('kategori')
    const stok = request.input('stok')
    const harga = request.input('harga')
    const deskripsi = request.input('deskripsi')
    
    try {
      const produk = await Product.findOrFail(id_produk)

      produk.nama_product = nama_product
      produk.categories_id = categoryId
      produk.stok_product = stok
      produk.harga = harga
      produk.deskripsi_product = deskripsi

      await produk.save()

      session.flash({success: 'Berhasil menambahkan produk baru!'})
      response.redirect().back()
    } catch (error) {
      session.flash({error: error.message})
      response.redirect().back()
      
    }
  }

  public async store({ auth , request, response, session}: HttpContextContract) {
    await auth.use('web').authenticate
    const nama_product = request.input('nama_produk')
    const categoryId = request.input('kategori')
    const stok = request.input('stok')
    const harga = request.input('harga')
    const deskripsi = request.input('deskripsi')
    const images = request.file('images')
    try {

      if(images) {
        console.log(images)
        await images.move(Application.tmpPath('uploads'))
        await Product.create({
          categories_id: categoryId,
          nama_product: nama_product,
          stok_product: stok,
          photo_path: images.filePath,
          harga: harga,
          status: "Tersedia",
          deskripsi_product: deskripsi
        
        })
      }
        session.flash({success: 'Berhasil menambahkan produk baru!'})
      response.redirect().toRoute('product_admin')
    } catch (error) {
      session.flash({error: error.message})
      response.redirect().toRoute('product_admin')
      
    }

  }

  public async show({ auth, view, request}: HttpContextContract) {
    await auth.use('web').authenticate

    const data = request.params()
    const product = await Database
                          .from('products')
                          .select('products.id','products.nama_product','products.harga','products.stok_product','products.deskripsi_product','products.status','products.categories_id','categories.category_name')
                          .innerJoin('categories','products.categories_id','categories.id')
                          .where('products.id',data.id)
    console.log(product)
    const categories = await Category.all()

    return view.render('admin/edit_product',{data:product,categories:categories})

    
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
