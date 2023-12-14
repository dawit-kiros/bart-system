
import {addNew, find, findAll, deleteStation} from "../controllers/station.controller.js";

export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/stations",addNew);

  app.get ('/api/stations', findAll)

  app.get('/api/stations/:stationId', find)

//   app.patch('/api/stations/:userId', updateStation)

  app.delete('/api/stations/:stationId', deleteStation)

  app.get('api/stations/test' , (req, res)=> {
    res.send('Stations API Test Works')
  })
};