const express = require("express");
const router = express.Router(); 

router.get("/", async (req, res) => {
  try {
    res.render("chat" );
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router; 