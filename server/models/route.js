import mongoose from 'mongoose'

const Route = mongoose.model(
    'Route',
    new mongoose.Schema({
        name:String,
        abbr:String,
        routeID:String,
        number:Number,        
        color:String,
        direction:String
        
    })
)

export default Route