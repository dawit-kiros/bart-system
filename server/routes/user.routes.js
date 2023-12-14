import authJwt  from "../middlewares/authJWT.js";
import {allAccess,userBoard, moderatorBoard, adminBoard, findAllUsers, deleteUser, updateUser, find } from "../controllers/user.controller.js";

export default function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard
  );

  app.get ('/api/users', findAllUsers)

  app.get('/api/users/:userId', find)

  app.patch('/api/users/:userId', updateUser)

  app.delete('/api/users/:userId', deleteUser)
}

