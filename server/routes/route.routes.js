import {
  addNew,
  find,
  findAll,
  deleteRoute,
  getTotalCount
} from "../controllers/route.controller.js";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/routes", findAll);

  app.get('/api/routes/:routeId', find)

  app.get ('/api/routes/routes/count', getTotalCount)

  app.get("/api/routes/test", (req, res) => {
    res.send("Routes API Test Works");
  });

  app.post("/api/routes", addNew);

  //   app.patch('/api/routes/:userId', updateStation)

  app.delete("/api/routes/:routeId", deleteRoute);
}
