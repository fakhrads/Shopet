import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', 'AuthController.loginPage')
Route.post('/login', 'UsersController.loginPost')
Route.get('/register', 'UsersController.register')
Route.post('/register', 'UsersController.registerPost')

Route.get('/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    response.redirect('/login')
})