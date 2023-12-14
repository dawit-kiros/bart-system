import mongoose from 'mongoose'
import user from './user.js' 
import role from './role.js'
import route from './route.js'
import station from './station.js'
mongoose.Promise = global.Promise

const db ={}

db.mongoose = mongoose; 

db.user = user
db.role = role 
db.route = route
db.station = station

db.ROLES = ['user','admin']

export default db