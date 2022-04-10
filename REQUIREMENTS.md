# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Products

**Index**: GET /products

Success Code: 200

Example response:

`[{"id": 1, "name": "Test Product", "category": "Electronics", "price": 399}, ...]`

---

**Show**: GET /products/:productId

_productId_: Id of the product you want to get

Success Code: 200

Example response:

`{"id": 1, "name": "Test Product", "category": "Electronics", "price": 399}`

---

**Create**: PUT /products (Requires Auth Token)

Body:

`{"name": "Test Product", "category": "Electronics", "price": 399}`

Success Code: 200

Example response:

`{"id": 1, "name": "Test Product", "category": "Electronics", "price": 399}`

---

**Get top 5**: GET /products/popular

Success Code: 200

Example response:

`[{"id": 1, "name": "Test Product", "category": "Electronics", "price": 399}, ...]`

---

**Get products in category**: GET /products/category/:category

_category_: the category you want to get

Success Code: 200

Example response:

`[{"id": 1, "name": "Test Product", "category": "Electronics", "price": 399}, ...]`

---

### Users

**Index**: GET /users (Requires Auth Token)

Success Code: 200

Example response:

`[{"id": 1, "first_name": "Test", "last_name": "Test2", "username": "TT", "password": "..."}, ...]`

---

**Show**: GET /users/:userId (Requires Auth Token)

_userId_: Id of the user you want to show

Success Code: 200

Example response:

`{"id": 1, "first_name": "Test", "last_name": "Test2", "username": "TT", "password": "..."}`

---

**Create**: POST /users/create

Body:

`{"first_name": "Test", "last_name": "Test2", "username": "TT", "password": "test123"}`

Success Code: 200

Example response:

`{"id": 1, "first_name": "Test", "last_name": "Test2", "username": "TT", "password": "...", "token": "jwt token"}`

---

### Orders

**Current Orders**: GET /orders/:userId (Requires Auth Token)

_userId_: Id of the user you want to get the orders for

Success Code: 200

Example response:

`[{"id": 1, "user_id": 2, "status": "ACTIVE"}, ...]`

---

**Completed Orders**: GET /orders/:userId/completed (Requires Auth Token)

_userId_: Id of the user you want to get the orders for

Success Code: 200

Example response:

`[{"id": 1, "user_id": 2, "status": "COMPLETE"}, ...]`

---

## Data Shapes

#### Product

- id
- name
- price
- category

#### User

- id
- first_name
- last_name
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
