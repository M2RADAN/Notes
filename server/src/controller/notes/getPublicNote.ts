import { NextFunction, Request, Response } from "express";
import { Note } from "../../models/notes";
import { RESPONSE } from "../../constants/response";

export async function getPublicNoteController(req: Request, res: Response, next: NextFunction) {
	if (!+req.params.pages_count) return next(RESPONSE.INVALID_PARAMS);
	const notes = await Note.find({ isPublic: true }).sort({ createdAt: -1 }).limit(+req.params.pages_count);
	console.log(notes);
	res.status(200).send(notes);
}
