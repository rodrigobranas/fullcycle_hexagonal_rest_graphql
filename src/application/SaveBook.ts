import pgp from "pg-promise";
import crypto from "crypto";
import Book from "../domain/entity/Book";
import Author from "../domain/entity/Author";
import BookRepository from "../domain/repository/BookRepository";

export default class SaveBook {

	constructor (readonly bookRepository: BookRepository) {
	}

	async execute (input: Input): Promise<Book> {
		const book = new Book(undefined,input.title, input.price);
		const author = new Author(undefined, input.authorName);
		book.addAuthor(author);
		await this.bookRepository.save(book);
		const savedBook = await this.bookRepository.get(book.id);
		if (!savedBook) throw new Error("Could not save book");
		return savedBook;
	}
}

type Input = {
	title: string,
	price: number,
	authorName: string
}

type Output = {
	id: string,
	title: string,
	price: number,
	authors: { id: string, name: string }[]
}