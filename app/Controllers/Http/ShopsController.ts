import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'
import Cart from 'App/Models/Cart'

export default class ShopsController {

    public async index({ view, auth }: HttpContextContract) {
        await auth.use('web').authenticate()
        //const id = auth.use('web').user!.id
         const product = await Database
                .from("products")
                .select("products.id","products.nama_product","categories.category_name")
                .innerJoin("categories","products.categories_id","categories.id")
                .orderBy('products.id')
        //const product = await Product.query().preload('product')

        console.log(product)

        return view.render('shop/index',{data_produk:product})
    }

    
    public async history({ view, auth }: HttpContextContract) {
        await auth.use('web').authenticate()
        const id = auth.use('web').user!.id
        return view.render('shop/history',{id:id})
    }

    
    public async cart({ view, auth }: HttpContextContract) {
        await auth.use('web').authenticate()
        const id = await Cart.all()
        return view.render('shop/history',{id:id})
    }
    
    public async invoice({ view, auth }: HttpContextContract) {
        await auth.use('web').authenticate()
        const id = auth.use('web').user!.id
        return view.render('shop/invoice',{id:id})
    }
}
