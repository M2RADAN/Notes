import { NextFunction, Request, Response } from "express";
import { Note } from "../../models/notes";
import { RESPONSE } from "../../constants/response";
import { AuthorizationError } from "../../errors/models/AuthorizationError";
export async function removeNoteController(req: Request, res: Response, next: NextFunction) {
	const note = await Note.findNoteById(req.body.id).catch(next);
	if (!note) return;
	if (note.creator !== req.user.name) return next(new AuthorizationError("Forbidden", 403));

	await Note.deleteOne({ _id: req.body.id });

	return res.status(200).send(RESPONSE.SUCCESS);
}
