import db from '../models/index.js'

const Station = db.station

export const addNew = async (req, res) => {
    try {
        
      const station = new Station({        
        name: req.body.name,
        abbr: req.body.abbr,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        address: req.body.address,
        city: req.body.city,
        county: req.body.county,
        state: req.body.state,
        zipcode: req.body.zipcode,
      });
  
      const savedStation = await station.save();
  
   
      res.send({ message: "Station was registered successfully!" });
    } catch (err) {
      res.status(500).send({ message: err.message || "Internal Server Error" });
    }
  };

  export const find = async (req, res) => {
    const stationId = req.params.stationId;
    console.log(stationId)
    try {
     
      const record = await Station.findById(stationId);
  
      if (record) {
        res.json(record);
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

export const findAll = async (req, res) => {
    try{
        const stations = await Station.find()
        
        
        res.status(200).json({success: true, data:stations})
    }catch(error){
        res.status(500).json({success:false, message:error})
    }
}

export const deleteStation = async (req, res) => {
    const stationId = req.params.stationId;
    
    try {
     
      const deletedStation = await Station.findByIdAndDelete(stationId);
  
      if (!deletedStation) {
        return res.status(404).json({ message: 'Station not found' });
      }
  
      return res.json({ message: 'Station deleted successfully', deletedStation });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const getTotalCount =  async (req, res) => {
    try {
      
      const totalCount = await Station.countDocuments();
        
      res.json({ totalCount });
    } catch (error) {
        console.error('Error counting documents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

 