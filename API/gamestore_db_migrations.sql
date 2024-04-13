-- Create the 'gamestore' database
CREATE DATABASE gamestore;

-- Create the 'users' table
CREATE TABLE users (
	id uuid PRIMARY KEY NOT NULL, -- Unique identifier for each user
	full_name varchar(255) NOT NULL, -- User's full name
	email varchar(100) NOT NULL, -- User's email (with unique constraint)
	password TEXT NOT NULL, -- User's password
	username varchar(50) NULL, -- User's username (optional)
	role varchar(20) NOT NULL DEFAULT 'user', -- User's role (admin or user)
	phone_number varchar(20) NULL, -- User's phone number (optional)
    address VARCHAR(255), -- User's address (optional)
	is_active VARCHAR(1) NULL, -- Flag indicating user activity status
    created_at timestamp NOT NULL DEFAULT now(), -- Timestamp for user creation
	updated_at timestamp NOT NULL DEFAULT now(), -- Timestamp for user updates
    CONSTRAINT email_column UNIQUE (email) -- Ensure email uniqueness
);

-- Create the 'games' table
CREATE TABLE games (
	id uuid NOT NULL PRIMARY KEY, -- Unique identifier for each game
	name varchar(255) NOT NULL, -- Game name
	description text NOT NULL, -- Game description
	picture varchar NULL, -- URL or path for the game picture
	quantity int4 NOT NULL, -- Quantity of available copies
	price float8 NOT NULL, -- Game price
	is_active VARCHAR(1) NOT NULL, -- Flag indicating game availability status
    user_id uuid REFERENCES users (id), -- Foreign key reference to the 'users' table
	created_at timestamp NOT NULL DEFAULT now(), -- Timestamp for game creation
	updated_at timestamp NOT NULL DEFAULT now() -- Timestamp for game updates
);

-- Create the 'taxes' table
CREATE TABLE taxes (
	id uuid PRIMARY KEY NOT NULL,
	state_name VARCHAR(50) NOT NULL,
	rate DECIMAL(10, 2) NOT NULL, -- Latest tax rate
	previous_rate DECIMAL(10, 2) NOT NULL, -- Previous tax rate
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
);

-- Create the 'shipping_addresses' table
CREATE TABLE shipping_addresses (
	id uuid PRIMARY KEY NOT NULL,
	user_id uuid REFERENCES users (id),
	address VARCHAR(255) NOT NULL,
	address2 VARCHAR(255),
	city VARCHAR(50) NOT NULL,
	state VARCHAR(50) NOT NULL,
	zip_code VARCHAR(10) NOT NULL,
	phone_number VARCHAR(20) NOT NULL,
	shipping_type VARCHAR(50) NOT NULL, -- Expedited, Standard, etc.
	shipping_cost DECIMAL(10, 2) DEFAULT 0 NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
);

-- Create the 'billing_addresses' table
CREATE TABLE billing_addresses (
	id uuid PRIMARY KEY NOT NULL,
	user_id uuid REFERENCES users (id),
	address VARCHAR(255) NOT NULL,
	address2 VARCHAR(255),
	city VARCHAR(50) NOT NULL,
	state VARCHAR(50) NOT NULL,
	zip_code VARCHAR(10) NOT NULL,
	phone_number VARCHAR(20) NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
);

-- Create the 'coupons' table
CREATE TABLE coupons (
	id uuid PRIMARY KEY NOT NULL,
	code VARCHAR(50) NOT NULL,
	discount DECIMAL(10, 2) DEFAULT 0 NOT NULL,
	expiration_date timestamp NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
);

-- Create the 'orders' table
CREATE TABLE orders (
    id uuid PRIMARY KEY NOT NULL,
    user_id uuid REFERENCES users (id),
    status VARCHAR(50) NOT NULL,
    subtotal DECIMAL(10, 2) DEFAULT 0,
    discount DECIMAL(10, 2) DEFAULT 0,
    coupon_id uuid REFERENCES coupons (id),
	tax_id uuid REFERENCES taxes (id),
    grand_total DECIMAL (10, 2) DEFAULT 0,
	shipping_address_id uuid REFERENCES shipping_addresses (id),
	billing_address_id uuid REFERENCES billing_addresses (id),
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);

-- Create the 'order_details' table
CREATE TABLE order_details (
	id uuid PRIMARY KEY NOT NULL,
	order_id uuid REFERENCES orders (id),
	game_id uuid REFERENCES games (id),
	quantity int4 NOT NULL,
	price DECIMAL (10, 2) DEFAULT 0 NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
);

-- Create the 'payments' table
CREATE TABLE payments (
	id uuid PRIMARY KEY NOT NULL,
	order_id uuid REFERENCES orders (id),
	payment_method VARCHAR(50) NOT NULL,
	payment_status VARCHAR(50) NOT NULL,
	amount DECIMAL(10, 2) DEFAULT 0 NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
);

-- Create the 'returns' table
CREATE TABLE returns (
	id uuid PRIMARY KEY NOT NULL,
	order_id uuid REFERENCES orders (id),
	game_id uuid REFERENCES games (id),
	quantity int4 NOT NULL,
	return_reason VARCHAR(255) NOT NULL,
	return_status VARCHAR(50) NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
);