import { NextFunction, Request, Response } from "express";
import { RESPONSE } from "../constants/response";
import { CelebrateError, celebrate, isCelebrateError } from "celebrate";

interface TError extends Error {
	statusCode: number;
	message: string;
}

export function errorHandler(err: TError | CelebrateError, req: Request, res: Response, next: NextFunction) {
	if (isCelebrateError(err)) {
		return res.status(400).send({
			message: err.details.get("body")?.message,
			keys: err.details.get("body")?.details[0].context?.key,
		});
	}

	console.log(err.statusCode);

	const { statusCode = 500, message } = err;
	res.status(statusCode).send({
		message: statusCode === 500 ? "На сервере произошла ошибка" : message,
	});
}
