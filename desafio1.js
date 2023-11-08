

class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct = (title, description, price, thumbnail, code, stock) => {
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
        } else {
          return "El código ya existe, elija otro código";
        }
      } else {
        return "Complete todos los campos";
      }
    }
  
    getProducts = () => {
      return this.products;
    }
  
    getProductById = (id) => {
      const product = this.products.find((prod) => prod.id === id);
      if (product) {
        return product;
      } else {
        console.log("Not found");
        return null;
      }
    }
  }
  
  
  const listaProductos = new ProductManager();
  listaProductos.addProduct("Producto 1", "Descripción 1", 10.99, "imagen1.jpg", "P1", 100);
  listaProductos.addProduct("Producto 2", "Descripción 2", 15.99, "imagen2.jpg", "P2", 50);
  
  console.log("Todos los productos",listaProductos.getProducts());
  console.log("Productos por id",listaProductos.getProductById(1));
  console.log("Id incorrecto",listaProductos.getProductById(3));    