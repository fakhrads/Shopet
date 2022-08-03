import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    Route.get('/category', 'CategoriesController.index')
    Route.post('/category/post', 'CategoriesController.create').as('category_new_post')
    Route.get('/posts', 'PostsController.index')
  })
  .prefix('/admin')

Route
  .group(() => {
    Route.get('/','ShopsController.index')
    Route.get('/history','ShopsController.history')
  })
  .prefix('/shop')

Route.get('/','DashboardController.index')
  