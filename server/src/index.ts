import express from "express";
import { userRouter } from "./routers/user";
import { noteRouter } from "./routers/note";
import path from "path";
import mongoose from "mongoose";
import { errorHandler } from "./errors";

import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/notes", noteRouter);

app.use(errorHandler);

app.listen(8080, () => {
	mongoose.connect("mongodb://localhost:27017/cringe_notes");
	console.log("listen");
});
