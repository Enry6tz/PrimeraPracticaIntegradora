
const CartModel = require('../models/cart.model.js')

class CartManager {
    async createCart() {
       try {
            const newCart = new CartModel({products: []})
            await newCart.save();
            return newCart;
       } catch (error) {
            console.log('error al crear el carrito', error);
            return false;
       }
    }

    async getCarts() {
        try {
            const carts = await CartModel.find()
            return carts;
        } catch (error) {
            console.log('Error al obtener los carritos', error)
        }
    }

    // Método para obtener un carrito por su id
    async getCartsById(id) {
        try {
           const cart = await CartModel.findById(id);
           if(!cart){
                console.log('No existre carrito con el id')
                return false;
           }
            return cart;
       } catch (error) {
            console.log('error al obtener el carrito', error);
            return false;
       }
    }


    async updateProduct(cartId, productId, quantity = 1) {
        try {
            const cart = await this.getCartsById(cartId); 
            const existProduct = cart.products.find(item => item.product.toString() === productId);
            
            if(existProduct) {
                existProduct.quantity += quantity;
            } else {
                cart.products.push({product: productId, quantity});
            }

            //Marcar la propiedad "products" como modificada: 
            cart.markModified("products");
            await cart.save();
            return cart;
            
        } catch (error) {
            console.log("error al agregar un producto", error);
        }
    }


}

module.exports = CartManager;