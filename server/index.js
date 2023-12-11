import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors'
import  * as dotenv from 'dotenv'; 
import {getLoggerInstance} from './logger.js'
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import db from './models/index.js';
import dbConfig from './config/db.js'
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';




// Define Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Midterm Project(Fedex Track API)',
      version: '1.0.0',
    },
  },
  apis: ['index.js', './routes/startup.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

const port = process.env.PORT || 8080

dotenv.config(); 

const httpsOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}

const app = express();

const logger = getLoggerInstance(); 

const server = https.createServer(httpsOptions,app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// var corsOptions = {
//   origin: "http://localhost:8081"
// }

app.use(cors())

//parse requests of content-type - application/json
app.use(express.json());

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
  res.json({message: "Welcome to the Bart system"})
})

const Role = db.role

db.mongoose
  .connect(`${dbConfig.CLOUD_HOST}/${dbConfig.DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=> {
    logger.info('Successfully connected to MongoDB.');
    initial();
  })
  .catch(err => {
    logger.error("DB Connection error", err)
    process.exit();
  });

  // function initial(){ 
  //   Role.estimatedDocumentCount((err, count) =>{
  //     if (!err && count === 0){
  //       new Role({
  //         name: 'user'
  //       }).save(err => {
  //         if (err){
  //           logger.error("error", err)
  //         }
  //         logger.info('added \'user\' to roles collection')
  //       });

  //       new Role({
  //         name:'moderator'
  //       }).save(err => {
  //         if (err) {
  //           logger.error('error', err);
  //         }
  //         logger.info('added \'moderator\' to roles collection')
  //       });

  //       new Role({
  //         name:'admin'
  //       }).save(err => {
  //         if (err) {
  //           logger.error('error', err);
  //         }
  //         logger.info('added \'admin\' to roles collection')
  //       });
  //     }
  //   })
  // }
  async function initial() {
    try {
      const count = await Role.estimatedDocumentCount();
  
      if (count === 0) {
        await Promise.all([
          new Role({ name: "user" }).save(),
          new Role({ name: "moderator" }).save(),
          new Role({ name: "admin" }).save(),
        ]);
  
        console.log("Roles initialized successfully.");
      }
    } catch (err) {
      console.error("Error initializing roles:", err);
    }
  }
  
authRoutes(app);
userRoutes(app);

server.listen(port, () => {    
    logger.info(`Server listening on port ${port}`)
});

