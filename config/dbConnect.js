const { default: mongoose } = require("mongoose")


const dbConnect = () => {
    mongoose.set("strictQuery", false);
   try {
       const conn = mongoose.connect("mongodb://localhost:27017");
       console.log("db is connected");
   } catch (error) {
       console.log("Database error");
    // throw new Error
   }
}

module.exports = dbConnect;