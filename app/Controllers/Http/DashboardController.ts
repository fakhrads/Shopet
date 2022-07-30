import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {
    public async index({ view, auth }: HttpContextContract) {
        await auth.use('web').authenticate
        return view.render('welcome')
    }
}
