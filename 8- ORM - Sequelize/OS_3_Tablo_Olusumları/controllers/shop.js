const Product = require("../models/product");
const Category = require("../models/category");


exports.getIndex = (req, res, next) => {
    Category.getAll()
        .then((categories)=>{
            Product.getAll()
            .then((products) => {
                res.render('shop/index', {
                    title: 'Shopping',
                    products: products[0],
                    categories: categories[0],
                    path: '/'
                });
            })
            .catch((err) => {
                console.log(err);
            });
        })
        .catch((err)=>{
            console.log(err);
        });
}

exports.getProducts = (req, res, next) => {
    Category.getAll()
        .then((categories)=>{
            Product.getAll()
                .then((products) => {
                    res.render('shop/products', {
                        title: 'Products',
                        products: products[0],
                        categories: categories[0],
                        path: '/products'
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err)=>{
            console.log(err);
        });
    
}
exports.getProduct = (req, res, next) => {
    Product.getById(req.params.productid)
        .then((product) =>{
            res.render('shop/product-detail', {
                title: product[0][0].name,
                product: product[0][0],
                path: '/products'
            });
        })
        .catch((err)=>{
            console.log(err);
        })
}
exports.getProductsByCategoryId = (req, res, next) => {
    const categoryid = req.params.categoryid;
    Product.getProductsByCategoryId(categoryid)
        .then((products)=>{
            Category.getAll()
                .then((categories) =>{
                    res.render('shop/products', {
                        title: 'Products',
                        products: products[0],
                        categories: categories[0],
                        selectedCategory: categoryid,
                        path: '/products'
                    });
                })
                .catch((err)=>{
                    console.log(err);
                }) 
        })
        .catch((err)=>{
            console.log(err);
        });
}

exports.getCart = (req, res, next) => {
    Product.getAll()
        .then(()=>{
            res.render('shop/cart', {
                title: 'Cart',
                path: '/cart'
            });
        })
        .catch((err)=>{
            console.log(err);
        })
}

exports.getOrders = (req, res, next) => {
    Product.getAll()
        .then(()=>{
            res.render('shop/orders', {
                title: 'Orders',
                path: '/orders'
            });
        })
        .catch((err)=>{
            console.log(err);
        })
}
