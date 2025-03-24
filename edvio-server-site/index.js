require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;


// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Edvio server is running');
})

app.listen(port, () => {
  console.log(`Server is running on PORT : ${port}`)
})

// DB_USER : edVio
// DB_PASSWORD : ZjjcxkvD0uusSqsL

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://edVio:ZjjcxkvD0uusSqsL@cluster0.3oeok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const database = client.db('Edvio');
    const coursesCollection = database.collection('allCourses');
    const reviewsCollection = database.collection('reviews');



    //   Users data Post===========================
    app.post('/addUser',async(req,res)=>{
      const user = req.body;
      const filter ={email: user.email}
      const exitingUser = await usersCollection.findOne(filter);
      if(exitingUser){
        return res.send(exitingUser)
      }
        const result = await usersCollection.insertOne(user);
        res.send(result)
    })

    // all users data ===========================
    app.get('/allUser',async(req,res)=>{
       try{
        const result = await usersCollection.find().toArray();
        res.send(result)
       }
       catch(err){
        console.error("Error fetching users:", err);
        res.status(500).json({
          success:false,
          message:"Failed to fetch users. Please try again later."
        })
       }
    })
    //  all courses data ===========================
    // Modify your existing /allCourses route
    app.get('/allCourses', async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        const sortField = req.query.sortField || 'price';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const skip = (page - 1) * limit;

        const [courses, totalCourses] = await Promise.all([
          coursesCollection.find()
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit)
            .toArray(),
          coursesCollection.countDocuments()
        ]);

        res.status(200).json({
          success: true,
          data: courses,
          totalCourses
        });
      } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({
          success: false,
          message: "Failed to fetch courses"
        });
      }
    });

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();


  }
}
run().catch(console.dir);
