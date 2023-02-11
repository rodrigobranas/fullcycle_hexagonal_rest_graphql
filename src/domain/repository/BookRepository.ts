import Book from "../entity/Book";

export default interface BookRepository {
	get (id: string): Promise<Book | undefined>;
	search (criteria: string): Promise<Book[]>;
	save (book: Book): Promise<void>;
}
