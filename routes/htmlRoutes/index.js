const router = require("express").Router();
const path = require("path");

// serve index.html
router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// serve note.html
router.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

// user tries to go to other route
router.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;
