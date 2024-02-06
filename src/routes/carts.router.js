const path = require('path');
const express = require("express");
const router = express.Router();
const CartsManager = require('../dao/db/cart-manager-db.js');


const cartsManager = new CartsManager();


// Endpoint para obtener todos los productos del carrito con el id seleccionado
router.get("/", (req, res) => {
  try {
    const cart = cartsManager.getCarts();
    res.status(200).send({ status: "success", data: cart });
    console.log("Productos obtenidos con éxito");
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send({ status: "error", error: "Error interno del servidor" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cartId = req.params.id;
    const cart = await cartsManager.getCartsById(cartId);
    if (!cart) {
      // Si el producto no se encuentra, envía un código de estado 404
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
    res.json({ status: "success", data: cart.products });
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).send({ status: "error", error: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    await cartsManager.createCart();
    res.json({ status: "success" });
  } catch (error) {
    console.error("Error al crear carrito", error);
    res.status(500).send({ status: "error", error: "Error interno del servidor" });
  }
})

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const proId = req.params.pid;
    const quantity = req.body.quantity;
    const productStatus = await cartsManager.updateProduct(cartId, proId, quantity);
   if(!productStatus){
      console.error("Error al actualizar el carrito");
      return  
    }
    res.json({ status: "success", productStatus });
  
  } catch (error) {
    console.error("Error al actualizar carrito", error);
    res.status(500).send({ status: "error", error: "Error interno del servidor" });
  }
});

module.exports = router;