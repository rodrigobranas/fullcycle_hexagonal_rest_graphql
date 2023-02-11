import Book from "../../domain/entity/Book";
import BookRepository from "../../domain/repository/BookRepository";
import pgp from "pg-promise";
import Author from "../../domain/entity/Author";
import Connection from "../database/Connection";

export default class BookRepositoryDatabase implements BookRepository {

	constructor (readonly connection: Connection) {
	}

	async search(criteria: string): Promise<Book[]> {
		const booksData = await this.connection.query("select * from fullcycle.book where ($1::text is null or title = $1)", [criteria]);
		const books: Book[] = [];
		for (const bookData of booksData) {
			const authorsData = await this.connection.query("select * from fullcycle.book_author join fullcycle.author using (id_author) where id_book = $1", [bookData.id_book]);
			const authors: Author[] = [];
			for (const authorData of authorsData) {
				authors.push(new Author(authorData.id_author, authorData.name));
			}
			const book = new Book(bookData.id_book, bookData.title, parseFloat(bookData.price))
			book.authors = authors;
			books.push(book);
		}
		return books;
	}

	async get(id: string): Promise<Book | undefined> {
		const [bookData] = await this.connection.query("select * from fullcycle.book where id_book = $1", [id]);
		if (!bookData) return;
		const authorsData = await this.connection.query("select * from fullcycle.book_author join fullcycle.author using (id_author) where id_book = $1", [bookData.id_book]);
		const authors: Author[] = [];
		for (const authorData of authorsData) {
			authors.push(new Author(authorData.id_author, authorData.name));
		}
		const book = new Book(bookData.id_book, bookData.title, parseFloat(bookData.price))
		book.authors = authors;
		return book;
	}

	async save(book: Book): Promise<void> {
		await this.connection.query("insert into fullcycle.book (id_book, title, price) values ($1, $2, $3)", [book.id, book.title, book.price]);
		for (const author of book.authors) {
			await this.connection.query("insert into fullcycle.author (id_author, name) values ($1, $2)", [author.id, author.name]);
			await this.connection.query("insert into fullcycle.book_author (id_book, id_author) values ($1, $2)", [book.id, author.id]);
		}
	}

}