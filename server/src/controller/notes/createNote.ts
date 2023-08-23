import { NextFunction, Request, Response } from "express";
import { Note } from "../../models/notes";
import { RESPONSE } from "../../constants/response";
export async function createNoteController(req: Request, res: Response, next: NextFunction) {
	const { name, content, isPublic = false } = req.body;

	const note = await Note.create({
		name,
		content,
		isComplited: false,
		isFeatured: false,
		creator: req.user.name,
		isPublic,
	}).catch(next);

	if (!note) return;

	req.user.notes = [...req.user.notes, note._id];
	await req.user.save();

	res.status(200).send({
		...RESPONSE.SUCCESS,
		body: {
			name,
			content,
			isComplited: false,
			isFeatured: false,
			creator: req.user.name,
			isPublic,
		},
	});
}
