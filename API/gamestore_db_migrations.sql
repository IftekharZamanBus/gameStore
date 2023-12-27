CREATE DATABASE gamestore;

CREATE TABLE users (
	id uuid PRIMARY KEY NOT NULL,
	full_name varchar(255) NOT NULL,
	email varchar(100) NOT NULL,
	password TEXT NOT NULL,
	username varchar(50) NULL,
	phone_number varchar(20) NULL,
    address VARCHAR(255),
	isActive VARCHAR(1) NULL,
    created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
    CONSTRAINT email_column UNIQUE (email)
);

CREATE TABLE games (
	id uuid NOT NULL PRIMARY KEY,
	name varchar(255) NOT NULL,
	description text NOT NULL,
	picture varchar NULL,
	quantity int4 NOT NULL,
	price float8 NOT NULL,
	isActive VARCHAR(1) NOT NULL,
    user_id uuid REFERENCES users (id),
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
);