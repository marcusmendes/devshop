create table if not exists products (
	id serial primary key,
	name VARCHAR(255),
	description TEXT
)

create table if not exists product_variations (
	id serial primary key,
	sku VARCHAR(255),
	available INTEGER,
	variation_name VARCHAR(255),
	price FLOAT,
	price_from FLOAT,
	weight INTEGER,
	order INTEGER
	product_id INTEGER NOT NULL
		constraint fk_product_variations_id_product
		references products(id)
)

create table if not exists product_images (
	id serial primary key,
	description VARCHAR(255),
	url VARCHAR(255),
	order INTEGER,
	product_variation INTEGER NOT NULL
		constraint fk_product_images_id_product_variation
		references product_variations(id)
)

create table if not exists categories (
	id serial primary key,
	category VARCHAR(255),
	description TEXT
)

create table if not exists categories_products (
	product_id INTEGER NOT NULL
		constraint fk_categories_products_id_product
		references products(id),
	category_id INTEGER NOT NULL
		constraint fk_categories_products_id_category
		references categories(id),
	primary key(product_id, category_id)
)

create table if not exists banner_types (
	id serial primary key,
	banner_type VARCHAR(255)
)

create table if not exists banners (
	id serial primary key,
	name VARCHAR(255),
	url VARCHAR(255),
	order INTEGER,
	image_url VARCHAR(255),
	banner_type_id INTEGER NOT NULL
		constraint fk_banners_id_banner_type
		references banner_types(id)
)