
import db from '../models/index.js'

const ROLES = db.ROLES;
const User = db.user;


const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
      
      // Check for duplicate username
      const usernameUser = await User.findOne({ username: req.body.username }).exec();
  
      if (usernameUser) {
        return res.status(400).send({ message: 'Failed! Username is already in use.' });
      }
  
      // Check for duplicate email
      const emailUser = await User.findOne({ email: req.body.email }).exec();
  
      if (emailUser) {
        return res.status(400).send({ message: 'Failed! Email is already in use.' });
      }
  
      // If no duplicates, proceed to the next middleware
      next();
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  };
  
const checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for(let i = 0; i< req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                })
                return;
            }
        }
    }
    next(); 
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
}

export default verifySignUp