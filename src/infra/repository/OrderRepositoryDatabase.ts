import Order from "../../domain/entity/Order";
import OrderBook from "../../domain/entity/OrderBook";
import OrderRepository from "../../domain/repository/OrderRepository";
import Connection from "../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {

	constructor (readonly connection: Connection) {
	}

	async save(order: Order): Promise<void> {
		await this.connection.query("insert into fullcycle.order (id_order, email, amount) values ($1, $2, $3)", [order.id, order.email, order.getAmount()]);
		for (const orderBook of order.books) {
			await this.connection.query("insert into fullcycle.order_book (id_order, id_book, price) values ($1, $2, $3)", [order.id, orderBook.idBook, orderBook.price]);
		}
	}

	async get(id: string): Promise<Order> {
		const [orderData] = await this.connection.query("select * from fullcycle.order where id_order = $1", [id]);
		const order = new Order(orderData.id, orderData.email);
		const booksData = await this.connection.query("select * from fullcycle.order_book where id_order = $1", [id]);
		for (const bookData of booksData) {
			order.books.push(new OrderBook(bookData.id_book, parseFloat(bookData.price)));
		}
		return order;
	}

}