import crypto from "crypto";

export default class Author {
	id: string;

	constructor (id: string | undefined, readonly name: string) {
		if (!id) {
			this.id = crypto.randomUUID();
		} else {
			this.id = id;
		}
	}
}
