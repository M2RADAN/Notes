import { NextFunction, Request, Response } from "express";
import { Note } from "../../models/notes";
import { RESPONSE } from "../../constants/response";

export async function getUserNotesController(req: Request, res: Response, next: NextFunction) {
	const page = +req.params.page_count;
	req.user.notes = req.user.notes.slice(page * 10, (page + 1) * 10);

	res.status(200).send((await req.user.populate("notes")).notes);
}
