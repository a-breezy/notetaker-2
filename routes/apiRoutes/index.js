const router = require("express").Router();
const { notes } = require("../../db/db.json");
const {
	findById,
	createNewNote,
	validateNote,
} = require("../../lib/serverFunctions");

// get all notes
router.get("/notes", (req, res) => {
	res.json(notes);
});

// get note by id /api/notes/:id
router.get("/notes/:id", (req, res) => {
	const result = findById(req.params.id, notes);
	if (result) {
		res.json(result);
	} else {
		res.sendStatus(404);
	}
});

// post new note to api
router.post("/notes", (req, res) => {
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

// update note from api
router.put("/notes/:id", (req, res) => {
	// const result = findById(req.params.id, notes);
	// if(result){

	// }
	res.send("here's where you update notes");
});

// delete note from api
router.delete("/notes/:id", (req, res) => {
	// const result = findById(req.params.id, notes);

	res.send("here's where you delete note");
});

module.exports = router;
