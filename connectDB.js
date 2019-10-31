const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    //connect to mongodb server
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-h8j6g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
    );
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
