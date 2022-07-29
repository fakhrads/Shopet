import Route from '@ioc:Adonis/Core/Route'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import './routes/auth'
import './routes/main'

Route.get('/', ({ view }: HttpContextContract) => {
  return view.render('welcome')
})
