import express from "express";
import db from "../../db/db";

const yoRouter = express.Router();

yoRouter.get("/get-all", (req, res) => {
	try {
		const sql = "SELECT * FROM Yo";

		db.query(sql, [], async (err, qRes) => {
			err ? console.log(err) : res.status(200).json(JSON.stringify(qRes.rows));
		});
	} catch (e) {
		console.log(e);
	}
});

yoRouter.post("/post", (req, res) => {
	try {
		const {exclamations} = req.body;

		const sql = `INSERT INTO Yo (exclamations) VALUES ($1)`;
		const values = [exclamations];

		db.query(sql, values, (err: Error) => {
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
