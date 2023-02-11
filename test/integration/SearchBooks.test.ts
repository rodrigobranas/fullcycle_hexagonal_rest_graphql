import SearchBooks from "../../src/application/SearchBooks"
import Connection from "../../src/infra/database/Connection";
import BookRepositoryDatabase from "../../src/infra/repository/BookRepositoryDatabase";

test("Deve buscar os livros", async function () {
	const connection = new Connection();
	const bookRepository = new BookRepositoryDatabase(connection);
	const searchBooks = new SearchBooks(bookRepository);
	const [book] = await searchBooks.execute("Clean Code");
	expect(book.title).toBe("Clean Code");
	expect(book.price).toBe(59);
	await connection.close();
});