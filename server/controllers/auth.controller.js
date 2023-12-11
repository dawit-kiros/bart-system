import secret from '../config/auth.js'
import db from '../models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const User = db.user
const Role = db.role



export const signup = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    const savedUser = await user.save();

    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } });
      savedUser.roles = roles.map(role => role._id);
      await savedUser.save();
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      savedUser.roles = [defaultRole._id];
      await savedUser.save();
    }

    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Internal Server Error" });
  }
};
  
  


export const signin = async (req, res) => {
  try {
    
    const user = await User.findOne({ username: req.body.username })
      .populate("roles", "-__v")
      .exec();

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    else{
      console.log('User Found!!!')
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    
    const token = jwt.sign(
      { id: user.id },
      secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      }
    );

    const authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`);

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Internal Server Error" });
  }
};