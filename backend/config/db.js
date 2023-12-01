const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async() => {
    try {


//       const conn = await mongoose.connect("mongodb://localhost:27017/your-database", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

      console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
        const conn = await mongoose.connect("mongodb+srv://ilchatu2023:project2023@cluster0.9wkxirt.mongodb.net/?retryWrites=true&w=majority", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
    }
};

module.exports  = connectDB;