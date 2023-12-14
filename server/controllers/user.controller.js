import db from '../models/index.js'

const User = db.user

export const allAccess = (req, res) => {
    res.status(200).send('Public Content')
}

export const userBoard = (req, res) => {
    res.status(200).send ('User Content')
}

export const adminBoard = (req, res) => {
    res.status(200).send ('Admin Content')
}

export const moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

export const find = async (req, res) => {
    const userId = req.params.userId;
    console.log(userId)
    try {
     
      const record = await User.findById(userId);
  
      if (record) {
        res.json(record);
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

export const findAllUsers = async (req, res) => {
    try{
        const users = await User.find()
        .populate("roles", "-__v")
        .exec();
        
        res.status(200).json({success: true, data:users})
    }catch(error){
        res.status(500).json({success:false, message:error})
    }
}

export const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    
    try {
     
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const updateUser = async (req, res) => {
    try {
        console.log(req.params.userId)
        console.log(req.body.email)
        //console.log(updatedData.usename)
        return
      // Find and update the record by ID
      const updatedRecord = await User.findOneAndUpdate(
        { _id: id },
        { $set: updatedData },
        { new: true } // Return the modified document rather than the original
      );
  
      if (updatedRecord) {
        console.log('Record updated successfully:', updatedRecord);
      } else {
        console.log('Record not found.');
      }
    } catch (error) {
      console.error('Error updating record:', error.message);
    } finally {
      
    }
  };