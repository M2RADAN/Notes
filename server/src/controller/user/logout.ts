import { NextFunction, Request, Response } from "express";

import { RESPONSE } from "../../constants/response";

export async function userLogoutController(req: Request, res: Response, next: NextFunction) {
	req.user.tokenIDs = req.user.tokenIDs.filter((el) => el !== req.cookies.jwt);
	await req.user.save().catch(next);

	res.clearCookie("jwt");
	res.status(200).send(RESPONSE.SUCCESS);
}
