
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

    async updateProduct(cartId, proId, quantity = 1) {
        try {
           const cart = await this.getCartsById(cartId);
           if(cart){
                const existProduct = cart.products.find(item => item.product.toString() === proId)
                if(existProduct){
                    existProduct.quantity += quantity;
                }else{
                    carrito.products.push({product: proId, quantity})
                }
           }
           cart.markModified('products')
           await cart.save();
           return cart
        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }

}

module.exports = CartManager;