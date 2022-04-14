const Product = require('../models/product');
const Category = require('../models/category');
const mongoose = require("mongoose");

exports.getProducts = (req, res, next) => {
    Product
        .find({ userId: req.user._id })
        .populate('userId', 'name -_id')
        .select('name price imageUrl userId')
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
    if (!req.session.isAuthenticated) {
        return res.redirect("/login");
    }
    res.render('admin/add-product', {
        title: 'New Product',
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {

    const name = req.body.name; 
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;

    const product = new Product(
        {
            _id: new mongoose.Types.ObjectId("6134d95d85b6df025afdaf55"),
            name: name,
            price: price,
            imageUrl: imageUrl,
            description: description,
            userId: req.user,
            isActive: false,
            tags: ["Telefon"]
        }
    );

    product.save()
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            let message = "";
            if(err.name == "ValidationError"){
                for(field in err.errors){
                    message += err.errors[field].message + "<br>";
                }
                res.render('admin/add-product', {
                    title: 'New Product',
                    path: '/admin/add-products',
                    errorMessage: message,
                    inputs: {
                        name: name,
                        price: price,
                        imageUrl: imageUrl,
                        description: description
                    }
                });
            }else{
                // res.status(500).render('admin/add-product', {
                //     title: 'New Product',
                //     path: '/admin/add-products',
                //     errorMessage: "Beklenmedik bir hata oluştu. Lütfen tekrar deneyiniz.",
                //     inputs: {
                //         name: name,
                //         price: price,
                //         imageUrl: imageUrl,
                //         description: description
                //     }
                // });
                res.redirect("/500");
            }
            
        });


}

exports.getEditProduct = (req, res, next) => {

    Product
        .findOne(
            {_id: req.params.productid, userId: req.user._id}
        )
        //.populate('categories', 'name -_id')
        .then(product => {
            if(!product){
                return res.redirect("/");
            }
            return product;
        })
        .then(product => {

            Category.find()
                .then(categories => {

                    categories = categories.map(category => {

                        if (product.categories) {
                            product.categories.find(item => {
                                if (item.toString() === category._id.toString()) {
                                    category.selected = true;
                                }
                            })
                        }

                        return category;
                    })

                    res.render('admin/edit-product', {
                        title: 'Edit Product',
                        path: '/admin/products',
                        product: product,
                        categories: categories
                    });


                })

        })
        .catch(err => { res.redirect("/500") });
}

exports.postEditProduct = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const ids = req.body.categoryids;

    Product.update({ _id: id , userId: req.user._id}, {
        $set: {
            name: name,
            price: price,
            imageUrl: imageUrl,
            description: description,
            categories: ids
        }
    }).then(() => {
        res.redirect('/admin/products?action=edit');
    }).catch(err => res.redirect("/500"));


}

exports.postDeleteProduct = (req, res, next) => {

    const id = req.body.productid;

    Product.deleteOne({_id:id, userId: req.user._id})
        .then((result) => {
            if(result.deletedCount === 0){
                return res.redirect("/");
            }
            res.redirect('/admin/products?action=delete');
        })
        .catch(err => {
            res.redirect("/500");
        });
}


exports.getAddCategory = (req, res, next) => {
    res.render('admin/add-category', {
        title: 'New Category',
        path: '/admin/add-category'
    });
}


exports.postAddCategory = (req, res, next) => {

    const name = req.body.name;
    const description = req.body.description;

    const category = new Category({
        name: name,
        description: description
    });

    category.save()
        .then(result => {
            res.redirect('/admin/categories?action=create');
        })
        .catch(err => res.redirect("/500"));
}

exports.getCategories = (req, res, next) => {

    Category.find()
        .then(categories => {
            res.render('admin/categories', {
                title: 'Categories',
                path: '/admin/categories',
                categories: categories,
                action: req.query.action
            });
        }).catch(err => res.redirect("/500"));
}


exports.getEditCategory = (req, res, next) => {
    Category.findById(req.params.categoryid)
        .then(category => {
            res.render('admin/edit-category', {
                title: 'Edit Category',
                path: '/admin/categories',
                category: category
            })
        })
        .catch(err => res.redirect("/500"));
}

exports.postEditCategory = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;

    Category.findById(id)
        .then(category => {
            category.name = name;
            category.description = description;
            return category.save();
        }).then(() => {
            res.redirect('/admin/categories?action=edit');
        })
        .catch(err => res.redirect("/500"));

}

exports.postDeleteCategory = (req, res, next) => {
    const id = req.body.categoryid;

    Category.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/admin/categories?action=delete');
        })
        .catch(err => {
            res.redirect("/500");
        })
}
