CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(10) DEFAULT 'ACTIVE',
    user_id bigint REFERENCES users(id) NOT NULL
);