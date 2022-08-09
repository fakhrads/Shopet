import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Cart from 'App/Models/Cart'
import DetailTransaction from 'App/Models/DetailTransaction'
import Product from 'App/Models/Product'
import Transaction from 'App/Models/Transaction'

export default class CartsController {
    public async index({ view, auth }: HttpContextContract) {
        await auth.use('web').authenticate()
        const id = auth.use('web').user!.id
        const data = await Database
                            .from('carts')
                            .select('products.id','products.harga','products.nama_product','products.deskripsi_product','carts.total')      
                            .where('users_id',id)
                            .innerJoin("products","products.categories_id","carts.products_id")
        return view.render('shop/cart', {data: data, id:id})
    }

    public async addCart({ auth, request, response, session}: HttpContextContract) {
        await auth.use('web').authenticate
        const id = request.input('products_id')
        const users_id = request.input('users_id')

        try {
            await Cart.create({
                products_id:id,
                users_id:users_id
                
            })
            session.flash({success: 'Berhasil menambahkan ke keranjang!'})
            response.redirect().toRoute('shop')
        } catch (error) {
            session.flash({error: error.message})
            response.redirect().toRoute('shop')
        }
    }

    public async checkout({ auth, response, request, session}: HttpContextContract) {
        await auth.use('web').authenticate
        const data = request.input('cart')
        const id = request.input('users_id')
        try {
            const id_trx = await Transaction.create({
                users_id: id
            })
            data.forEach( async (element) => {
                    const data_produk = await Product.findOrFail(element.products_id)
                    await DetailTransaction.create({
                        transactions_id: id_trx.id,
                        products_id:element.products_id,
                        total:element.total,
                        total_harga:element.total*data_produk.harga

                    })
            });
            await await Cart.query().where('users_id', id).delete()

            session.flash({success: 'Berhasil checkout!'})
            response.redirect().toRoute('shop')
        } catch (error) {
            session.flash({error: error.message})
            response.redirect().toRoute('shop')
        }
    }
}
