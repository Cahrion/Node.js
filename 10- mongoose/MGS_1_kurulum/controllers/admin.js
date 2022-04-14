const Product = require("../models/product");
const Category = require("../models/category");


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
    Category.findAll()
        .then(categories => {
            res.render('admin/add-product', {
                title: 'New product',
                path: '/admin/add-product',
                categories: categories
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.postAddProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    const product = new Product(name, price ,description, imageUrl, null, null, req.user._id);
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
            Category.findAll()
                .then((categories) => {
                    categories = categories.map(category => {
                        if(product.categories){
                            product.categories.find(item => {
                                if(item == category._id){
                                    category.selected = true;
                                }
                            })
                        }
                        return category;
                    })
                    res.render('admin/edit-product', {
                        title: 'Edit product',
                        product: product,
                        categories: categories,
                        path: '/admin/products'
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
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
    const categories = req.body.categoryids;

    const product = new Product(name, price, description, imageUrl, categories, id, req.user._id);
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

exports.getCategories = (req, res, next) => {
    Category.findAll()
        .then(categories => {
            res.render('admin/categories', {
                title: 'Admin Categories',
                categories: categories,
                path: '/admin/categories',
                action: req.query.action
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getAddCategory = (req, res, next) => {
    res.render('admin/add-category', {
        title: 'New category',
        path: '/admin/add-category'
    });

}

exports.postAddCategory = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;

    const category = new Category(name, description);
        category.save()
            .then((result) => {
                res.redirect('/admin/categories?action=create');
            })
            .catch(err => {
                console.log(err);
            });

}
exports.getEditCategory = (req, res, next) => {

    Category.findById(req.params.categoryid)
        .then((category) => {
            if (!category) {
                return res.redirect("/");
            }
            res.render('admin/edit-category', {
                title: 'Edit category',
                category: category,
                path: '/admin/category'
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.postEditCategory = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;

    const category = new Category(name, description, id);

    category.save(id)
        .then(result => {
            res.redirect('/admin/categories?action=edit');
        })
        .catch(err => console.log(err));
}
exports.postDeleteCategory = (req, res, next) => {
    const id = req.body.categoryid;
    Category.deleteById(id)
        .then(()=>{
            console.log("Category has been deleted.");
            res.redirect('/admin/categories?action=delete');
        })
        .catch(err =>{
            console.log(err);
        });
    
}