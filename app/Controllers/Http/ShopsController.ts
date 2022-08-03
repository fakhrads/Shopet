import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ShopsController {

    public async index({ view, auth }: HttpContextContract) {
        await auth.use('web').authenticate()
        const id = auth.use('web').user!.id
        return view.render('shop/index',{id:id})
    }

    
    public async history({ view, auth }: HttpContextContract) {
        await auth.use('web').authenticate()
        const id = auth.use('web').user!.id
        return view.render('shop/history',{id:id})
    }

}
