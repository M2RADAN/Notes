import { Router } from "express";
import { userRegiserController } from "../../controller/user/register";
import { celebrate, Joi } from "celebrate";
import { userLoginController } from "../../controller/user/login";
import { userMeController } from "../../controller/user/me";
import { userLogoutController } from "../../controller/user/logout";
import { withAuth } from "../../middleware/user/withAuth";

const userRouter = Router();

userRouter.post(
	"/register",
	celebrate({
		body: Joi.object().keys({
			name: Joi.string().min(4).required().max(100).trim(),
			password: Joi.string().min(6).required().regex(/[A-Z]/),
		}),
	}),
	userRegiserController
);

userRouter.post(
	"/login",
	celebrate({
		body: Joi.object().keys({
			name: Joi.string().min(4).required().max(100).trim(),
			password: Joi.string().min(6).required().regex(/[A-Z]/),
		}),
	}),
	userLoginController
);

userRouter.post("/logout", withAuth, userLogoutController);

userRouter.get("/me", withAuth, userMeController);

export { userRouter };
