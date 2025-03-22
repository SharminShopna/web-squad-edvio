const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Edvio server is running");
});

app.listen(port, () => {
  console.log(`Server is running on PORT : ${port}`);
});

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
     const usersCollection = database.collection('users');
    const coursesCollection = database.collection("allCourses");
    const reviewsCollection = database.collection("reviews");


    // POST route for adding a review
    app.post("/addReview", async (req, res) => {
      const { name, location, rating, review, photoURL } = req.body;

      try {
        const newReview = {
          name,
          location,
          rating,
          review,
          photoURL,
          createdAt: new Date(),
        };

        // Insert review into the reviews collection
        const result = await reviewsCollection.insertOne(newReview);

        res.status(201).json({
          success: true,
          message: "Review added successfully",
          data: result,
        });
      } catch (err) {
        console.error("Error adding review:", err);
        res.status(500).json({
          success: false,
          message: "Failed to add review. Please try again later.",
        });
      }
    });

    // GET route for fetching all reviews
    app.get("/allReviews", async (req, res) => {
      try {
        const result = await reviewsCollection.find().toArray();
        res.status(200).json({
          success: true,
          data: result,
        });
      } catch (err) {
        console.error("Error fetching reviews:", err);
        res.status(500).json({
          success: false,
          message: "Failed to fetch reviews. Please try again later.",
        });
      }
    });



    //   Users data Post===========================
    app.post('/addUser',async(req,res)=>{
      const user = req.body;
      const filter ={email: user.email}
      const exitingUser = await usersCollection.findOne(filter);
      if(exitingUser){
        return res.send(exitingUser)
      }
        const result = await usersCollection.insertOne(filter);
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
    app.get("/allCourses", async (req, res) => {
      try {
        const result = await coursesCollection.find().toArray();
        res.status(200).json({
          success: true,
          data: result,
        });
      } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({
          success: false,
          message: "Failed to fetch courses. Please try again later.",
        });
      }
    });

    // id wise course details
    app.get("/courseDetails/:id", async (req, res) => {
      const id = req.params.id;
      const courseId = { _id: new ObjectId(id) };
      try {
        const result = await coursesCollection.findOne(courseId);
        res.send(result);
      } catch (e) {
        console.log(e.message);
      }
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
