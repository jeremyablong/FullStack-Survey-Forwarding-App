// require mongoose
const mongoose = require("mongoose");
// schemas
const { Schema } = mongoose;
// defines what user will look like - collection
const userSchema = new Schema({
	googleID: String
	// can add in additional properties such as 
	// name: String
});
// name of collection ("users") and second arg is userSchema
mongoose.model("users", userSchema);