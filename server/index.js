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
import stationRoutes from './routes/station.routes.js';
import routeRoutes from './routes/route.routes.js';




// Define Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Final Project(Bart System)',
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

var corsOptions = {
  origin: "http://localhost:8082"
}

app.use(cors(corsOptions) )

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

  
  async function initial() {
    try {
      const count = await Role.estimatedDocumentCount();
  
      if (count === 0) {
        await Promise.all([
          new Role({ name: "user" }).save(),
         
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
stationRoutes(app);
routeRoutes(app)

server.listen(port, () => {    
    logger.info(`Server listening on port ${port}`)
});

