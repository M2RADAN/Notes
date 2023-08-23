import { Joi, celebrate } from "celebrate";
import { createNoteController } from "../../controller/notes/createNote";
import { withAuth } from "../../middleware/user/withAuth";
import { Router } from "express";

import { getNoteController } from "../../controller/notes/getNote";
import { getPublicNoteController } from "../../controller/notes/getPublicNote";
import { getUserNotesController } from "../../controller/notes/getUserNotes";

const noteRouter = Router();

noteRouter.post(
	"/createNote",
	celebrate({
		body: Joi.object().keys({
			name: Joi.string().min(3).required().max(100).trim(),
			content: Joi.string().required().max(200000),
			isPublic: Joi.boolean(),
		}),
	}),
	withAuth,
	createNoteController
);
noteRouter.delete("/removeNote", withAuth, createNoteController);

noteRouter.get("/getNote/:id", withAuth, getNoteController);

noteRouter.get("/getPublicNotes/:pages_count", getPublicNoteController);

noteRouter.get("/getUserNotes/:pages_count", withAuth, getUserNotesController);

export { noteRouter };
