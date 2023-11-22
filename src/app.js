import ProductManager from "../ProductManager.js";

import express from "express";

const PORT = 8080;

const app = express();

app.use(express.urlencoded({extended:true}))

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})

const manager = new ProductManager('./productos.json');

app.get('/products/:idProducts', async (req,res)=>{
    const idProducts = req.params.idProducts;
    
    
    const productos = await manager.getProducts();
 
    const producto = productos.find(prod => {
        return prod.id === idProducts
    })

    if(!producto){
        return res.send({
            error: 'Producto no encontrado.'
        })
    }
   
    res.json({producto})
}) 

app.get('/products', async (req,res)=>{
    
    const productos = await manager.getProducts();

    const limite = req.query.limit;

    if(!limite){
        return res.json({productos})
    }

    const productosFiltrados = productos.slice(0,limite)
 

    res.json({
        productos: productosFiltrados
    })

})

