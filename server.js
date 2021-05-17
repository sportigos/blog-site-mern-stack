//  Begin Date: 2020/05/25  Mon
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

const user 		= require("./routes/api/userRoute");
const category 	= require("./routes/api/categoryRoute");
const post	 	= require("./routes/api/postRoute");
const comment	= require("./routes/api/commentRoute");
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
	.connect(db)
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err));

//Passport Config
// require("./config/passport")(passport);

// Use Routes
app.use("/api/user", user);
app.use("/api/category", category);
app.use("/api/post", post);
app.use("/api/comment", comment);

// Open port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));