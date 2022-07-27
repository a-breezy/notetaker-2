const router = require("express").Router();
const notes = require("../../db/db.json");
const {
	findById,
	createNewNote,
	validateNote,
	deleteNote,
} = require("../../lib/serverFunctions");

// get all notes
router.get("/notes", (req, res) => {
	res.json(notes);
});

// post new note to api
router.post("/notes", (req, res) => {
	// set id for new note
	req.body.id = notes.length.toString();
	if (!validateNote(req.body)) {
		res.status(400).send("This note is not formatted properly");
	} else {
		const note = createNewNote(req.body, notes);
		res.json(note);
	}
});

// update note from api
router.put("/notes/:id", (req, res) => {
	// const result = findById(req.params.id, notes);
	// if(result){

	// }
	res.send("here's where you update notes");
});

// delete note from api
router.delete("/notes/:id", (req, res) => {
	const result = findById(req.params.id, notes);
	if (result) {
		console.log("there is note", result);
		deleteNote(result, notes);
	} else {
		console.log("theres no note");
		res.status(400).send("There's no note with this id");
	}
	res.json(notes);
});

module.exports = router;
