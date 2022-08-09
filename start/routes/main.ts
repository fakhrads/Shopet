import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    Route.get('/category', 'CategoriesController.index').as('category')
    Route.post('/category/post', 'CategoriesController.create').as('category_new_post')
    Route.get('/product', 'ProductsController.index').as('product_admin')
    Route.post('/product/post', 'ProductsController.store').as('product_new_post')
    Route.get('/product/show/:id', 'ProductsController.show').as('show_product')
    Route.post('/product/edit', 'ProductsController.create').as('edit_product_post')
  })
  .prefix('/admin')

Route
  .group(() => {
    Route.get('/','ShopsController.index').as('shop')
    Route.get('/history','ShopsController.history')
    Route.get('/invoice/:id','ShopsController.invoice')
    Route.get('/cart','CartsController.index').as('cart')
    Route.post('/cart','CartsController.addCart').as('cart_new_post')
    Route.post('/cart/checkout','CartsController.checkout').as('checkout')
    Route.get('/detail/:id', 'ShopsController.detail').as('detail')
  })
  .prefix('/shop')

Route.get('/','DashboardController.index')
  