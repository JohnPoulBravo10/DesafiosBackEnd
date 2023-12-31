
import fs from 'fs';

export default class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.nextId = 1;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (title && description && price && thumbnail && code && stock) {
      if (!this.products.find((product) => product.code === code)) {
        const product = {
          id: this.nextId++,
          title: title,
          description: description,
          price: price,
          thumbnail: thumbnail,
          code: code,
          stock: stock,
        };
        this.products.push(product);
        await this.guardarProductos();
      } else {
        return "El código ya existe, elija otro código";
      }
    } else {
      return "Complete todos los campos";
    }
  }

  async getProducts() {
    await this.cargarProductos();
    return this.products;
  }

  async getProductById(id) {
    await this.cargarProductos();
    const product = this.products.find((prod) => prod.id === id);
    if (product) {
      return product;
    } else {
      console.log("Not found");
      return null;
    }
  }

  async updateProduct(id, updatedProduct) {
    await this.cargarProductos();
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      updatedProduct.id = id;
      this.products[index] = updatedProduct;
      await this.guardarProductos();
      return this.products[index];
    } else {
      return "Producto no encontrado";
    }
  }

  async deleteProduct(id) {
    await this.cargarProductos();
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      await this.guardarProductos();
      return "Producto eliminado correctamente";
    } else {
      return "Producto no encontrado";
    }
  }

  async cargarProductos() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
      this.nextId =
        this.products.length > 0
          ? this.products[this.products.length - 1].id + 1
          : 1;
    } catch (error) {
      console.log(error);
    }
  }

  async guardarProductos() {
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"), 'utf-8');
  }
}


