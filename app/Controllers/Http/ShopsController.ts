import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'
import Cart from 'App/Models/Cart'
import Transaction from 'App/Models/Transaction'

export default class ShopsController {

    public async index({ view, auth }: HttpContextContract) {
        await auth.use('web').authenticate()
        const id = auth.use('web').user!.id
         const product = await Database
                .from("products")
                .select("products.id","products.nama_product","categories.category_name","products.deskripsi_product","products.harga")
                .innerJoin("categories","products.categories_id","categories.id")
                .orderBy('products.id')
        //const product = await Product.query().preload('product')

        return view.render('shop/index',{data_produk:product, id:id})
    }

    
    public async history({ view, auth }: HttpContextContract) {
        await auth.use('web').authenticate()
        const id = auth.use('web').user!.id
        const data = await Transaction
                            .query()
                            .where('users_id',id)
        return view.render('shop/history',{data:data})
    }

    
    public async cart({ view, auth }: HttpContextContract) {
        await auth.use('web').authenticate()
        const id = await Cart.all()
        return view.render('shop/history',{id:id})
    }
    
    public async invoice({ view, auth,request }: HttpContextContract) {
        await auth.use('web').authenticate()
        const id = auth.use('web').user!.id
        const data = request.params()
        const product = await Database
                                .from("transactions")                       
                                .select('products.nama_product','products.harga','detail_transactions.total_harga','users.nama','transactions.id')  
                                .innerJoin('detail_transactions','transactions.id','detail_transactions.transactions_id')            
                                .innerJoin("products","detail_transactions.products_id","products.id")
                                .innerJoin('users','transactions.users_id','users.id')
                                .where('detail_transactions.transactions_id',data.id)
        const tanggal = await Transaction.findOrFail(data.id)
        const total_bayar = await Database
                                    .from('detail_transactions')
                                    .sum('total_harga as harga')
                                    .where('transactions_id',data.id)                 
                                    .groupBy('transactions_id') 
                                    .limit(1)     
        console.log(tanggal)
        return view.render('shop/invoice',{id:id, data:product,total_bayar:total_bayar,tanggal:tanggal})
    }

    
    public async detail({ view, auth, request }: HttpContextContract) {
        await auth.use('web').authenticate()
        const id = auth.use('web').user!.id

        const data = request.params()
        const product = await Product.findOrFail(data.id)

        return view.render('shop/detail',{product:product, id:id})
    }
}
