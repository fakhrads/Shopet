import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    Route.get('/category', 'CategoriesController.index').as('category')
    Route.get('/category/edit/:id', 'CategoriesController.show').as('category_edit')
    Route.post('/category/delete', 'CategoriesController.destroy').as('delete_kategori')
    Route.post('/category/edit', 'CategoriesController.update').as('edit_category_post')
    Route.post('/category/post', 'CategoriesController.create').as('category_new_post')
    Route.get('/product', 'ProductsController.index').as('product_admin')
    Route.get('/product/photo/:name', 'ProductsController.photo').as('product_photo')
    Route.post('/product/post', 'ProductsController.store').as('product_new_post')
    Route.get('/product/show/:id', 'ProductsController.show').as('show_product')
    Route.post('/product/edit', 'ProductsController.create').as('edit_product_post')
  })
  .prefix('/admin').middleware('is_admin:web,api')

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

Route
  .group(() => {
    Route.get('/users','UsersController.index').as('users')
    Route.get('/users/:id','UsersController.show').as('show_users')
    Route.post('/users/update','UsersController.update').as('update_data_karyawan')
    Route.post('/users/destroy','UsersController.destroy').as('delete_users')
    Route.post('/users/update/password','UsersController.updatePassword').as('update_password_karyawan')
  })
  .prefix('/owner').middleware('is_owner')

Route.get('/','DashboardController.index')
  