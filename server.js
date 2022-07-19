const express = require("express");
const app = express();

const PORT = process.envPORT || 3001;
const data = require("./db/db.json");

// filter by id query
function findById(id, noteArray) {
	let result = noteArray.filter((note) => note.id === id)[0];
	return result;
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
	res.json(data);
});

// get note by id /api/notes/:id
app.get("/api/notes/:id", (req, res) => {
	const result = findById(req.params.id, data);
	if (result) {
		res.json(result);
	} else {
		res.sendStatus(404);
	}
});

// post new note to api
app.post("/api/notes", (req, res) => {
	res.send("posting notes to api");
	// res.json()
});

// delete note from api
app.delete("/api/notes/:id", (req, res) => {
	// delete note
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
