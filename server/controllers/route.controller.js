import db from '../models/index.js'

const Route = db.route

export const addNew = async (req, res) => {
    try {
        
      const route = new Route({        
        name: req.body.name,        
        abbr:req.body.abbr,
        routeID:req.body.routeID,
        number:req.body.number,   
        color:req.body.color,
        direction:req.body.direction,
      });
  
      const savedRoute = await route.save();
  
   
      res.send({ message: "Route was registered successfully!" });
    } catch (err) {
      res.status(500).send({ message: err.message || "Internal Server Error" });
    }
  };

export const findAll = async (req, res) => {
    try{
        const routes = await Route.find()
        
        
        res.status(200).json({success: true, data:routes})
    }catch(error){
        res.status(500).json({success:false, message:error})
    }
}

export const deleteRoute = async (req, res) => {
    const routeId = req.params.routeId;
    
    try {
     
      const deletedStation = await Route.findByIdAndDelete(routeId);
  
      if (!deletedStation) {
        return res.status(404).json({ message: 'Route not found' });
      }
  
      return res.json({ message: 'Route deleted successfully', deletedStation });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const find = async (req, res) => {
    const routeId = req.params.routeId;
    console.log(routeId)
    try {
     
      const record = await Route.findById(routeId);
  
      if (record) {
        res.json(record);
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  export const getTotalCount =  async (req, res) => {
    try {
      
      const totalCount = await Route.countDocuments();
        
      res.json({ totalCount });
    } catch (error) {
        console.error('Error counting documents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  
 