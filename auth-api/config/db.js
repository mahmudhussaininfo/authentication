const { default: mongoose } = require("mongoose");

//mongoconnection
const mongoDBConnect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log(`mongoDB database is connected`.bgYellow.gray);
  } catch (error) {
    console.log(error);
  }
};

//export
module.exports = mongoDBConnect;
