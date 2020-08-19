const mongoose=require('mongoose')

const Pets = mongoose.model('Pet',{
    nombre:String,
    tipo:String,
    description:String
})

module.exports=Pets