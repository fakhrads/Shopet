import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ShopsController {

    public async index({ view }: HttpContextContract) {
        return view.render('shop/index')
    }

}
