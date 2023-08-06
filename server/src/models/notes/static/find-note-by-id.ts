import { noteSchema } from "..";
import { NotesError } from "../../../errors/models/NotesError";

import bcrypt from "bcrypt";

noteSchema.static("findNoteByID", async function (noteId: string) {
	const note = await this.findById(noteId);
	if (!note) throw new NotesError("Заметка не найдена!", 404);
	return note;
});
