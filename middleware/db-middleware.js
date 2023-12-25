const { MongoClient } = require('mongodb');

const databaseMiddleware = async (req, res, next) => {
    try {
        
        const mongoClient = new MongoClient("mongodb://localhost:27017", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await mongoClient.connect(); 
        const db = mongoClient.db('blogs');
        req.db = db; 
        next();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        if (mongoClient) {
            await mongoClient.close();
        }
        next(error);
    }
};

module.exports = databaseMiddleware;
