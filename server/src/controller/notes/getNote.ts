import { NextFunction, Request, Response } from "express";
import { Note } from "../../models/notes";
import { RESPONSE } from "../../constants/response";

export async function getNoteController(req: Request, res: Response, next: NextFunction) {
	const notes = req.user.notes;

	const requestedId = notes.find((el) => el.toString() === req.params.id);

	if (!requestedId) return next(RESPONSE.NOT_FOUND);

	const note = await Note.findById(requestedId?.toString()).catch(next);

	res.status(200).send(note);
}
