import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', 'LoginController.loginPage').as('loginPage')
Route.post('/login', 'LoginController.login').as('login')
Route.get('/register', 'RegistersController.registerPage').as('registerPage')
Route.post('/register', 'RegistersController.create').as('register')

Route.get('/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    response.redirect('/login')
})