const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
// Password for DB : 9JeYWLcUHAKqeNKt
const connectDB = async () => {
    try{
        console.log(db)
        await mongoose.connect(db,{useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
        console.log("MongoDb connected")
    }
    catch(err){
        console.log(err.message);
        //Exit process with failure if db connect fails 
        process.exit(1);
    }
}

module.exports = connectDB;

