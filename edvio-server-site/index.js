require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const stripe = require("stripe")(
  "sk_test_51Qs7dpBM5dvyedYSDXcWsXSWbXeMbn1HlfhCujqzMsG6kPcxbj4ovoNvmmraaeASZ9sanWeSdCMiLTvePkGWtVb200PGsvGLcJ"
);
const { GoogleGenAI } = require("@google/genai");


// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://jade-horse-d72d87.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

//  chatbot api -------------------
const ai = new GoogleGenAI({ apiKey: "AIzaSyDLZnUvmtaLo9lTOgdlRwpcDzTy-QGhObM" });

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
    const database = client.db("Edvio");
    const usersCollection = database.collection("users");
    const coursesCollection = database.collection("allCourses");
    const reviewsCollection = database.collection("reviews");
    const courseReviewCollection = database.collection("courseReview");
    const addToCart = database.collection("addToCart");
    const buyCourse = database.collection("buyCourse");
    const schedule = database.collection("schedule");

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

    // stripe
    app.post("/create-payment-intent", async (req, res) => {
      try {
        const { price } = req.body;
        const amount = parseInt(price * 100); // Convert to cents

        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.status(200).json({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: error.message });
      }
    });



    // Save payment data endpoint
    app.post("/save-payment", async (req, res) => {
      try {
        const paymentData = req.body;

        // Basic validation
        if (!paymentData.paymentId || !paymentData.amount || !paymentData.courses || !paymentData.studentEmail) {
          return res.status(400).json({
            success: false,
            message: "Missing required payment data"
          });
        }

        // Add timestamp
        paymentData.paymentDate = new Date();

        // Insert into MongoDB
        const result = await buyCourse.insertOne(paymentData);

        res.status(201).json({
          success: true,
          message: "Payment data saved successfully",
          data: result
        });
      } catch (error) {
        console.error("Error saving payment data:", error);
        res.status(500).json({
          success: false,
          message: "Failed to save payment data",
          error: error.message
        });
      }
    });

    // Get the payment history
    app.get("/payments", async (req, res) => {
      try {
        const { email } = req.query;
        let query = {};
    
        // If email is provided as a query param, filter by it
        if (email) {
          query.studentEmail = email;
        }
    
        // Fetch data from the collection
        const payments = await buyCourse.find(query).sort({ paymentDate: -1 }).toArray();
    
        res.status(200).json({
          success: true,
          message: "Payments retrieved successfully",
          data: payments
        });
      } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch payments",
          error: error.message
        });
      }
    });
    

    // Role
    app.get("/getRole/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.find({ email: email }).toArray();
      res.send(result);
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
    app.post("/addUser", async (req, res) => {
      try {
        const user = req.body;
        const filter = {
          firebaseUid: user.firebaseUid || user.email || user.number,
        };
        const existingUser = await usersCollection.findOne(filter);

        if (existingUser) {
          return res.status(409).send({
            message: "User already exists",
            user: existingUser,
          });
        }
        const result = await usersCollection.insertOne(user);

        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({
          message: "Internal server error",
          error: error.message,
        });
      }
    });

    // all users data ===========================
    app.get("/allUser", async (req, res) => {
      try {
        const result = await usersCollection.find().toArray();
        res.send(result);
      } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({
          success: false,
          message: "Failed to fetch users. Please try again later.",
        });
      }
    });
    app.patch("/updateRole", async (req, res) => {
      const { id, role } = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: role,
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // get one user base on email =============================
    app.get("/user/byEmail/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      try {
        const result = await usersCollection.findOne(query);
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
    //  get one user base on Id =======================

app.get("/user/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id)};
    const result = await usersCollection.findOne(query);
     res.status(200).json({
        success: true,
        data: result,
        });
  } catch (error) {
    console.error(error);
    res.status(500).json({
    success: false,
    message: "Failed to fetch courses. Please try again later.",
        });
  }
});

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

    app.post("/allCourses", async (req, res) => {
      try {
        const courseData = req.body;
        console.log(courseData);

        // Basic validation
        if (
          !courseData.course_name ||
          !courseData.instructor ||
          !courseData.category
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Missing required fields (course_name, instructor, or category)",
          });
        }

        // Add timestamps
        courseData.createdAt = new Date();
        courseData.updatedAt = new Date();

        // Set default values if not provided
        courseData.Purchase_order = courseData.Purchase_order || "0";
        courseData.isPremium = courseData.isPremium || false;
        courseData.certification = courseData.certification || false;

        // Insert into MongoDB
        const result = await coursesCollection.insertOne(courseData);

        res.status(201).json({
          success: true,
          message: "Course created successfully",
          data: {
            id: result.insertedId,
            ...courseData,
          },
        });
      } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({
          success: false,
          message: "Failed to create course",
          error: error.message,
        });
      }
    });
    app.get("/instructorCourse/:email", async (req, res) => {
      const email = req.params.email;
      const instructorCourses = await coursesCollection
        .find({ "instructor.email": email })
        .toArray();
      res.send(instructorCourses);
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
    // get course review base on course id =========================
    app.get("/course_review/:id", async (req, res) => {
      const course_id = req.params.id;
      const query = { course_id: course_id };
      try {
        const result = await courseReviewCollection
          .find(query)
          .sort({ _id: -1 })
          .toArray();
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

    // ADD TO CART

    app.post("/add-cart", async (req, res) => {
      const body = req.body;
      const response = await addToCart.insertOne(body);
      res.send(response);
    });
    app.get("/cart-item/:email", async (req, res) => {
      const email = req.params.email;
      const response = await addToCart.find({ student_email: email }).toArray();
      res.send(response);
    });

    app.post("/buy-course", async (req, res) => {
      const body = req.body;
      const courseDetails = await buyCourse.insertOne(body);
      res.send(courseDetails);
    });

    app.get("/bougth-courses/:email", async (req, res) => {
      const email = req.params.email;
      const bougthCourse = await buyCourse
        .find({ studentEmail: email })
        .toArray();
      const courseIds = bougthCourse.map(
        (course) => new ObjectId(course.courseId)
      );
      const myCourses = await coursesCollection
        .find({
          _id: { $in: courseIds },
        })
        .toArray();
      res.send(myCourses);
    });


// Get cart items
app.get('/cart-items/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const items = await addToCart.find({ student_email: email }).toArray();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete cart item
app.delete('/cart-item/:email/:id', async (req, res) => {
  try {
    const { email, id } = req.params;
    const result = await addToCart.deleteOne({ 
      student_email: email, 
      _id: new ObjectId(id) 
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Clear purchased courses from cart
app.post('/clear-purchased-courses', async (req, res) => {
  try {
    const { email, courseIds } = req.body;
    await addToCart.deleteMany({ 
      student_email: email,
      courseId: { $in: courseIds }
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


    // course review post base on id ============================
    app.post("/course_review", async (req, res) => {
      try {
        const new_course_review = req.body;
        if (!new_course_review.rating) {
          return res.status(400).json({ error: "Give Your Ration" });
        }
        if (!new_course_review || !new_course_review.opinion) {
          return res.status(400).json({ error: "Give Your Review" });
        }
        const result = await courseReviewCollection.insertOne(
          new_course_review
        );
        res.status(201).json({
          success: true,
          message: "Review added successfully",
          data: result,
        });
      } catch (error) {
        console.error("Error inserting review:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    //  AI Implementation

    app.post("/api/generate-course-content", async (req, res) => {
      try {
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${"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"}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "yourdomain.com",
              "X-Title": "Course Creator App",
            },
            body: JSON.stringify(req.body),
          }
        );

        const data = await response.json();

        // Log the data received from the API for debugging
        console.log("Response from OpenRouter AI:", data);

        // Now send the data back to the frontend
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      // Get all schedules for a user
      app.get("/my-schedule/:email", async (req, res) => {
        try {
          const email = req.params.email;
          const result = await schedule.find({ email: email }).toArray();
          // Convert dates to ISO strings for consistent serialization
          const formattedResult = result.map((item) => ({
            ...item,
            date: item.date.toISOString(),
          }));
          res.send(formattedResult);
        } catch (error) {
          res.status(500).send({ error: "Failed to fetch schedules" });
        }
      });

      // Create new schedule
      app.post("/instructor-schedule", async (req, res) => {
        try {
          const body = req.body;
          const result = await schedule.insertOne(body);
          res.send(result);
        } catch (error) {
          res.status(500).send({ error: "Failed to create schedule" });
        }
      });
      // Update schedule
      app.put("/instructor-schedule/:id", async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedDoc = {
          $set: req.body,
        };
        const result = await schedule.updateOne(filter, updatedDoc, options);
        res.send(result);
      });

      // Delete schedule
      app.delete("/instructor-schedule/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await schedule.deleteOne(query);
        res.send(result);
      });
    });

    app.delete("/delete-myCourse/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coursesCollection.deleteOne(query);
      res.send(result);
    });

    // user data update ...............



      

        app.put("/user/:email", async (req, res) => {
          try {
            const email = req.params.email;
            const query = { email: email };
            const updateData = req.body;
            const update = { $set: {} };

            if (updateData.name || updateData.email || updateData.mobile) {
              update.$set = {
                name: updateData?.name,
                email: updateData?.email,
                mobile: updateData?.mobile,
              };
            }
            // Only set 'additional' if it's provided
            if (
              updateData.gender ||
              updateData.age ||
              updateData.primaryDeviceType ||
              updateData.internetType ||
              updateData.yearsOfExperience
            ) {
              update.$set.additional = {
                gender: updateData?.gender,
                age: updateData?.age,
                primaryDeviceType: updateData?.primaryDeviceType,
                internetType: updateData?.internetType,
                yearsOfExperience: updateData?.yearsOfExperience,
              };
            }

            // Only set 'address' if it's provided
            if (updateData.presentAddress || updateData.permanentAddress) {
              update.$set.address = {
                presentAddress: {
                  country: updateData?.presentAddress?.country,
                  district: updateData?.presentAddress?.district,
                  streetAddress: updateData?.presentAddress?.streetAddress,
                  postalCode: updateData?.presentAddress?.postalCode,
                  city: updateData?.presentAddress?.city,
                },
                permanentAddress: {
                  country: updateData?.permanentAddress?.country,
                  district: updateData?.permanentAddress?.district,
                  streetAddress: updateData?.permanentAddress?.streetAddress,
                  postalCode: updateData?.permanentAddress?.postalCode,
                  city: updateData?.permanentAddress?.city,
                },
              };
            }
            if (
              updateData.educationLevel ||
              updateData.internetType ||
              updateData.degreeTitle ||
              updateData.graduationYear ||
              updateData.currentYear ||
              updateData.cgpa
            ) {
              update.$set.education = {
                educationLevel: updateData.educationLevel,
                institutionName: updateData.institutionName,
                degreeTitle: updateData.degreeTitle,
                graduationYear: updateData.graduationYear,
                currentYear: updateData.currentYear,
                cgpa: updateData.cgpa,
              };
            }
            if (
              updateData.cvLink ||
              updateData.githubProfile ||
              updateData.portfolioLink ||
              updateData.linkedinProfile
            ) {
              update.$set.links = {
                cvLink: updateData.cvLink,
                githubProfile: updateData.githubProfile,
                portfolioLink: updateData.portfolioLink,
                linkedinProfile: updateData.linkedinProfile,
              };
            }
            const result = await usersCollection.updateOne(query, update);
            res.send(result);
          } catch (error) {
            console.error("Error updating user:", error.message);
            res.status(500).send({ error: "Failed to update user data" });
          }
        });

      
        // AI Chatbot for common questions ==================================================
app.get("/ask", async (req, res) => {
  const { question } = req.query; 
  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", 
      contents: question, 
    });
    if (response && response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      if (candidate.content && Array.isArray(candidate.content.parts) && candidate.content.parts.length > 0) {
        const answer = candidate.content.parts[0].text || 'No answer text found'; 
        res.send({ answer: answer });
      } else {
        res.status(500).json({ error: "No valid content found in the response" });
      }
    } else {
      res.status(500).json({ error: "No candidates returned from the AI model" });
    }
  } catch (error) {
    console.error("Error from Gemini API:", error);
    res.status(500).json({ error: "An error occurred while processing the question", details: error.message });
  }
});


      
    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
