const mongoose = require('mongoose');

const connectToMongoDB = async (url) => {  // Accept 'url' as a parameter
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000,  // Timeout after 5 seconds
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

module.exports = {
  connectToMongoDB,
};
