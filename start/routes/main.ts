import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    Route.get('/category', 'CategoriesController.index')
    Route.get('/posts', 'PostsController.index')
  })
  .prefix('/admin')
  