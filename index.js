
import fs from 'fs';
import ProductManager from './ProductManager.js';

(async () => {
  const filePath = 'productos.json';
  const listaProductos = new ProductManager(filePath);

  console.log("Productos al inicio:", await listaProductos.getProducts());

  const addProductResult = await listaProductos.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  console.log(addProductResult);

  console.log("Productos después de agregar uno:", await listaProductos.getProducts());

  const productId = 1;
  try {
    const productById = await listaProductos.getProductById(productId);
    console.log("Producto encontrado por ID:", productById);
  } catch (error) {
    console.error(error.message);
  }

  const updatedProduct = {
    title: "Producto Actualizado",
    description: "Descripción Actualizada",
    price: 250,
    thumbnail: "Nueva imagen",
    code: "abc123",
    stock: 30,
  };

  try {
    const updatedProductResult = await listaProductos.updateProduct(productId, updatedProduct);
    console.log("Producto actualizado:", updatedProductResult);
  } catch (error) {
    console.error(error.message);
  }

  /*try {
    const deleteProductResult = await listaProductos.deleteProduct(productId);
    console.log(deleteProductResult);
    console.log("Productos después de eliminar uno:", await listaProductos.getProducts());
  } catch (error) {
    console.error(error.message);
  }*/
})();
