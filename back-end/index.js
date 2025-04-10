//import libraries
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const upload = require("./middleware/upload");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

 //connect to database
mongoose.connect("mongodb+srv://alysalem25t:nqdiszK0u6jA8Cs9@cluster0.nctbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Connection failed", err));

//create express app and use middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Define the routes for the articles , users and comments
const Article = require("./models/articles");
const User = require("./models/users");
const Comment = require("./models/comments");

//Add a new article 
app.post("/articles", upload.single("image"), async (req, res) => {
  try {
    
        const { title, content, topic, author } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Get image URL

    // Ensure authorId is a valid ObjectId
    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ error: "Invalid author ID format" });
    }
    
    const article = new Article({
      title,
      content,
      topic,
      author: new mongoose.Types.ObjectId(author), // Convert to ObjectId
      imageUrl,
    });
    

    await article.save();
    res.status(201).json({ message: "Article created successfully", article });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Title used before" });
    } else {
      res.json({ error: error.message });
    }
  }
});

// edit article by admin (accepts status) or (rejects article and note)
app.post("/editarticle/:id", async (req, res) => {
  try {
    const newarticle = await Article.findById(req.params.id)
    newarticle.status = req.body.status
    newarticle.note = req.body.note
    newarticle.deletedAt = req.body.deletedAt
    await newarticle.save();
    res.json(newarticle);
  } catch (error) {
    console.log(error);
  }
}
);

//get all articles 
app.get("/articles", async (req, res) => {
  try {
    // Fetch all articles and populate the author's name and surname
    const articles = await Article.find().populate("author", "firstName surname");

    // Modify the response to include the full author name
    const formattedArticles = articles.map(article => ({
      ...article.toObject(),
      author: article.author ? `${article.author.firstName} ${article.author.surname}` : "Unknown Author"
    }));

    res.json(formattedArticles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/acceptedArticle" , async(req,res)=>{
  try {
    // Fetch all articles and populate the author's name and surname
    const articles = await Article.find({ status: "published" }).populate("author", "firstName surname");

    // Modify the response to include the full author name
    const formattedArticles = articles.map(article => ({
      ...article.toObject(),
      author: article.author ? `${article.author.firstName} ${article.author.surname}` : "Unknown Author"
    }));

    res.json(formattedArticles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

//get the article by id
app.get("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate("author", "firstName surname");

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Format the article response
    const formattedArticle = {
      ...article.toObject(),
      author: article.author ? `${article.author.firstName} ${article.author.surname}` : "Unknown Author",
    };

    res.json(formattedArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get articles by topic
app.get("/articlesRelated", async(req ,res)=>{
  try{
    const topic = req.query.topic
    const articlesByTopic = await Article.find({ topic : topic }).populate("author", "firstName surname");
    res.json(articlesByTopic)
  }catch(error){
    res.json("error")
  }
  
});
//get the last 3 articles
app.get("/last3articles", async (req, res) => {
  try {
    const articles = await Article.find({ status: "published" })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (newest first)
      .limit(3);

    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//find article by title or topic or writer or content
app.get("/articleResulted/:search", async (req, res) => {
  try {
    const search = req.params.search;

    // Find authors matching the search query
    const authors = await User.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { surname: { $regex: search, $options: "i" } }
      ]
    }).select("_id");

    // Extract author IDs
    const authorIds = authors.map(author => author._id);

    // Find articles matching title, topic, content, or author ID
    const articles = await Article.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { topic: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { author: { $in: authorIds } } // Matching authors by ID
      ]
    }).populate("author", "firstName surname");

    if (!articles.length) {
      return res.status(404).json({ message: "No articles found" });
    }

    res.json(articles);
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).json({ message: "Server error" });
  }
});




//delete article by id
app.delete("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      res.status(404).json({ error: "Article not found" });
    } else {
      await article.deleteOne();
      res.json({ message: "Article deleted successfully" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

//get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ error: error.message });
  }
});

//get user by id
app.get("/users/:id", async (req, res) => {
  try {
    // const token = req.params.token;
    // const decoded = jwt.verify(token, "your_secret_key");
    const user = await User.findById(req.params.id);
    // const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
}
);

//add user
app.post("/users", async (req, res) => {
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }
  

    // Hashing the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      firstName: req.body.firstName,
      surname: req.body.surname,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      role: req.body.role,
      address: req.body.address,
      state: req.body.state,
      education: req.body.education,
    });
    const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });

    await user.save();
    res.status(201).json({ message: "User created successfully", user , token});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Login
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    // Generate JWT Token (Optional)
    // const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });
const userId = user._id 
    res.json({ message: "Login successful",userId});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete user by id
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

//get all article comments
app.get("/comments/:articleId", async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.articleId })
      .populate("userId", "firstName surname")
      .populate("articleId", "title")
      .sort({ createdAt: -1 });;
    res.json(comments);
  } catch (error) {
    res.json({ error: error.message });
  }
});

//add comment to article useing article id
app.post("/comments/:id", async (req, res) => {
  try {
    const comment = new Comment({
      articleId: req.params.id,
      content: req.body.content,
      userId: req.body.userId,
    });
    await comment.save();
    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//delete comment 
app.delete("/deleteComment/:id" , async (req , res)=>{
  await Comment.findOneAndDelete(req.params.id);
  res.json("deleted");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
