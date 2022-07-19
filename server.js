const express = require("express");
const app = express();

const data = require("./db/db.json");

// filter by id query
function filterById(query, noteArray) {
	let filteredResult = noteArray;
	if (query.id) {
		filteredResult = filteredResult.filter((note) => note.id === query.id);
	}
    return filteredResult;
}

// create html routes: GET /notes which returns notes.html
app.get("/notes", (req, res) => {
	res.send("get notes here");
});
// create html routes: GET /* which returns index.html
app.get("/", (req, res) => {
	res.send("get html here");
});

// create api routes: GET /api/notes which reads db.json and returns all saved json
app.get("/api/notes", (req, res) => {
	let notes = data;
	// search the query
	if (req.query) {
		console.log(30, req.query);
		notes = filterById(req.query, notes);
	}
	console.log("notes 2", notes);
	// get notes from data
	res.json(notes);
});

// create api routes: POST /api/notes which saves note to request and returns all note to the client
app.post("/api/notes", (req, res) => {
	res.send("posting notes to api");
	// res.json()
});
// give each note a new id
// create api route: DELETE /api/notes/:id to delete a note

app.listen(3001, () => {
	console.log(`Server running on port 3001`);
});
