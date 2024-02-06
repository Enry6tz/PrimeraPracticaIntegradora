const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://enrique6tz:MongoDB2024@cluster0.aboroby.mongodb.net/ecommerce?retryWrites=true&w=majority")
.then(()=> console.log("conectado exitosamente"))
.catch((e)=>console.log(e))
