import pgp from "pg-promise";
import Author from "../domain/entity/Author";
import BookRepository from "../domain/repository/BookRepository";

export default class SearchBooks {

	constructor (readonly bookRepository: BookRepository) {
	}

	async execute (criteria: string): Promise<Output[]> {
		const books = await this.bookRepository.search(criteria);
		const output: Output[] = [];
		for (const book of books) {
			output.push({
				id: book.id,
				title: book.title,
				price: book.price,
				authors: book.authors.map((author: Author) => {
					return { id: author.id, name: author.name }
				})
			});
		}
		return books;
	}
}

type Output = {
	id: string,
	title: string,
	price: number,
	authors: { id: string, name: string }[]
}
