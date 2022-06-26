const { restart } = require("nodemon");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Crear Producto - Administrator
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//Actualizar Producto - Administrator
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Producto no encontrado", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    message: true,
    product,
  });
});

//Eliminar Producto - Administrator
exports.deteleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Producto no encontrado", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Producto Eliminado con éxito!",
  });
});

//Recuperar todos los Productos
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
});

//Get Producto Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Producto no encontrado", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});
