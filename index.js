const functions = require('firebase-functions');
const express=require('express')
const mongoose=require('mongoose')
const cors= require('cors')

//const {username,password} =functions.config().mongo
const mongouri='mongodb+srv://admin:MongoAtlasDB@cluster0.lhtsk.gcp.mongodb.net/empleados?retryWrites=true&w=majority'

mongoose.connect(mongouri)
    .then(db=>console.log('conected formulario controlador'))
    .catch(error=>console.log(error))

const app= express()

const Pets=require('./Pets')
const Empleado=require('./Empleado')

const createServer = ()=>{
  app.use(cors({origin:true}))

  app.all('/pets', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });

  app.get('/pets',async(req,res)=>{
    //const result = await Pets.find({}).exec()
    const result = await Empleado.find({}).exec()
    res.send(result)
  })

  app.post('/pets',async(req,res)=>{
    const {body} =req //atributos

    const empleado=new Empleado(JSON.parse(body))
    //const pet=new Pets(JSON.parse(body))
    await empleado.save()
    res.send(empleado._id)
  })

  /*app.get('/pets/:id/daralta', async (req,res)=>{
      const {id } = req.params
      await Pets.deleteOne({_id:id}).exec()
      res.sendStatus(204)
  })*/

  return app
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.api = functions.https.onRequest(createServer());
