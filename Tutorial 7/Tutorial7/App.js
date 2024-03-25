const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Connection URI
const uri =
  'mongodb+srv://admin:admin@tutorial7.wgn0wpa.mongodb.net/?retryWrites=true&w=majority&appName=tutorial7';

// Database Name
const dbName = 'tutorial7';

// Collection Name
const collectionName = 'users';

// Middleware to parse JSON bodies
app.use(express.json());

// Function to connect to MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    console.log('Connected to MongoDB Atlas');

    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Create a user
// Create a user
app.post('/create', async (req, res) => {
  const userData = req.body;
  const collection = await connectToMongoDB();

  try {
    const result = await collection.insertOne(userData);
    const insertedId = result.insertedId; // Get the inserted ID

    const insertedUser = await collection.findOne({ _id: insertedId });

    if (insertedUser) {
      res
        .status(201)
        .json({ success: true, message: 'User created', data: insertedUser });
    } else {
      res
        .status(500)
        .json({ success: false, message: 'Failed to retrieve created user' });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Read all users
app.get('/read', async (req, res) => {
  const collection = await connectToMongoDB();

  try {
    const users = await collection.find({}).toArray();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error reading users:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Read user by ID
app.get('/read/:id', async (req, res) => {
  const userId = req.params.id;
  const collection = await connectToMongoDB();

  try {
    const user = await collection.findOne({ _id: new ObjectId(userId) }); // Use new keyword with ObjectId
    if (user) {
      res.status(200).json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error reading user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update user by ID
app.put('/update/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  const collection = await connectToMongoDB();

  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updatedUserData },
    );
    if (result.modifiedCount === 1) {
      res.status(200).json({ success: true, message: 'User updated' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Delete user by ID
app.delete('/delete/:id', async (req, res) => {
  const userId = req.params.id;
  const collection = await connectToMongoDB();

  try {
    const result = await collection.deleteOne({ _id: new ObjectId(userId) });
    if (result.deletedCount === 1) {
      res.status(200).json({ success: true, message: 'User deleted' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
