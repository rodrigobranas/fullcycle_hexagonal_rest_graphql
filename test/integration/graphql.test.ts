import axios from "axios";

test("Deve consultar os livros", async function () {
	const response = await axios("http://localhost:4000", {
		method: "post",
		data: {
			query: `
				query {
					books {
						id
						title
						authors {
							name
						}
					}
				}
			`
		}
	});
	const output = response.data;
	const [bookA, bookB, bookC] = output.data.books;
	expect(bookA.title).toBe("Clean Code");
	expect(bookB.title).toBe("Refactoring");
});

test("Deve consultar os livros passando parâmetros", async function () {
	const response = await axios("http://localhost:4000", {
		method: "post",
		data: {
			query: `
				query ($criteria: String) {
					books (criteria: $criteria) {
						id
						title
						authors {
							name
						}
					}
				}
			`,
			variables: {
				criteria: "Clean Code"
			}
		}
	});
	const output = response.data;
	const [bookA] = output.data.books;
	const [authorA] = bookA.authors;
	expect(bookA.title).toBe("Clean Code");
	expect(authorA.name).toBe("Robert C. Martin");
});

test("Deve salvar um novo livro", async function () {
	const response = await axios("http://localhost:4000", {
		method: "post",
		data: {
			query: `
				mutation ($book: BookInput) {
					savedBook: saveBook (book: $book) {
						id
						title
						price
						authors {
							id
							name
						}
					}
				}
			`,
			variables: {
				book: {
					title: "Clean Architecture",
					price: 89,
					authorName: "Robert C. Martin"
				}
			}
		}
	});
	const output = response.data;
	const book = output.data.savedBook;
	expect(book.title).toBe("Clean Architecture");
	expect(book.price).toBe(89);
});
