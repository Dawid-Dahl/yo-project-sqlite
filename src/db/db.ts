import {Pool, QueryResult} from "pg";
import {config} from "dotenv";

config({
	path: "../../../.env",
});

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

const db = {
	query: (text: string, params: any, callback: (err: Error, qRes: QueryResult<any>) => void) => {
		const start = Date.now();
		return pool.query(text, params, (err, qRes) => {
			const duration = Date.now() - start;
			console.log("Executed query", {text, duration, rows: qRes?.rowCount ?? 0});
			callback(err, qRes);
		});
	},
};

export default db;
