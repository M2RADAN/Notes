import { Schema, model } from "mongoose";
import { INote, INoteMethods } from "./types";

export const noteSchema = new Schema<INote, INoteMethods>(
	{
		name: { type: String, required: true },
		content: String,
		isFeatured: { type: Boolean, required: true },
		isComplited: { type: Boolean, required: true },
		creator: { type: String, required: true },
		isPublic: { type: Boolean, required: true },
	},
	{ timestamps: true }
);

import "./static/find-note-by-id";

export const Note = model<INote, INoteMethods>("note", noteSchema);
