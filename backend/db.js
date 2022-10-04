// Import the mongoose module
const mongoose = require("mongoose");
const Club = require("./models/clubs")

// Set up default mongoose connection
mongoose.connect("mongodb://localhost/testdb");

run();
async function run()
{
	const club = await Club.create({name: "Programming Club", description: "program"});
	console.log(club);
}
