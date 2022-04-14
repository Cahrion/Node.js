const Product = require("../models/product");
const Category = require("../models/category");
const CartItem = require("../models/cartItem");


exports.getIndex = (req, res, next) => {
    Category.findAll()
        .then((categories) => {
            Product.findAll(
                {
                    attributes: ["id", "name", "price", "imageUrl"]
                })
                .then((products) => {
                    res.render('shop/index', {
                        title: 'Shopping',
                        products: products,
                        categories: categories,
                        path: '/'
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getProducts = (req, res, next) => {
    Category.findAll()
        .then((categories) => {
            Product.findAll(
                {
                    attributes: ["id", "name", "price", "imageUrl"]
                })
                .then((products) => {
                    res.render('shop/products', {
                        title: 'Products',
                        products: products,
                        categories: categories,
                        path: '/products'
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });

}
exports.getProduct = (req, res, next) => {
    Product.findAll(
        {
            attributes: ["id", "name", "price", "imageUrl", "description"],
            where: { id: req.params.productid }
        })
        .then((product) => {
            res.render('shop/product-detail', {
                title: product[0].name,
                product: product[0],
                path: '/products'
            });
        })
        .catch((err) => {
            console.log(err);
        })
}
exports.getProductsByCategoryId = (req, res, next) => {
    const categoryid = req.params.categoryid;
    const model = [];
    Category.findAll()
        .then((categories) => {
            model.categories = categories;
            const category = categories.find(i => i.id == categoryid);
            return category.getProducts()
        })
        .then(products => {
            res.render('shop/products', {
                title: 'Products',
                products: products,
                categories: model.categories,
                selectedCategory: categoryid,
                path: '/products'
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        title: 'Cart',
                        path: '/cart'
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
        }).catch(err => {
            console.log(err);
        })
}
exports.postCart = (req, res, next) => {

    const productId = req.body.productId;
    let quantity = 1;
    let userCart;

    req.user.getCart()
        .then(cart => {
            userCart = cart;
            return cart.getProducts({ where: { id: productId } });
        })
        .then(products=>{
            let product;
            if(products.length > 0){
                product = products[0];
            }
            if(product){
                quantity += product.cartItem.quantity;
                return product;
            }
            return Product.findByPk(productId);
        })
        .then(product => {
            userCart.addProduct(product, {
                through: {
                    quantity: quantity
                }
            });
        })
        .then(()=>{
            res.redirect("/cart");
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getOrders = (req, res, next) => {
    Product.findAll()
        .then(() => {
            res.render('shop/orders', {
                title: 'Orders',
                path: '/orders'
            });
        })
        .catch((err) => {
            console.log(err);
        })
}
