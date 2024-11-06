const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const mongoURI = "mongodb://localhost:27017/portfolio";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Middleware
app.use(express.json()); // To parse JSON data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from "public" folder

// Define Project Schema
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  link: { type: String },
});

// Create Project model
const Project = mongoose.model("Project", ProjectSchema);

// Get all projects (GET route)
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects); // Send projects as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching projects" });
  }
});

// Create a new project (POST route)
app.post("/projects", async (req, res) => {
  const { title, description, image, link } = req.body;
  try {
    const newProject = new Project({ title, description, image, link });
    await newProject.save();
    res.json({ message: "Project created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating project" });
  }
});

// Serve the home page (GET route)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
