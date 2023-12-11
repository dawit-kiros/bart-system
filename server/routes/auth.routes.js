import  verifySignUp  from "../middlewares/verifySignUp.js";
import {signin, signup} from "../controllers/auth.controller.js";

export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],signup
  );

  app.post("/api/auth/signin", signin);

  app.get('/test' , (req, res)=> {
    res.send('Test Works')
  })
};