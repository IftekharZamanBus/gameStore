-- Create the 'gamestore' database
CREATE DATABASE gamestore;

-- Create the 'users' table
CREATE TABLE users (
	id uuid PRIMARY KEY NOT NULL, -- Unique identifier for each user
	full_name varchar(255) NOT NULL, -- User's full name
	email varchar(100) NOT NULL, -- User's email (with unique constraint)
	password TEXT NOT NULL, -- User's password
	username varchar(50) NULL, -- User's username (optional)
	phone_number varchar(20) NULL, -- User's phone number (optional)
    address VARCHAR(255), -- User's address (optional)
	isactive VARCHAR(1) NULL, -- Flag indicating user activity status
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
	isactive VARCHAR(1) NOT NULL, -- Flag indicating game availability status
    user_id uuid REFERENCES users (id), -- Foreign key reference to the 'users' table
	created_at timestamp NOT NULL DEFAULT now(), -- Timestamp for game creation
	updated_at timestamp NOT NULL DEFAULT now() -- Timestamp for game updates
);
