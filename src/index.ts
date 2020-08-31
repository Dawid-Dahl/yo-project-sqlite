import "reflect-metadata";
import "dotenv/config";
import express from "express";
import apiRouter from "./api/routes/api";
import cors from "cors";
import errorhandler from "errorhandler";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
	cors({
		origin: "http://localhost:1234",
		exposedHeaders: ["x-token"],
	})
);
app.use(morgan("dev"));

app.use("/api", apiRouter);

app.get("/", (req, res) => {
	res.send("<h1>Yo Router SQLITE API.</h1>");
});

app.use(errorhandler());

app.listen(PORT, () => console.log(`Server now listening at port: ${PORT}`));
