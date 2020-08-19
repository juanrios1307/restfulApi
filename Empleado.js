
// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');
// Usaremos los esquemas

// Creamos el objeto del esquema y sus atributos
const Empleados = mongoose.model('Empleado',{
    nombre: String,
    apellido: String,
    salario: String
})

// Exportamos el modelo para usarlo en otros ficheros
module.exports = Empleados