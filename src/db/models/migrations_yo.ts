import {Pool} from "pg";
import {config} from "dotenv";

(async () => {
	config({
		path: "../../../.env",
	});

	const pool = new Pool({
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	});

	const client = await pool.connect();

	try {
		await client.query("BEGIN");

		const sql = `CREATE TABLE IF NOT EXISTS Yo (
            "id" SERIAL,
            "exclamations" INT NOT NULL
        );`;

		await client.query(sql, []);

		console.log("TABLE 1 CREATED!");

		/* const sql2 = `CREATE TABLE IF NOT EXISTS Yo2 (
            "id" SERIAL,
            "exclamations" INT NOT NULL
        );`;

		await client.query(sql2, []);

		console.log("TABLE 2 CREATED!"); */

		await client.query("COMMIT");
	} catch (e) {
		await client.query("ROLLBACK");
		throw e;
	} finally {
		client.release();
	}
})().catch(e => console.log(e));
