const Product = require("../models/product");
// const Category = require("../models/category");


exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                title: 'Admin Products',
                products: products,
                path: '/admin/products',
                action: req.query.action
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getAddProduct = (req, res, next) => {
    // Category.findAll()
    //     .then(categories => {
            
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    res.render('admin/add-product', {
        title: 'New product',
        path: '/admin/add-product'
    });

}

exports.postAddProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    const product = new Product(name, price ,description, imageUrl, null, req.user._id);
        product.save()
            .then((result) => {
                res.redirect('/admin/products');
            })
            .catch(err => {
                console.log(err);
            });

}
exports.getEditProduct = (req, res, next) => {

    Product.findById(req.params.productid)
        .then((product) => {
            if (!product) {
                return res.redirect("/");
            }
            // Category.findAll()
            //     .then((categories) => {
                    res.render('admin/edit-product', {
                        title: 'Edit product',
                        product: product,
                        path: '/admin/products'
                    });
                // })
                // .catch((err) => {
                //     console.log(err);
                // })
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    // const categoryid = req.body.categoryid;

    const product = new Product(name, price, description, imageUrl, id, req.user._id);

    product.save(id)
        .then(result => {
            res.redirect('/admin/products?action=edit');
        })
        .catch(err => console.log(err));
}
exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.productid;
    Product.deleteById(id)
        .then(()=>{
            console.log("product has been deleted.");
            res.redirect('/admin/products?action=delete');
        })
        .catch(err =>{
            console.log(err);
        });
    
}