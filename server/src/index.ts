import express from "express";
import path from "path";
import mongoose from "mongoose";
import { errorHandler } from "./errors";
import multer from "multer";
import cookieParser from "cookie-parser";
import cors from "cors";

import crypto from "crypto";

const app = express();

export const uploadFile = multer({
	dest: "public/avatars",
	storage: multer.diskStorage({
		filename: function (req, file, cb) {
			cb(null, crypto.randomUUID() + Date.now() + path.extname(file.originalname)); //Appending extension
		},
		destination: function (req, file, cb) {
			cb(null, "public/avatars");
		},
	}),
});

app.use(
	cors({
		origin: "http://127.0.0.1:5500",
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser("secret"));
app.set("trust proxy", true);
app.use(express.static(path.join(__dirname, "../public")));

import { userRouter } from "./routers/user";
import { noteRouter } from "./routers/note";

app.use("/api/user", userRouter);
app.use("/api/notes", noteRouter);

app.use(errorHandler);

app.listen(8080, () => {
	mongoose.connect("mongodb://localhost:27017/cringe_notes");
	console.log("listen");
});
