drop table fullcycle.order;
drop table fullcycle.order_book;
drop table fullcycle.book_author;
drop table fullcycle.book;
drop table fullcycle.author;

create table fullcycle.book (
	id_book uuid,
	title text,
	price numeric
);

create table fullcycle.author (
	id_author uuid,
	name text
);

create table fullcycle.book_author (
	id_book uuid,
	id_author uuid
);

create table fullcycle.order (
	id_order uuid,
	email text,
	amount numeric
);

create table fullcycle.order_book (
	id_order uuid,
	id_book uuid,
	price numeric
);

insert into fullcycle.book (id_book, title, price) values ('82f97cef-2377-43fa-b7f5-df2fdf14b6e4', 'Clean Code', 59);
insert into fullcycle.author (id_author, name) values ('22177727-1cb9-4a35-9cf5-d221a3ee033a', 'Robert C. Martin');
insert into fullcycle.book_author (id_book, id_author) values ('82f97cef-2377-43fa-b7f5-df2fdf14b6e4', '22177727-1cb9-4a35-9cf5-d221a3ee033a');

insert into fullcycle.book (id_book, title, price) values ('e43141de-0cf5-4a87-b995-67aa79243f79', 'Refactoring', 79);
insert into fullcycle.author (id_author, name) values ('0459c289-d1de-4645-983a-e561ec5049bf', 'Martin Fowler');
insert into fullcycle.book_author (id_book, id_author) values ('e43141de-0cf5-4a87-b995-67aa79243f79', '0459c289-d1de-4645-983a-e561ec5049bf');