const Product       = require("../models/product");
const Category      = require("../models/category");


exports.getIndex            =  (req, res, next) => {
    const products          = Product.getAll(); 
    const categories        = Category.getAll();
    res.render('shop/index',{
        title: 'Shopping', 
        products: products,
        categories: categories,
        path: '/'
    });
}

exports.getProducts         =  (req, res, next) => {
    const products          = Product.getAll(); 
    const categories        = Category.getAll();
    res.render('shop/products',{
        title: 'Products', 
        products: products,
        categories: categories,
        path: '/products'
    });
}
exports.getProduct         =  (req, res, next) => {
    const productId        = req.params.productid;
    const product          = Product.getById(productId);
    res.render('shop/product-detail',{
        title: product.name, 
        product: product,
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
