const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

// DB connection
const db = "mongodb://localhost:27017";
mongoose.connect(
	db, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("MongoDB connected..."))
	.catch(console.err);

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.use("/auth", require("./routes/auth.js"));
app.use("/farmer", require("./routes/farmer.js"));
app.use("/wholesaler", require("./routes/wholesaler.js"));

// Port
const PORT = process.env.PORT || 5000;
app.listen(
	PORT,
	(err) => {
		if(err)
			throw err;

		console.log("Server started on http://localhost:" + PORT);
	}
);