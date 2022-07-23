jest.mock("fs");

// const fs = require("fs");
// const path = require("path");
const {
	findById,
	createNewNote,
	validateNote,
} = require("../lib/serverFunctions");
const notes = require("../db/db.json");

// mock writing to db file
test("creates a new note", () => {
	const note = createNewNote(
		{ title: "get coconuts", text: "go to store and buy multiple coconuts" },
		notes
	);

	expect(note.title).toBe("get coconuts");
	expect(note.text).toBe("go to store and buy multiple coconuts");
	expect(note.id).toBe(true);
});

test("finds by id", () => {
	const notes = [
		{
			id: "0",
			title: "Get Groceries",
			text: "Coconuts, limes, avocado, tortilla",
		},
		{
			id: "1",
			title: "Do something new",
			text: "Visit a museum or something similar",
		},
	];

	const result = findById("1", notes);

	expect(result.title).toBe("Do something new");
});

test("validates title and text are included", () => {
	const correctInput = {
		id: "6",
		title: "test title",
		text: "correct text",
	};

	const incorrectTitle = {
		id: "6",
		text: "incorrect title",
	};

	const incorrectText = {
		id: "6",
		title: "incorrect text",
	};

	const passInput = validateNote(correctInput);
	const failTitle = validateNote(incorrectTitle);
	const failText = validateNote(incorrectText);

	expect(passInput).toBe(true);
	expect(failTitle).toBe(false);
	expect(failText).toBe(false);
});
