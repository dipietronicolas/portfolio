const Cities = require('../models/cities');

const indexController = {};

indexController.getApp = async (req, res) =>{
    const dataFetched = await Cities.find();
    const city_ids = dataFetched.map( (city) =>{
        return city.id;
    })
    res.send(city_ids);
}

indexController.saveToDB = async (req, res) => {
    // Object.keys(obj)[0]
    const id = Object.keys(req.body)[0];
    const new_city = new Cities({
        id: id
    })
    try {
        await new_city.save();    
    } catch (error) {
        console.log(error);
    }
}

indexController.deleteFromDB = async (req, res) => {
    const id = req.params.id;
    await Cities.deleteOne({ id: id});
}

module.exports = indexController;