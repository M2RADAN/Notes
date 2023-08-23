import { Router } from "express";
import { userRegiserController } from "../../controller/user/register";
import { celebrate, Joi } from "celebrate";
import { userLoginController } from "../../controller/user/login";
import { userMeController } from "../../controller/user/me";
import { userLogoutController } from "../../controller/user/logout";
import { withAuth } from "../../middleware/user/withAuth";
import { userUpdatePasswordController } from "../../controller/user/update/password";
import { userUpdateAvatarController } from "../../controller/user/update/avatar";
import { uploadFile } from "../..";

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
userRouter.patch(
	"/update/password",
	celebrate({
		body: Joi.object().keys({
			oldPassword: Joi.string().min(6).required().regex(/[A-Z]/),
			newPassword: Joi.string().min(6).required().regex(/[A-Z]/),
		}),
	}),
	withAuth,
	userUpdatePasswordController
);

userRouter.patch("/update/avatar", uploadFile.single("file"), userUpdateAvatarController);

export { userRouter };
