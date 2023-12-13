const { Shop } = require("../models/Shop");
const { User } = require("../models/User");
const { Order } = require("../models/Order");
const  {Product} = require("../models/Product");
const upload = require('../config/multer');

module.exports.product_create_get= (req,res) =>{
  res.render('product/add',{shopid: req.query.shopid});
}

module.exports.product_create_post =  (req, res) => {
  console.log(req.query.shopid);
  let product = new Product({
    image: req.file.filename,
    productName: req.body.productName,
    price: req.body.price,
    description: req.body.description,
    productType: req.body.productType,
    shop: req.body.shopid
  })
  console.log("the image :",product.image)
  console.log(" product",product);
  console.log(" product name",product.productName);
  console.log("shop id " , product.shop);
  product.save()
  .then(()=>{
    res.redirect('/shop/index/' + req.body.shopid);
  })
  .catch(error => {
    res.send('something went wrong');
    console.log('error on add product , ' + error)
  })
}

 


module.exports.product_show_get = (req,res) => {
  console.log(req.query.id);
  // Product.findById(req.query.id)
  Product.findById('6577468f52e45f332b893e81')
  .then((product) => {
    res.render('product/detail' , {product})
  })
  .catch((error)=>{
    console.log(error);
  })
}

exports.product_edit_get = (req, res) => {
  console.log("id for product:",req.query.id)
  Product.findById(req.query.id)
  .then((product) => {
    console.log("the product info :" , product)
    res.render("product/edit", {product, shopid: req.query.shopid})
  })
  .catch(err => {
    console.log(err);
  })
}

exports.product_update_put = (req, res) => {
  console.log("the body: " , req.body)
  console.log("the body: " , req.file)
  console.log("the product id: " , req.body.id)
  let updatedProduct = {
    image: req.file.filename,
    productName: req.body.productName,
    price: req.body.price,
    description: req.body.description,
    productType: req.body.productType,
  }
  Product.findByIdAndUpdate(req.body.id, updatedProduct)

  .then(() => {
    res.redirect('/shop/index/' + req.body.shopid);
  })
  .catch((err) => {
    res.send('Something went wrong!')
    console.log(err);
  })
}

exports.product_list_get = (req,res) => {
  Product.find()
  .then((product) => {
  res.render("product/list", {product});
})
.catch((err) => {
  console.log(err)
})
}


exports.product_delete_get = (req, res) => {
  console.log(req.query.id);
  console.log(req.query)
  Product.findByIdAndDelete(req.query.id)
  .then(() => {
    console.log("shopid:", req.query.shopid)
    res.redirect('/shop/index/' + req.query.shopid);
  })
  .catch((err) => {
    console.log(err);
  })
}