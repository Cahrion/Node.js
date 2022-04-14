const Product   = require("../models/product");


exports.getIndex            =  (req, res, next) => {
    const products          = Product.getAll(); 
    res.render('shop/index',{
        title: 'Shopping', 
        products: products,
        path: '/'
    });
}

exports.getProducts         =  (req, res, next) => {
    const products          = Product.getAll(); 
    res.render('shop/products',{
        title: 'Products', 
        products: products,
        path: '/products'
    });
}
exports.getProductsDetails  =  (req, res, next) => {
    const products      = Product.getAll(); 
    res.render('shop/details',{
        title: 'Details', 
        path: '/details'
    });
}
exports.getCart  =  (req, res, next) => {
    const products      = Product.getAll(); 
    res.render('shop/cart',{
        title: 'Cart', 
        path: '/cart'
    });
}

exports.getOrders  =  (req, res, next) => {
    const products      = Product.getAll(); 
    res.render('shop/orders',{
        title: 'Orders', 
        path: '/orders'
    });
}
