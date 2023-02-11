import PlaceOrder from "../../src/application/PlaceOrder";
import Connection from "../../src/infra/database/Connection";
import BookRepositoryDatabase from "../../src/infra/repository/BookRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/OrderRepositoryDatabase";

test("Deve criar um pedido de compra para o livro", async function () {
	const connection = new Connection();
	const orderRepository = new OrderRepositoryDatabase(connection);
	const bookRepository = new BookRepositoryDatabase(connection);
	const placeOrder = new PlaceOrder(orderRepository, bookRepository);
	const input = {
		email: "john@gmail.com",
		books: ['82f97cef-2377-43fa-b7f5-df2fdf14b6e4', 'e43141de-0cf5-4a87-b995-67aa79243f79']
	}
	const output = await placeOrder.execute(input);
	expect(output.amount).toBe(59 + 79);
	await connection.close();
});