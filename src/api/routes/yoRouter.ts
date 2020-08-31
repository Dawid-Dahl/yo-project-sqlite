import express from "express";
import sqlite from "sqlite3";

const yoRouter = express.Router();

yoRouter.get("/get-all", async (req, res) => {
	try {
		const dbPath = process.env.DB_PATH || "";

		const db = new sqlite.Database(dbPath, err =>
			err ? console.error(err) : console.log("Connected to the SQLite database")
		);

		const sql = "SELECT * FROM yo";

		db.all(sql, async (err: Error, row: any) => {
			err ? console.log(err) : res.status(200).json(JSON.stringify(row));
		});
	} catch (e) {
		console.log(e);
	}
});

yoRouter.post("/post", async (req, res) => {
	try {
		const {exclamations} = req.body;

		const dbPath = process.env.DB_PATH || "";

		const db = new sqlite.Database(dbPath, err =>
			err ? console.error(err) : console.log("Connected to the SQLite database")
		);

		const sql = `INSERT INTO Yo (exclamations) VALUES (?)`;
		const values = [exclamations];

		db.run(sql, values, async (err: Error) => {
			if (err) {
				console.log(err);
			} else {
				res.status(201).send("Success!");
			}
		});
	} catch (e) {
		console.log(e);
	}
});

export default yoRouter;
