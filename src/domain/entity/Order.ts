import crypto from "crypto";
import Book from "./Book";
import OrderBook from "./OrderBook";

export default class Order {
	id: string;
	books: OrderBook[] = [];

	constructor (id: string | undefined, readonly email: string) {
		if (!id) {
			this.id = crypto.randomUUID();
		} else {
			this.id = id;
		}
	}

	addBook (book: Book) {
		this.books.push(new OrderBook(book.id, book.price));
	}


	getAmount () {
		let amount = 0;
		for (const orderBook of this.books) {
			amount += orderBook.price;
		}
		return amount;
	}
}