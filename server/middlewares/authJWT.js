import jwt from 'jsonwebtoken'
import secret from '../config/auth.js'
import db from '../models/index.js'

const User = db.user
const Role = db.role

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]

    if(!token) {
        return res.status(403).send({message: "No token provided!"})
    }

    jwt.verify(token, 
        secret,
        (err,decoded) => {
            if(err) {
                return res.status(401).send({
                    message: "Unauthorized"
                })
            }
            req.userId = decoded.id
            next();
        })
}

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    if (!roles || roles.length === 0) {
      return res.status(403).send({ message: "User has no Roles. This requires Admin Role!" });
    }

    const isAdmin = roles.some(role => role.name === "admin");

    if (isAdmin) {
      next();
    } else {
      res.status(403).send({ message: "Require Admin Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "Internal Server Error" });
  }
};

  const isModerator = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId).exec();
  
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
  
      const roles = await Role.find({ _id: { $in: user.roles } }).exec();
  
      if (!roles || roles.length === 0) {
        return res.status(403).send({ message: "Require Moderator Role!" });
      }
  
      const isModerator = roles.some(role => role.name === "moderator");
  
      if (isModerator) {
        next();
      } else {
        res.status(403).send({ message: "Require Moderator Role!" });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || "Internal Server Error" });
    }
  };

  const authJWT = {
    verifyToken,
    isAdmin,
    isModerator
  }

  export default authJWT