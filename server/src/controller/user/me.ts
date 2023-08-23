import { Request, Response } from "express";

export async function userMeController(req: Request, res: Response) {
	res.status(200).send({
		name: req.user.name,
		createdAt: req.user.createdAt,
	});
}
