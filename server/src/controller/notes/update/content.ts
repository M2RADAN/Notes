import { NextFunction, Request, Response } from "express";
import { Note } from "../../../models/notes";
import { RESPONSE } from "../../../constants/response";
import { AuthorizationError } from "../../../errors/models/AuthorizationError";

export async function updateNoteContentController(req: Request, res: Response, next: NextFunction) {
	const note = await Note.findNoteById(req.body.id).catch(next);

	if (!note) return;

	if (note.creator !== req.user.name) return next(new AuthorizationError("Forbidden", 403));

	note.content = req.body.newContent || note.content;
	await note.save();

	return res.status(200).send(RESPONSE.SUCCESS);
}
