import Book from "../../src/domain/entity/Book";
import Order from "../../src/domain/entity/Order";

test("Deve testar o pedido", function () {
	const order = new Order("", "john@gmail.com");
	order.addBook(new Book("", "A", 1000));
	order.addBook(new Book("", "A", 1500));
	expect(order.getAmount()).toBe(2500);
});
