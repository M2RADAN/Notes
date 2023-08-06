import { Model, SchemaDefinitionProperty, Document } from "mongoose";

export interface INote {
	name: string;
	content?: string;
	isFeatured: boolean;
	isComplited: boolean;
	creator: string;
	createdAt: Date;
	isPublic: boolean;
}

export type TNoteFnReturn = Document<unknown, {}, INote> &
	INote &
	Required<{
		_id: string;
	}>;

export interface INoteMethods extends Model<INote> {
	findNoteById: (noteId: string) => Promise<TNoteFnReturn>;
}
