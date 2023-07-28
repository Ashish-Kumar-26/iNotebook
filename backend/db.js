const mongoose = require('mongoose');

const mongoURI = process.env.dburl_atlas || process.env.dburl_compass;
const connectToMongo =()=>{
    mongoose.connect(mongoURI)
       .then(() => console.log("connected to mongodb"))
       .catch((err) => console.log(err))
       
}

module.exports = connectToMongo;
