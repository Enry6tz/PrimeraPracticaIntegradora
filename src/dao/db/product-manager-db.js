const ProductModel = require('../models/products.model.js')

class ProductManager {

    // Método para agregar un nuevo producto al array y guardar en el archivo
    async addProduct(nuevoObjeto) {
        try {
            if (!nuevoObjeto) {
                console.error("El objeto es undefined o null");
                return false;
            }

            let { title, img, description, price, thumbnails, code, stock, status = true, category } = nuevoObjeto;

            // Validaciones
            if (![title, description, price, code, stock, status, category].every(Boolean)) {
                console.error("Todos los campos son obligatorios");
                return false;
            }

            //validacion de code unico 
            const existProduct = await ProductModel.findOne({ code: code })

            if (existProduct) {
                console.log("el codigo debe ser unico")
                return false;
            }
            // Crear nuevo producto con id autoincrementable
            const newProduct = new ProductModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || [],
            });
            await newProduct.save();
            return true;
        }
        catch (e) {
            console.error("ocurrio un error al cargar el producto", e);
        }
    }

    // Método para obtener todos los productos
    async getProducts() {
        try {
            const products = await ProductModel.find()
            return products;
        } catch (error) {
            console.log('Error al obtener los Productos', error)
        }
    }

    // Método para obtener un producto por su id
    async getProductById(id) {
        try {
            const product = await ProductModel.findById(id)

            if (!product) {
                console.log('producto no encontrado')
                return false;
            }
            console.log('Producto Encontrado')
            return product;
        } catch (error) {
            console.log("error al obtener el producto", error);
        }
    }

    // Método para actualizar un producto por su id
    async updateProduct(id, updatedProduct) {
        try {
            const product = await ProductModel.findByIdAndUpdate(id, updatedProduct)
            if (!product) {
                console.log('producto no encontrado')
                return false;
            }
            console.log('Producto Actualizado')
            return product;

        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }
    // Método para eliminar un producto por su id
    async deleteProduct(id) {
        try {
            const product = await ProductModel.findByIdAndDelete(id);
            if (!product) {
                console.log('producto no encontrado')
                return false;
            }
            console.log('Producto Eliminado')
            return true;
        } catch (error) {
            console.log("Error al eliminar el producto", error);
        }
    }
}

module.exports = ProductManager;