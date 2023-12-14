import mongoose from 'mongoose'

const Station = mongoose.model(
    'Station',
    new mongoose.Schema({
        name:String,
        abbr:String,
        latitude:Number,
        longitude:Number,
        address:String,
        city:String,
        county:String,
        state:String,
        zipcode:String
        
    })
)

export default Station