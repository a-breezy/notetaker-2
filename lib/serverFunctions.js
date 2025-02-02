const fs = require("fs");
const path = require("path");

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
		path.join(__dirname, "../db/db.json"),
		JSON.stringify(noteArray)
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

function deleteNote(id, notesArr) {
	notesArr.splice(id, 1);
	fs.writeFileSync(
		path.join(__dirname, "../db/db.json"),
		JSON.stringify(notesArr)
	);
	return notesArr;
}

module.exports = { createNewNote, findById, validateNote, deleteNote };
