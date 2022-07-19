const express = require("express");
const { notes } = require("./db/db");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.envPORT || 3001;

// middleware definitions
// parse incoming data into string/array
app.use(express.urlencoded({ extended: true }));
// parse incoming json data
app.use(express.json());

// function definitions
// filter by id param
function findById(id, noteArray) {
	let result = noteArray.filter((note) => note.id === id)[0];
	return result;
}

// create new note
function createNewNote(body, noteArray) {
	const note = body;
	noteArray.push(note);
	fs.writeFileSync(
		path.join(__dirname, "./db/db.json"),
		JSON.stringify({ notes: noteArray }, null, 2)
	);

	return note;
}

function validateNote(note) {
	if (!note.title || typeof note.title != "string") {
		return false;
	}
	if (!note.text || typeof note.text != "string") {
		return false;
	}
	return true;
}

// get each note html
app.get("/notes", (req, res) => {
	res.send("get notes here");
});
// get html base
app.get("/", (req, res) => {
	res.send("get html here");
});

// get all notes
app.get("/api/notes", (req, res) => {
	res.json(notes);
});

// get note by id /api/notes/:id
app.get("/api/notes/:id", (req, res) => {
	const result = findById(req.params.id, notes);
	if (result) {
		res.json(result);
	} else {
		res.sendStatus(404);
	}
});

// post new note to api
app.post("/api/notes", (req, res) => {
	// create a new id for each note
	req.body.id = notes.length.toString();

	// if req.body is incorrect send error 400
	if (!validateNote(req.body)) {
		res.status(400).send("This note is not formatted properly");
	} else {
		// add note to json and notes arr
		const note = createNewNote(req.body, notes);
		res.json(note);
	}
});

// delete note from api
app.delete("/api/notes/:id", (req, res) => {
	// delete note
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
