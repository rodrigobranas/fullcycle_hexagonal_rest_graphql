import Order from "../domain/entity/Order";
import OrderBook from "../domain/entity/OrderBook";
import BookRepository from "../domain/repository/BookRepository";
import OrderRepository from "../domain/repository/OrderRepository";

export default class PlaceOrder {

	constructor (readonly orderRepository: OrderRepository, readonly bookRepository: BookRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const order = new Order(undefined, input.email);
		for (const id of input.books) {
			const book = await this.bookRepository.get(id);
			if (!book) throw new Error("Book not found");
			order.books.push(new OrderBook(book.id, book.price));
		}
		await this.orderRepository.save(order);
		const savedOrder = await this.orderRepository.get(order.id);
		return {
			email: savedOrder.email,
			amount: savedOrder.getAmount()
		}
	}
}

type Input = {
	email: string,
	books: string[]
}

type Output = {
	email: string,
	amount: number
}