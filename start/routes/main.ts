import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    Route.get('/users', 'UsersController.index')
    Route.get('/posts', 'PostsController.index')
  })
  .prefix('/api')
  