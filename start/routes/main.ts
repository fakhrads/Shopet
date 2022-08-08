import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    Route.get('/category', 'CategoriesController.index').as('category')
    Route.post('/category/post', 'CategoriesController.create').as('category_new_post')
    Route.get('/product', 'ProductsController.index').as('product_admin')
    Route.post('/product/post', 'ProductsController.store').as('product_new_post')
  })
  .prefix('/admin')

Route
  .group(() => {
    Route.get('/','ShopsController.index')
    Route.get('/history','ShopsController.history')
    Route.get('/invoice','ShopsController.invoice')
  })
  .prefix('/shop')

Route.get('/','DashboardController.index')
  