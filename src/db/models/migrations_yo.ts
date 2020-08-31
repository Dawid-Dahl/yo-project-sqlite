import sqlite from "sqlite3";
import {config} from "dotenv";

config({
	path: "../../../.env",
});

const dbPath = process.env.DB_PATH || "";

const db = new sqlite.Database(dbPath, err =>
	err ? console.error(err) : console.log("Connected to the SQLite database")
);

db.serialize(() => {
	db.run(`DROP TABLE IF EXISTS Yo`, err =>
		err ? console.error(err) : console.log(`Table Yo dropped successfully`)
	);
	db.run(
		`CREATE TABLE IF NOT EXISTS Yo (
            "exclamations" INT NOT NULL
        );`,
		err => (err ? console.error(err) : console.log(`Table Yo added successfully`))
	);
});

db.close(err => (err ? console.log(err) : console.log("Database closed.")));
