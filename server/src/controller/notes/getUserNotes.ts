import { NextFunction, Request, Response } from "express";

export async function getUserNotesController(req: Request, res: Response, next: NextFunction) {
	const page = +req.params.pages_count;

	req.user.notes = req.user.notes.slice((page - 1) * 10, page * 10);

	res.status(200).send((await req.user.populate("notes")).notes);
}
