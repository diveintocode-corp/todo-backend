# Todo Backend API

A RESTful API for managing todos with user authentication, built with Express.js, TypeScript, and Prisma.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Joi
- **Password Hashing:** bcryptjs

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/todo_db"
   JWT_SECRET="your-secret-key"
   PORT=3000
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Check if API is running |

---

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | Login and get JWT token | No |

#### POST `/auth/login`

Login with email and password to receive a JWT token.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | ✅ | Valid email address |
| `password` | string | ✅ | User password |

**Example:**
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

**Response:** Returns JWT token for authenticated requests.

---

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users` | Register a new user | No |
| PUT | `/users/:id` | Update user | Yes (owner only) |
| DELETE | `/users/:id` | Delete user | Yes (owner only) |

#### POST `/users`

Register a new user account.

**Request Body:**
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `username` | string | ✅ | 3-30 characters, alphanumeric only |
| `email` | string | ✅ | Valid email format |
| `password` | string | ✅ | Min 8 characters, must contain at least one uppercase letter and one number |

**Example:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "Password123"
}
```

#### PUT `/users/:id`

Update an existing user. Requires authentication and ownership.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:** (at least one field required)
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `username` | string | ❌ | 3-30 characters, alphanumeric only |
| `email` | string | ❌ | Valid email format |
| `password` | string | ❌ | Min 8 characters, must contain at least one uppercase letter and one number |

#### DELETE `/users/:id`

Delete a user account. Requires authentication and ownership.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

---

### Todos

All todo endpoints require JWT authentication.

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/todos` | Create a new todo | Yes |
| GET | `/todos` | Get all todos for user | Yes |
| GET | `/todos/:id` | Get a specific todo | Yes |
| PUT | `/todos/:id` | Update a todo | Yes |
| DELETE | `/todos/:id` | Delete a todo | Yes |

#### POST `/todos`

Create a new todo item.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `title` | string | ✅ | 1-255 characters |
| `content` | string | ❌ | Max 5000 characters |
| `completed` | boolean | ❌ | Defaults to `false` |

**Example:**
```json
{
  "title": "Buy groceries",
  "content": "Milk, eggs, bread",
  "completed": false
}
```

#### GET `/todos`

Get all todos for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### GET `/todos/:id`

Get a specific todo by ID.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string (UUID) | Todo ID |

#### PUT `/todos/:id`

Update an existing todo.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string (UUID) | Todo ID |

**Request Body:** (at least one field required)
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `title` | string | ❌ | 1-255 characters |
| `content` | string | ❌ | Max 5000 characters |
| `completed` | boolean | ❌ | true/false |

**Example:**
```json
{
  "completed": true
}
```

#### DELETE `/todos/:id`

Delete a todo.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string (UUID) | Todo ID |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run migrate:deploy` | Deploy Prisma migrations |

## License

ISC

