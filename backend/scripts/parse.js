var JSSoup = require('jssoup').default;
const mongoose = require("mongoose");
const Club = require("../models/clubs");

require('dotenv').config({ path: '../.env.local' });

try {
	// Connect to the MongoDB cluster
	mongoose.connect(
		"mongodb://localhost:27017/clubdb",
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => console.log("Mongoose is connected")
	);

} catch (e) {
	console.log("Could not connect");
	return;
}

var soup = new JSSoup(process.env.HTML_TBODY);

const rows = soup.find('tbody').contents;

// const club = new Club({ name: "test" });
// club.save();

// console.log(rows);
rows.forEach(row => {
	let counter = 0;
	let name;
	let location;
	let date;
	let time;
	let advisor;

	row.contents.forEach(item => {
		if (item.contents[0]) {
			const txt = item.contents[0]._text;
			if (counter === 0) name = txt
			else if (counter === 1) advisor = txt;
			else if (counter === 2) date = txt;
			else if (counter === 3) time = txt;
			else if (counter === 4) location = txt;
		}

		else {
			if (counter === 0) name = '';
			if (counter === 1) advisor = '';
			if (counter === 2) date = '';
			if (counter === 3) time = '';
			if (counter === 4) location = '';
		}

		counter++;
	});

	console.log("Name: " + name);
	console.log("Advisor: " + advisor);
	console.log("Date: " + date);
	console.log("Time: " + time);
	console.log("Location: " + location);

	// for now it just randomizes
	const club = new Club({ name: name, description: name, location: location, dates: [getRandomInt(7)], time: time, advisor: advisor, approved: true, verification: "", officers: [], tags: { service: randBool(), academic: randBool(), educational: randBool(), misc: randBool() } });
	club.save();
});

function randBool() {
	return Math.random() < 0.5;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}