const mongoose = require('mongoose')

const connectToMongoDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

module.exports = {
  connectToMongoDB,
};