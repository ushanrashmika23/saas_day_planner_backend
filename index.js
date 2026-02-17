const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const authRouter = require("./routes/auth.route");
app.use("/api/v1/auth", authRouter);
const usersRouter = require("./routes/user.route");
app.use("/api/v1/users", usersRouter);
const tagsRouter = require("./routes/tag.route");
app.use("/api/v1/tags", tagsRouter);
const projectsRouter = require("./routes/project.route");
app.use("/api/v1/projects", projectsRouter);
const tasksRouter = require("./routes/task.route");
app.use("/api/v1/tasks", tasksRouter);


app.get("/", (req, res) => {
    res.send("Welcome to the Day Planner Backend!");
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/dayplanner", {})
    .then(() => {
        console.log("### Connected to MongoDB");
        app.listen(port, () => {
            console.log(`### Server is running on port ${port}`);
        });
    })
    .catch((err) => console.error("!!! Error connecting to MongoDB:", err));
