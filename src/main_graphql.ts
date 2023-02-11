import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import SearchBooks from "./application/SearchBooks";
import SaveBook from "./application/SaveBook";
import BookRepositoryDatabase from "./infra/repository/BookRepositoryDatabase";
import Connection from "./infra/database/Connection";

async function main() {

	const typeDefs = `
		type Book {
			id: String
			title: String
			price: Int
			authors: [Author]
		}

		type Author {
			id: String
			name: String
		}

		type Query {
			books (criteria: String): [Book]
		}

		input BookInput {
			title: String,
			price: Int
			authorName: String
		}

		type Mutation {
			saveBook (book: BookInput): Book
		}
	`;

	const connection = new Connection();

	const resolvers = {
		Query: {
			async books (_: any, args: any) {
				const bookRepository = new BookRepositoryDatabase(connection);
				const searchBooks = new SearchBooks(bookRepository);
				const output = await searchBooks.execute(args.criteria);
				return output;
			}
		},
		Mutation: {
			async saveBook (_: any, args: any) {
				const bookRepository = new BookRepositoryDatabase(connection);
				const saveBook = new SaveBook(bookRepository);
				const output = saveBook.execute(args.book);
				return output;
			}
		}
	};

	const server = new ApolloServer({ typeDefs, resolvers });

	await startStandaloneServer(server, {
		listen: { port: 4000 }
	});
}

main();
